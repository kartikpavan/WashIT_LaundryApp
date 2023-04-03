import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase/firebase.config";

const ProfileScreen = () => {
  const navigation = useNavigation();
  // getting current user from auth middleware
  const user = auth.currentUser;

  //! Sign Out Current User
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <SafeAreaView style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="md-arrow-back"
            size={22}
            color="black"
          />
          <Text style={{ fontSize: 16 }}>Go Back</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 300 }}>
          <Pressable>
            <Text>Welcome</Text>
          </Pressable>
          <Pressable>
            <Text>{user?.email}</Text>
          </Pressable>
          <Pressable style={styles.signOutBtn} onPress={signOutUser}>
            <Text style={styles.signOutBtnText}>Sign Out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  signOutBtn: {
    width: 100,
    backgroundColor: "#E96479",
    padding: 15,
    borderRadius: 7,
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
  },
  signOutBtnText: { color: "#F0EEED", textAlign: "center", fontWeight: "500", fontSize: 16 },
});
