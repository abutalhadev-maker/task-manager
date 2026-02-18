export const loadData = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
