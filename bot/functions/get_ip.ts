import publicIp from "public-ip"; 

export const getPublicIP = async (): Promise<string> => {
  try {
    const ip = await publicIp.v4(); 
    return ip;
  } catch (error) {
    console.error("❌ Błąd podczas pobierania publicznego IP:", error);
    return "Brak dostępu do IP"; 
  }
};
