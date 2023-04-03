import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) setIsLoading(false);
      if (authUser) {
        setIsLoading(false);
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const loginUser = async () => {
    if (email === "" || password === "") {
      Alert.alert("Missing Credentials", "Please fill all the fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    try {
      setIsLoading(true);
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {isLoading && <Spinner visible={isLoading} overlayColor="rgba(0,0,0,0.5)" />}
      <SafeAreaView
        style={{ padding: 10, flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        <KeyboardAvoidingView>
          {/* Title */}
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "teal" }}>Sign In</Text>
            <Text style={{ color: "gray", fontSize: 16, marginTop: 7, fontWeight: "600" }}>
              Sign In to your Account
            </Text>
          </View>
          {/* Input Fields */}
          <View style={{ marginTop: 40 }}>
            {/* Email */}
            <View style={styles.contentAlignment}>
              <Fontisto name="email" size={24} color="black" />
              <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={email ? { ...styles.textFields, fontSize: 18 } : { ...styles.textFields }}
              />
            </View>
            {/* Password */}
            <View style={styles.contentAlignment}>
              <MaterialCommunityIcons name="key-outline" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Password"
                style={password ? { ...styles.textFields, fontSize: 18 } : { ...styles.textFields }}
              />
            </View>
          </View>
          {/* Submit Button */}
          <Pressable style={styles.btnContainer} onPress={loginUser}>
            <Text style={styles.btnText}>LOGIN</Text>
          </Pressable>
          {/* Register Screen Navigation */}
          <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate("Register")}>
            <Text style={{ fontSize: 16, color: "#8c92ac", textAlign: "center" }}>
              Don't Have an account ?
              <Text style={{ fontWeight: "600", color: "teal" }}> Sign up </Text>
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contentAlignment: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  textFields: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: 250,
    marginLeft: 14,
  },
  btnContainer: {
    width: 200,
    backgroundColor: "teal",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    padding: 15,
    marginTop: 40,
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnText: { color: "white", fontWeight: "600", fontSize: 18, textAlign: "center" },
});
