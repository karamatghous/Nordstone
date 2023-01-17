import { View, ImageBackground, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/Home";
import PhotoScreen from "../../screens/TabsScreens/PhotoScreen";
import Notification from "../../screens/TabsScreens/Notification";
import TextScreen from "../../screens/TabsScreens/TextScreen";
import Calculator from "../../screens/TabsScreens/Calculator";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { position: "absolute", height: 70 },
        headerShown: false,
        headerStyle: { paddingBottom: 5 },
      })}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 12 },

          tabBarIcon: () => <Icon name="home" size={23} />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Image",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: () => <Icon name="image" size={23} />,
        }}
        name="PhotoScreen"
        component={PhotoScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Notification",
          tabBarLabelStyle: { fontSize: 12 },

          tabBarIcon: () => <Icon name="notifications" size={23} />,
        }}
        name="Notification"
        component={Notification}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Text",
          tabBarLabelStyle: { fontSize: 12 },

          tabBarIcon: () => <Icon name="text" size={23} />,
        }}
        name="TextScreen"
        component={TextScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Calculator",
          tabBarLabelStyle: { fontSize: 12 },

          tabBarIcon: () => <Icon name="calculator" size={23} />,
        }}
        name="Calculator"
        component={Calculator}
      />
    </Tab.Navigator>
  );
}
