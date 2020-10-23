import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Header from '../../components/header';
import ThriveArticle from '../../components/thriveArticle';

import {
  menu,
  dummyimage,
  botomView,
  dots,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  addimage,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  bottomadd,
  bottomCurve,
} from '../../common/images';
import LeaderBoard from '../../components/leaderBoard';

const GetAdvice = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Image
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Welcome John" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{paddingBottom: 40}}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 2}}>
            <View style={{flexDirection: 'column'}}>
              <RowimageFirst
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <ImageBackgroundView
                  source={image1}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
                <ImageBackgroundView
                  source={image2}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
                <ImageBackgroundView
                  source={image3}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
                <ImageBackgroundView
                  source={image4}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
              </RowimageFirst>
              <RowimageFirst
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 6,
                }}>
                <ImageBackgroundView
                  source={image5}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
                <ImageBackgroundView
                  source={image6}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
                <ImageBackgroundView
                  source={image7}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
                <ImageBackgroundView
                  source={image8}
                  style={{
                    height: widthPercentageToDP(66.67 / 4) - 10,
                    width: widthPercentageToDP(66.67 / 4) - 10,
                  }}
                  borderRadius={5}
                />
              </RowimageFirst>

              <ClickVote>
                <Text
                  onPress={() => {
                    navigation.navigate('VotingPage');
                  }}
                  style={{fontFamily: 'FuturaPT-Medium', color: '#000'}}>
                  Click To Vote
                </Text>
              </ClickVote>
              <MainLatestView>
                <Text style={styles.sectionHeading}>Latest Photos</Text>
                <View style={{position: 'relative'}}>
                  <RowimageFirst style={{justifyContent: 'space-between'}}>
                    <ImageBackgroundView
                      source={image12}
                      style={{
                        height: widthPercentageToDP(66.67 / 3) - 13,
                        width: widthPercentageToDP(66.67 / 3) - 13,
                      }}></ImageBackgroundView>
                    <ImageBackgroundView
                      style={{
                        height: widthPercentageToDP(66.67 / 3) - 13,
                        width: widthPercentageToDP(66.67 / 3) - 13,
                      }}
                      source={image10}></ImageBackgroundView>
                    <ImageBackgroundView
                      style={{
                        height: widthPercentageToDP(66.67 / 3) - 13,
                        width: widthPercentageToDP(66.67 / 3) - 13,
                      }}
                      source={image13}></ImageBackgroundView>
                  </RowimageFirst>
                  <RowimageFirst
                    style={{justifyContent: 'space-between', marginTop: 6}}>
                    <ImageBackgroundView
                      style={{
                        height: widthPercentageToDP(66.67 / 3) - 13,
                        width: widthPercentageToDP(66.67 / 3) - 13,
                      }}
                      source={image15}></ImageBackgroundView>
                    <ImageBackgroundView
                      style={{
                        height: widthPercentageToDP(66.67 / 3) - 13,
                        width: widthPercentageToDP(66.67 / 3) - 13,
                      }}
                      source={image11}></ImageBackgroundView>
                    <ImageBackgroundView
                      style={{
                        height: widthPercentageToDP(66.67 / 3) - 13,
                        width: widthPercentageToDP(66.67 / 3) - 13,
                      }}
                      source={image13}>
                      <ViewMore>
                        <TextMore
                          onPress={() => {
                            navigation.navigate('PhotoWorld');
                          }}>
                          More
                        </TextMore>
                      </ViewMore>
                    </ImageBackgroundView>
                  </RowimageFirst>
                </View>
                <Text style={styles.sectionHeading}>Thrive</Text>
                <ThriveArticle compact={true} />
              </MainLatestView>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: 'stretch',
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Image
              source={addimage}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 32 / 21,
                padding: 0,
                marginBottom: 10,
              }}></Image>
            <LeaderBoard />
          </View>
        </View>
        <LastImage>
          <Image
            source={bottomadd}
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 395 / 100,
            }}></Image>
        </LastImage>
      </ScrollView>
    </View>
  );
};
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 8,
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
});
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(3),
  marginLeft: 10,
  marginRight: 10,
});
const ImageBackgroundView = styled(ImageBackground)({
  borderRadius: 6,
  overflow: 'hidden',
});
const ViewMore = styled(View)({
  backgroundColor: '#F5C84B',
  flex: 1,
  opacity: 0.9,
  //borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
});

const TextMore = styled(Text)({
  textDecorationLine: 'underline',
  color: 'white',
  fontFamily: 'FuturaPT-Medium',
});
const BackgroundImage = styled(ImageBackground)({
  bottom: 0,
});
const MainView = styled(View)({
  flex: 2,
});
const SecondView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(1),
  justifyContent: 'space-around',
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginTop: heightPercentageToDP(4),
  justifyContent: 'space-around',
  //marginLeft: widthPercentageToDP(1),
});
const ThirdView = styled(View)({
  marginTop: heightPercentageToDP(4),
  //marginRight:3,
  marginLeft: 7,
  borderRadius: 6,
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
});
const ClickVote = styled(View)({
  position: 'absolute',
  top: heightPercentageToDP(5.5),
  left: widthPercentageToDP(33.33) - 72,
  backgroundColor: '#F6BC18',
  paddingVertical: heightPercentageToDP(1),
  paddingHorizontal: widthPercentageToDP(6.8),
  opacity: 0.8,
  borderRadius: 5,
});
const MainLatestView = styled(View)({});
const LatestPhoto = styled(View)({});
const RowimageSecond = styled(View)({
  flexDirection: 'row',
  marginLeft: widthPercentageToDP(1),
  marginTop: heightPercentageToDP(1),
});
const RowimageFirst = styled(View)({
  flexDirection: 'row',
  marginLeft: 10,
});

const Title = styled(Text)({
  marginLeft: -widthPercentageToDP(14),
  // marginTop: heightPercentageToDP(3),
  // fontWeight: 400,
  fontSize: 18,
  fontFamily: 'FuturaPT-Medium',
});
const styles = StyleSheet.create({
  item: {
    color: '#ffffff',
    marginLeft: widthPercentageToDP(2),
    fontSize: 12,
    fontFamily: 'FuturaPT-Medium',
    width: widthPercentageToDP(27),
    margin: 6,
  },
  sectionHeading: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 8,
    fontSize: 18,
    fontFamily: 'FuturaPT-Medium',
  },
});

export default GetAdvice;
