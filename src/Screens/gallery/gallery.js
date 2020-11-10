import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';
import {bottomCurve} from '../../common/images';

import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Dialog} from 'react-native-simple-dialogs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import userDetailContext from '../../common/userDetailContext';
import EndPoints from '../../components/apis/endPoints';
import network from '../../components/apis/network';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';

const Gallery = ({route, navigation}) => {
  const latestPhotosURLS = route.params.latestPhotosURLS;
  const d = new Date();
  const [Value, setValue] = useState(d.getMonth() + '');
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalPhotos, setModalPhotos] = React.useState([]);

  const [photos, setPhotos] = useState([]);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [loadingMore, setLoadingMore] = React.useState(true);
  const [photosLoaded, setPhotosLoaded] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState();
  const [page, setPage] = React.useState(1);

  const renderItem = (item, index) => {
    // console.log(item.url);
    return (
      <View key={item.id}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
            setcurrentImageIndex(index);
          }}>
          <ImagesView source={{uri: item.url}} key={Math.random().toString()} />
        </TouchableOpacity>
      </View>
    );
  };

  const LoadImages = () => {
    const tempImagesArray = [];
    setLoadingMore(true);
    try {
      network.getResponse(
        EndPoints.latestPhotos,
        'GET',
        {page: page},
        userDetail.token,
        (response) => {
          // console.log('response.data', response.data);
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = response.data[i].url;
            tempImagesArray.push(response.data[i]);
          }
          if (page == 1) {
            setTotalPages(response.last_page);
          }
          setPhotosLoaded(true);
          setPhotos(photos.concat(tempImagesArray));
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
      onEndReached={() => {
        if (photos.length && totalPages && page <= totalPages) {
          LoadImages();
        }
      }}
      onEndReachedThreshold={photos.length ? 0.5 : 0}
      contentContainerStyle={
        (photos.length
          ? {}
          : {
              flex: 1,
            },
        {
          minHeight: heightPercentageToDP(100) - 70,
        })
      }
      data={photos}
      renderItem={({item, index}) => renderItem(item, index)}
      numColumns={4}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View
          style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          {loadingMore ? (
            <ActivityIndicator color="purple" size="large" />
          ) : (
            <Text>You haven't uploaded any photos yet.</Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <View>
          <Header title="Photos" backButton="true" />
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
            bottom: -130,
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
              imageUrls={photos}
              enableSwipeDown={true}
              onCancel={() => setShowModal(false)}
              index={currentImageIndex}
              renderImage={(props) => <FastImage {...props} />}
              renderIndicator={() => {}}
            />
          </Modal>
        </View>
      }
    />
  );
};
const ImagesView = styled(FastImage)({
  marginLeft: -widthPercentageToDP(10),
  marginLeft: 5,
  marginTop: heightPercentageToDP(0.5),
  height: widthPercentageToDP(25) - 7,
  width: widthPercentageToDP(25) - 7,
  borderRadius: 0,
  zIndex: 1,
});

export default Gallery;
