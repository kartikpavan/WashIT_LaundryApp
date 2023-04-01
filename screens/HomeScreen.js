import React, { useEffect, useState } from "react";
import {
   Alert,
   Image,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Icons
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
// Components
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import Services from "../components/Services";

// redux
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomCartInfo from "../components/BottomCartInfo";

const HomeScreen = () => {
   const { cart } = useSelector((store) => store.cart);
   const navigation = useNavigation();
   // // Cart Total Price
   // const total_cart_price = cart
   //    .map((item) => item.quantity * item.price)
   //    .reduce((total, current) => total + current, 0);

   const [currentLocation, setCurrentLocation] = useState(null);
   const [locationEnabled, setLocationEnabled] = useState(false);

   // Check whether location service is enabled by user
   const check_if_location_enabled = async () => {
      let enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
         Alert.alert("Location services not enabled", "Please Enable Location Services", [
            {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
         ]);
      } else {
         setLocationEnabled(enabled);
      }
   };

   // Get current Location of the user
   const get_current_location = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
         Alert.alert(
            "Location permission denied",
            "Please allow the App to use the Location Services",
            [
               {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
               },
               { text: "OK", onPress: () => console.log("OK Pressed") },
            ]
         );
      }
      const { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
         const { latitude, longitude } = coords;
         // to get Precise Location , we apply reverseGeocodeAsync method
         const response = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
         });
         for (let item of response) {
            let address = `${item?.name},${item?.city},${item?.district},${item.postalCode}`;
            setCurrentLocation(address);
         }
      }
   };

   useEffect(() => {
      check_if_location_enabled();
      get_current_location();
   }, []);

   return (
      <>
         <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
            <SafeAreaView>
               {/* HEADER BAR */}
               <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                  <MaterialIcons name="location-pin" size={30} color="teal" />
                  <View>
                     <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                     <Text>{currentLocation}</Text>
                  </View>
                  <Pressable style={{ marginLeft: "auto" }}>
                     <Image
                        source={{
                           uri: "https://lh3.googleusercontent.com/ogw/AAEL6sj0LzuCCYKqBhKhalqLRYzRVw6auSNzGYXPzENb_g=s32-c-mo",
                        }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                     />
                  </Pressable>
               </View>
               {/* SEARCH BAR */}
               <View style={styles.searchContainer}>
                  <TextInput style={{ width: 250 }} placeholder="Search for items or more ..." />
                  <Feather name="search" size={24} color="teal" />
               </View>
               {/* CAROUSEL */}
               <Carousel />
               {/* SERVICES */}
               <Services />
               {/* PRODUCTS */}
               <ProductList />
            </SafeAreaView>
         </ScrollView>
         {/* Bottom Cart Informaton */}
         <BottomCartInfo />
      </>
   );
};

export default HomeScreen;

const styles = StyleSheet.create({
   searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      margin: 10,
      borderWidth: 0.8,
      borderColor: "#c5c6D0",
      borderRadius: 7,
   },
});
