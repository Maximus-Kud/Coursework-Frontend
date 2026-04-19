export function setWithExpiry(key: string, value: any, timeSpanInHours: number) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + timeSpanInHours * 60 * 60 * 1000,
  }

  localStorage.setItem(key, JSON.stringify(item));
}



export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }
  catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}