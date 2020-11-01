import React, {Component, useContext} from 'react';
import {
  headerView,
  menu,
  vtngpage4,
  vtngbtn,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
} from '../../common/images';
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
  ImageBackground,
  Image,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
//import { Image } from 'native-base';
import {DraggableGrid} from 'react-native-draggable-grid';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Button from '../../components/button';
import Header from '../../components/header';
import {Toast} from 'native-base';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import MaskedView from '@react-native-community/masked-view';
import FastImage from 'react-native-fast-image';
import {vtngpage} from '../../common/images';
import ImageViewer from 'react-native-image-zoom-viewer';
import {bottomCurve} from '../../common/images';
import {White} from '../../common/colors';

// interface VotingPageProps {

// }

// interface VotingPageState {
//   data: { key: string, name: string }[];
// }
const VotingPage = ({route, navigation}) => {
  const [showModal, setShowModal] = React.useState(false);
  const userDetail = React.useContext(userDetailContext);
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [selectedImageIndex, setselectedImageIndex] = React.useState(-1);

  let itemHeight = ((widthPercentageToDP(26) - 5) * 400) / 348;
  let itemWidth = widthPercentageToDP(26) - 5;

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
            bottom: 40,
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
            // network.getResponse(
            //   EndPoints.castVote,
            //   'POST',
            //   {path: votingImagesURLS[selectedImageIndex]},
            //   userDetail.token,
            //   (response) => {
            // console.log(response);
            Toast.show({text: 'Thank you for voting.', duration: 5000});
            setTimeout(() => {
              navigation.navigate('Home');
            }, 2000);
            // },
            // (error) => {
            //   // console.log('error', error.response);
            // },
            // );
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
            imageUrls={galleryMapped}
            enableSwipeDown={true}
            onCancel={() => setShowModal(false)}
            index={currentImageIndex}
            renderIndicator={() => {}}
            renderImage={(props) => <FastImage {...props} />}
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
