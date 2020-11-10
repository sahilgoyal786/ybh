import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Textarea, Form, Toast} from 'native-base';
import {
  getadvive2background,
  menu,
  single,
  sexual,
  finance,
  genral,
  material,
  enterprene,
  headerView,
  botomView,
  bottomCurve,
} from '../../common/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import ResponsiveImage from 'react-native-responsive-image';
import Button from '../../components/button';
import {Dialog} from 'react-native-simple-dialogs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';

const GetAdvice2 = () => {
  const navigation = useNavigation();
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState('Describe your situation...');
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [isLoading, setisLoading] = useState(false);

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
      <Header title="Get Advice" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 0}}
        contentContainerStyle={{paddingBottom: 60}}>
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdviceCategory', {Category: 'Finance'});
            }}>
            <ImagesView source={finance} initHeight="130" initWidth="130" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdviceCategory', {Category: 'Sexual'});
            }}>
            <ImagesView source={sexual} initHeight="130" initWidth="130" />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Finance</Text>

          <Text style={styles.categoryHeading}>Sexual</Text>
        </NameView>
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdviceCategory', {Category: 'Marital'});
            }}>
            <ImagesView source={material} initHeight="130" initWidth="130" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdviceCategory', {
                Category: 'Entrepreneurs',
              });
            }}>
            <ImagesView source={enterprene} initHeight="130" initWidth="130" />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Marital</Text>
          <Text style={styles.categoryHeading}>Entrepreneurs</Text>
        </NameView>
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdviceCategory', {Category: 'Single'});
            }}>
            <ImagesView source={single} initHeight="130" initWidth="130" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AdviceCategory', {Category: 'General'});
            }}>
            <ImagesView source={genral} initHeight="130" initWidth="130" />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Single</Text>
          <Text style={styles.categoryHeading}>General</Text>
        </NameView>
      </ScrollView>
    </View>
  );
};
const NameView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(1),
});
const ImagesView = styled(ResponsiveImage)({});
const ImagesWelcome = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: heightPercentageToDP(4),
  paddingRight: 40,
  paddingLeft: 40,
});
const SitutionView = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: widthPercentageToDP(5),
});
const ButtonSUbmit = styled(Button)({
  width: widthPercentageToDP(39),
  marginRight: widthPercentageToDP(5),
});
const MenuIcon = styled(ResponsiveImage)({
  alignSelf: 'flex-end',
  marginRight: widthPercentageToDP(4),
});
const WelcomeText = styled(Text)({
  fontSize: 24,
  color: '#ffffff',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Medium',
  marginTop: -heightPercentageToDP(0.1),
});
const SitutionText = styled(Text)({
  width: widthPercentageToDP(52),
  fontSize: 19,
  color: '#000',
  fontWeight: '500',
  fontFamily: 'FuturaPT-Book',

  marginTop: -heightPercentageToDP(0.1),
});
const WelcomeView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '-14%',
  marginLeft: 8,
});
const BackgroundImage = styled(ImageBackground)({
  height: '100%',
});

const styles = StyleSheet.create({
  categoryHeading: {
    fontSize: 20,
    fontFamily: 'FuturaPT-Book',
    width: widthPercentageToDP(50),
    textAlign: 'center',
  },
});
export default GetAdvice2;
