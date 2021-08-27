import {Appearance} from 'react-native';
import {
  headerView,
  headerViewDark,
  bottomCurve,
  bottomCurveDark,
  loginHeader,
  loginHeaderDark,
  loginFooter,
  loginFooterDark,
  selectedTabCurve,
  selectedTabCurveDark,
  UserProfileIcons,
} from '../common/images';
// const colorScheme = Appearance.getColorScheme();
const colorScheme = 'dark';

export const GlobalImages = {
  header: colorScheme == 'light' ? headerView : headerViewDark,
  footer: colorScheme == 'light' ? bottomCurve : bottomCurveDark,
  loginHeader: colorScheme == 'light' ? loginHeader : loginHeaderDark,
  loginFooter: colorScheme == 'light' ? loginFooter : loginFooterDark,
  tabCurve: colorScheme == 'light' ? selectedTabCurve : selectedTabCurveDark,
  disconnect:
    colorScheme == 'light'
      ? UserProfileIcons['disconnect']
      : UserProfileIcons['disconnectWhite'],
};
const styles = {
  error_message: {
    fontSize: 10,
    color: colorScheme == 'light' ? '#f00' : '#f46262',
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'FuturaPT-Light',
  },
  errorBgColor: {
    backgroundColor: colorScheme == 'light' ? '#f00' : '#f46262',
  },
  errorTextColor: {
    color: colorScheme == 'light' ? '#f00' : '#f46262',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
  whiteTextColor: {
    color: '#fff',
  },
  borderColor: {
    borderColor: '#7b43a5',
  },
  shadowColor: {
    shadowColor: '#3d3d3d',
  },
  primaryFont: {
    fontFamily: 'FuturaPT-Medium',
  },
  gradientColorsFrom: colorScheme == 'light' ? '#9F74C5' : '#514164',
  gradientColorsTo: colorScheme == 'light' ? '#7F54A5' : '#6d528d',
  BottomtabBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#9F74C5' : '#514164',
  },
  userMsgBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#efefef' : '#2e3235',
  },
  LeaderBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#9A6FC0' : '#6d528d',
  },
  primaryBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#7b43a5' : '#7b43a5',
  },
  secondaryBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#fff' : '#2e3235',
  },
  customBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#F6BC18' : '#2e3235',
  },
  screenBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#fff' : '#1f2326',
  },
  primaryTextColor: {
    color: colorScheme == 'light' ? '#000' : '#a0a3aa',
  },
  secondaryTextColor: {
    color: colorScheme == 'light' ? '#484848' : '#e3e7ea',
  },
  customTextColor: {
    color: colorScheme == 'light' ? '#7b43a5' : '#fff',
  },
  custom2TextColor: {
    color: colorScheme == 'light' ? '#7e7e7e' : '#a0a3aa',
  },
  primaryBorderColor: {
    borderColor: colorScheme == 'light' ? '#ddd' : '#1f2326',
  },
  secondaryBorderColor: {
    borderColor: colorScheme == 'light' ? '#7b43a5' : '#2e3235',
  },
  customBorderColor: {
    borderColor: colorScheme == 'light' ? '#ddd' : '#2e3235',
  },
  primaryBoxWrap: {
    color: colorScheme == 'light' ? '#7b43a5' : '#e3e7ea',
    borderColor: colorScheme == 'light' ? '#7b43a5' : '#2e3235',
    backgroundColor: colorScheme == 'light' ? '#fff' : '#2e3235',
  },
  dateBackgroundColor: {
    backgroundColor: '#ebf7ff',
  },
  dateTextColor: {
    color: '#333',
  },
  timeTextColor: {
    color: '#a0a0a0',
  },
};
export default styles;
