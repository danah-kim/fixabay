const fallbackStorage: Record<string, string> = {};
const valid = (() => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');

    return true;
  } catch (e) {
    return false;
  }
})();

function useLocalStorage<T = any>(key: string) {
  function getItem(): T | undefined {
    const value = valid ? localStorage.getItem(key) : fallbackStorage[key];

    try {
      return JSON.parse(value || '');
    } catch (e) {
      return undefined;
    }
  }

  function setItem(value: T) {
    const stringify = JSON.stringify(value);

    if (valid) {
      localStorage.setItem(key, stringify);

      return;
    }

    fallbackStorage[key] = stringify;
  }

  function removeItem(key: string) {
    if (valid) {
      localStorage.removeItem(key);

      return;
    }

    delete fallbackStorage[key];
  }

  return [getItem(), setItem, removeItem] as [T | undefined, typeof setItem, typeof removeItem];
}

export default useLocalStorage;
