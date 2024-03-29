import React from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import {bottomCurve} from '../../common/images';
import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {Toast} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import GlobalStyles, {GlobalImages} from '../../common/styles';
const MyPhotos = () => {
  const [currentImageId, setcurrentImageId] = React.useState(0);
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [myPhotos, setMyPhotos] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState();
  const [page, setPage] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [myPhotosLoaded, setMyPhotosLoaded] = React.useState(false);
  const [showConfirmBox, setShowConfirmBox] = React.useState(false);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);

  const renderItem = (item, index) => {
    return (
      <View key={item.id} style={{margin: widthPercentageToDP(1.25)}}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
            setcurrentImageIndex(index);
          }}>
          {item.is_approved == 0 && (
            <Text
              style={{
                ...GlobalStyles.secondaryBackgroundColor,
                ...GlobalStyles.secondaryTextColor,
                position: 'absolute',
                right: 0,
                zIndex: 10,
                padding: 4,
                marginRight: 4,
                marginTop: 10,
                fontSize: 10,
              }}>
              <FontAwesome5Icon name="clock" /> Pending Approval
            </Text>
          )}
          <ImagesView source={{uri: item.url}} borderRadius={3} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: index % 2 ? '#0EC776' : '#F25C5D',
            padding: 7,
            borderBottomLeftRadius: 3,
            borderBottomRightRadius: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'FuturaPt-Medium',
              fontSize: 15,
            }}>
            {item.created_at_formatted}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setcurrentImageId(item.id);
              setcurrentImageIndex(index);
              setShowConfirmBox(true);
            }}>
            <View style={{padding: 2}}>
              {!isDeleting ? (
                <FontAwesome5
                  name={'trash'}
                  style={{fontSize: 20, color: 'white'}}
                />
              ) : (
                <ActivityIndicator color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const deletePhoto = async () => {
    network.getResponse(
      EndPoints.deletePhoto,
      'POST',
      {photo_id: currentImageId},
      userDetail.token,
      (response) => {
        if (response.message) {
          Toast.show({text: response.message});
        }
        let myPhotosTemp = myPhotos;
        myPhotosTemp.splice(currentImageIndex, 1);
        setMyPhotos(myPhotosTemp);
        setIsDeleting(false);
      },
      (error) => {
        setIsDeleting(false);
        console.log('error', error);
      },
    );
  };
  const LoadImages = () => {
    const tempImagesArray = [];
    setLoadingMore(true);
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
          if (page == 1) {
            setMyPhotos(tempImagesArray);
          } else {
            setMyPhotos(myPhotos.concat(tempImagesArray));
          }
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
      style={{...GlobalStyles.screenBackgroundColor}}
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
          <Text style={{...GlobalStyles.secondaryTextColor}}>
            You haven't uploaded any photos yet.
          </Text>
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
              color="#A073C4"
              style={{
                marginTop: 100,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
          <Image
            source={GlobalImages.footer}
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
                <FontAwesome5 name={'times'} />
              </Text>
            </View>
            <ImageViewer
              imageUrls={myPhotos}
              enableSwipeDown={true}
              onCancel={() => setShowModal(false)}
              index={currentImageIndex}
              renderIndicator={() => {}}
              enablePreload={true}
              saveToLocalByLongPress={false}
              renderImage={(props) => <FastImage {...props} />}
              loadingRender={() => {
                return <ActivityIndicator color="white" />;
              }}
            />
          </Modal>

          <ConfirmDialog
            title="Delete Photo?"
            message="Are you sure about that?"
            visible={showConfirmBox}
            onTouchOutside={() => setShowConfirmBox(false)}
            positiveButton={{
              title: 'YES',
              onPress: () => {
                setIsDeleting(true);
                setShowConfirmBox(false);
                deletePhoto();
              },
            }}
            negativeButton={{
              title: 'NO',
              onPress: () => {
                setShowConfirmBox(false);
              },
            }}
          />
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
