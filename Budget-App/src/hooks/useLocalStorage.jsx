const { useState, useEffect } = require("react");

/** A custom hook that allows us to store, manage and update our budget data locally. 
 */
export const useLocalStorage = (key, defaultValue) => { //The key is used to indentify the data while the defaultValue represents the inital state
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key); 
    if (jsonValue != null) return JSON.parse(jsonValue); 

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  /** Updates the values of local storage */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
