import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Modal,


} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function passwordGenerator() {
  return Math.random().toString(36).slice(2);
}

const NewSignUpScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  const [usrName, setusrName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [code, onChangeCode] = useState('');
  const [password, setPassword] = useState('');


  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const onRegisterPressed = async data => {
    const { username } = data;
    const password = passwordGenerator();
    console.log(password);

    try {
      await Auth.signUp({
        username: '+91' + username,
        password,
        // attributes: {
        //   picture: image,
        //   preferred_username: name
        // },
      });

      // navigation.replace('ConfirmPhone', { username, password });
      setModalVisible(true);
      setusrName(username);
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    
  };


  // const onSendOtpPressed = async data => {
  //   if (sendingOTP) {
  //     return;
  //   }

  //   setSendingOTP(true);
  //   try {
  //     await Auth.forgotPassword(data.username);
  //     // navigation.push('ConfirmPhone')
  //     //   const response = await Auth.signIn(data.username, data.password);
  //     //   console.log(response);
  //   } catch (e) {
  //     Alert.alert('Oops', e.message);
  //   }
  //   setSendingOTP(!sendingOTP);
  //   setusrName(data.username)
  //   setModalVisible(true)
  // };

  const onVerifyPressed = async () => {
    if (loadingOTP) {
      return;
    }
    
    try {
      await Auth.confirmSignUp(usrName, code);

    Alert.alert("verfied","Congratulations Your are all Set!"); 
    } catch (e) {
      Alert.alert('Oops', e.message);
    }

    try {
      await Auth.signIn(usrName, password);
      setModalVisible(false);
      navigation.goBack();

    } catch (error) {
      Alert.alert('Oops', error.message)
    }
    // finally{
    //   setLoadingOTP(!loadingOTP);
    // }
  };

  const onResendPress = async () => {
    if (loading) {
      return;
    }
    try {
      await Auth.resendSignUp(usrName);
      Alert.alert('Success', 'Code was resent to your phone');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    finally{
      setLoading(!loading);
    }
  };
  
  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };




  return (
    <SafeAreaView style={{ paddingTop: 0, }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground source={require('../../../assets/images/bckgnd.png')} style={styles.root}>
          <View><Text style={{ color: '#3B71F3', fontSize: 22, fontWeight: 'bold', marginTop: -50, }}>Confirm your Phone number</Text></View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert("resend OTP.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput

                    style={styles.input}
                    onChangeText={onChangeCode}
                    value={code}
                    placeholder="enter received OTP"
                    keyboardType="numeric"

                  />
                  <CustomButton
                    text={loadingOTP ? 'Verifing OTP...' : 'Verify OTP'}
                    onPress={onVerifyPressed}
                    type="SECONDARY" bgColor={undefined} fgColor={undefined} />
                  {/* <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable> */}
                  <CustomButton
                    text={loading ? 'Resending OTP...' : 'Resend OTP'}
                    onPress={onResendPress}
                    type="SECONDARY" bgColor={undefined} fgColor={undefined} />

                </View>
              </View>
            </Modal>
            {/* <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
          </View>
          <View style={styles.root1}>
            <CustomInput
              name="username"
              control={control}
              placeholder="Enter Phone number"
              rules={{
                required: 'Phone Number with county code is required for password verification',
                length: {

                },
                minLength: {
                  value: 10,
                  message: 'phone number should be at least 10 characters long',
                },
                maxLength: {
                  value: 10,
                  message: 'phone number should be max 10 characters long',
                },
              }} secureTextEntry={undefined} />

            <CustomButton
              text={loading ? 'Sending OTP...' : 'Send OTP!'}
              onPress={handleSubmit(onRegisterPressed)} bgColor={undefined} fgColor={undefined} />

            {/* <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
          type="TERTIARY" bgColor={undefined} fgColor={undefined} /> */}

            {/* <SocialSignInButtons /> */}

            <CustomButton
              text="If you have an account, Sign In"
              onPress={onSignInPress}
              type="TERTIARY" bgColor={undefined} fgColor={undefined} />
          </View>
          <Image
            source={require('../../../assets/images/Logo.png')}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
        </ImageBackground>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 80,
    marginTop: 10,
    display: "flex",

    resizeMode: 'contain',
    //height:820,
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  logo: {
    width: '40%',
    maxWidth: 300,
    maxHeight: 70,
    marginTop: 90,
    marginBottom: -210,
    justifyContent: "flex-end",
    display: 'flex',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  root1: {
    backgroundColor: 'rgba(255,255 , 255, 0.6)',
    marginTop: -40,
    marginBottom: 0,
    marginHorizontal: -55,
    padding: 45,
    borderRadius: 35,
    paddingBottom: 70,
  },
  input: {
    height: 40,
    width: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 60,

  }
});
// const imageUploaderStyles = StyleSheet.create({
//   container: {
//     elevation: 2,
//     height: 100,
//     width: 100,
//     backgroundColor: '#efefef',
//     position: 'relative',
//     borderRadius: 999,
//     overflow: 'hidden',
//     marginTop: 50,
//   },
//   uploadBtnContainer: {
//     opacity: 0.7,
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'lightgrey',
//     width: '100%',
//     height: '45%',
//   },
//   uploadBtn: {
//     display: 'flex',
//     alignItems: "center",
//     justifyContent: 'center'
//   }
// })

export default NewSignUpScreen;