import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

const ImageWithBorder = ({src, height, width}) => {
  return (
    <View>
      <FastImage
        source={src}
        style={{height: parseInt(height), width: parseInt(width)}}
        resizeMode={FastImage.resizeMode.cover}
        borderRadius={5}
      />
      <View
        style={{
          position: 'absolute',
          height: parseInt(height) + 3,
          width: parseInt(width) + 3,
          backgroundColor: '#FABD15',
          zIndex: -1,
        }}
        borderRadius={5}
      />
    </View>
  );
};

export default ImageWithBorder;
