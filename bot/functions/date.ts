export const getFormattedTime = (): string => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("en-US", { month: "long" });
    const hours = now.getHours() % 12 || 12; // Konwersja do 12-godzinnego formatu
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
  
    return `${day} ${month} - ${hours}:${minutes} ${ampm}`;
  };
  