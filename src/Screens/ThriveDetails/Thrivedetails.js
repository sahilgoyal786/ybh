import React, {Component, useEffect} from 'react';
import {addbtmimg, topbanner, bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';

let RNFS = require('react-native-fs');
import HTML from 'react-native-render-html';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
  Image,
  Platform,
  Dimensions,
  Share,
  Linking,
} from 'react-native';
//import { Image } from 'native-base';
import Button from '../../components/button';
import Header from '../../components/header';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import storage from '../../components/apis/storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const Thrivedetails = ({route, navigation}) => {
  const [thriveTop, setThriveTop] = React.useState(false);
  const [thriveBottom, setThriveBottom] = React.useState(false);

  useEffect(() => {
    storage.getData('thrive_top').then((data) => {
      if (data) {
        setThriveTop(JSON.parse(data));
      }
    });
    storage.getData('thrive_bottom').then((data) => {
      if (data) {
        setThriveBottom(JSON.parse(data));
      }
    });
  }, []);

  const {article} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Thrive" backButton="Thrive" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={{backgroundColor: 'white'}}>
          {thriveTop && (
            <TouchableOpacity onPress={() => Linking.openURL(thriveTop.url)}>
              <Image
                source={{
                  uri:
                    'file://' +
                    RNFS.DocumentDirectoryPath +
                    '/' +
                    thriveTop.path,
                }}
                style={{
                  width: widthPercentageToDP(100) - 60,
                  marginLeft: 30,
                  height: 40,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          <Text style={{marginTop: 15, paddingHorizontal: 10, fontSize: 20}}>
            {article.title}
          </Text>
          <View style={{justifyContent: 'flex-start'}}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: 'gray',
                  marginTop: heightPercentageToDP(1),
                }}>
                <FontAwesome5Icon name="calendar-alt" />{' '}
                {article.created_at_formatted}
              </Text>
              <Category>{article.category}</Category>
            </View>
          </View>

          <Image
            source={{uri: article.file.url}}
            style={{
              height: widthPercentageToDP(100) - 20,
              width: widthPercentageToDP(100) - 20,
              marginLeft: 10,
              marginTop: 10,
            }}
            resizeMode="cover"
          />
          <View style={{marginTop: 15, padding: 10, marginBottom: 10}}>
            <HTML
              source={{html: article.content}}
              imagesMaxWidth={widthPercentageToDP(100) - 30}
              contentWidth={widthPercentageToDP(100) - 30}
            />
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                textAlign: 'center',
                color: 'purple',
                padding: 10,
                borderColor: 'purple',
                borderWidth: 2,
                borderRadius: 4,
              }}
              onPress={() => {
                Share.share({
                  message:
                    'Lets Have Fun! #YBH https://ybhive.app DOWNLOAD NOW!!',
                  url: 'https://ybhive.app',
                });
              }}>
              <FontAwesome5Icon name="share" style={{fontSize: 20}} /> Share
              With Friends
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ButtonSUbmit
            // onPress={() => setDialog(true)}
            name={'Previous'}
            linear
          />
          <ButtonSUbmit
            // onPress={() => setDialog(true)}
            name={'Next'}
            linear
          />
        </View> */}

          {thriveBottom && (
            <TouchableOpacity onPress={() => Linking.openURL(thriveBottom.url)}>
              <Image
                source={{
                  uri:
                    'file://' +
                    RNFS.DocumentDirectoryPath +
                    '/' +
                    thriveBottom.path,
                }}
                style={{
                  height: 60,
                  width: windowWidth - 20,
                  marginLeft: 10,
                  marginTop: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 110,
  },
});

const Category = styled(Text)({
  padding: 4,
  paddingLeft: 14,
  paddingRight: 14,
  backgroundColor: '#FBEA76',
  fontSize: 12,
  marginTop: 5,
  marginBottom: 5,
  borderRadius: 8,
  textTransform: 'capitalize',
  color: 'grey',
});

export default Thrivedetails;
