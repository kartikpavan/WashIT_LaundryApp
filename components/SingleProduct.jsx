import React from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

const SingleProduct = ({ item }) => {
  return (
    <View style={styles.card}>
      <Pressable style={styles.contentAlign}>
        {/* Image */}
        <Image
          source={{ uri: item?.image }}
          style={{ width: 70, height: 70, resizeMode: "cover" }}
        />
        {/* Name and Price */}
        <View>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemPrice}>₹{item?.price}</Text>
        </View>
        {/* Button */}
        <Pressable style={{ width: 80 }}>
          <Text style={styles.addBtn}>Add</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    borderRadius: 7,
  },
  contentAlign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    width: 80,
    fontSize: 17,
    fontWeight: 500,
    marginBottom: 5,
  },
  itemPrice: {
    fontWeight: "500",
    color: "gray",
    fontSize: 15,
    width: 60,
  },
  addBtn: {
    borderColor: "gray",
    borderWidth: 1,
    borderColor: "teal",
    color: "teal",
    borderRadius: 3,
    textAlign: "center",
    padding: 3,
    fontWeight: "500",
  },
});
