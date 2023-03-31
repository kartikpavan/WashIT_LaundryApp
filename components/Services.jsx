import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { services } from "../constants/services";

const Services = () => {
  return (
    <View style={{ padding: 10, margin: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        Services
      </Text>
      <FlatList
        keyExtractor={(index) => index.id}
        data={services}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                marginRight: 10,
                backgroundColor: "white",
              }}
              onPress={() => console.log(item?.name)}
            >
              <Image
                source={{ uri: item?.image }}
                style={{ width: 70, height: 70, resizeMode: "contain" }}
              />
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {item?.name}
              </Text>
            </Pressable>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
