import {Component} from 'react';
import axios from 'axios';
import {call} from 'react-native-reanimated';
import storage from './storage';

const api_host = 'http://165.232.70.89/api/';

const network = {
  getResponse: function (
    endpoint,
    type,
    data,
    success_callback,
    error_callback,
  ) {
    storage.getData('access_token').then((res) => {
      let headers = {};
      if (res) {
        headers['Authorization'] = 'Bearer ' + res;
      }
      axios({
        method: type,
        url: api_host + endpoint,
        headers: headers,
        data: data,
      })
        .then((response) => {
          success_callback(response.data);
        })
        .catch((error) => {
          error_callback(error);
          //   throw error;
        });
    });
  },
};

export default network;
