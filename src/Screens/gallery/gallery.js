import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
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
import {Toast} from 'native-base';

const Gallery = ({route, navigation}) => {
  const latestPhotosURLS = route.params.latestPhotosURLS;
  const type = route.params.type;

  const month = route.params.month ? route.params.month : null;
  let headerTitle = 'Photos';

  switch (type) {
    case 'today':
      headerTitle = 'Photos Uploaded Today';
      break;
    case 'week':
      headerTitle = 'Photos This Week';
      break;
    case 'month':
      headerTitle = 'Photos For ' + month;
      break;
  }
  const d = new Date();
  const [Value, setValue] = useState(d.getMonth() + '');
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [like, setLike] = React.useState(0);
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
          let photosTemp = photos;
          photosTemp[index] = response.file;
          setPhotos(photos);
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

  const LoadImages = () => {
    const tempImagesArray = [];
    let params = {page: page, filter: type};
    if (month !== null) {
      params['month'] = month;
    }
    setLoadingMore(true);
    try {
      network.getResponse(
        EndPoints.latestPhotos,
        'POST',
        params,
        userDetail.token,
        (response) => {
          // console.log('response.data', response.data);
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = response.data[i].url;
            tempImagesArray.push(response.data[i]);
          }
          if (page == 1) {
            setTotalPages(response.last_page);
            setPhotos(tempImagesArray);
          } else {
            setPhotos(photos.concat(tempImagesArray));
          }
          setPhotosLoaded(true);
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
            <ActivityIndicator color="#A073C4" size="large" />
          ) : (
            <Text>Nothing to show.</Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <View>
          <Header title={headerTitle} backButton="true" />
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
              color="#A073C4"
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
              enablePreload={true}
              saveToLocalByLongPress={false}
              loadingRender={() => {
                return <ActivityIndicator color="white" />;
              }}
              renderFooter={(index) => {
                let likes = photos[index].likes.split('-');
                if (userDetail.likes) {
                  // console.log(userDetail.likes);
                  let voteIndex = userDetail.likes.findIndex((photo) => {
                    if (photo.url == photos[index].url) {
                      return true;
                    }
                  });
                  if (voteIndex >= 0) {
                    likes = userDetail.likes[voteIndex]['likes'].split('-');
                  }
                }
                // console.log(photos[index]);
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
                            storeLike(photos[index].url, 0, index);
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
                            storeLike(photos[index].url, 1, index);
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
export default Gallery;
