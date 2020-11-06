import React, {useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  welcomepagebackground,
  image2,
  bottomCurve,
  photoos,
} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
// import {Header} from 'react-native/Libraries/NewAppScreen';

const MyPhotos = () => {
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [myPhotos, setMyPhotos] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState();
  const [page, setPage] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(true);
  const [myPhotosLoaded, setMyPhotosLoaded] = React.useState(false);
  const userDetail = React.useContext(userDetailContext);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
          setcurrentImageIndex(index);
        }}>
        <View key={item.id} style={{margin: widthPercentageToDP(1.25)}}>
          <ImagesView source={{uri: item.url}} borderRadius={3} />
          <View
            style={{
              backgroundColor: index % 2 ? '#0EC776' : '#F25C5D',
              padding: 7,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#ffffff',
                fontFamily: 'FuturaPt-Medium',

                fontSize: 15,
              }}>
              {item.created_at_formatted}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const LoadImages = () => {
    const tempImagesArray = [];
    setLoadingMore(true);
    console.log(EndPoints.myPhotos.url);
    try {
      network.getResponse(
        EndPoints.myPhotos,
        'GET',
        {},
        userDetail.token,
        (response) => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = response.data[i].url;
            tempImagesArray.push(response.data[i]);
          }
          if (page == 1) {
            setTotalPages(response.last_page);
          }
          setMyPhotosLoaded(true);
          setMyPhotos(myPhotos.concat(tempImagesArray));
          setPage(page + 1);
          setLoadingMore(false);
        },
        (error) => {
          console.log('error', error);
          setLoadingMore(false);
        },
      );
    } catch (exception) {
      console.log('exception', exception);
    }
  };
  React.useEffect(() => {
    LoadImages();
  }, []);

  return (
    <FlatList
      bounces={false}
      alwaysBounceVertical={false}
      onEndReached={() => {
        if (myPhotos.length && totalPages && page <= totalPages) {
          // console.log(page, totalPages);
          LoadImages();
        }
      }}
      onEndReachedThreshold={myPhotos.length ? 0.5 : 0}
      contentContainerStyle={
        (myPhotos.length
          ? {
              backgroundColor: 'white',
            }
          : {
              backgroundColor: 'white',
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 30,
        })
      }
      data={myPhotos}
      renderItem={({item, index}) => renderItem(item, index)}
      numColumns={2}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>You haven't uploaded any photos yet.</Text>
        </View>
      }
      ListHeaderComponent={
        <View style={{backgroundColor: 'transparent'}}>
          <Header title="My Photos" backButton="true" />
        </View>
      }
      ListFooterComponentStyle={{
        zIndex: -1,
        paddingBottom: 40,
        flex: 1,
        justifyContent: 'flex-end',
      }}
      ListFooterComponent={
        <View
          style={{
            height: 230,
            position: 'absolute',
            bottom: -100,
            zIndex: -10,
          }}>
          {loadingMore && (
            <ActivityIndicator
              color="purple"
              style={{
                marginTop: 100,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
          <Image
            source={bottomCurve}
            style={{
              width: widthPercentageToDP(100),
              height: 200,
            }}
            resizeMode="contain"
          />
          <Modal visible={showModal && myPhotosLoaded}>
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
              imageUrls={myPhotos}
              enableSwipeDown={true}
              onCancel={() => setShowModal(false)}
              index={currentImageIndex}
              renderIndicator={() => {}}
              enablePreload={true}
              renderImage={(props) => <FastImage {...props} />}
              loadingRender={() => {
                return <ActivityIndicator color="white" />;
              }}
            />
          </Modal>
        </View>
      }
    />
  );
};
const ImagesView = styled(FastImage)({
  marginTop: heightPercentageToDP(0.5),
  backgroundColor: '#DADADA',
  height: widthPercentageToDP(50) - 10,
  width: widthPercentageToDP(50) - 10,
});

export default MyPhotos;
