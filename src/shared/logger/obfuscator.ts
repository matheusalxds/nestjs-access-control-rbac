const obfuscating = (data: string): string =>
  data
    .split(' ')
    .map((item) => {
      const slicing = item.slice(0, 3);
      return slicing.concat('***');
    })
    .join(' ');

export const obfuscator = <T>(data: T, obfuscate: string[]): T => {
  return Object.entries(data).reduce((prev, [key, value]) => {
    let obfuscatedData = { [key]: value };

    const isObject = typeof value === 'object';
    if (value) {
      if (obfuscate.includes(key) && !isObject) {
        obfuscatedData = { [key]: obfuscating(value) };
      } else {
        if (typeof value === 'object') {
          const recursiveObfusated = obfuscator(value, obfuscate);
          obfuscatedData = { [key]: recursiveObfusated };
        }
      }
    }
    return { ...prev, ...obfuscatedData };
  }, {} as T);
};
