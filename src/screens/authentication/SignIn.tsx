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
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
// import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.replace('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.replace('SignUp');
  };

  return (
    <SafeAreaView style={{ paddingTop: 90, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={require('../../../assets/images/Logo.png')}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

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
          <CustomInput
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
          />

          <CustomButton
            text={loading ? 'Loading...' : 'Sign In'}
            onPress={handleSubmit(onSignInPressed)} bgColor={undefined} fgColor={undefined} />

          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY" bgColor={undefined} fgColor={undefined} />

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
});

export default SignInScreen;
