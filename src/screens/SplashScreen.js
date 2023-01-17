/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

export function WithSplashScreen({children, isAppReady}) {
  return (
    <>{isAppReady ? children : <SplashScreen isAppReady={isAppReady} />}</>
  );
}

export default function SplashScreen() {
  return (
    <ImageBackground
      source={require('../Images/splash-bg1.png')}
      style={styles.ImageBackgroundStyle}>
      <Image source={require('../Images/conpay-icon.png')} />
      <Image
        source={require('../Images/conpay-text.png')}
        style={{marginTop: 20}}
      />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  ImageBackgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
