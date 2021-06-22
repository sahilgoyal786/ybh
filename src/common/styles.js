import {Appearance} from 'react-native';
const colorScheme = Appearance.getColorScheme();
const styles = {
  error_message: {
    fontSize: 10,
    color: 'red',
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  },
  whiteTextColor: {
    color: '#fff',
  },
  primaryBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#7b43a5' : '#7b43a5',
  },
  secondaryBackgroundColor: {
    backgroundColor: colorScheme == 'light' ? '#fff' : '#2e3235',
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
  primaryBorderColor: {
    borderColor: colorScheme == 'light' ? '#ddd' : '#2e3235',
  },
  secondaryBorderColor: {
    borderColor: colorScheme == 'light' ? '#7b43a5' : '#2e3235',
  },
  primaryBoxWrap: {
    color: colorScheme == 'light' ? '#7b43a5' : '#e3e7ea',
    borderColor: colorScheme == 'light' ? '#7b43a5' : '#2e3235',
    backgroundColor: colorScheme == 'light' ? '#fff' : '#2e3235',
  },
};
export default styles;
