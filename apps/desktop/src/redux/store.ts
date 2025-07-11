'use client'

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import uiSlice from './slice/uiSlice'
import noteSlice from './slice/noteSlice'
import modelSlice from './slice/modelSlice'
import chatSlice from './slice/chatSlice'
import messageSlice from './slice/messageSlice'

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    notes: noteSlice,
    models: modelSlice,
    chats: chatSlice,
    messages: messageSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
