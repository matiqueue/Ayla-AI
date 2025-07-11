import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { upsertChat } from '../../lib/chatApi'
import { addMessage, getMessagesByChatId } from '../../lib/messageApi'
import getOllama from '../../lib/ollamaApi'
import { Chat, Message } from '../../lib/types'
import { RootState } from '../store'

const messageAdapter = createEntityAdapter<Message>({
  sortComparer: (a, b) => a.created_at! - b.created_at!,
})

type StreamEventType = {
  chatId: string
  messageId: string
  isNewChat: boolean
  model: string
  chatCreatedAt?: number
}

type InitialState = {
  isStreaming: Record<string, boolean>
}

const initialState: InitialState = {
  isStreaming: {},
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState: messageAdapter.getInitialState(initialState),
  reducers: {
    allModelsLoaded: messageAdapter.setAll,

    newUserMessage: messageAdapter.addOne,

    streamStart: (state, action: PayloadAction<StreamEventType>) => {
      messageAdapter.addOne(state, {
        id: action.payload.messageId,
        chat_id: action.payload.chatId,
        role: 'assistant',
        model: action.payload.model,
        content: '',
        created_at: Date.now(),
        updated_at: Date.now(),
      })
      state.isStreaming[action.payload.messageId] = true
    },

    streaming: (state, action: PayloadAction<Message>) => {
      state.entities[action.payload.id].content += action.payload.content
      state.entities[action.payload.id].eval_count = action.payload.eval_count
      state.entities[action.payload.id].eval_duration = action.payload.eval_duration
      state.entities[action.payload.id].updated_at = Date.now()
    },

    streamEnd: (state, action: PayloadAction<StreamEventType>) => {
      state.isStreaming[action.payload.messageId] = false
    },
  },
  extraReducers(builder) {
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      messageAdapter.upsertMany(state, action.payload)
    })
  },
})

export type NewMessagePayloadType = {
  chatId: string
  content: string
  model: string
  images?: string[]
  isNewChat: boolean
}

export const getMessagesThunk = createAsyncThunk<Message[], string>(
  'messages/getMessages',
  async (payload, _thunkAPI) => {
    const messages = await getMessagesByChatId(payload)
    return messages
  }
)

export const llmChatThunk = createAsyncThunk<void, NewMessagePayloadType>(
  'messages/llmChat',
  async (payload, thunkAPI) => {
    const userMessage: Message = {
      chat_id: payload.chatId,
      role: 'user',
      content: payload.content,
      images: payload.images,
      id: nanoid(),
    }

    const server = await addMessage(userMessage)

    thunkAPI.dispatch(newUserMessage(server))

    const state = thunkAPI.getState() as RootState
    const history = Object.values(state.messages.entities)
      .filter((m) => m.chat_id === payload.chatId)
      .map((m) => {
        return {
          role: m.role,
          content: m.content,
          images: m.images,
        }
      })

    const messageId = nanoid()
    const systemMsg = { role: 'system', content: 'You are a helpful assistant.' }

    thunkAPI.dispatch(
      streamStart({
        chatId: payload.chatId,
        messageId,
        isNewChat: payload.isNewChat,
        model: payload.model,
      })
    )

    let response

    const ollamaInstance = await getOllama()

    try {
      response = await ollamaInstance.chat({
        model: payload.model,
        messages: [systemMsg, ...history],
        stream: true,
      })
    } catch (e) {
      const error = e as Error
      alert(`Error occurred while chatting with the model: ${payload.model}\n\n${error.message}`)
    }

    if (!response) return

    let content = ''

    for await (const part of response) {
      content += part.message.content
      thunkAPI.dispatch(
        streaming({
          id: messageId,
          chat_id: payload.chatId,
          role: part.message.role,
          content: part.message.content,
          model: payload.model,
          eval_count: part.eval_count,
          eval_duration: part.eval_duration,
          done: part.done,
        })
      )
    }

    const chat: Chat = {
      id: payload.chatId,
      model: payload.model,
    }
    if (payload.isNewChat) {
      chat.created_at = Date.now()
    }
    await upsertChat(chat)

    const newMsg: Message = {
      id: messageId,
      chat_id: payload.chatId,
      content: content,
      role: 'assistant',
      model: payload.model,
    }

    await addMessage(newMsg)

    thunkAPI.dispatch(
      streamEnd({
        chatId: payload.chatId,
        messageId,
        isNewChat: payload.isNewChat,
        model: payload.model,
        chatCreatedAt: chat.created_at,
      })
    )
  }
)

export const messageSelectors = messageAdapter.getSelectors()

export const selectMessagesByChatId = createSelector(
  (state: RootState) => messageSelectors.selectAll(state.messages),
  (_state, chatId: string) => chatId,
  (messages: Message[], chatId) => {
    return messages.filter((m: Message) => m.chat_id === chatId)
  }
)

export const countMessagesByChatId = createSelector(
  (state: RootState) => messageSelectors.selectAll(state.messages),
  (_state, chatId: string) => chatId,
  (messages: Message[], chatId) => {
    return messages.filter((m: Message) => m.chat_id === chatId).length
  }
)

// Action creators are generated for each case reducer function
export const { allModelsLoaded, streaming, streamStart, streamEnd, newUserMessage } =
  messageSlice.actions

export default messageSlice.reducer
