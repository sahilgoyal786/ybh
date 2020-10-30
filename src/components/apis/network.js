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
    file = false,
    file_name = 'images',
  ) {
    let headers = {};

    let formData = new FormData();
    if (file) {
      formData = new FormData();
      for (var key in data) {
        formData.append(key, data[key]);
      }
      if (file) {
        headers['Content-Type'] = 'multipart/form-data';
        formData.append(file_name, {
          name: file.fileName,
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      }
    } else {
      formData = data;
    }
    console.log(formData);

    if (access_token) {
      headers['Authorization'] = 'Bearer ' + access_token;
    }

    axios({
      method: type,
      url: api_host + endpoint,
      headers: headers,
      data: formData,
    })
      .then((response) => {
        // console.log(response, 'axios response');
        if (response.data) success_callback(response.data);
        else success_callback(response);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status &&
          error.response.status == 401
        ) {
        }
        console.log(error, 'axios response');

        error_callback(error);
        //   throw error;
      });

    // storage.getData('access_token').then((res) => {

    // });
  },
};

export default network;
