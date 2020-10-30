import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {
  downarrow,
  photoworld,
  backfirst,
  backsec,
  bottomCurve,
} from '../../common/images';
import {Form, Content, Picker, Container, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/header';
import ImageViewer from 'react-native-image-zoom-viewer';
// import { Form } from 'formik';
const LatestPhotos = ({route, navigation}) => {
  const latestPhotosURLS = route.params.latestPhotosURLS;
  const [currentImageIndex, setcurrentImageIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalPhotos, setModalPhotos] = React.useState([]);
  const d = new Date();
  const [Value, setValue] = useState(d.getMonth() + '');

  const [todaysPhotos, setTodaysPhotos] = useState([]);
  const [weeksPhotos, setWeeksPhotos] = useState([]);
  const [monthsPhotos, setMonthsPhotos] = useState([]);

  latestPhotosURLS.forEach((element, index) => {
    todaysPhotos.push(
      <TouchableOpacity
        key={Math.random()}
        onPress={() => {
          setShowModal(true);
          setModalPhotos(latestPhotosURLS);
          setcurrentImageIndex(index);
        }}>
        <ImagesView source={{uri: element.url}} />
      </TouchableOpacity>,
    );
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
        <SectionHeading>
          <TextView>Today</TextView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Gallery', {latestPhotosURLS});
            }}>
            <ViewMoreLink>View More</ViewMoreLink>
          </TouchableOpacity>
        </SectionHeading>
        <View>
          <ScrollView horizontal={true}>
            <FirstView>
              <ImageBackground
                source={backsec}
                style={{
                  height: 0,
                  width: 70,
                  borderRadius: 50,
                  position: 'absolute',
                  right: widthPercentageToDP(1),
                }}
              />
              {todaysPhotos}
            </FirstView>
          </ScrollView>
          <SectionHeading>
            <TextView>Week</TextView>
            <TouchableOpacity
              style={{
                height: 30,
                width: 100,
              }}
              onPress={() => {
                navigation.navigate('Gallery', {latestPhotosURLS});
              }}>
              <ViewMoreLink>View More</ViewMoreLink>
            </TouchableOpacity>
          </SectionHeading>
          <ScrollView horizontal={true}>
            <FirstView>{todaysPhotos}</FirstView>
          </ScrollView>

          <SectionHeading>
            <Image
              source={backfirst}
              style={{position: 'absolute', left: -20}}
            />
            <TextView>Month</TextView>
            <Picker
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                height: 30,
                width: 120,
                flexGrow: 0,
              }}
              mode="dropdown"
              placeholder="Select One"
              textStyle={{
                fontSize: 19,
                fontWeight: '600',
                color: '#484848',
                fontFamily: 'FuturaPT-Book',
              }}
              note={false}
              iosIcon={
                <ResponsiveImage
                  style={{tintColor: '#000'}}
                  source={downarrow}
                  initHeight="16"
                  initWidth="16"
                />
              }
              selectedValue={Value}
              onValueChange={(val) => setValue(val)}>
              <Picker.Item label="January" value="0" />
              <Picker.Item label="February" value="1" />
              <Picker.Item label="March" value="2" />
              <Picker.Item label="April" value="3" />
              <Picker.Item label="May" value="4" />
              <Picker.Item label="June" value="5" />
              <Picker.Item label="July" value="6" />
              <Picker.Item label="August" value="7" />
              <Picker.Item label="September" value="8" />
              <Picker.Item label="October" value="9" />
              <Picker.Item label="November" value="10" />
              <Picker.Item label="December" value="11" />
            </Picker>
          </SectionHeading>
          <ScrollView horizontal={true}>
            <FirstView>{todaysPhotos}</FirstView>
          </ScrollView>
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
        <ImageViewer
          imageUrls={modalPhotos}
          enableSwipeDown={true}
          onCancel={() => setShowModal(false)}
          index={currentImageIndex}
          renderIndicator={() => {}}
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
const ThirdView = styled(View)({
  flexDirection: 'row',
  marginLeft: -widthPercentageToDP(0.2),
});
const MainView = styled(View)({
  flexDirection: 'row',
  alignItems: 'baseline',
});
const TextViewWeek = styled(Text)({
  marginTop: heightPercentageToDP(2),
  marginLeft: widthPercentageToDP(4),
  marginVertical: heightPercentageToDP(2),
  fontSize: 19,
  fontWeight: '600',
  color: '#484848',
  fontFamily: 'FuturaPT-Book',
});
const ImagesView = styled(Image)({
  width: widthPercentageToDP(22) - 8,
  height: widthPercentageToDP(22) - 8,
  margin: 2,
  resizeMode: 'cover',
  zIndex: 1,
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
const FirstView = styled(View)({
  flexDirection: 'row',
  marginLeft: -2,
  marginRight: -2,
  marginBottom: 20,
  overflow: 'scroll',
});

export default LatestPhotos;
