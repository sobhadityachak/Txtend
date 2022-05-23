import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 20,
    marginVertical: 5,
    
    alignSelf: 'center',
    marginTop:0,

    alignItems: 'center',
    borderRadius: 35,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
    paddingHorizontal:70,
    marginTop:30,
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {
    paddingHorizontal:10,
    marginBottom:-45,

  },

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;