import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
export default function HomeScreen(props) {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
      {/* <FormButton
        buttonTitle="Calculator"
        onPress={() => props.navigation.navigate("Calculator")}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f1",
  },
  text: {
    fontSize: 12,
    color: "#333333",
  },
});
