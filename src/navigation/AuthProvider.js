import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
export const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            if (email === '' && password === '') {
              alert('Invalid Email/Password');
            }
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
          }
        },
        register: async (email, password) => {
          try {
            if (email === '' && password === '') {
              alert('Invalid Email/Password');
            }
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
        forgotPassword: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
            alert('Email Send Successfully');
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
