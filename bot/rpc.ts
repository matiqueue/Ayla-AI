import { Client, ActivityType } from 'discord.js';

export const setBotPresence = (client: Client) => {
  client.on('ready', () => {
    if (!client.user) return;

    client.user.setPresence({
      status: 'dnd', // 'online' | 'idle' | 'dnd' | 'invisible'
      activities: [
        {
          name: 'Hi, im Ayla!',
          type: ActivityType.Competing, 
          state: "Hi im Ayla bot", 
            

        },
      ],

    });
  });
};










