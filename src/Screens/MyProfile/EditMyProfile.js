import React from 'react';
import {
  bottomCurve,
  MatchIcons,
  ProfessionIcon,
  GenderIcon,
  LookingForIcon,
  PartnerFunIcon,
  ChildrenIcon,
  MarriedIcon,
  EducationIcon,
  BuildIcon,
  SmokeIcon,
  HairIcons,
  EthnicityIcons,
  ReligionIcons,
  CurrentStatusIcons,
  AddProfilePhotoIcon,
  Uploadimageicon,
  ProfileNextIcon,
  ProfilePrevIcon,
} from '../../common/images';
import Button from '../../components/button';
import styled from 'styled-components/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import network from '../../components/apis/network';
import EndPoints from '../../components/apis/endPoints';
import userDetailContext from '../../common/userDetailContext';
import Header from '../../components/header';
import Slider from '@react-native-community/slider';
import {Toast} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {countries} from '../../common/countries';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {GetFormattedDateWithMonth} from '../../common/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import GlobalStyles, {GlobalImages} from '../../common/styles';
class EditMyProfile extends React.Component {
  static contextType = userDetailContext;
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      isLoading: true,
      showDatePicker: false,
      token: null,
      profile: {
        id: null,
        username: null,
        dob: null,
        tribe: null,
        phone_number: null,
        state: null,
        country: null,
        profession: null,
        gender: null,
        looking_for: [],
        partner_fun: null,
        children: null,
        married: null,
        education: null,
        height: 140,
        build: null,
        smoke: null,
        hair: null,
        ethnicity: null,
        religion: null,
        current_status: null,
        profile_photo: null,
        aboutus: null,
      },
    };
  }
  componentDidMount() {
    const user = this.context;
    if (user.length) {
      this.LoadProfile(user[0].token);
    }
  }
  LoadProfile = (userToken) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.myProfile,
        'GET',
        {},
        userToken,
        (response) => {
          let myProfile = {
            id: response.id,
            username: response.username,
            dob: response.dob,
            tribe: response.tribe,
            phone_number: response.phone_number,
            state: response.state,
            country: response.country,
            profession: response.profession,
            gender: response.gender,
            looking_for: response.looking_for,
            partner_fun: response.partner_fun,
            children: response.children,
            married: response.married,
            education: response.education,
            height: response.height,
            build: response.build,
            smoke: response.smoke,
            hair: response.hair,
            ethnicity: response.ethnicity,
            religion: response.religion,
            current_status: response.current_status,
            profile_photo: response.profile_photo,
            aboutus: response.aboutus,
          };
          this.setState({
            profile: myProfile,
            token: userToken,
            isLoading: false,
          });
        },
        (error) => {
          this.setState({token: userToken, isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({token: userToken, isLoading: false});
      console.log('exception', exception);
    }
  };
  updateProfileData = (label, value) => {
    this.state.profile[label] = value;
    this.setState({profile: this.state.profile});
  };
  updateMultiProfileData = (label, value) => {
    var oldValues = this.state.profile[label] ? this.state.profile[label] : [];
    if (oldValues && oldValues.includes(value)) {
      oldValues = oldValues.filter((item) => item !== value);
    } else {
      oldValues = oldValues.concat(value);
    }
    this.state.profile[label] = oldValues;
    this.setState({profile: this.state.profile});
  };
  setShowDatePicker = (name) => {
    this.setState({showDatePicker: name});
  };
  convertedCentoFeet = () => {
    var userHeight = this.state.profile.height;
    var realFeet = (userHeight * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "'" + inches + '" - ' + userHeight + 'cm';
  };
  chaneSteps = (current) => {
    var activeStep = current + 1;
    this.setState({currentStep: activeStep});
  };
  previousSteps = (current) => {
    let activeStep = current - 1;
    this.setState({currentStep: activeStep});
  };
  checkValidation = (conditions) => {
    var validate = false;
    conditions.forEach((condition) => {
      if (
        this.state.profile[condition] == '' ||
        this.state.profile[condition] == null
      ) {
        validate = true;
      }
    });
    return validate;
  };
  updateMyProfile = () => {
    const {navigation} = this.props;
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.updateMatchProfile,
        'POST',
        this.state.profile,
        this.state.token,
        (response) => {
          this.setState({isLoading: false});
          if (response && response.message) {
            Toast.show({text: response.message});
          }
          navigation.navigate('MyProfile');
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  openImageLibrary = (label) => {
    const options = {
      noData: true,
      quality: 0.5,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        if (response.fileSize < 5000000) {
          this.addProfileImage(label, response);
        } else {
          Toast.show({text: 'Please choose a lighter/smaller image.'});
        }
      }
    });
  };
  openCamera = (label) => {
    const options = {
      noData: true,
      quality: 0.5,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        if (response.fileSize < 5000000) {
          this.addProfileImage(label, response);
        } else {
          Toast.show({text: 'Please choose a lighter/smaller image.'});
        }
      }
    });
  };
  addProfileImage = (label, photoResource) => {
    this.setState({isLoading: true});
    try {
      network.getResponse(
        EndPoints.ProfileImageUpload,
        'POST',
        {},
        this.state.token,
        (response) => {
          this.updateProfileData(label, response.url);
          this.setState({isLoading: false});
          Toast.show({text: response.message});
        },
        (error) => {
          this.setState({isLoading: false});
          console.log('error', error);
        },
        photoResource,
        'image',
      );
    } catch (exception) {
      this.setState({isLoading: false});
      console.log('exception', exception);
    }
  };
  render() {
    const steps = [
      {
        id: 1,
        processBar: true,
        process: 6.667,
        icon: MatchIcons['icon1'],
        name: null,
        validation: [
          'username',
          'dob',
          'tribe',
          'phone_number',
          'state',
          'country',
        ],
        fields: [
          {
            type: 'text',
            subType: 'text',
            name: 'username',
            placeholder: 'User Name',
          },
          {
            type: 'text',
            subType: 'datepicker',
            name: 'dob',
            placeholder: 'Date of Birth',
          },
          {type: 'text', subType: 'text', name: 'tribe', placeholder: 'Tribe'},
          {
            type: 'text',
            subType: 'number',
            name: 'phone_number',
            placeholder: 'Phone Number',
            editable: false,
          },
          {type: 'text', subType: 'text', name: 'state', placeholder: 'State'},
          {
            type: 'dropdown',
            options: countries,
            name: 'country',
            placeholder: 'Country',
          },
        ],
      },
      {
        id: 2,
        processBar: true,
        process: 13.334,
        icon: MatchIcons['icon2'],
        name: 'Profession',
        validation: ['profession'],
        fields: [
          {
            type: 'select',
            label: 'profession',
            icon: ProfessionIcon['govt'],
            name: 'Govt. Employee',
          },
          {
            type: 'select',
            label: 'profession',
            icon: ProfessionIcon['private'],
            name: 'Private Company',
          },
          {
            type: 'select',
            label: 'profession',
            icon: ProfessionIcon['self'],
            name: 'Self-Employed',
          },
          {
            type: 'select',
            label: 'profession',
            icon: ProfessionIcon['politician'],
            name: 'Politician',
          },
          {
            type: 'select',
            label: 'profession',
            icon: ProfessionIcon['jobless'],
            name: 'Jobless',
          },
          {
            type: 'select',
            label: 'profession',
            icon: ProfessionIcon['student'],
            name: 'Student/Other',
          },
        ],
      },
      {
        id: 3,
        processBar: true,
        process: 20,
        icon: MatchIcons['icon3'],
        name: 'Gender',
        validation: ['gender'],
        fields: [
          {
            type: 'select',
            label: 'gender',
            icon: GenderIcon['male'],
            name: 'Male',
          },
          {
            type: 'select',
            label: 'gender',
            icon: GenderIcon['female'],
            name: 'Female',
          },
        ],
      },
      {
        id: 4,
        processBar: true,
        process: 26.667,
        icon: MatchIcons['icon4'],
        name: 'What are you looking for',
        validation: ['looking_for'],
        fields: [
          {
            type: 'select',
            label: 'looking_for',
            icon: LookingForIcon['marriage'],
            name: 'Marriage',
          },
          {
            type: 'select',
            label: 'looking_for',
            icon: LookingForIcon['friendship'],
            name: 'Friendship',
          },
        ],
      },
      {
        id: 5,
        processBar: true,
        process: 33.334,
        icon: MatchIcons['icon5'],
        name: 'What do you like to do for Fun with your partner?',
        subtext: '(Multiple Selection Applicable)',
        validation: ['partner_fun'],
        fields: [
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon1'],
            name: 'Plan a Date Night (or Day)',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon2'],
            name: 'Exercise',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon3'],
            name: 'Cook Together',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon4'],
            name: 'Couples Massage',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon5'],
            name: 'Redecorate',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon6'],
            name: 'Dance',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon7'],
            name: 'Reading',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon8'],
            name: 'Listen to a Podcast or Audiobook',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon9'],
            name: 'Start a new Hobby',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon10'],
            name: 'Play Games',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon11'],
            name: 'Watch TV and Movies',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon12'],
            name: 'Take a Walk',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon13'],
            name: 'Travel',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon14'],
            name: 'Shopping',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon15'],
            name: 'Browse the Web',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon16'],
            name: 'Visit family and friends',
          },
          {
            type: 'multiselect',
            label: 'partner_fun',
            icon: PartnerFunIcon['icon17'],
            name: 'Others',
          },
        ],
      },
      {
        id: 6,
        processBar: true,
        process: 40,
        icon: MatchIcons['icon6'],
        name: 'Do you have children?',
        validation: ['children'],
        fields: [
          {
            type: 'select',
            label: 'children',
            icon: ChildrenIcon['yes'],
            name: 'Yes',
          },
          {
            type: 'select',
            label: 'children',
            icon: ChildrenIcon['no'],
            name: 'No',
          },
        ],
      },
      {
        id: 7,
        processBar: true,
        process: 46.667,
        icon: MatchIcons['icon7'],
        name: 'Are you married?',
        validation: ['married'],
        fields: [
          {
            type: 'select',
            label: 'married',
            icon: MarriedIcon['yes'],
            name: 'Yes',
          },
          {
            type: 'select',
            label: 'married',
            icon: MarriedIcon['no'],
            name: 'No',
          },
        ],
      },
      {
        id: 8,
        processBar: true,
        process: 53.334,
        icon: MatchIcons['icon8'],
        name: 'Your level of education',
        validation: ['education'],
        fields: [
          {
            type: 'select',
            label: 'education',
            icon: EducationIcon['secondary'],
            name: 'Secondary school',
          },
          {
            type: 'select',
            label: 'education',
            icon: EducationIcon['bachelor'],
            name: 'Bachelor Degree',
          },
          {
            type: 'select',
            label: 'education',
            icon: EducationIcon['masters'],
            name: 'Masters',
          },
          {
            type: 'select',
            label: 'education',
            icon: EducationIcon['phd'],
            name: 'PhD',
          },
        ],
      },
      {
        id: 9,
        processBar: true,
        process: 60,
        icon: MatchIcons['icon9'],
        name: 'How tall are you?',
        validation: ['height'],
        fields: [
          {
            type: 'range',
            label: 'height',
            minValue: 140,
            maxValue: 200,
            minLabel: `<4'7" - 140cm`,
            maxLabel: `>6'7" - 200cm`,
          },
        ],
      },
      {
        id: 10,
        processBar: true,
        process: 66.667,
        icon: MatchIcons['icon10'],
        name: 'What build are you?',
        validation: ['build'],
        fields: [
          {
            type: 'select',
            label: 'build',
            icon: BuildIcon['slim'],
            name: 'Slim',
          },
          {
            type: 'select',
            label: 'build',
            icon: BuildIcon['average'],
            name: 'Average',
          },
          {
            type: 'select',
            label: 'build',
            icon: BuildIcon['athletic'],
            name: 'Athletic',
          },
          {
            type: 'select',
            label: 'build',
            icon: BuildIcon['large'],
            name: 'Large',
          },
          {
            type: 'select',
            label: 'build',
            icon: BuildIcon['extra'],
            name: 'Few Extra Kg',
          },
        ],
      },
      {
        id: 11,
        processBar: true,
        process: 73.334,
        icon: MatchIcons['icon11'],
        name: 'Do you smoke?',
        validation: ['smoke'],
        fields: [
          {
            type: 'select',
            label: 'smoke',
            icon: SmokeIcon['never'],
            name: 'Never',
          },
          {
            type: 'select',
            label: 'smoke',
            icon: SmokeIcon['social'],
            name: 'Social Smoker',
          },
          {
            type: 'select',
            label: 'smoke',
            icon: SmokeIcon['regularly'],
            name: 'Regularly',
          },
          {
            type: 'select',
            label: 'smoke',
            icon: SmokeIcon['quit'],
            name: 'Trying to Quit',
          },
        ],
      },
      {
        id: 12,
        processBar: true,
        process: 80,
        icon: MatchIcons['icon12'],
        name: 'Hair',
        validation: ['hair'],
        fields: [
          {
            type: 'select',
            label: 'hair',
            icon: HairIcons['bald'],
            name: 'Bald',
          },
          {
            type: 'select',
            label: 'hair',
            icon: HairIcons['long'],
            name: 'Long',
          },
          {
            type: 'select',
            label: 'hair',
            icon: HairIcons['short'],
            name: 'Short',
          },
        ],
      },
      {
        id: 13,
        processBar: true,
        process: 86.667,
        icon: MatchIcons['icon13'],
        name: 'What is your ethnicity?',
        validation: ['ethnicity'],
        fields: [
          {
            type: 'select',
            label: 'ethnicity',
            icon: EthnicityIcons['black'],
            name: 'Black',
          },
          {
            type: 'select',
            label: 'ethnicity',
            icon: EthnicityIcons['mixed'],
            name: 'Mixed Race',
          },
          {
            type: 'select',
            label: 'ethnicity',
            icon: EthnicityIcons['asian'],
            name: 'Asian',
          },
          {
            type: 'select',
            label: 'ethnicity',
            icon: EthnicityIcons['white'],
            name: 'White',
          },
          {
            type: 'select',
            label: 'ethnicity',
            icon: EthnicityIcons['arab'],
            name: 'Arab',
          },
          {
            type: 'select',
            label: 'ethnicity',
            icon: EthnicityIcons['other'],
            name: 'Other',
          },
        ],
      },
      {
        id: 14,
        processBar: true,
        process: 93.334,
        icon: MatchIcons['icon14'],
        name: 'Religion?',
        validation: ['religion'],
        fields: [
          {
            type: 'select',
            label: 'religion',
            icon: ReligionIcons['muslim'],
            name: 'Muslim Shia',
          },
          {
            type: 'select',
            label: 'religion',
            icon: ReligionIcons['muslim'],
            name: 'Muslim Sunni',
          },
          {
            type: 'select',
            label: 'religion',
            icon: ReligionIcons['muslim'],
            name: 'Muslim Other',
          },
          {
            type: 'select',
            label: 'religion',
            icon: ReligionIcons['christian'],
            name: 'Christian Catholic',
          },
          {
            type: 'select',
            label: 'religion',
            icon: ReligionIcons['christian'],
            name: 'Christian Other',
          },
          {
            type: 'select',
            label: 'religion',
            icon: ReligionIcons['other'],
            name: 'Other',
          },
        ],
      },
      {
        id: 15,
        processBar: true,
        process: 100,
        icon: MatchIcons['icon15'],
        name: 'Whats your current status?',
        validation: ['current_status'],
        fields: [
          {
            type: 'select',
            label: 'current_status',
            icon: CurrentStatusIcons['single'],
            name: 'Single',
          },
          {
            type: 'select',
            label: 'current_status',
            icon: CurrentStatusIcons['divorced'],
            name: 'Divorced',
          },
          {
            type: 'select',
            label: 'current_status',
            icon: CurrentStatusIcons['widowed'],
            name: 'Widowed',
          },
          {
            type: 'select',
            label: 'current_status',
            icon: CurrentStatusIcons['married'],
            name: 'Married',
          },
        ],
      },
      {
        id: 16,
        processBar: false,
        process: 100,
        icon: AddProfilePhotoIcon,
        name: 'Add Profile Photo',
        validation: ['profile_photo', 'aboutus'],
        fields: [
          {
            type: 'upload',
            subType: 'library',
            label: 'profile_photo',
            icon: Uploadimageicon['upload'],
            name: 'Upload from device',
          },
          {
            type: 'upload',
            subType: 'camera',
            label: 'profile_photo',
            icon: Uploadimageicon['take'],
            name: 'Take picture',
          },
          {
            type: 'textarea',
            line: 4,
            name: 'aboutus',
            placeholder: 'Write something that says a lot about you',
          },
        ],
      },
    ];
    const stepData = [];
    steps.forEach((step) => {
      if (step.id == this.state.currentStep) {
        stepData.push(
          <ProfileWrap key={step.id}>
            {step.processBar && (
              <ProgressWrap>
                <ProgressInner
                  style={{width: step.process + '%'}}></ProgressInner>
              </ProgressWrap>
            )}
            {step.icon && this.state.currentStep < steps.length && (
              <TopImage source={step.icon} resizeMode="contain"></TopImage>
            )}
            {step.icon && this.state.currentStep == steps.length && (
              <View style={{position: 'relative', textAlign: 'center'}}>
                <TopImage source={step.icon} resizeMode="contain"></TopImage>
                {this.state.profile.profile_photo && (
                  <TopImage
                    style={{
                      position: 'absolute',
                      width: 90,
                      height: 90,
                      borderRadius: 90,
                      left: '37%',
                      top: 8,
                    }}
                    source={{
                      uri:
                        'https://api.ybhive.app/storage/' +
                        this.state.profile.profile_photo,
                    }}
                    resizeMode="cover"></TopImage>
                )}
              </View>
            )}
            {step.name && <Heading>{step.name}</Heading>}
            {step.subtext && <SubHeadingText>{step.subtext}</SubHeadingText>}
            {step.fields.map((item, index) => {
              if (item.type == 'text') {
                if (item.subType == 'text') {
                  return (
                    <TextInput
                      key={index}
                      name={item.name}
                      value={this.state.profile[item.name]}
                      style={styles.input}
                      placeholder={item.placeholder}
                      placeholderTextColor={'#afafaf'}
                      onChangeText={(text) =>
                        this.updateProfileData(item.name, text)
                      }
                    />
                  );
                } else if (item.subType == 'number') {
                  return (
                    <PhoneInput
                      key={index}
                      editable={item.editable}
                      name={item.name}
                      value={this.state.profile[item.name]}
                      style={styles.input}
                      placeholder={item.placeholder}
                      placeholderTextColor={'#afafaf'}
                      onChangeText={(text) =>
                        this.updateProfileData(item.name, text)
                      }
                    />
                  );
                } else if (item.subType == 'datepicker') {
                  return (
                    <View key={index}>
                      <TextInput
                        onTouchStart={() => this.setShowDatePicker(item.name)}
                        name={item.name}
                        caretHidden={true}
                        value={
                          this.state.profile[item.name]
                            ? this.state.profile[item.name]
                            : ''
                        }
                        style={styles.input}
                        pointerEvents="box-only"
                        placeholder={item.placeholder}
                        placeholderTextColor={'#afafaf'}
                      />
                      {this.state.showDatePicker &&
                        this.state.showDatePicker == item.name && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={
                              this.state.profile[item.name]
                                ? new Date(this.state.profile[item.name])
                                : new Date(
                                    new Date().valueOf() -
                                      25 * 365 * 24 * 60 * 60 * 1000,
                                  )
                            }
                            display="default"
                            onChange={(event, selectedDate) => {
                              if (selectedDate) {
                                console.log(
                                  GetFormattedDateWithMonth(selectedDate),
                                );
                                this.updateProfileData(
                                  item.name,
                                  GetFormattedDateWithMonth(selectedDate),
                                );
                                this.setShowDatePicker(false);
                              }
                            }}
                          />
                        )}
                    </View>
                  );
                }
              } else if (item.type == 'select') {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() =>
                      this.updateProfileData(item.label, item.name)
                    }>
                    <SingleElement
                      style={
                        this.state.profile[item.label] == item.name
                          ? {borderColor: '#f9bc16'}
                          : {}
                      }>
                      <PImage source={item.icon}></PImage>
                      <PText>{item.name}</PText>
                    </SingleElement>
                  </TouchableWithoutFeedback>
                );
              } else if (item.type == 'multiselect') {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() =>
                      this.updateMultiProfileData(item.label, item.name)
                    }>
                    <SingleElement
                      style={
                        this.state.profile[item.label] &&
                        this.state.profile[item.label].includes(item.name)
                          ? {borderColor: '#f9bc16'}
                          : {}
                      }>
                      <PImage source={item.icon}></PImage>
                      <PText>{item.name}</PText>
                    </SingleElement>
                  </TouchableWithoutFeedback>
                );
              } else if (item.type == 'range') {
                return (
                  <View key={index}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text
                        style={{
                          ...GlobalStyles.secondaryTextColor,
                          flex: 1,
                          justifyContent: 'flex-start',
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        {item.minLabel}
                      </Text>
                      <Text
                        style={{
                          ...GlobalStyles.secondaryTextColor,
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        {item.maxLabel}
                      </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Slider
                        value={this.state.profile[item.label]}
                        style={{width: '100%', height: 40}}
                        minimumValue={item.minValue}
                        maximumValue={item.maxValue}
                        step={1}
                        minimumTrackTintColor="#7b43a5"
                        maximumTrackTintColor="#000"
                        onValueChange={(value) =>
                          this.updateProfileData(item.label, value)
                        }
                      />
                    </View>
                    <Text
                      style={{
                        ...GlobalStyles.secondaryTextColor,
                        textAlign: 'center',
                        marginBottom: 10,
                        fontSize: 18,
                        fontWeight: '600',
                      }}>
                      {this.convertedCentoFeet()}
                    </Text>
                  </View>
                );
              } else if (item.type == 'upload') {
                if (item.subType == 'library') {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => this.openImageLibrary(item.label)}>
                      <SingleElement
                        style={
                          this.state.profile[item.label] == item.name
                            ? {borderColor: '#f9bc16'}
                            : {}
                        }>
                        <PImage source={item.icon}></PImage>
                        <PText>{item.name}</PText>
                      </SingleElement>
                    </TouchableWithoutFeedback>
                  );
                } else if (item.subType == 'camera') {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => this.openCamera(item.label)}>
                      <SingleElement
                        style={
                          this.state.profile[item.label] == item.name
                            ? {borderColor: '#f9bc16'}
                            : {}
                        }>
                        <PImage source={item.icon}></PImage>
                        <PText>{item.name}</PText>
                      </SingleElement>
                    </TouchableWithoutFeedback>
                  );
                }
              } else if (item.type == 'textarea') {
                return (
                  <TextInput
                    key={index}
                    multiline={true}
                    value={this.state.profile[item.name]}
                    numberOfLines={item.line}
                    name={item.name}
                    style={styles.input}
                    placeholder={item.placeholder}
                    placeholderTextColor={'#afafaf'}
                    onChangeText={(text) =>
                      this.updateProfileData(item.name, text)
                    }
                  />
                );
              } else if (item.type == 'dropdown') {
                return (
                  <RNPickerSelect
                    key={index}
                    placeholder={{
                      label: item.placeholder,
                      key: Math.random().toString(),
                    }}
                    items={item.options}
                    style={{
                      inputAndroid: {
                        ...{
                          backgroundColor: 'transparent',
                          paddingRight: 35,
                          color: 'black',
                        },
                        ...styles.input,
                      },
                      inputIOS: {
                        ...{
                          backgroundColor: 'transparent',
                          paddingRight: 35,
                          color: 'black',
                        },
                        ...styles.input,
                      },
                      iconContainer:
                        Platform.OS == 'android' ? {bottom: 36, right: 20} : {},
                    }}
                    value={this.state.profile[item.name]}
                    onValueChange={(value) => {
                      if (value !== this.state.profile[item.name]) {
                        this.updateProfileData(item.name, value);
                      }
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                      return (
                        <FontAwesome5Icon
                          name="caret-down"
                          style={{fontSize: 15}}
                        />
                      );
                    }}
                  />
                );
              }
            })}
            {this.state.currentStep < steps.length && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {this.state.currentStep > 1 && (
                  <TouchableOpacity
                    onPress={() => this.previousSteps(this.state.currentStep)}>
                    <ProfilePrev source={ProfilePrevIcon}></ProfilePrev>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  disabled={this.checkValidation(step.validation)}
                  onPress={() => this.chaneSteps(this.state.currentStep)}>
                  <ProfileNext
                    source={ProfileNextIcon}
                    style={
                      this.checkValidation(step.validation)
                        ? {opacity: 0.4}
                        : {}
                    }></ProfileNext>
                </TouchableOpacity>
              </View>
            )}
            {this.state.currentStep == steps.length && (
              <Button
                disabled={this.checkValidation(step.validation)}
                onPress={() => this.updateMyProfile()}
                style={
                  this.checkValidation(step.validation)
                    ? {opacity: 0.4, width: '100%', marginTop: 20}
                    : {width: '100%', marginTop: 20}
                }
                name={'Update Info'}
                linear
              />
            )}
          </ProfileWrap>,
        );
      }
    });
    return (
      <View style={{...GlobalStyles.screenBackgroundColor, flex: 1}}>
        {this.state.isLoading && (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000080',
              zIndex: 9999,
            }}
          />
        )}
        <Image
          source={bottomCurve}
          style={{
            width: widthPercentageToDP(100),
            height: 200,
            position: 'absolute',
            bottom: -100,
          }}
          resizeMode="contain"
        />
        <Header
          title="Personal Info"
          backButton="true"
          showRightDrawer={false}
        />
        <KeyboardAwareScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{padding: 15, paddingTop: 20}}
          contentContainerStyle={{paddingBottom: 60}}>
          {stepData}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    ...GlobalStyles.secondaryTextColor,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#484848',
    fontSize: 18,
    marginBottom: 20,
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
});
const PhoneInput = styled(TextInput)({
  ...GlobalStyles.secondaryTextColor,
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#484848',
  fontSize: 18,
  marginBottom: 20,
  flex: 1,
  marginLeft: 8,
  marginRight: 8,
});
const Row = styled(View)({
  flex: 1,
  flexDirection: 'row',
});
const ProfileWrap = styled(View)({
  paddingLeft: 10,
  paddingRight: 10,
});
const ProgressWrap = styled(View)({
  width: 250,
  height: 3,
  backgroundColor: '#f9bc16',
  borderRadius: 5,
  margin: 'auto',
  marginTop: 20,
  marginBottom: 40,
  position: 'relative',
});
const ProgressInner = styled(View)({
  width: '6.667%',
  height: 3,
  backgroundColor: '#7b43a5',
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  position: 'absolute',
  left: 0,
});
const TopImage = styled(Image)({
  width: '100%',
  height: 100,
  marginBottom: 20,
});
const ProfileNext = styled(Image)({
  width: 70,
  height: 70,
  margin: 'auto',
  marginTop: 20,
});
const ProfilePrev = styled(Image)({
  width: 70,
  height: 70,
  margin: 'auto',
  marginTop: 20,
  marginRight: 15,
});
const Heading = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 20,
  margin: 'auto',
  marginBottom: 20,
  alignItems: 'center',
  fontWeight: 600,
});
const SubHeadingText = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 14,
  margin: 'auto',
  marginTop: -10,
  marginBottom: 20,
  alignItems: 'center',
});
const SingleElement = styled(View)({
  ...GlobalStyles.secondaryBackgroundColor,
  ...GlobalStyles.shadowColor,
  ...GlobalStyles.primaryBorderColor,
  flex: 1,
  flexDirection: 'row',
  width: '100%',
  padding: 12,
  borderWidth: 2,
  borderRadius: 5,
  marginBottom: 15,
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: '0.2',
  shadowRadius: 5,
  elevation: '5',
});
const PImage = styled(Image)({
  width: 30,
  height: 30,
  marginRight: 20,
});
const PText = styled(Text)({
  ...GlobalStyles.secondaryTextColor,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: '30px',
});
export default EditMyProfile;
