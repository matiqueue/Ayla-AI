export const generateEmbedID = (): string => {
    const timestamp = Date.now().toString(36); // krótka reprezentacja czasu
    const random = Math.random().toString(36).substring(2, 8); // losowe znaki
    return `EMB-${timestamp}-${random}`.toUpperCase();
  };
  