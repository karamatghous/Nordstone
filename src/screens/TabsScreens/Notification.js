import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import PushNotification from 'react-native-push-notification';
import FormButton from '../../components/FormButton';
import Show from './Show';
export default function Notification() {
  const data = () => {
    PushNotification.localNotification({
      title: 'AweSome App',
      message: 'Showing data',
      channelId: 1,
    });
  };

  const setNotification = () => {
    // Notifications.schduleNotification(date);
    Show.schduleNotification(new Date(Date.now() + 1 * 1000));
  };

  return (
    <SafeAreaView style={style.mainView}>
      <View>
        <FormButton
          buttonTitle="Notifications"
          onPress={() => setNotification()}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
