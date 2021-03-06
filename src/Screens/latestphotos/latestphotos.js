import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {widthPercentageToDP} from 'react-native-responsive-screen';

let RNFS = require('react-native-fs');
// import DropDownPicker from 'react-native-dropdown-picker';

import {Toast} from 'native-base';
import Button from '../../components/button';
import Header from '../../components/header';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import ContentLoader from 'react-native-easy-content-loader';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import storage from '../../components/apis/storage';
import GlobalStyles, {GlobalImages} from '../../common/styles';
// import { Form } from 'formik';
const LatestPhotos = ({route, navigation}) => {
  const [userDetail, changeUserDetail] = useContext(userDetailContext);
  const latestPhotosArray = route.params.latestPhotosArray;
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [initCompleted, setInitCompleted] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalPhotos, setModalPhotos] = React.useState([]);
  const [latestPhotosBottom, setlatestPhotosBottom] = React.useState(false);
  const [like, setLike] = React.useState(0);
  const d = new Date();
  const months = [
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'},
  ];

  var month = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = React.useState(months[month].value);

  const [todaysPhotos, setTodaysPhotos] = useState([]);
  const [weeksPhotos, setWeeksPhotos] = useState([]);
  const [monthsPhotos, setMonthsPhotos] = useState([]);
  const [todaysPhotosLoading, setTodaysPhotosLoading] = useState(true);
  const [weeksPhotosLoading, setWeeksPhotosLoading] = useState(true);
  const [monthsPhotosLoading, setMonthsPhotosLoading] = useState(true);

  useEffect(() => {
    // console.log('month-', months[month].value);
    loadImage('today');
    loadImage('week');
    loadImageMonth(months[month].value);
    storage.getData('latest_photos_bottom').then((data) => {
      if (data) {
        setlatestPhotosBottom(JSON.parse(data));
      }
    });
  }, []);
  const loadImage = (type) => {
    network.getResponse(
      EndPoints.latestPhotos,
      'POST',
      {page: 1, filter: type, count: 4},
      userDetail.token,
      (response) => {
        switch (type) {
          case 'today':
            setTodaysPhotosLoading(false);
            setTodaysPhotos(response.data);
            break;
          case 'week':
            setWeeksPhotosLoading(false);
            setWeeksPhotos(response.data);
            break;
          default:
            setMonthsPhotosLoading(false);
            setMonthsPhotos(response.data);
            break;
        }
      },
      (error) => {
        console.log('error', error);
      },
    );
  };
  const loadImageMonth = (val) => {
    network.getResponse(
      EndPoints.latestPhotos,
      'POST',
      {page: 1, filter: 'month', month: val},
      userDetail.token,
      (response) => {
        setMonthsPhotos(response.data);
      },
      (error) => {
        console.log('error', error);
      },
    );
  };
  const onChangeMonth = (val) => {
    navigation.navigate('Gallery', {type: 'month', month: val});
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

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Header title="Latest Photos" backButton="true" />

      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 20}}
        contentContainerStyle={{
          paddingBottom: 60,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextView>Today</TextView>
        </View>

        <View>
          <FlatList
            data={todaysPhotos}
            horizontal={true}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={() => Math.random().toString()}
            ListEmptyComponent={
              todaysPhotosLoading ? (
                <View flexDirection="row" flex={1}>
                  <ContentLoader
                    key={Math.random}
                    title={false}
                    avatar={true}
                    aShape={'square'}
                    active
                    listSize={4}
                    itemStyle={{margin: 0, padding: 0}}
                    avatarStyles={{
                      height: widthPercentageToDP(25) - 9,
                      width: widthPercentageToDP(25) - 9,
                      marginRight: 0,
                      padding: 0,
                    }}
                    paragraphStyles={{display: 'none'}}
                    containerStyles={{
                      height: widthPercentageToDP(25),
                      width: widthPercentageToDP(25),
                      paddingHorizontal: 0,
                      paddingBottom: 0,
                    }}
                    imageStyles={{marginRight: 0, padding: 0}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    height: widthPercentageToDP(25) - 9,
                    justifyContent: 'center',
                  }}>
                  <Text style={{...GlobalStyles.secondaryTextColor}}>
                    Nothing to show
                  </Text>
                </View>
              )
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    if (index == 3) {
                      navigation.navigate('Gallery', {
                        todaysPhotos,
                        type: 'today',
                      });
                    } else {
                      setShowModal(true);
                      setModalPhotos(todaysPhotos);
                      setcurrentImageIndex(index);
                    }
                  }}>
                  {index == 3 && (
                    <ViewMore>
                      <ViewMoreLink>More</ViewMoreLink>
                    </ViewMore>
                  )}
                  <ImagesView source={{uri: item.url}} />
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TextView>Week</TextView>
          </View>
          <FlatList
            data={weeksPhotos}
            horizontal={true}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={() => Math.random().toString()}
            ListEmptyComponent={
              weeksPhotosLoading ? (
                <View flexDirection="row" flex={1}>
                  <ContentLoader
                    key={Math.random}
                    title={false}
                    avatar={true}
                    aShape={'square'}
                    active
                    listSize={4}
                    itemStyle={{margin: 0, padding: 0}}
                    avatarStyles={{
                      height: widthPercentageToDP(25) - 9,
                      width: widthPercentageToDP(25) - 9,
                      marginRight: 0,
                      padding: 0,
                    }}
                    paragraphStyles={{display: 'none'}}
                    containerStyles={{
                      height: widthPercentageToDP(25),
                      width: widthPercentageToDP(25),
                      paddingHorizontal: 0,
                      paddingBottom: 0,
                    }}
                    imageStyles={{marginRight: 0, padding: 0}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    height: widthPercentageToDP(25) - 9,
                    justifyContent: 'center',
                  }}>
                  <Text>Nothing to show</Text>
                </View>
              )
            }
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    if (index == 3) {
                      navigation.navigate('Gallery', {
                        weeksPhotos,
                        type: 'week',
                      });
                    } else {
                      setShowModal(true);
                      setModalPhotos(weeksPhotos);
                      setcurrentImageIndex(index);
                    }
                  }}>
                  {index == 3 && (
                    <ViewMore>
                      <ViewMoreLink>More</ViewMoreLink>
                    </ViewMore>
                  )}
                  <ImagesView source={{uri: item.url}} />
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TextView>Month</TextView>
            <View>
              <RNPickerSelect
                items={months}
                onValueChange={(value) => {
                  if (Platform.OS !== 'ios') {
                    if (value !== selectedMonth) {
                      setSelectedMonth(value);
                      onChangeMonth(value);
                    }
                  } else {
                    setSelectedMonth(value);
                  }
                }}
                onDonePress={() => onChangeMonth(selectedMonth)}
                style={{
                  inputAndroid: {
                    ...GlobalStyles.secondaryTextColor,
                    paddingRight: 35,
                    textAlign: 'right',
                    fontSize: 16,
                  },
                  inputIOS: {
                    ...GlobalStyles.secondaryTextColor,
                    backgroundColor: 'transparent',
                    alignSelf: 'flex-end',
                    textAlign: 'right',
                    paddingRight: 35,
                  },
                  iconContainer:
                    Platform.OS == 'android'
                      ? {
                          bottom: 12,
                          right: 10,
                        }
                      : {},
                }}
                value={selectedMonth}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return (
                    <FontAwesome5Icon
                      name="caret-down"
                      style={{...GlobalStyles.secondaryTextColor, fontSize: 20}}
                    />
                  );
                }}
              />
            </View>
          </View>
          <FlatList
            data={monthsPhotos}
            horizontal={true}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={() => Math.random().toString()}
            ListEmptyComponent={
              monthsPhotosLoading ? (
                <View flexDirection="row" flex={1}>
                  <ContentLoader
                    key={Math.random}
                    title={false}
                    avatar={true}
                    aShape={'square'}
                    active
                    listSize={4}
                    itemStyle={{margin: 0, padding: 0}}
                    avatarStyles={{
                      height: widthPercentageToDP(25) - 9,
                      width: widthPercentageToDP(25) - 9,
                      marginRight: 0,
                      padding: 0,
                    }}
                    paragraphStyles={{display: 'none'}}
                    containerStyles={{
                      height: widthPercentageToDP(25),
                      width: widthPercentageToDP(25),
                      paddingHorizontal: 0,
                      paddingBottom: 0,
                    }}
                    imageStyles={{marginRight: 0, padding: 0}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    height: widthPercentageToDP(25) - 9,
                    justifyContent: 'center',
                  }}>
                  <Text>Nothing to show</Text>
                </View>
              )
            }
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    if (index == 3) {
                      navigation.navigate('Gallery', {
                        type: 'month',
                        month: selectedMonth,
                      });
                    } else {
                      setShowModal(true);
                      setModalPhotos(monthsPhotos);
                      setcurrentImageIndex(index);
                    }
                  }}>
                  {index == 3 && (
                    <ViewMore>
                      <ViewMoreLink>More</ViewMoreLink>
                    </ViewMore>
                  )}
                  <ImagesView source={{uri: item.url}} />
                </TouchableOpacity>
              );
            }}
          />

          <Button
            onPress={() => {
              navigation.navigate('ShareImage');
            }}
            linear
            name="Upload Photo"
            style={{marginTop: 40, width: widthPercentageToDP(100) - 20}}
            icon={
              <FontAwesome5Icon
                name="upload"
                style={{fontSize: 20, marginRight: 20}}
              />
            }
          />
        </View>

        <LastImage>
          {latestPhotosBottom && (
            <TouchableOpacity
              onPress={() => Linking.openURL(latestPhotosBottom.url)}>
              <Image
                source={{
                  uri:
                    'file://' +
                    RNFS.DocumentDirectoryPath +
                    '/' +
                    latestPhotosBottom.path,
                }}
                style={{
                  width: '100%',
                  aspectRatio: 208 / 79,
                  padding: 0,
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
          )}
        </LastImage>
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
          onCancel={() => setShowModal(false)}
          index={currentImageIndex}
          renderImage={(props) => <FastImage {...props} />}
          renderIndicator={() => {}}
          enablePreload={true}
          saveToLocalByLongPress={false}
          loadingRender={() => {
            return <ActivityIndicator color="white" />;
          }}
          renderFooter={(index) => {
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
          }}
        />
      </Modal>
    </View>
  );
};
const ImagesView = styled(FastImage)({
  width: widthPercentageToDP(25) - 9,
  height: widthPercentageToDP(25) - 9,
  margin: 2,
  resizeMode: 'cover',
  zIndex: -99,
});
const TextView = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 19,
  fontWeight: '600',
  fontFamily: 'FuturaPT-Book',
});
const Voting = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  background: 'white',
  padding: 10,
  width: widthPercentageToDP(100),
});
const styles = StyleSheet.create({
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
const ViewMoreLink = styled(Text)({
  color: 'white',
  fontFamily: 'FuturaPT-Book',
});
const ViewMore = styled(View)({
  backgroundColor: '#F5C84B',
  flex: 1,
  opacity: 0.9,
  //borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  width: widthPercentageToDP(25) - 9,
  top: 2,
  left: 2,
  height: widthPercentageToDP(25) - 9,
});
const LastImage = styled(View)({
  marginLeft: 2,
  marginTop: 30,
  width: widthPercentageToDP(100) - 24,
});

export default LatestPhotos;
