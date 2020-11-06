import {Component} from 'react';
import axios from 'axios';
import {call} from 'react-native-reanimated';
import storage from './storage';

const api_host = 'https://ybh.32bitsolutions.com/api/';

const network = {
  cacheExpired: function (endpoint, value) {
    if (endpoint.cache_age == undefined) return false;
    else if (
      Math.floor(Date.now() / 1000) >
      value.timestamp + endpoint.cache_age * 60 * 60
    ) {
      console.log(
        Math.floor(Date.now() / 1000),
        value.timestamp,
        endpoint.cache_age * 60 * 60,
      );
      return true;
    } else return false;
  },
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
    if (type.toLowerCase() == 'get' && endpoint.dont_cache == undefined) {
      storage.getData(endpoint.url).then((value) => {
        if (value == null || this.cacheExpired(endpoint, JSON.parse(value))) {
          this.getResponseFromServer(
            endpoint,
            type,
            data,
            access_token,
            success_callback,
            error_callback,
            file,
            file_name,
          );
        } else {
          console.log('Loaded from cache', endpoint.url);
          success_callback(JSON.parse(value));
        }
      });
    } else {
      console.log('getResponseFromServer', endpoint);
      this.getResponseFromServer(
        endpoint,
        type,
        data,
        access_token,
        success_callback,
        error_callback,
        file,
        file_name,
      );
    }

    // storage.getData('access_token').then((res) => {

    // });
  },
  getResponseFromServer: function (
    endpoint,
    type,
    data,
    access_token,
    success_callback,
    error_callback,
    file,
    file_name,
  ) {
    let headers = {};
    let formData = {};
    formData = new FormData();
    for (var key in data) {
      if (typeof data[key] == 'object' && data[key]) {
        data[key].forEach((item) => {
          formData.append(key + '[]', item);
        });
      } else {
        // console.log('NOT AN OBJECT');
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
    // console.log(formData);
    // console.log(file);

    headers[
      'Content-Type'
    ] = `multipart/form-data boundary=${formData._boundary}`;
    if (access_token) {
      headers['Authorization'] = 'Bearer ' + access_token;
    }
    // else {
    // console.log('no access_token');
    // }
    // console.log(api_host + endpoint);
    axios({
      method: type,
      url: api_host + endpoint.url,
      headers: headers,
      data: formData,
    })
      .then((response) => {
        // console.log(response.data, 'axios response');
        if (response.data) {
          if (type.toLowerCase() == 'get') {
            response.data.timestamp = Math.floor(Date.now() / 1000);
            storage.removeData(endpoint.url);
            storage.setData(endpoint.url, JSON.stringify(response.data));
          }
          success_callback(response.data);
        } else {
          if (type.toLowerCase() == 'get') {
            response.timestamp = Math.floor(Date.now() / 1000);
            storage.removeData(endpoint.url);
            storage.setData(endpoint.url, JSON.stringify(response));
          }
          success_callback(response);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status &&
          error.response.status == 401
        ) {
        }
        if (error.response && error.response.data) {
          console.log(error.response.data, 'axios response1');
        } else {
          console.log(error, 'axios response2');
        }

        error_callback(error);
        //   throw error;
      });

    // storage.getData('access_token').then((res) => {

    // });
  },
};

export default network;
