export const getLocalUsername = (): string => {
  try {
    const os = require("os");
    const username = os.userInfo().username;
    return username || "Nieznany użytkownik";
  } catch (error) {
    console.error("❌ Błąd przy pobieraniu użytkownika systemu:", error);
    return "Nieznany użytkownik";
  }
};
