import { useEffect, useState } from "react";

interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
}

export default function useLocalStorage<T>({ key, defaultValue }: LocalStorageProps<T>) {
  const [cache, setCache] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cache));
  }, [cache, key]);

  return [cache, setCache] as const;
}
