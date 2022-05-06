import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '.././components/CustomInput';
import CustomButton from '.././components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

import { useEffect } from 'react';
import { Button, Image, Platform, TouchableOpacity, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const [image, setImage] = useState(null);
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const { username, password, name } = data;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          picture: image,
          preferred_username: name
        },
      });

      navigation.replace('ConfirmPhone', { username });
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.replace('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={{paddingTop: 0}}>
    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <View style={imageUploaderStyles.container}>
          {
            image && <Image source={{ uri: image }} style={{ 
              width: 200, height: 200,
              borderRadius: 70,
            
            }} />
          }

          <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={pickImage} style={imageUploaderStyles.uploadBtn} >
              <Text>{image ? 'Edit' : 'Upload'} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>


        </View>
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
        {/* <CustomInput
                  name="email"
                  control={control}
                  placeholder="Email"
                  rules={{
                      required: 'Email is required',
                      pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                  }} secureTextEntry={undefined}        /> */}
        <CustomInput
          name="password"
          control={control}
          placeholder="Password with numeric value"
          secureTextEntry
          rules={{
            required: 'Password is required with numeric value',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters long',
            },
          }}
        />
        {/* <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        /> */}

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)} bgColor={undefined} fgColor={undefined} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY" bgColor={undefined} fgColor={undefined} />
      </View>
    {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});


const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 70,
    overflow: 'hidden',
    margin: 20,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
  }
})
export default SignUpScreen;
