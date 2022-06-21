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

const FinalSignUpScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  function passwordGenerator (max:number =99999999, min:number=10000000){
    return Math.floor(Math.random()*(max-min)+ min);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const onRegisterPressed = async data => {
    const { username, name } = data;
    const password = passwordGenerator().toString();
    console.log(password);

    try {
      await Auth.signUp({
        username,
        password,
        // attributes: {
        //   picture: image,
        //   preferred_username: name
        // },
      });

      navigation.replace('ConfirmPhone', { username, password });
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  
  // const onSignInPressed = async data => {
  //   if (loading) {
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await Auth.signIn(data.username, data.password);
  //     console.log(response);
  //   } catch (e) {
  //     Alert.alert('Oops', e.message);
  //   }
  //   setLoading(false);
  // };

  // const onForgotPasswordPressed = () => {
  //   navigation.replace('ForgotPassword');
  // };

  const onSignUpPress = () => {
    
    navigation.replace('SignIn');
  };
 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  return (
    <SafeAreaView style={{ paddingTop: 0, }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ImageBackground source={require('../../../assets/images/bckgnd.png')} style={styles.root}>
          <View><Text style={{ color: '#3B71F3', fontSize: 22, fontWeight: 'bold', marginTop: -50, }}>Sign In</Text></View>
          {/* <TouchableOpacity onPress={pickImage} >
          <View style={imageUploaderStyles.container}>
            {
              image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            }

            <View style={imageUploaderStyles.uploadBtnContainer}>
              <View style={imageUploaderStyles.uploadBtn} >
                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                <AntDesign name="camera" size={20} color="black" />
                </View>
              
            </View>
            </View>
            </TouchableOpacity> */}

          <View style={styles.root1}>
            <CustomInput
              name="name"
              control={control}
              placeholder="Name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name should be at least 3 characters long',
                },
                maxLength: {
                  value: 24,
                  message: 'Name should be max 24 characters long',
                },
              }} secureTextEntry={undefined} />
            <CustomInput
              name="username"
              control={control}
              placeholder="Phone number eg.. +919876543210"
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

            {/*<CustomInput
            name="password"
            placeholder="Password with numeric value"
            secureTextEntry
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be minimum 6 characters long',
              },
            }}
          />*/}

            <CustomButton
              text={loading ? 'Loading...' : 'All set! Register'}
              onPress={handleSubmit(onRegisterPressed)} bgColor={undefined} fgColor={undefined} />

            {/* <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
          type="TERTIARY" bgColor={undefined} fgColor={undefined} /> */}

            {/* <SocialSignInButtons /> */}

            <CustomButton
              text="If you have an account, Sign In"
              onPress={onSignUpPress}
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
  logo: {
    width: '40%',
    maxWidth: 300,
    maxHeight: 70,
    marginTop: 90,
    marginBottom: -210,
    justifyContent: "flex-end",
    display: 'flex',
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

});
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 100,
    width: 100,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 50,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '45%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
})

export default FinalSignUpScreen;