import { useState } from 'react';
import * as React from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function passwordGenerator() {
    return Math.random().toString(36).slice(2);
  }

const NewSignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  const [usrName, setusrName] = useState('');
  // const [passwrd, setpassWrd] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [code, onChangeCode] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const onSendOtpPressed = async data => {
    if (sendingOTP) {
      return;
    }

    setSendingOTP(true);
    try {
      await Auth.forgotPassword("+91"+data.username);
      // navigation.push('ConfirmPhone')
      //   const response = await Auth.signIn(data.username, data.password);
      //   console.log(response);
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setSendingOTP(!sendingOTP);
    setusrName("+91"+data.username)
    setModalVisible(true)
  };

  const onVerifyPressed = async () => {
    if (loadingOTP) {
      return;
    }
    const password = passwordGenerator();

    try {
      await Auth.forgotPasswordSubmit(usrName, code, password);
      // navigation.navigate("SignIn");
    }
    catch (e) {
      // Alert.alert('Oops', e.message);
      // return;
    }
    try {
      // await Auth.signIn(usrName, password);
      navigation.replace('Profile', {usrName,password});
    } catch (error) {
      Alert.alert('Oops', error.message)
    }
    // finally{
      // setLoadingOTP(!loadingOTP);
    // }
  };

  const onResendPress = async () => {
    if (loading) {
      return;
    }
    try {
      await Auth.forgotPassword(usrName);
      Alert.alert('Success', 'Code was resent to your phone');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    finally{
      setLoading(!loading);
    }
  };
  const onSignUpPress = () => {
    navigation.replace('SignUp');
  };

  return (
    <SafeAreaView style={{ paddingTop: 0, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={require('../../../assets/images/bckgnd.png')} style={styles.root1}>
      <View><Text style={{ color: '#3B71F3', fontSize: 28, fontWeight: 'bold', marginTop: 20,}}>Sign In</Text></View>
        
          
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
                    placeholder="Enter OTP"
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
          <View style={styles.root2}>
          <CustomInput
            name="username"
            control={control}
            placeholder="enter your 10 digit phone number"
            rules={{
              required: 'Phone Number with county code is required for password verification',
              length: {

              },
              minLength: {
                value: 10,
                message: 'Username should be at least 12 characters long',
              },
              maxLength: {
                value: 10,
                message: 'Username should be max 15 characters long',
              },
            }} secureTextEntry={undefined} />

          <CustomButton
            text={sendingOTP ? 'Sending OTP...' : 'Send OTP'}
            onPress={handleSubmit(onSendOtpPressed)}
            bgColor={undefined} fgColor={undefined} />


          {/* <SocialSignInButtons /> */}

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY" bgColor={undefined} fgColor={undefined} />
            </View>
        
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 50,
    margin: 10,
  },
  root1: {
    alignItems: 'center',
    padding: 80,
    marginTop: 0,
    display: "flex",

    resizeMode: 'contain',
    //height:820,
    flex: 1,
  },
  logo: {
    width: '40%',
    maxWidth: 300,
    maxHeight: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
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
    width: '79%',
    height: 325,
  },
  root2: {
    backgroundColor: 'rgba(255,255 , 255, 0.6)',
    marginTop: 95,
    marginBottom: 157,
    marginHorizontal: -55,
    padding: 45,
    borderRadius: 35,
    paddingBottom: 70,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 70,
    width: '100%',
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 50,
    fontSize: 18,
    textAlign : 'center',

  }
});

export default NewSignInScreen;
