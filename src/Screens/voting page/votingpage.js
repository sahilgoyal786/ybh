import React, {Component, useContext} from 'react';
import {vtngbtn} from '../../common/images';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import Header from '../../components/header';
import {Toast} from 'native-base';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import MaskedView from '@react-native-community/masked-view';
import FastImage from 'react-native-fast-image';
import {vtngpage} from '../../common/images';
import ImageViewer from 'react-native-image-zoom-viewer';
import {bottomCurve} from '../../common/images';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// interface VotingPageProps {

// }

// interface VotingPageState {
//   data: { key: string, name: string }[];
// }
const VotingPage = ({route, navigation}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [selectedImageIndex, setselectedImageIndex] = React.useState(-1);

  let itemHeight = ((widthPercentageToDP(28) - 5) * 400) / 348;
  let itemWidth = widthPercentageToDP(28) - 5;

  const renderGrid = (votingImagesURLS) => {
    let content = [];
    let halfway = widthPercentageToDP(50);
    let skewedItemHeight = (3 * itemHeight) / 4;

    let positions = [
      {left: halfway - itemWidth / 2, top: 0},
      {left: halfway - itemWidth, top: skewedItemHeight},
      {left: halfway - (itemWidth * 3) / 2, top: skewedItemHeight * 2},
      {left: halfway - itemWidth / 2, top: skewedItemHeight * 2},
      {left: halfway + itemWidth / 2, top: skewedItemHeight * 2},
      {left: halfway, top: skewedItemHeight * 3},
      {left: halfway - itemWidth / 2, top: skewedItemHeight * 4},
      {left: halfway, top: skewedItemHeight * 5},
    ];

    let index = 0;

    votingImagesURLS.forEach(function (element) {
      content.push(
        <MaskedView
          key={Math.random().toString()}
          style={{
            height: itemHeight,
            width: itemWidth,
            position: 'absolute',
            ...positions[index],
          }}
          maskElement={
            <View
              style={{
                // Transparent background because mask is based off alpha channel.
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={vtngpage}
                style={{
                  height: itemHeight,
                  width: itemWidth,
                }}
              />
            </View>
          }>
          <TouchableOpacity
            onPress={() => {
              setcurrentImageIndex(votingImagesURLS.indexOf(element));
              setShowModal(true);
            }}
            onLongPress={() => {
              setselectedImageIndex(votingImagesURLS.indexOf(element));
            }}>
            <FastImage
              key={Math.random}
              source={{uri: element}}
              style={{
                height: itemHeight,
                width: itemWidth,
                justifyContent: 'center',
                resizeMode: 'contain',
                alignItems: 'center',
              }}>
              {selectedImageIndex == index && (
                <View
                  style={{
                    backgroundColor: 'purple',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.7,
                  }}
                />
              )}
            </FastImage>
          </TouchableOpacity>
        </MaskedView>,
      );
      index++;
    });
    return content;
  };

  const {votingImagesURLS} = route.params;
  let galleryMapped = [];
  votingImagesURLS.forEach(function (url) {
    galleryMapped.push({url});
  });
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
      <Header title="Voting Page" backButton="true" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 0}}
        contentContainerStyle={{paddingBottom: 60}}>
        <View
          style={{
            marginTop: 10,
            minHeight: itemHeight * 5 + 50,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          {renderGrid(votingImagesURLS)}
        </View>

        <TouchableOpacity
          style={{
            paddingLeft: 40,
            position: 'absolute',
            bottom: 90,
          }}
          onPress={() => {
            if (selectedImageIndex < 0) {
              Toast.show({
                text:
                  'Please choose your favourite photo, by long pressing it.',
                duration: 4000,
              });
              return;
            }
            network.getResponse(
              EndPoints.castVote,
              'POST',
              {url: votingImagesURLS[selectedImageIndex]},
              userDetail.token,
              (response) => {
                // console.log(response['message']);
                Toast.show({text: response['message'], duration: 5000});
                setTimeout(() => {
                  navigation.navigate('Home');
                }, 2000);
              },
              (error) => {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.message
                )
                  Toast.show({
                    text: error.response.data.message,
                    duration: 5000,
                  });
                setTimeout(() => {
                  navigation.navigate('Home');
                }, 2000);
              },
            );
          }}>
          <ImagesView
            source={vtngbtn}
            initHeight="135"
            initWidth="140"
            borderRadius={5}
            style={selectedImageIndex < 0 ? {opacity: 0.2} : {opacity: 1}}
          />
        </TouchableOpacity>

        <Modal visible={showModal}>
          <ImageViewer
            imageUrls={galleryMapped}
            enableSwipeDown={true}
            onCancel={() => setShowModal(false)}
            index={currentImageIndex}
            renderIndicator={() => {}}
            renderImage={(props) => <FastImage {...props} />}
            renderHeader={(index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: widthPercentageToDP(100) - 40,
                    justifyContent: 'space-between',
                    position: 'absolute',
                    marginLeft: 20,
                    zIndex: 100,
                    marginTop: 50,
                  }}>
                  <View>
                    <View
                      style={{
                        color: 'black',
                        borderRadius: 40,
                        backgroundColor: 'white',
                        textAlign: 'center',
                        height: 25,
                        width: 25,
                        textAlignVertical: 'center',
                        fontWeight: '900',
                        lineHeight: 25,
                      }}>
                      <FontAwesome5Icon
                        name="times"
                        style={{
                          lineHeight: 25,
                          textAlign: 'center',
                          fontSize: 16,
                        }}
                        onPress={() => setShowModal(false)}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setselectedImageIndex(index)}>
                    <View
                      style={{
                        backgroundColor:
                          index == selectedImageIndex ? 'purple' : 'black',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor:
                          index == selectedImageIndex ? 'purple' : 'white',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 6,
                      }}>
                      <FontAwesome5Icon
                        name="check"
                        style={{
                          fontSize: 18,
                          color: 'white',
                          lineHeight: 25,
                          fontSize: 20,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'white',
                          lineHeight: 25,
                          fontSize: 20,
                          marginLeft: 10,
                        }}>
                        Select
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue',
  },
  wrapper: {
    paddingTop: 100,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  item: {
    // width: 100,
    // height: 100,
    // borderRadius: 8,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderTopEndRadius: 60,
    // borderBottomEndRadius: 100,
  },
  item_text: {
    fontSize: 40,
    color: '#FFFFFF',
  },
});

const ImagesView = styled(ResponsiveImage)({
  // marginLeft: 5,
  borderRadius: 0,
});

export default VotingPage;
