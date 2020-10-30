import {Component} from 'react';
import axios from 'axios';
import {call} from 'react-native-reanimated';
import storage from './storage';

const api_host = 'https://ybh.32bitsolutions.com/api/';

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
    let formData = {};
      formData = new FormData();
      for (var key in data) {
        if(typeof data[key] == 'object' && data[key]){
          data[key].forEach((item) => {
            formData.append(key+'[]', item);
        });
        }else{
          console.log('NOT AN OBJECT');
          formData.append(key, data[key]);
        }
      }
      if (file) {
        formData.append(file_name, {
          name: Math.random().toString(),
          type: file.type,
          uri:
            Platform.OS === 'android'
              ? file.uri
              : file.uri.replace('file://', ''),
        });
      }
      console.log(formData);
      console.log(file);

    headers['Content-Type'] = `multipart/form-data boundary=${formData._boundary}`;
    if (access_token) {
      headers['Authorization'] = 'Bearer ' + access_token;
    }
    console.log(api_host + endpoint);
    axios({
      method: type,
      url: api_host + endpoint,
      headers: headers,
      data: formData,
    })
      .then((response) => {
        // console.log(response.data, 'axios response');
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
        console.log(error.response.data, 'axios response');

        error_callback(error);
        //   throw error;
      });

    // storage.getData('access_token').then((res) => {

    // });
  },
};

export default network;
