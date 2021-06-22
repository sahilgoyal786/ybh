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
import {bottomCurve} from '../../common/images';
import * as images from '../../common/images';
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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {GlobalImages} from '../../common/styles';
import GlobalStyles from '../../common/styles';

const CompatibilityTestsHome = ({navigation}) => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState('Describe your situation...');
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [isLoading, setisLoading] = useState(false);
  const categories = [
    'family',
    'food',
    'friends',
    'love',
    'money',
    'social_media',
    'travelling',
    'socialising',
  ];

  const notification_bubble =
    typeof userDetail['user']['has_new_compat_notification'] !== 'undefined' ? (
      <>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: 'red',
          }}
        />
        <Text> My Tests/Requests</Text>
      </>
    ) : (
      'My Tests/Requests'
    );

  return (
    <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
      <Image
        source={GlobalImages.footer}
        style={{
          width: widthPercentageToDP(100),
          height: 200,
          position: 'absolute',
          bottom: -100,
        }}
        resizeMode="contain"></Image>
      <Header title="Compatibility Tests" />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{paddingTop: 0}}
        contentContainerStyle={{paddingBottom: 60}}>
        <Button
          name={notification_bubble}
          linear
          onPress={() => navigation.navigate('CompatibilityTestRequests')}
          style={{marginLeft: 20, width: widthPercentageToDP(100) - 40}}
        />
        {categories.map((cat) => {
          return (
            <TouchableOpacity
              key={Math.random().toString()}
              onPress={() => {
                navigation.navigate('CompatibilityTestsCategory', {
                  Category: cat,
                });
              }}>
              <ImagesWelcome>
                <Image
                  source={images['compatibility_icons'][cat.toLowerCase()]}
                  style={{height: 40, width: 40}}
                />
                <Text style={styles.categoryHeading}>
                  {cat.replace('_', ' ')}
                </Text>
                <FontAwesome5Icon
                  name="chevron-right"
                  style={styles.rightArrow}
                />
              </ImagesWelcome>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const ImagesWelcome = styled(View)({
  ...GlobalStyles.secondaryBackgroundColor,
  ...GlobalStyles.shadowColor,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: 15,
  marginTop: 2,
  marginBottom: 2,
  borderRadius: 4,
  padding: 20,
  flex: 1,
  borderColor: '#F4F5F6',
  shadowOpacity: '1',
  shadowRadius: 2,
  elevation: '2',
});

const styles = StyleSheet.create({
  categoryHeading: {
    ...GlobalStyles.secondaryTextColor,
    fontSize: 20,
    fontFamily: 'FuturaPT-Book',
    flex: 1,
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: 30,
    textTransform: 'capitalize',
  },
  rightArrow: {
    ...GlobalStyles.primaryTextColor,
    fontSize: 24,
  },
});
export default CompatibilityTestsHome;
