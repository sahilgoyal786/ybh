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
    this.state = {notification: null, dialogVisible: false};
  }

  componentDidMount() {
    this.registerDevice();
    this.registerNotificationEvents();
  }

  registerDevice = () => {
    Notifications.events().registerRemoteNotificationsRegistered((event) => {
      // TODO: Send the token to my server so it could send back push notifications...
      const [userDetail, changeUserDetail] = this.context;
      if (userDetail && typeof userDetail.device_token == 'undefined') {
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
        this.doStuff(notification);
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

  doStuff = (notification) => {
    if (notification.payload.type) {
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
        case 'voting':
          storage.removeData(EndPoints.votingImages);
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
      </View>
    );
  }
}
