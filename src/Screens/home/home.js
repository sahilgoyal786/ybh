import React, {Component, useContext, useState} from 'react';
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
import userDetailContext from '../../common/userDetailContext';

import ContentLoader, {
  FacebookLoader,
  InstagramLoader,
  Bullets,
} from 'react-native-easy-content-loader';

import {
  addimage,
  image10,
  image11,
  image12,
  image13,
  image15,
  bottomadd,
  bottomCurve,
} from '../../common/images';
import LeaderBoard from '../../components/leaderBoard';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';

const Home = () => {
  const [votingImages, setVotingImages] = React.useState([]);
  const [votingImagesLoaded, setVotingImagesLoaded] = React.useState(false);
  const [votingImagesURLS, setVotingImagesURLS] = React.useState([]);
  const [latestPhotos, setLatestPhotos] = React.useState([]);
  const [latestPhotosLoaded, setLatestPhotosLoaded] = React.useState(false);
  const [latestPhotosURLS, setLatestPhotosURLS] = React.useState([]);
  const [latestArticle, setLatestArticle] = React.useState(null);
  const navigation = useNavigation();
  const userDetail = React.useContext(userDetailContext);

  var votingImagesPlaceholder = [];
  var latestPhotosPlaceholder = [];
  votingImagesPlaceholder.push(
    <ContentLoader
      key={Math.random}
      title={false}
      avatar={true}
      aShape={'square'}
      active
      listSize={8}
      paragraphStyles={{display: 'none'}}
      containerStyles={{
        height: widthPercentageToDP(66.67 / 4) - 10,
        width: widthPercentageToDP(66.67 / 4) - 10,
        margin: 0,
        padding: 0,
      }}
      imageStyles={{margin: 0}}
    />,
  );
  latestPhotosPlaceholder.push(
    <ContentLoader
      key={Math.random}
      title={false}
      avatar={true}
      aShape={'square'}
      active
      listSize={6}
      paragraphStyles={{display: 'none'}}
      containerStyles={{
        height: widthPercentageToDP(66.67 / 3) - 13,
        width: widthPercentageToDP(66.67 / 3) - 13,
        margin: 0,
        padding: 0,
      }}
      imageStyles={{margin: 0}}
    />,
  );

  React.useEffect(() => {
    const tempVotingImagesArray = [];
    const tempLatestPhotosArray = [];
    const votingImagesURLS = [];
    try {
      network.getResponse(
        EndPoints.votingImages,
        'GET',
        {},
        userDetail.token || '',
        (response) => {
          for (let i = 0; i < 8; i++) {
            votingImagesURLS.push(response[i]['url']);
            tempVotingImagesArray.push(
              <VotingImage
                key={i}
                source={{uri: response[i]['url']}}
                style={{}}
              />,
            );
          }
          setVotingImagesURLS(votingImagesURLS);
          setVotingImagesLoaded(true);
          setVotingImages(tempVotingImagesArray);
        },
        (error) => console.log('error', error),
      );
      network.getResponse(
        EndPoints.latestPhotos,
        'POST',
        {},
        userDetail.token || '',
        (response) => {
          response = response.data;
          for (let i = 0; i < 6; i++) {
            latestPhotosURLS.push({url: response[i]['url']});
            tempLatestPhotosArray.push(
              <LatestPhoto
                key={i}
                style={{
                  height: widthPercentageToDP(66.67 / 3) - 13,
                  width: widthPercentageToDP(66.67 / 3) - 13,
                }}
                source={{uri: response[i]['url']}}>
                {i == 5 && (
                  <ViewMore>
                    <TextMore
                      onPress={() => {
                        console.log(latestPhotosURLS);
                        navigation.navigate('LatestPhotos', {latestPhotosURLS});
                      }}>
                      More
                    </TextMore>
                  </ViewMore>
                )}
              </LatestPhoto>,
            );
          }
          setLatestPhotosURLS(latestPhotosURLS);
          setLatestPhotosLoaded(true);
          setLatestPhotos(tempLatestPhotosArray);
        },
        (error) => console.log('error', error),
      );
      network.getResponse(
        EndPoints.blogs,
        'GET',
        {},
        userDetail.token || '',
        (response) => {
          response = response.data;
          setLatestArticle(response.pop());
        },
        (error) => console.log('error', error),
      );
    } catch (exception) {
      console.log('exception', exception);
    }
  }, []);

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
      <Header
        title={
          (userDetail &&
            userDetail.user.username &&
            'Welcome ' + userDetail.user.username) ||
          ''
        }
      />
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                {votingImagesLoaded ? votingImages : votingImagesPlaceholder}
              </RowimageFirst>

              <ClickVote>
                <Text
                  onPress={() => {
                    if (votingImagesLoaded)
                      navigation.navigate('VotingPage', {
                        votingImagesURLS: votingImagesURLS,
                      });
                  }}
                  style={{
                    fontFamily: 'FuturaPT-Medium',
                    color: '#000',
                    paddingVertical: heightPercentageToDP(1),
                    paddingHorizontal: widthPercentageToDP(6.8),
                  }}>
                  Click To Vote
                </Text>
              </ClickVote>
              <MainLatestView>
                <Text style={styles.sectionHeading}>Latest Photos</Text>
                <View style={{position: 'relative'}}>
                  <RowimageFirst
                    style={{
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    {latestPhotosLoaded
                      ? latestPhotos
                      : latestPhotosPlaceholder}
                  </RowimageFirst>
                </View>
                <Text style={styles.sectionHeading}>Thrive</Text>
                {latestArticle ? (
                  <ThriveArticle
                    article={latestArticle}
                    compact={true}
                    navigate={navigation.navigate}
                  />
                ) : (
                  <ContentLoader avatar={true} aShape={'square'} />
                )}
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
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(3),
  marginLeft: 10,
  marginRight: 10,
});
const VotingImage = styled(ImageBackground)({
  borderRadius: 6,
  overflow: 'hidden',
  height: widthPercentageToDP(66.67 / 4) - 10,
  width: widthPercentageToDP(66.67 / 4) - 10,
  marginBottom: 5,
  backgroundColor: '#DADADA',
});
const LatestPhoto = styled(ImageBackground)({
  borderRadius: 6,
  overflow: 'hidden',
  marginBottom: 8,
  backgroundColor: '#DADADA',
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
const ClickVote = styled(View)({
  position: 'absolute',
  top: heightPercentageToDP(5) - 2,
  left: widthPercentageToDP(33.33) - 72,
  backgroundColor: 'rgba(246, 188, 24, 0.9)',
  borderRadius: 5,
});
const MainLatestView = styled(View)({});
const RowimageFirst = styled(View)({
  flexDirection: 'row',
  marginLeft: 10,
  marginTop: 10,
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

export default Home;
