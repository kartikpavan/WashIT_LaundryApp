import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";

const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Check whether location service is enabled by user
  const check_if_location_enabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please Enable Location Services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocationEnabled(enabled);
    }
  };

  // Get current Location of the user
  const get_current_location = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Location premission denied",
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
        let address = `${item.name},${item.city},${item.district},${item.postalCode}`;
        setCurrentLocation(address);
      }
    }
  };

  useEffect(() => {
    check_if_location_enabled();
    get_current_location();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>{currentLocation}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
