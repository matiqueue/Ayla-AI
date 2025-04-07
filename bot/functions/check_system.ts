import os from "os";

export const getSystemInfo = (): string => {
  const platform = os.platform(); 
  const arch = os.arch();
  let systemName: string;

  switch (platform) {
    case "win32":
      systemName = "Windows";
      break;
    case "linux":
      systemName = "Linux";
      break;
    case "darwin":
      systemName = "macOS";
      break;
    default:
      systemName = "Unknown";
  }

  return `${systemName} (${arch})`;
};
