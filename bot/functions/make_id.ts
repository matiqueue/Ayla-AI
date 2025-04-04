export const generateEmbedID = (): string => {
    const timestamp = Date.now().toString(36); 
    const random = Math.random().toString(36).substring(2, 8);
    return `EMB-${timestamp}-${random}`.toUpperCase();
  };
  