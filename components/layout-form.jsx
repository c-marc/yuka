import { useState } from "react";
import { View, StyleSheet, Pressable, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

// Global styles
import { COLORS } from "../styles/global";

export default function LayoutForm({ children }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.main}>
        <View style={styles.form}>{children}</View>
      </View>
    </View>
  );
}

// Let's keep these components grouped together
export function TextInputStyled({ children, ...props }) {
  const [isFocused, setIsFocused] = useState();
  return (
    <TextInput
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.input,
        {
          //backgroundColor: isFocused ? "lightgrey" : "white",
          borderColor: isFocused ? COLORS.green : "lightgrey",
        },
      ]}
      {...props}
    >
      {children}
    </TextInput>
  );
}

export function SubmitButton({ text, isLoading, ...props }) {
  return (
    <Pressable
      disabled={isLoading}
      style={[
        styles.btn,
        {
          opacity: isLoading ? 0.5 : 1,
        },
      ]}
      {...props}
    >
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
}

export function LinkButton({ text, ...props }) {
  return (
    <Pressable {...props} style={styles.link}>
      <Text>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    padding: 20,
    gap: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.green,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    // hack to simulate inline-block
    alignSelf: "flex-start",
    borderBottomWidth: 1,
  },
});
