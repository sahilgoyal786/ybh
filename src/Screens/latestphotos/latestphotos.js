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
} from 'react-native';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {widthPercentageToDP} from 'react-native-responsive-screen';
// import DropDownPicker from 'react-native-dropdown-picker';

import {photoworld} from '../../common/images';
import {Toast} from 'native-base';
import Header from '../../components/header';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import ContentLoader from 'react-native-easy-content-loader';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// import { Form } from 'formik';
const LatestPhotos = ({route, navigation}) => {
  const [userDetail, changeUserDetail] = useContext(userDetailContext);
  const latestPhotosArray = route.params.latestPhotosArray;
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [initCompleted, setInitCompleted] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalPhotos, setModalPhotos] = React.useState([]);
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
    <View style={{flex: 1}}>
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
                  <Text>Nothing to show</Text>
                </View>
              )
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    if (index == 3 || index == todaysPhotos.length - 1) {
                      navigation.navigate('Gallery', {
                        todaysPhotos,
                        type: 'today',
                      });
                    } else {
                      setShowModal(true);
                      setModalPhotos(latestPhotosArray);
                      setcurrentImageIndex(index);
                    }
                  }}>
                  {(index == 3 || index == todaysPhotos.length - 1) && (
                    <ViewMore>
                      <ViewMoreLink>View More</ViewMoreLink>
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
                    if (index == 3 || index == weeksPhotos.length - 1) {
                      navigation.navigate('Gallery', {
                        weeksPhotos,
                        type: 'week',
                      });
                    } else {
                      setShowModal(true);
                      setModalPhotos(latestPhotosArray);
                      setcurrentImageIndex(index);
                    }
                  }}>
                  {(index == 3 || index == weeksPhotos.length - 1) && (
                    <ViewMore>
                      <ViewMoreLink>View More</ViewMoreLink>
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
                    color: 'black',
                    paddingRight: 35,
                    textAlign: 'right',
                    fontSize: 16,
                  },
                  inputIOS: {
                    backgroundColor: 'transparent',
                    alignSelf: 'flex-end',
                    color: 'black',
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
                    // <Image source={downarrow} style={{width: 12, height: 12}} />
                    <FontAwesome5Icon
                      name="caret-down"
                      style={{fontSize: 20}}
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
                    if (index == 3 || index == monthsPhotos.length - 1) {
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
                  {(index == 3 || index == monthsPhotos.length - 1) && (
                    <ViewMore>
                      <ViewMoreLink>View More</ViewMoreLink>
                    </ViewMore>
                  )}
                  <ImagesView source={{uri: item.url}} />
                </TouchableOpacity>
              );
            }}
          />
          <LastImage>
            <LastaddImage
              source={photoworld}
              initHeight="150"
              initWidth={widthPercentageToDP(100) - 21}
            />
          </LastImage>
        </View>
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
          renderFooter={(index) => {
            let likes = modalPhotos[index].likes.split('-');
            // console.log(modalPhotos[index]);
            let total = parseInt(likes[0]) + parseInt(likes[1]);
            return (
              <Voting>
                {isLoading ? (
                  <ActivityIndicator color="purple" />
                ) : (
                  <>
                    {total > 0 && (
                      <Text
                        style={[
                          styles.votePercentage,
                          {width: 60, textAlign: 'right'},
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
                          {width: 60, textAlign: 'left'},
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
const LastaddImage = styled(ResponsiveImage)({});
const LastImage = styled(View)({
  marginTop: 40,
  padding: 1,
});
const ImagesView = styled(FastImage)({
  width: widthPercentageToDP(25) - 9,
  height: widthPercentageToDP(25) - 9,
  margin: 2,
  resizeMode: 'cover',
  zIndex: -99,
});
const TextView = styled(Text)({
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
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
    backgroundColor: 'purple',
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

export default LatestPhotos;
