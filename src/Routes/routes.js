// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../Screens/welcome/welcome';
import Login from '../Screens/login/login';
import Signup from '../Screens/signup/signup';
import Forgot from '../Screens/forgot/forgot';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import DrawerScreen from '../Screens/drawer/drawer';
import BottomTab from '../common/Bottomtabs';
import GetAdvice from '../Screens/getadvice/getadvice';
import ShareImage from '../Screens/shareimage/shareimage';
import RelationMeter from '../Screens/relationmeter/relationmeter';
import Trivia from '../Screens/trivia/trivia';
import PhotoWorld from '../Screens/photoworld/photoworld';
import GetAdvice2 from '../Screens/getadvice2/getadvice2';
import Thrive from '../Screens/thrive/thrive';
import Thrivedetails from '../Screens/ThriveDetails/Thrivedetails';
import VotingPage from '../Screens/voting page/votingpage';
import AdviceFinance from '../Screens/advicefinance/advicefinance';
import MyQuestionAdvice from '../Screens/myquestionadvice/myquestionadvice';
import PhotoViewing from '../Screens/photoviewing/photoviewing';
import ThriveSec from '../Screens/thrivesec/thrivesec';
import Voting2 from '../Screens/voting2/voting2';
import TodayGallery from '../Screens/todaygallery/todaygallery';
import MyPhotos from '../Screens/myphotos/myphotos';
import Profile from '../Screens/profile/profile';
import PhotoDetail from '../Screens/photodetail/photodetail';
import MyResponse from '../Screens/myresponse/myresponce';
import QuestionDetail from '../Screens/questiondetail/questiondetail';
import TriviaSec from '../Screens/triviasec/triviasec';
import {
  getadvice,
  relationmeter,
  shareimage,
  trivia,
  homeicon,
} from '../common/images';
import {Root, Toast} from 'native-base';
import storage from '../components/apis/storage';
import network from '../components/apis/network';
import {AuthContext} from '../common/AuthContext';
import Loading from '../Screens/loading/loading';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function GetAdviceComponent() {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="GetAdvice2" component={GetAdvice2} /> */}
      <Stack.Screen name="GetAdvice" component={GetAdvice} />
      <Stack.Screen name="PhotoWorld" component={PhotoWorld} />
      <Stack.Screen name="TodayGallery" component={TodayGallery} />
      <Stack.Screen name="Thrive" component={Thrive} />
      <Stack.Screen name="Thrivedetails" component={Thrivedetails} />
      <Stack.Screen name="VotingPage" component={VotingPage} />
      <Stack.Screen name="AdviceFinance" component={AdviceFinance} />
      <Stack.Screen name="MyQuestionAdvice" component={MyQuestionAdvice} />
      <Stack.Screen name="PhotoViewing" component={PhotoViewing} />
      <Stack.Screen name="ThriveSec" component={ThriveSec} />
      <Stack.Screen name="Voting2" component={Voting2} />
    </Stack.Navigator>
  );
}
function ShareImageComponent() {
  return (
    <Stack.Navigator headerMode="none">
      <Tab.Screen name="ShareImage" component={ShareImage} />
      <Stack.Screen name="TodayGallery" component={TodayGallery} />
      <Stack.Screen name="MyPhotos" component={MyPhotos} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PhotoDetail" component={PhotoDetail} />
      <Stack.Screen name="MyResponse" component={MyResponse} />
      <Stack.Screen name="QuestionDetail" component={QuestionDetail} />
      <Stack.Screen name="TriviaSec" component={TriviaSec} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen
        name="home"
        component={GetAdviceComponent}
        options={{icon: homeicon}}
      />
      <Tab.Screen
        name="ShareImage"
        component={ShareImageComponent}
        options={{icon: shareimage}}
      />
      <Tab.Screen
        name="GetAdvice2"
        component={GetAdvice2}
        options={{icon: getadvice}}
      />
      <Tab.Screen
        name="RelationMeter"
        component={RelationMeter}
        options={{icon: relationmeter}}
      />
      <Tab.Screen name="Trivia" component={Trivia} options={{icon: trivia}} />
    </Tab.Navigator>
  );
}
function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerStyle={{width: widthPercentageToDP(70)}}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="GetAdvice" component={GetAdvice} />
      <Drawer.Screen name="ShareImage" component={ShareImage} />
      <Drawer.Screen name="GetAdvice2" component={GetAdvice2} />
      <Drawer.Screen name="RelationMeter" component={RelationMeter} />
      <Drawer.Screen name="TriviaSec" component={TriviaSec} />
      <Drawer.Screen name="Thrive" component={Thrive} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

function Routes() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      console.log('userToken');
      storage.getData('access_token').then((res) => {
        if (res) {
          userToken = res;
          network.getResponse(
            'user',
            'GET',
            {},
            (res) => {
              dispatch({type: 'RESTORE_TOKEN', token: userToken});
            },
            () => {
              storage.clear();
              dispatch({type: 'SIGN_OUT'});
            },
          );
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      });
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: async (values) => {
        network.getResponse(
          'login',
          'POST',
          values,
          (response) => {
            if (response.access_token) {
              storage.setData('access_token', response.access_token);
              storage.setData('user', JSON.stringify(response.user));
              dispatch({type: 'SIGN_IN', token: response.access_token});
            }else{
              // console.log('console.log(error),',error)
            }
          },
          (error) => Toast.show({text: 'Incorrect password.'}),
        );
      },
      signOut: () => {
        storage.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <Root>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {state.isLoading ? (
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Loading" component={Loading} />
            </Stack.Navigator>
          ) : state.userToken == null ? (
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Forgot" component={Forgot} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Welcomeuser" component={HomeDrawer} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Root>
  );
}

export default Routes;
