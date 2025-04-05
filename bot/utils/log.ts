import fs from 'fs';
import path from 'path';

const logDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const getFormattedTimestamp = () => {
    const now = new Date();
    return now.toISOString().replace(/[:]/g, '-').replace(/\..+/, '');
};

const logFileName = `${getFormattedTimestamp()}.log`;
const logFilePath = path.join(logDir, logFileName);

const formatForLog = (...args: any[]): string => {
    return args.map((arg) =>
        typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2)
    ).join(' ');
};

const writeToLogFile = (level: string, ...args: any[]) => {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${formatForLog(...args)}\n`;
    fs.appendFileSync(logFilePath, formatted);
};

// Eksportowane funkcje
export const log = (...args: any[]): void => {
    console.log(...args);
    writeToLogFile('LOG', ...args);
};

export const error = (...args: any[]): void => {
    console.error(...args);
    writeToLogFile('ERROR', ...args);
};

export const warn = (...args: any[]): void => {
    console.warn(...args);
    writeToLogFile('WARN', ...args);
};

export const info = (...args: any[]): void => {
    console.info(...args);
    writeToLogFile('INFO', ...args);
};
