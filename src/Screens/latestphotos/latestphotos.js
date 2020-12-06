import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  downarrow,
  photoworld,
  backfirst,
  backsec,
  bottomCurve,
} from '../../common/images';
import { Form, Content, Container, Icon, Toast } from 'native-base';
import { Picker } from '@react-native-community/picker';
import Header from '../../components/header';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';

// import { Form } from 'formik';
const LatestPhotos = ({ route, navigation }) => {
  const [userDetail, changeUserDetail] = useContext(userDetailContext);
  const latestPhotosArray = route.params.latestPhotosArray;
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalPhotos, setModalPhotos] = React.useState([]);
  const [like, setLike] = React.useState(0);
  const d = new Date();
  const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
  ];
  const [selectedMonth, setMonth] = useState(months[0].value);

  const [todaysPhotos, setTodaysPhotos] = useState([]);
  const [weeksPhotos, setWeeksPhotos] = useState([]);
  const [monthsPhotos, setMonthsPhotos] = useState([]);

  useEffect(() => {
    var month = new Date().getMonth();
    setMonth(months[month].value);
    console.log('month-', months[month].value)
    loadImage('today');
    loadImage('week');
    loadImageMonth(months[month].value);
  }, []);
  const loadImage = (type) => {
    network.getResponse(
      EndPoints.latestPhotos,
      'POST',
      { page: 1, filter: type },
      userDetail.token,
      (response) => {
        switch (type) {
          case 'today':
            setTodaysPhotos(response.data);
            break;
          case 'week':
            setWeeksPhotos(response.data);
            break;
          default: setMonthsPhotos(response.data);
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
      { page: 1, filter: 'month', month: val },
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
    console.log('val-', val)
    network.getResponse(
      EndPoints.latestPhotos,
      'POST',
      { page: 1, filter: 'month', month: val },
      userDetail.token,
      (response) => {
        console.log('response--', response.data);
        setMonthsPhotos(response.data);
        navigation.navigate('Gallery', { type: val });
      },
      (error) => {
        console.log('error', error);
      },
    );
  };
  const storeLike = (url, like, index) => {
    setIsLoading(true);
    network.getResponse(
      EndPoints.storeLikes,
      'POST',
      { url, like },
      userDetail.token,
      (response) => {
        console.log(response);
        if (response && response.message) {
          Toast.show({ text: response.message });
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
    <View style={{ flex: 1 }}>
      {/* <ImageBackground
        source={bottomCurve}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"
      /> */}
      <Header title="Latest Photos" backButton="true" />

      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{ paddingTop: 20 }}
        contentContainerStyle={{
          paddingBottom: 60,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextView>Today</TextView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Gallery', { todaysPhotos, type: 'today' });
            }}>
            <ViewMoreLink>View More</ViewMoreLink>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={todaysPhotos}
            horizontal={true}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    setShowModal(true);
                    setModalPhotos(latestPhotosArray);
                    setcurrentImageIndex(index);
                  }}>
                  <ImagesView source={{ uri: item.url }} />
                </TouchableOpacity>
              );
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextView>Week</TextView>
            <TouchableOpacity
              style={{
                height: 30,
                width: 100,
              }}
              onPress={() => {
                navigation.navigate('Gallery', { weeksPhotos, type: 'week' });
              }}>
              <ViewMoreLink>View More</ViewMoreLink>
            </TouchableOpacity>
          </View>
          <FlatList
            data={weeksPhotos}
            horizontal={true}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    setShowModal(true);
                    setModalPhotos(latestPhotosArray);
                    setcurrentImageIndex(index);
                  }}>
                  <ImagesView source={{ uri: item.url }} />
                </TouchableOpacity>
              );
            }}
          />
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <TextView>Month</TextView>
            <View
              style={{
                ...(Platform.OS !== 'android' && {
                  zIndex: 10
                })
              }}
            >
              <DropDownPicker
                scrollViewProps={{ scrollEnabled: true }}
                items={months}
                defaultValue={selectedMonth}
                containerStyle={{ height: 40, width: 120 }}
                style={{ borderColor:'transparent'}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{}}
                onChangeItem={val => { onChangeMonth(val.value); }}
              />
            </View>
          </View>
         {monthsPhotos.length>0 && <FlatList
            data={monthsPhotos}
            horizontal={true}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => {
                    setShowModal(true);
                    setModalPhotos(monthsPhotos);
                    setcurrentImageIndex(index);
                  }}>
                  <ImagesView source={{ uri: item.url }} />
                </TouchableOpacity>
              );
            }}
          />}
          <LastImage>
            <LastaddImage
              source={photoworld}
              initHeight="150"
              initWidth={widthPercentageToDP(100) - 20}

            // borderRadius={3}
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
          renderIndicator={() => { }}
          renderFooter={(index) => {
            let likes = modalPhotos[index].likes.split('-');
            console.log(modalPhotos[index]);
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
                            { width: 60, textAlign: 'right' },
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
                            { width: 60, textAlign: 'left' },
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
    </View >
  );
};
const LastaddImage = styled(ResponsiveImage)({});
const LastImage = styled(View)({
  marginTop: 40,
  padding: 1,
});
const ImagesView = styled(FastImage)({
  width: widthPercentageToDP(22) - 8,
  height: widthPercentageToDP(22) - 8,
  margin: 2,
  resizeMode: 'cover',
  zIndex: -99
});
const ViewMoreLink = styled(Text)({
  textAlign: 'right',
  fontSize: 16,
  color: '#A176C5',
  fontFamily: 'FuturaPT-Book',
});
const TextView = styled(Text)({
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const SectionHeading = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
});
const Voting = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  background: 'white',
  padding: 10,
  width: widthPercentageToDP(100),
});
const FirstView = styled(View)({
  flexDirection: 'row',
  marginLeft: -2,
  marginRight: -2,
  marginBottom: 20,
  overflow: 'scroll',
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

export default LatestPhotos;
