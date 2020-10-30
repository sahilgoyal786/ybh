import AsyncStorage from '@react-native-community/async-storage';

const storage = {
  getData: function (key) {
    try {
      return AsyncStorage.getItem(key);
    } catch (e) {
      console.log(e);
    }
  },
  setData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  },
  removeData: function (key) {
    try {
      AsyncStorage.removeItem(key);
    } catch (error) {
      // Error saving data
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  },
};

export default storage;
