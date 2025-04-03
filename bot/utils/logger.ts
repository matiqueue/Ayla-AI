import { EmbedBuilder, TextChannel } from "discord.js";

const getRandomColor = (): number => {
  const randomColor = Math.floor(Math.random() * 16777215);
  return randomColor;
};

const formatTimestamp = (date: Date): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // true to am/pm false to 18,30
  };

  const formattedDate = date.toLocaleDateString("en-GB", dateOptions); 
  const formattedTime = date.toLocaleTimeString("en-GB", timeOptions); 
  return `${formattedDate} - ${formattedTime}`;
};

// Funkcja wysyłająca osadzoną wiadomość z danymi tymczasowymi i zwracająca wiadomość
export const sendTempLog = async (channel: TextChannel) => {
  const tempData = {
    description: "Description of the event",
    timestamp: new Date(),
    status: "Succes",
  };

  const embed = new EmbedBuilder()
    .setTitle("📋 New temp logs")
    .setImage("https://cdn.myanimelist.net/s/common/uploaded_files/1479326372-d63291e15c38a678f4b2b51d44d66328.jpeg")
    .setColor(getRandomColor()) 
    .setDescription(tempData.description)
    .addFields(
      {
        name: "🕒 Time",
        value: formatTimestamp(tempData.timestamp),
        inline: true,
      },
      { name: "✅ Status", value: tempData.status, inline: true }
    )

  // Wysłanie wiadomości i zwrócenie jej
  const sentMessage = await channel.send({ embeds: [embed] });
  return sentMessage;
};

// Funkcja do edycji istniejącej wiadomości z logami
export const editTempLog = async (
  message: any, 
  newDescription: string,
  newStatus: string
) => {
  const currentTime = new Date(); // Nowy czas dla edycji
  const embed = EmbedBuilder.from(message.embeds[0]) // Pobieramy istniejący embed
    .setDescription(newDescription)
    .setColor(getRandomColor())
    .setFields(
      {
        name: "🕒 Time",
        value: formatTimestamp(currentTime),
        inline: true,
      },
      { name: "✅ Status", value: newStatus, inline: true }
    )


  await message.edit({ embeds: [embed] });
};