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
  Modal,
  Linking,
  ActivityIndicator,
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
import {MatchLogo} from '../../common/images';
import LeaderBoard from '../../components/leaderBoard';
import Button from '../../components/button';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import {AuthContext} from '../../common/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {downloadAdBanners, fetchLeaderBoard} from '../../common/helpers';
import storage from '../../components/apis/storage';
import {Dialog} from 'react-native-simple-dialogs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Toast} from 'native-base';
let RNFS = require('react-native-fs');
import GlobalStyles, {GlobalImages} from '../../common/styles';
const Home = () => {
  const [votingImages, setVotingImages] = React.useState([]);
  const [votingEnabled, setVotingEnabled] = React.useState(true);
  const [imageOfTheWeek, setImageOfTheWeek] = React.useState(null);
  const [votingImagesLoaded, setVotingImagesLoaded] = React.useState(false);
  const [votingImagesURLS, setVotingImagesURLS] = React.useState([]);
  const [latestPhotos, setLatestPhotos] = React.useState([]);
  const [latestPhotosLoaded, setLatestPhotosLoaded] = React.useState(false);
  const [latestPhotosArray, setLatestPhotosArray] = React.useState([]);
  const [modalPhotos, setModalPhotos] = React.useState([]);
  const [leaderBoardLoading, setLeaderBoardLoading] = React.useState(false);
  const [loadingFailed, setLoadingFailed] = React.useState(false);
  const [tipOfTheDay, setTipOfTheDay] = React.useState(false);
  const [latestArticle, setLatestArticle] = React.useState(null);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const navigation = useNavigation();
  const [showModal, setShowModal] = React.useState(false);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [like, setLike] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [homeBottom, setHomeBottom] = React.useState(false);
  const [homeTopRight, setHomeTopRight] = React.useState(false);

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
    const unsubscribe = navigation.addListener('focus', () => {
      storage.getData(EndPoints.votingImages.url).then((data) => {
        if (data) {
        } else {
          getVotingImages();
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const getVotingImages = () => {
    const tempVotingImagesArray = [];
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
            // console.log(response[i]);
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
  };

  React.useEffect(() => {
    const tempVotingImagesArray = [];
    const tempLatestPhotosArray = [];
    const votingImagesURLS = [];
    try {
      getVotingImages();
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
              <TouchableOpacity
                key={Math.random().toString()}
                onPress={() => {
                  if (i !== 5) {
                    setModalPhotos(latestPhotosArray);
                    setCurrentIndex(i);
                    setShowModal(true);
                  }
                }}>
                <LatestPhoto
                  key={i}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{uri: response[i]['url']}}>
                  {i == 5 && (
                    <ViewMore>
                      <TouchableOpacity
                        onPress={() => {
                          //console.log(latestPhotosArray);
                          navigation.navigate('LatestPhotos', {
                            latestPhotosArray,
                          });
                        }}>
                        <View
                          style={{
                            flex: 1,
                            width: widthPercentageToDP(30),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TextMore>More</TextMore>
                        </View>
                      </TouchableOpacity>
                    </ViewMore>
                  )}
                </LatestPhoto>
              </TouchableOpacity>,
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

      downloadAdBanners(userDetail, changeUserDetail);
      storage.getData('home_top_right').then((data) => {
        if (data) {
          setHomeTopRight(JSON.parse(data));
        }
      });
      storage.getData('home_bottom').then((data) => {
        if (data) {
          setHomeBottom(JSON.parse(data));
        }
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
          // console.log(tipsOfTheDay[today]);
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

  const storeLike = (url, like, index) => {
    setIsLoading(true);
    network.getResponse(
      EndPoints.storeLikes,
      'POST',
      {url, like},
      userDetail.token,
      (response) => {
        // console.log(response);
        if (response && response.message) {
          Toast.show({text: response.message});
        }
        if (response && response.file) {
          let userDetailTemp = userDetail;
          if (userDetailTemp.likes) {
            let voteIndex = userDetailTemp.likes.findIndex((photo) => {
              if (photo.url == url) {
                return true;
              }
            });
            if (voteIndex >= 0) {
              userDetailTemp.likes[voteIndex] = {
                url,
                likes: response.file.likes,
              };
            } else {
              userDetailTemp.likes.push({url, likes: response.file.likes});
            }
          } else {
            userDetailTemp.likes = new Array({url, likes: response.file.likes});
          }
          changeUserDetail(userDetailTemp);

          let photosTemp = modalPhotos;
          photosTemp[index] = response.file;
          setModalPhotos(modalPhotos);
        }
        setLike(0);
        setIsLoading(false);
      },
      (response) => {
        console.log(response);
        setIsLoading(false);
      },
    );
  };
  const getMatchMakingProfile = () => {
    try {
      network.getResponse(
        EndPoints.checkMatchProfile,
        'GET',
        {},
        userDetail.token || '',
        (response) => {
          if (response.profile && response.profile.status == 'activate') {
            return navigation.navigate('MyConnection');
          } else if (
            response.profile &&
            response.profile.status == 'deactivate'
          ) {
            Toast.show({text: 'Your profile is deactivated by Admin'});
          } else if (
            response.profile &&
            response.profile.status == 'pending_verification' &&
            response.profile.verify_profile_photo
          ) {
            Toast.show({text: 'Your profile is awaiting for Admin Approval.'});
          } else if (
            response.profile &&
            response.profile.status == 'pending_verification' &&
            !response.profile.verify_profile_photo
          ) {
            return navigation.navigate('PhotoVerification');
          } else {
            return navigation.navigate('matchmakingTC');
          }
        },
        (error) => {
          console.log('error', error);
        },
      );
    } catch (exception) {
      console.log('exception', exception);
    }
  };

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={GlobalImages.footer}
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
            userDetail.user &&
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
                  <TouchableOpacity
                    onPress={() => {
                      setModalPhotos([{url: imageOfTheWeek}]);
                      setCurrentIndex(null);
                      setShowModal(true);
                    }}>
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
                  </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => getMatchMakingProfile()}
              style={{marginBottom: 10}}>
              <Image
                source={MatchLogo}
                style={{width: '100%', height: 130, padding: 0}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <LeaderBoard userDetailTemp={userDetail} />
          </View>
        </View>
        <LastImage>
          {homeBottom && (
            <TouchableOpacity onPress={() => Linking.openURL(homeBottom.url)}>
              <Image
                source={{
                  uri:
                    'file://' +
                    RNFS.DocumentDirectoryPath +
                    '/' +
                    homeBottom.path,
                }}
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 395 / 100,
                }}
              />
            </TouchableOpacity>
          )}
        </LastImage>
        <Dialog
          visible={false}
          // visible={loadingFailed}
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
                style={{fontSize: 40, color: '#A073C4'}}
              />
              {tipOfTheDay && (
                <Text
                  style={{fontSize: 20, marginTop: 15, textAlign: 'center'}}>
                  {tipOfTheDay}
                </Text>
              )}
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 500,
                color: '#A073C4',
                marginTop: 200,
                padding: 2,
              }}>
              <FontAwesome5Icon
                name="times-circle"
                style={{fontSize: 30}}
                onPress={() => setTipOfTheDay(false)}
              />
            </View>
          </View>
        </Dialog>
      </ScrollView>

      <Modal visible={showModal}>
        <View
          style={{
            position: 'absolute',
            left: 20,
            top: 40,
            height: 25,
            backgroundColor: 'white',
            width: 25,
            borderRadius: 40,
            zIndex: 100,
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              height: 25,
              width: 25,
              textAlignVertical: 'center',
              fontWeight: '900',
              lineHeight: 25,
            }}
            onPress={() => setShowModal(false)}>
            X
          </Text>
        </View>
        <ImageViewer
          imageUrls={modalPhotos}
          enableSwipeDown={true}
          index={currentIndex}
          onCancel={() => setShowModal(false)}
          renderImage={(props) => <FastImage {...props} />}
          enablePreload={true}
          saveToLocalByLongPress={false}
          loadingRender={() => {
            return <ActivityIndicator color="white" />;
          }}
          renderIndicator={() => {}}
          renderFooter={(index) => {
            if (modalPhotos[index] && modalPhotos[index].likes) {
              let likes = modalPhotos[index].likes.split('-');
              if (userDetail.likes) {
                // console.log(userDetail.likes);
                let voteIndex = userDetail.likes.findIndex((photo) => {
                  if (photo.url == modalPhotos[index].url) {
                    return true;
                  }
                });
                if (voteIndex >= 0) {
                  likes = userDetail.likes[voteIndex]['likes'].split('-');
                }
              }
              // console.log(modalPhotos[index]);
              let total = parseInt(likes[0]) + parseInt(likes[1]);
              return (
                <Voting>
                  {isLoading ? (
                    <ActivityIndicator color="#A073C4" />
                  ) : (
                    <>
                      {total > 0 && (
                        <Text
                          style={[
                            styles.votePercentage,
                            {width: 70, textAlign: 'right'},
                          ]}>
                          {Math.floor((likes[1] / total) * 100)}%
                        </Text>
                      )}
                      <Text
                        onPress={() => {
                          setLike(1);
                          storeLike(modalPhotos[index].url, 0, index);
                        }}
                        style={[
                          styles.voteButton,
                          styles.left,
                          like == 1 ? styles.active : [],
                        ]}>
                        Nice
                      </Text>
                      <Text
                        onPress={() => {
                          setLike(2);
                          storeLike(modalPhotos[index].url, 1, index);
                        }}
                        style={[
                          styles.voteButton,
                          styles.right,
                          like == 2 ? styles.active : [],
                        ]}>
                        Supernice
                      </Text>
                      {total > 0 && (
                        <Text
                          style={[
                            styles.votePercentage,
                            {width: 70, textAlign: 'left'},
                          ]}>
                          {Math.floor((likes[0] / total) * 100)}%
                        </Text>
                      )}
                    </>
                  )}
                </Voting>
              );
            } else {
              return <></>;
            }
          }}
        />
      </Modal>
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
const Voting = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  background: 'white',
  padding: 10,
  width: widthPercentageToDP(100),
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
    ...GlobalStyles.secondaryTextColor,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 8,
    fontSize: 18,
    fontFamily: 'FuturaPT-Medium',
  },
  voteButton: {
    textTransform: 'uppercase',
    paddingVertical: 10,
    width: widthPercentageToDP(30),
    textAlign: 'center',
    borderWidth: 1,
    color: 'black',
  },
  active: {
    backgroundColor: '#A073C4',
    color: 'white',
  },
  left: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  right: {
    borderTopRightRadius: 4,
    borderLeftWidth: 0,
    borderBottomRightRadius: 4,
  },
  votePercentage: {
    padding: 10,
    fontWeight: 'bold',
  },
});

export default Home;
