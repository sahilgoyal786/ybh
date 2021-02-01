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
  compatibility_family,
  compatibility_food,
  compatibility_friends,
  compatibility_love,
  compatibility_money,
  compatibility_social_media,
  compatibility_socialising,
  compatibility_travelling,
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

const CompatibilityTestsHome = ({navigation}) => {
  const [dialog, setDialog] = useState(false);
  const [text, setText] = useState('Describe your situation...');
  const [userDetail, changeUserDetail] = React.useContext(userDetailContext);
  const [isLoading, setisLoading] = useState(false);

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
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'family',
              });
            }}>
            <ImagesView
              source={compatibility_family}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'food',
              });
            }}>
            <ImagesView
              source={compatibility_food}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Family</Text>

          <Text style={styles.categoryHeading}>Food</Text>
        </NameView>
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'friends',
              });
            }}>
            <ImagesView
              source={compatibility_friends}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'love',
              });
            }}>
            <ImagesView
              source={compatibility_love}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Friends</Text>
          <Text style={styles.categoryHeading}>Love</Text>
        </NameView>
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'money',
              });
            }}>
            <ImagesView
              source={compatibility_money}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'social_media',
              });
            }}>
            <ImagesView
              source={compatibility_social_media}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Money</Text>
          <Text style={styles.categoryHeading}>Social Media</Text>
        </NameView>
        <ImagesWelcome>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'socialising',
              });
            }}>
            <ImagesView
              source={compatibility_socialising}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CompatibilityTestsCategory', {
                Category: 'travelling',
              });
            }}>
            <ImagesView
              source={compatibility_travelling}
              initHeight="160"
              initWidth="130"
            />
          </TouchableOpacity>
        </ImagesWelcome>
        <NameView>
          <Text style={styles.categoryHeading}>Socialising</Text>
          <Text style={styles.categoryHeading}>Travelling</Text>
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
  marginTop: heightPercentageToDP(3),
  paddingRight: 40,
  paddingLeft: 40,
});
const styles = StyleSheet.create({
  categoryHeading: {
    fontSize: 20,
    fontFamily: 'FuturaPT-Book',
    width: widthPercentageToDP(50),
    textAlign: 'center',
  },
});
export default CompatibilityTestsHome;
