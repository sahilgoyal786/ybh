import React, {Component, useEffect} from 'react';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';

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
import FastImage from 'react-native-fast-image';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import GlobalStyles, {GlobalImages} from '../../common/styles';

const windowWidth = Dimensions.get('window').width;

const Thrivedetails = ({route, navigation}) => {
  const [thriveTop, setThriveTop] = React.useState(false);
  const [thriveBottom, setThriveBottom] = React.useState(false);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const {article} = route.params;

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

    console.log(EndPoints.blogShow);
    network.getResponse(
      EndPoints.blogShow,
      'POST',
      {id: article.id},
      userDetail.token,
      (response) => console.log(response),
      (response) => console.log(response),
    );
  }, []);

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
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
        <View style={{...GlobalStyles.screenBackgroundColor}}>
          <LastImage>
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
                    width: '100%',
                    aspectRatio: 170 / 21,
                    padding: 0,
                    marginBottom: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          </LastImage>
          <Text
            style={{
              ...GlobalStyles.secondaryTextColor,
              marginTop: 15,
              paddingHorizontal: 10,
              fontSize: 20,
            }}>
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
                  ...GlobalStyles.secondaryTextColor,
                  fontSize: 10,
                  marginTop: heightPercentageToDP(1),
                }}>
                <FontAwesome5Icon name="calendar-alt" />{' '}
                {article.created_at_formatted}
              </Text>
              <Category>{article.category}</Category>
            </View>
          </View>

          <FastImage
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
              tagsStyles={{
                p: {...GlobalStyles.secondaryTextColor},
                div: {...GlobalStyles.secondaryTextColor},
                span: {...GlobalStyles.secondaryTextColor},
                ul: {...GlobalStyles.secondaryTextColor, marginTop: 20},
                ol: {...GlobalStyles.secondaryTextColor, marginTop: 20},
                li: {...GlobalStyles.secondaryTextColor},
                strong: {...GlobalStyles.secondaryTextColor},
                b: {...GlobalStyles.secondaryTextColor},
                h1: {...GlobalStyles.secondaryTextColor},
                h2: {...GlobalStyles.secondaryTextColor},
                body: {...GlobalStyles.secondaryTextColor},
              }}
              listsPrefixesRenderers={{
                ol: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                  console.log('children', children);
                  return (
                    <Text
                      style={{
                        ...GlobalStyles.secondaryTextColor,
                        marginRight: 5,
                        marginTop: 1,
                        fontSize: 12,
                      }}>
                      {passProps.index + 1}
                    </Text>
                  );
                },
                ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                  return (
                    <FontAwesome5Icon
                      name="arrow-right"
                      style={{
                        ...GlobalStyles.secondaryTextColor,
                        marginTop: 3,
                        marginRight: 5,
                      }}></FontAwesome5Icon>
                  );
                },
              }}
              styles={{...GlobalStyles.secondaryTextColor}}
              source={{html: article.content}}
              imagesMaxWidth={widthPercentageToDP(100) - 30}
              contentWidth={widthPercentageToDP(100) - 30}
            />
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                textAlign: 'center',
                color: '#A073C4',
                padding: 10,
                borderColor: '#A073C4',
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

          <LastImage>
            {thriveBottom && (
              <TouchableOpacity
                onPress={() => Linking.openURL(thriveBottom.url)}>
                <Image
                  source={{
                    uri:
                      'file://' +
                      RNFS.DocumentDirectoryPath +
                      '/' +
                      thriveBottom.path,
                  }}
                  style={{
                    width: '100%',
                    aspectRatio: 1041 / 148,
                    padding: 0,
                    marginBottom: 30,
                  }}
                />
              </TouchableOpacity>
            )}
          </LastImage>
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
const LastImage = styled(View)({
  marginLeft: 10,
  width: widthPercentageToDP(100) - 20,
});

export default Thrivedetails;
