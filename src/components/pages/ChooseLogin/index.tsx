import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SIGN_IN, SIGN_UP} from '../../../constants/path';
import {Button, Logo} from '../../atoms';
import {COLOR} from '../../../constants/theme';

const padding = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingVertical: padding,
  },
  button: {
    marginBottom: 40,
    width: 300,
  },
});

export default function ChooseLogin() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Logo />
      </View>

      <View style={styles.contentContainer}>
        <Button
          onPress={() => navigate(SIGN_IN)}
          label="Sign in"
          style={styles.button}
        />
        <Button
          onPress={() => navigate(SIGN_UP)}
          label="Sign up"
          style={styles.button}
        />
      </View>
    </View>
  );
}
