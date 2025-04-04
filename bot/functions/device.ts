export const getDeviceType = (): string => {
    const platform = process.platform;
  
    switch (platform) {
      case "win32":
      case "linux":
      case "darwin":
        return "Computer";
      case "android":
        return "Phone";
      default:
        return "Unknown device";
    }
  };

  
//wykrywa urzadzenie na ktorym uruchomiono bota a nie uzytkownika ktory go uzywa 