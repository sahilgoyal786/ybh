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
    access_token,
    success_callback,
    error_callback,
  ) {
    if(access_token){
      let headers = {};
      if (access_token) {
        headers['Authorization'] = 'Bearer ' + access_token;
      }
      axios({
        method: type,
        url: api_host + endpoint,
        headers: headers,
        data: data,
      })
        .then((response) => {
          console.log(response,"axios response")
          success_callback(response.data);
        })
        .catch((error) => {
          console.log(error.response,"axios  error response")

          error_callback(error.response.data);
          //   throw error;
        });
    }
    // storage.getData('access_token').then((res) => {
      
    // });
  },
};

export default network;
