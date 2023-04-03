import { AntDesign, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Spinner from "react-native-loading-spinner-overlay";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async () => {
    if (email === "" || password === "" || phone === "") {
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
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials._tokenResponse.email;
      const userId = auth.currentUser.uid;
      await setDoc(doc(db, "users", `${userId}`), {
        email: user,
        phone: phone,
      });
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
            <Text style={{ fontSize: 20, fontWeight: "500", color: "teal" }}>Sign Up</Text>
            <Text style={{ color: "gray", fontSize: 16, marginTop: 7, fontWeight: "600" }}>
              Create a New Account
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
            <View style={styles.contentAlignment}>
              <AntDesign name="phone" size={24} color="black" />
              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="number-pad"
                placeholder="Phone Number"
                style={phone ? { ...styles.textFields, fontSize: 18 } : { ...styles.textFields }}
              />
            </View>
          </View>
          {/* Submit Button */}
          <Pressable style={styles.btnContainer} onPress={registerUser}>
            <Text style={styles.btnText}>REGISTER</Text>
          </Pressable>
          {/* Register Screen Navigation */}
          <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 16, color: "#8c92ac", textAlign: "center" }}>
              Already have an account ?
              <Text style={{ fontWeight: "600", color: "teal" }}> Sign In </Text>
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;

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
