import React, {useState} from 'react';
import {Text, SafeAreaView, View, ImageBackground,Dimensions,StyleSheet,Image} from 'react-native';
import styled from 'styled-components/native';

import ResponsiveImage from 'react-native-responsive-image';
//import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../components/button';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {
  welcomepagebackground,
  menu,
  uploadicon,
  headerView,
  botomView,
  image1,
  image2,
  image3,
  image5,
  backsec,
  btnmnewimg,
  iconchecked,
  unchecked,
  photoworld,
} from '../../common/images';
import {CheckBox} from 'react-native-elements';
import Header from '../../components/header';

const ShareImage = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const screenHeight = Dimensions.get('window').height
  return (
   
<View >   
        <Header title="Share My Image" backButton="true" />
        {/* <WelcomeView>
          <WelcomeText>Share My Image</WelcomeText>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon source={menu} initHeight="30" initWidth="30" />
          </TouchableOpacity>
        </WelcomeView> */}
     
     <BackgroundImage source={botomView}>
        <View  style={{ flex:Platform.OS === 'ios' ? 1 : .69}}>
            <ScrollView >
        <MainView >
          <SubHeading>Disclaimer Text</SubHeading>
          <FirstText>
            Morbi vel urn et risus efficitururn et risus, Morbi vel urn et risus
            efficitururn et risus
          </FirstText>
          <SecText>
            Morbi vel urn et risus efficitururn et , Morbi vel urn et risus
            efficitururn et risus

          </SecText>
        </MainView>
        <MainnnView>
          <CheckBox
            title="I agree to tearms & conditions"
            textStyle={{
              fontSize: 14,
              fontWeight: '400',
              fontFamily: 'FuturaPT-Medium',
            }}
            checkedIcon={
              <Checkicons source={unchecked} initHeight="18" initWidth="18" />
            }
            uncheckedIcon={
              <Checkicons source={iconchecked} initHeight="18" initWidth="18" />
            }
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.containerchecked}
          />
        </MainnnView>

        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => {
             // navigation.navigate('PhotoDetail');
            }}
            style={{
              marginTop: -heightPercentageToDP(2),
              width: widthPercentageToDP(76),
              marginBottom: heightPercentageToDP(5),
            }}
            name={'Upload'}
            linear
          />
          <ImageeView>
            <ImagesView source={uploadicon} initHeight="20" initWidth="20" />
          </ImageeView>
        </View>

        {/* <UploadView>
          <ImagesView source={image1} initHeight="70" initWidth="70" />
          <ImagesView source={image2} initHeight="70" initWidth="70" />
          <ImagesView source={image2} initHeight="70" initWidth="70" />
          <ImagesView source={image3} initHeight="70" initWidth="70" />
          <ImagesView source={image5} initHeight="70" initWidth="70" />
        </UploadView> */}

        <LastImage>
          <View>
            <ImageBackground
              source={backsec}
              style={{
                height: 80,
                width: 70,
                borderRadius: 50,
                marginLeft: widthPercentageToDP(66),
              }}
            />

            <LastaddImage
              source={photoworld}
              initHeight="130"
              initWidth="381"
            />
           
          </View>
        </LastImage>
        
        </ScrollView>
        </View>
       </BackgroundImage>
      </View>

  );
};
export const styles = StyleSheet.create({
  containerchecked: {
    backgroundColor: 0,
    borderWidth: 0,
    marginRight: '6%',
    fontFamily: 'FuturaPT-Light',
    color: 'red',
  },
});
const Checkicons = styled(ResponsiveImage)({
  tintColor: '#000',
});
const MainnnView = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: widthPercentageToDP(80),
  alignSelf: 'center',
  marginLeft: widthPercentageToDP(20),
  marginTop: -heightPercentageToDP(1),
  marginBottom: heightPercentageToDP(2),
});
const LastaddImage = styled(ResponsiveImage)({
  marginTop: -heightPercentageToDP(5),
});
const LastImage = styled(View)({
 // marginTop: heightPercentageToDP(2),

  marginLeft: widthPercentageToDP(4),
});
const UploadView = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
});
const ImageeView = styled(View)({
  position: 'absolute',
  // bottom: heightPercentageToDP(49),
  left: widthPercentageToDP(33),
  // backgroundColor: 'red',
});
const ImagesView = styled(ResponsiveImage)({
  marginLeft: 5,
  borderRadius: 0,
});
const FirstText = styled(Text)({
  padding: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 14,
});
const SecText = styled(Text)({
  paddingTop: 1,
  paddingRight: 15,
  paddingLeft: 15,
  paddingBottom: 15,
  fontFamily: 'FuturaPT-Light',
  fontSize: 14,
});
const SubHeading = styled(Text)({
  marginLeft: widthPercentageToDP(4),
  fontFamily: 'FuturaPT-Book',
  fontSize: 18,
  paddingTop: 10,
});
const MainView = styled(View)({
  borderRadius: 4,
  borderColor: '#DEDFE0',
  margin: 15,
  padding: 10,
  backgroundColor: '#FAF9FF',
  borderRightWidth: 4,
  borderBottomWidth: 4,
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 22,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginLeft: -widthPercentageToDP(2),
  marginTop: -heightPercentageToDP(0.1),
});
const BackgroundImage = styled(ImageBackground)({
  height:Platform.OS === 'ios' ? '87%' : '100%' ,
  bottom:0,
  marginTop:50,
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: "-14%",
  marginLeft:12

});
export default ShareImage;
