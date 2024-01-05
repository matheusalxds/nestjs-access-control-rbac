import { fieldsToObfuscate } from '@/shared/logger/obfuscate-fields';
import { obfuscator } from '@/shared/logger/obfuscator';

type LogMsg = {
  msg: string;
  data?: object;
};

export const msgStart = (msg: string[], data?: object): LogMsg => ({
  msg: `${msg[0]} - ${msg[1]} - Start`,
  ...(data && { data: obfuscator(data, fieldsToObfuscate) }),
});
export const msgEnd = (msg: string[], data?: object): LogMsg => ({
  msg: `${msg[0]} - ${msg[1]} - End`,
  ...(data && { data: obfuscator(data, fieldsToObfuscate) }),
});
