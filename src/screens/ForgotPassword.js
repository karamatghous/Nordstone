import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {AuthContext} from '../navigation/AuthProvider';

export default function ForgotPassword(props) {
  const {forgotPassword} = useContext(AuthContext);
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Firebase app</Text>
      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Reset"
        onPress={() =>
          forgotPassword(email, props.navigation.navigate('Login'))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 16,
    color: '#6646ee',
  },
});
