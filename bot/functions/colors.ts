import { ColorResolvable } from 'discord.js'

export const getRandomColor: () => ColorResolvable = () => Math.floor(Math.random() * 16777215)
