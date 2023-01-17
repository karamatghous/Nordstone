import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs/BottomTabs';
const Stack = createNativeStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
