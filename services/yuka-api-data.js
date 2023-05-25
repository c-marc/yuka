// Implement in AsyncStorage
// collection is a key ("history"/"favorites")
// id is the OFF code / _id

import AsyncStorage from "@react-native-async-storage/async-storage";

// Elementary operations
const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};

const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    // default to []
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    throw e;
  }
};

// Higher order functions
export async function addToCollection(collection, id) {
  try {
    const timestamp = Date.now();
    // read
    const data = await getData(collection);

    // update timestamp or add item
    let item = data.find((el) => el.id === id);
    if (item) {
      item = { ...item, timestamp };
    } else {
      data.push({ id, timestamp });
    }

    // store
    await storeData(collection, data);

    // return to setState and trigger re-rendering
    return data;
  } catch (error) {
    // can it fail ?
    throw new Error(`Failed adding to ${collection}`);
  }
}

export async function removeFromCollection(collection, id) {
  try {
    // read
    const data = await getData(collection);
    // update timestamp or add item
    const newData = data.filter((el) => el.id !== id);
    await storeData(collection, newData);
    return newData;
  } catch (error) {
    // can it fail ?
    throw new Error(`Failed removing from ${collection}`);
  }
}

export async function getCollection(collection) {
  try {
    // read
    const data = await getData(collection);
    return data;
  } catch (error) {
    // can it fail ?
    throw new Error(`Failed fetching ${collection}`);
  }
}
