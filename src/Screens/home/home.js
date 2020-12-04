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
import FastImage from 'react-native-fast-image';

import ContentLoader from 'react-native-easy-content-loader';
import {addimage, bottomadd, bottomCurve} from '../../common/images';
import LeaderBoard from '../../components/leaderBoard';
import Button from '../../components/button';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import {AuthContext} from '../../common/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {fetchLeaderBoard} from '../../common/helpers';
import storage from '../../components/apis/storage';
import {Dialog} from 'react-native-simple-dialogs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Home = () => {
  const [votingImages, setVotingImages] = React.useState([]);
  const [votingEnabled, setVotingEnabled] = React.useState(true);
  const [imageOfTheWeek, setImageOfTheWeek] = React.useState(null);
  const [votingImagesLoaded, setVotingImagesLoaded] = React.useState(false);
  const [votingImagesURLS, setVotingImagesURLS] = React.useState([]);
  const [latestPhotos, setLatestPhotos] = React.useState([]);
  const [latestPhotosLoaded, setLatestPhotosLoaded] = React.useState(false);
  const [latestPhotosArray, setLatestPhotosArray] = React.useState([]);
  const [leaderBoardLoading, setLeaderBoardLoading] = React.useState(false);
  const [loadingFailed, setLoadingFailed] = React.useState(false);
  const [tipOfTheDay, setTipOfTheDay] = React.useState(false);
  const [latestArticle, setLatestArticle] = React.useState(null);
  const navigation = useNavigation();
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);

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
          // console.log(response);
          if (response.photos) {
            response = response.photos;
            for (let i = 0; i < 8; i++) {
              votingImagesURLS.push(response[i]['url']);
              tempVotingImagesArray.push(
                <VotingImage
                  key={i}
                  source={{uri: response[i]['url']}}
                  resizeMode={FastImage.resizeMode.cover}
                />,
              );
            }
            setVotingImagesURLS(votingImagesURLS);
            setVotingImages(tempVotingImagesArray);
          } else if (response.image_of_the_week) {
            setVotingEnabled(false);
            setImageOfTheWeek(response.image_of_the_week);
          } else {
            setVotingEnabled(false);
          }
          setVotingImagesLoaded(true);
        },
        (error) => console.log('error', error),
      );
      network.getResponse(
        EndPoints.latestPhotos,
        'GET',
        {},
        userDetail.token || '',
        (response) => {
          response = response.data;
          for (let i = 0; i < 6; i++) {
            latestPhotosArray.push(response[i]);
            tempLatestPhotosArray.push(
              <LatestPhoto
                key={i}
                resizeMode={FastImage.resizeMode.cover}
                source={{uri: response[i]['url']}}>
                {i == 5 && (
                  <ViewMore>
                    <TextMore
                      onPress={() => {
                        //console.log(latestPhotosArray);
                        navigation.navigate('LatestPhotos', {
                          latestPhotosArray,
                        });
                      }}>
                      More
                    </TextMore>
                  </ViewMore>
                )}
              </LatestPhoto>,
            );
          }
          setLatestPhotosArray(latestPhotosArray);
          setLatestPhotosLoaded(true);
          setLatestPhotos(tempLatestPhotosArray);
        },
        (error) => console.log('error', error),
      );
      network.getResponse(
        EndPoints.getLatestBlog,
        'GET',
        {},
        userDetail.token || '',
        (response) => {
          // console.log(response);
          response = response.blogs.data;
          setLatestArticle(response.pop());
        },
        (error) => console.log('error', error),
      );
      fetchLeaderBoard(userDetail, changeUserDetail)
        .then((status) => {
          setLoadingFailed(!status);
          setLeaderBoardLoading(true);
        })
        .catch((err) => {
          setLoadingFailed(true);
          setLeaderBoardLoading(false);
        });
    } catch (exception) {
      console.log('exception', exception);
    }

    const bootstrapAsync = async () => {
      let tipsOfTheDay = await storage.getData('TipsOfTheDay');
      if (tipsOfTheDay && tipsOfTheDay.length) {
        tipsOfTheDay = JSON.parse(tipsOfTheDay);

        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var today = Math.floor(diff / oneDay);
        if (tipsOfTheDay[today] !== '') {
          console.log(tipsOfTheDay[today]);
          setTipOfTheDay(tipsOfTheDay[today]);
          tipsOfTheDay[today] = '';
          await storage.setData('TipsOfTheDay', JSON.stringify(tipsOfTheDay));
        }
      }
    };
    bootstrapAsync();
  }, []);
  const onFetchLeaderBoard = () => {
    setLoadingFailed(false);
    fetchLeaderBoard(userDetail, changeUserDetail)
      .then((status) => {
        setLoadingFailed(!status);
        setLeaderBoardLoading(true);
      })
      .catch((err) => {
        setLoadingFailed(true);
        setLeaderBoardLoading(false);
      });
  };
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
                {!votingEnabled && imageOfTheWeek ? (
                  <ImageOfTheWeek source={{uri: imageOfTheWeek}}>
                    <View
                      style={{
                        padding: 2,
                        paddingBottom: 10,
                        bottom: -2,
                        marginTop: 127,
                        height: 40,
                        right: -2,
                      }}>
                      <LinearGradient
                        colors={[
                          'transparent',
                          '#F8BA17',
                          '#F8BA17',
                          '#F8BA17',
                        ]}
                        style={styles.linearGradient}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}>
                        <Text
                          style={{
                            textAlign: 'right',
                            // padding: 5,
                            color: 'white',
                            height: 30,
                            lineHeight: 30,
                            paddingRight: 10,
                          }}>
                          Image of the Week
                        </Text>
                      </LinearGradient>
                    </View>
                  </ImageOfTheWeek>
                ) : votingImagesLoaded ? (
                  votingImages
                ) : (
                  votingImagesPlaceholder
                )}
              </RowimageFirst>

              {votingEnabled && votingImagesLoaded && (
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
              )}
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
            <LeaderBoard userDetailTemp={userDetail} />
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
        <Dialog
          visible={loadingFailed}
          onTouchoutside={() => setLoadingFailed(false)}>
          <View>
            <Text
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
              }}>
              {' '}
              {'Fetching leaderboard failed'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              isLoading={false}
              onPress={onFetchLeaderBoard}
              style={{
                marginTop: heightPercentageToDP(3),
                width: widthPercentageToDP(35),
              }}
              name={'reload'}
              linear
            />
            <Button
              onPress={() => {
                setLoadingFailed(false);
              }}
              style={{
                marginTop: heightPercentageToDP(3),
                width: widthPercentageToDP(35),
              }}
              name={'Cancel'}
              secondary
            />
          </View>
        </Dialog>

        <Dialog
          visible={tipOfTheDay !== false}
          dialogStyle={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            padding: 0,
            borderWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          }}
          contentStyle={{padding: 0, shadowOpacity: 0}}
          onTouchoutside={() => {
            alert();
            setTipOfTheDay(false);
          }}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 20,
                paddingVertical: 40,
              }}>
              <FontAwesome5Icon
                name="lightbulb"
                style={{fontSize: 40, color: 'purple'}}
              />
              {tipOfTheDay && (
                <Text
                  style={{fontSize: 20, marginTop: 15, textAlign: 'center'}}>
                  {tipOfTheDay}
                </Text>
              )}
            </View>
            <Text
              onPress={() => setTipOfTheDay(false)}
              style={{
                backgroundColor: 'white',
                borderRadius: 500,
                color: 'purple',
                marginTop: 200,
              }}>
              <FontAwesome5Icon name="times-circle" style={{fontSize: 30}} />
            </Text>
          </View>
        </Dialog>
      </ScrollView>
    </View>
  );
};
const LastImage = styled(View)({
  marginTop: heightPercentageToDP(3),
  marginLeft: 10,
  marginRight: 10,
});
const VotingImage = styled(FastImage)({
  borderRadius: 6,
  overflow: 'hidden',
  height: widthPercentageToDP(66.67 / 4) - 10,
  width: widthPercentageToDP(66.67 / 4) - 10,
  marginBottom: 5,
  backgroundColor: '#DADADA',
});
const LatestPhoto = styled(FastImage)({
  borderRadius: 6,
  overflow: 'hidden',
  marginBottom: 8,
  backgroundColor: '#DADADA',
  height: widthPercentageToDP(66.67 / 3) - 13,
  width: widthPercentageToDP(66.67 / 3) - 13,
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
const ImageOfTheWeek = styled(FastImage)({
  width: widthPercentageToDP(200 / 3) - 22,
  height: 160,
  position: 'relative',
  borderRadius: 6,
});
const RowimageFirst = styled(View)({
  flexDirection: 'row',
  marginLeft: 10,
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
