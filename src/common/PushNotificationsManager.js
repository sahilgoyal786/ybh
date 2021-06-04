import React from 'react';
import {Platform, View} from 'react-native';
import {Notifications} from 'react-native-notifications';
import EndPoints from '../components/apis/endPoints';
import network from '../components/apis/network';
import storage from '../components/apis/storage';
import userDetailContext from './userDetailContext';
import * as RootNavigation from '../common/RootNavigation';
import {ConfirmDialog} from 'react-native-simple-dialogs';

export default class PushNotificationManager extends React.Component {
  static contextType = userDetailContext;

  constructor(props) {
    super(props);
    this.state = {notification: null, dialogVisible: false, dialogMessageVisible: false};
  }

  componentDidMount() {
    this.registerDevice();
    this.registerNotificationEvents();
  }

  registerDevice = () => {
    Notifications.events().registerRemoteNotificationsRegistered((event) => {
      // TODO: Send the token to my server so it could send back push notifications...
      const [userDetail, changeUserDetail] = this.context;
      //let device_token = await storage.getData('device_token');
      if (
        userDetail &&
        userDetail.token &&
        typeof userDetail.device_token == 'undefined'
      ) {
        console.log('Device Token Received', typeof userDetail.device_token);
        console.log('Device Token Received', event.deviceToken);
        let userDetailTemp = userDetail;
        userDetailTemp['device_token'] = event.deviceToken;
        changeUserDetail(userDetailTemp);
        network.getResponse(
          EndPoints.tokenUpdate,
          'POST',
          {device_token: event.deviceToken},
          userDetail.token,
          (response) => {
            console.log(response);
          },
          (response) => {
            console.log(response);
          },
        );
      } else {
        // console.log(userDetail);
      }
      storage.setData('device_token', event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      },
    );

    Notifications.registerRemoteNotifications();
  };

  registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification);
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        this.setState({notification: notification});
        this.setState({dialogVisible: true});
        if (notification.payload.type == 'voting') {
          storage.removeData(EndPoints.votingImages.url);
        }
        const [userDetail, changeUserDetail] = this.context;
        this.doStuff(notification, userDetail, changeUserDetail);
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('Notification opened by device user', notification);
        console.log(
          `Notification opened with an action identifier: ${notification.identifier}`,
        );
        this.doStuff(notification);

        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification);
        const [userDetail, changeUserDetail] = this.context;
        this.doStuff(notification, userDetail, changeUserDetail);
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.getInitialNotification()
      .then((notification) => {
        if (notification) {
          console.log('Initial notification was:', notification || 'N/A');
          setTimeout(() => {
            this.doStuff(notification);
          }, 1000);
        }
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));
  };

  doStuff = (notification, userDetail = {}, changeUserDetail = {}) => {
    if(notification.payload.type){
      console.log(notification.payload.type);
      switch (notification.payload.type) {
        case 'photo_approved':
          RootNavigation.navigate('MyPhotos');
          break;
        case 'advice_question_approved':
          RootNavigation.navigate('MyQuestions');
          break;
        case 'rejection':
          RootNavigation.navigate('TnC');
          break;
        case 'compatibility_test':
        case 'compatibility_test_result':
          if (userDetail && userDetail['user']) {
            let userDetailTemp = userDetail;
            userDetail['user']['has_new_compat_notification'] = true;
            changeUserDetail(userDetailTemp);
            console.log('UPDATE USERDETAIL');
          }
          storage.setData('new_compat_notification', 'true');
          storage.setData('new_compat_notification', 'true');
          break;
        case 'comment_on_response':
          network.getResponse(
            EndPoints.getAdviceQuestion,
            'POST',
            {advice_question_id: notification.payload.ques_id},
            userDetail.token,
            (response) => {
              console.log(response);
            },
            (response) => {
              console.log(response);
            },
          );
          // RootNavigation.navigate('TnC');
        break;
        case 'voting':
          storage.removeData(EndPoints.votingImages);
        break;
        case 'received_message':
          this.setState({dialogMessageVisible: true,dialogVisible: false});
        break;

        default:
          break;
      }
    }
  };
  render() {
    const {children} = this.props;
    return (
      <View style={{flex: 1}}>
        {children}
        {this.state.notification !== null && (
          <ConfirmDialog
            title={
              Platform.OS == 'android'
                ? this.state.notification.payload['gcm.notification.title']
                : this.state.notification.payload['title']
            }
            message={
              Platform.OS == 'android'
                ? this.state.notification.payload['gcm.notification.body']
                : this.state.notification.payload['body']
            }
            visible={this.state.dialogVisible}
            onTouchOutside={() => this.setState({dialogVisible: false})}
            positiveButton={{
              title: 'OK',
              onPress: () => this.setState({dialogVisible: false}),
            }}
          />
        )}
        {this.state.notification !== null && (
          <ConfirmDialog
            title={
              Platform.OS == 'android'
                ? this.state.notification.payload['gcm.notification.title']
                : this.state.notification.payload['title']
            }
            message={
              Platform.OS == 'android'
                ? this.state.notification.payload['gcm.notification.body']
                : this.state.notification.payload['body']
            }
            visible={this.state.dialogMessageVisible}
            onTouchOutside={() => this.setState({dialogMessageVisible: false})}
            positiveButton={{
              title: 'Go',
              onPress: () => {
                this.setState({dialogMessageVisible: false});
                let chat = JSON.parse(this.state.notification.payload.chat);
                RootNavigation.navigate('ChatMessage',{chat_id: chat.id,receiver: chat.user.user_id,name: chat.user.username,photo: chat.user.photo});
              }
            }}
          />
        )}
      </View>
    );
  }
}
