import { v4 as uuidv4 } from 'uuid';

export function generateLicenceCode(): string {
  return uuidv4();
}