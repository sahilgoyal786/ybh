// In App.js in a new project

import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
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
import Home from '../Screens/home/home';
import ShareImage from '../Screens/shareimage/shareimage';
import RelationMeter from '../Screens/relationmeter/relationmeter';
import Trivia from '../Screens/trivia/trivia';
import LatestPhotos from '../Screens/latestphotos/latestphotos';
import GetAdvice from '../Screens/getadvice/getadvice';
import Thrive from '../Screens/thrive/thrive';
import Thrivedetails from '../Screens/ThriveDetails/Thrivedetails';
import VotingPage from '../Screens/voting page/votingpage';
import AdviceCategory from '../Screens/adviceCategory/adviceCategory';
import SetPassword from '../Screens/setPassword/setPassword';
import VerifyEmail from '../Screens/verifyEmail/verifyEmail';
import Gallery from '../Screens/gallery/gallery';
import MyPhotos from '../Screens/myphotos/myphotos';
import Profile from '../Screens/profile/profile';
import QuestionDetail from '../Screens/questiondetail/questiondetail';
import TnC from '../Screens/TnC/TnC';
import Privacy from '../Screens/Privacy/Privacy';
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
import userDetailContext from '../common/userDetailContext';
import Loading from '../Screens/loading/loading';
import EndPoints from '../components/apis/endPoints';
import NetInfo from '@react-native-community/netinfo';

import PushNotificationManager from '../common/PushNotificationsManager';
import {Provider} from 'react-redux';
import {getStore} from '../common/reduxStore';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeComponent() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Thrivedetails" component={Thrivedetails} />
      <Stack.Screen name="VotingPage" component={VotingPage} />
      <Stack.Screen name="Thrive" component={Thrive} />
      <Stack.Screen name="TnC" component={TnC} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="LatestPhotos" component={LatestPhotos} />
      <Stack.Screen name="MyQuestions" component={AdviceCategory} />
      <Stack.Screen name="QuestionDetail" component={QuestionDetail} />
      <Stack.Screen name="MyPhotos" component={MyPhotos} />
      <Stack.Screen name="MyResponses" component={AdviceCategory} />
      <Stack.Screen name="Gallery" component={Gallery} />
    </Stack.Navigator>
  );
}
function AdviceComponent() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="GetAdvice" component={GetAdvice} />
      <Stack.Screen name="AdviceCategory" component={AdviceCategory} />
      <Stack.Screen name="QuestionDetail" component={QuestionDetail} />
      <Stack.Screen name="MyQuestions" component={AdviceCategory} />
      <Stack.Screen name="MyResponses" component={AdviceCategory} />
    </Stack.Navigator>
  );
}
function ShareImageComponent() {
  return (
    <Stack.Navigator headerMode="none">
      <Tab.Screen name="ShareImage" component={ShareImage} />
      <Stack.Screen name="MyPhotos" component={MyPhotos} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen
        name="home"
        component={HomeComponent}
        options={{icon: homeicon}}
      />
      <Tab.Screen
        name="ShareImage"
        component={ShareImageComponent}
        options={{icon: shareimage}}
      />
      <Tab.Screen
        name="GetAdvice"
        component={AdviceComponent}
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
  // console.log(React.useContext(userDetailContext));
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerStyle={{width: widthPercentageToDP(70)}}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen name="Home" component={HomeTabs} />
      {/* */}
    </Drawer.Navigator>
  );
}

function Routes() {
  const [userDetail, changeUserDetail] = React.useState(null);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          changeUserDetail(action);
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userDetail: action.user,
          };
        case 'USER_UPDATE':
          return {
            ...prevState,
            userDetail: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            userToken: action.token,
            userDetail: action.user,
          };

        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userToken: null,
            userDetail: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userdetail: null,
    },
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      // console.log('userToken', userDetail?.access_token);

      // Subscribe
      const subscribe = NetInfo.addEventListener((state) => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        let userDetailTemp = userDetail;
        if (userDetail !== null) {
          userDetailTemp.is_connected = state.isConnected;
          changeUserDetail(userDetailTemp);
          dispatch({type: 'USER_UPDATE', user: userDetail.user});
        }
        // console.log(userDetail);
      });

      // Unsubscribe
      subscribe();

      try {
        const token = await storage.getData('access_token');
        const user = JSON.parse(await storage.getData('user'));
        if (userDetail?.access_token || token) {
          userToken = (userDetail && userDetail.token) || token;
          dispatch({type: 'RESTORE_TOKEN', token: userToken, user});
        } else {
          dispatch({type: 'SIGN_OUT'});
        }
      } catch (err) {
        dispatch({type: 'SIGN_OUT'});
      }
    };

    bootstrapAsync();
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: (response) => {
        changeUserDetail(response);
        dispatch({
          type: 'SIGN_IN',
          token: response.access_token,
          userDetail: response.user,
        });
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
      },
      updateUserDetail: (userDetailTemp, response) => {
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            userDetailTemp[key] = response[key];
          }
        }
        changeUserDetail(userDetailTemp);
      },
      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  React.useEffect(() => console.log('userDetail from routes', userDetail), [
    userDetail,
  ]);
  const myStore = getStore();
  return (
    <Root>
      <Provider store={myStore}>
        <AuthContext.Provider value={authContext}>
          <userDetailContext.Provider value={[userDetail, changeUserDetail]}>
            <PushNotificationManager>
              <NavigationContainer
                theme={{
                  ...DefaultTheme,
                  colors: {...DefaultTheme.colors, background: 'white'},
                }}>
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
                    <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
                    <Stack.Screen name="SetPassword" component={SetPassword} />
                  </Stack.Navigator>
                ) : (
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Welcomeuser" component={HomeDrawer} />
                  </Stack.Navigator>
                )}
              </NavigationContainer>
            </PushNotificationManager>
          </userDetailContext.Provider>
        </AuthContext.Provider>
      </Provider>
    </Root>
  );
}

export default Routes;
