import {Toast} from 'native-base';
import storage from '../components/apis/storage';

export const SyncContent = async (userDetail) => {
  Toast.show({text: 'Syncing...'});
  await storage.setData('lastSyncDate', todaysDate());
};

export const todaysDate = () => {
  let d = new Date();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    d.getDate() +
    ' ' +
    months[d.getMonth()] +
    ', ' +
    d.getHours() +
    ':' +
    d.getMinutes()
  );
};
