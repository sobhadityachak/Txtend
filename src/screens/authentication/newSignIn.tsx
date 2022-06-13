import React, { useState } from 'react';
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
      await Auth.forgotPassword(data.username);
      // navigation.push('ConfirmPhone')
      //   const response = await Auth.signIn(data.username, data.password);
      //   console.log(response);
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setSendingOTP(!sendingOTP);
    setusrName(data.username)
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
      await Auth.signIn(usrName, password);
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Oops', error.message)
    }
    finally{
      setLoadingOTP(!loadingOTP);
    }
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
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={{ paddingTop: 0, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={require('../../../assets/images/Logo.png')}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
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
          <CustomInput
            name="username"
            control={control}
            placeholder="Verify Phone number"
            rules={{
              required: 'Phone Number with county code is required for password verification',
              length: {

              },
              minLength: {
                value: 12,
                message: 'Username should be at least 12 characters long',
              },
              maxLength: {
                value: 15,
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
    width: '70%',
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
    height: 40,
    width: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 60,

  }
});

export default NewSignInScreen;
