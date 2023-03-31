import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCartQuantity, increaseCartQuantity } from "../redux/slice/cartSlice";
import { decreaseProductQuantity, increaseProductQuantity } from "../redux/slice/productSlice";

const SingleProduct = ({ item }) => {
   const { cart } = useSelector((store) => store.cart);
   const dispatch = useDispatch();

   const addItemToCart = () => {
      dispatch(addToCart(item)); // cart
      dispatch(increaseProductQuantity(item)); // product
   };

   return (
      <View style={styles.card}>
         <Pressable style={styles.cardContentAlign}>
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
            {/* Cart Item Qty */}
            {cart.some((cartItem) => cartItem.id === item.id) ? (
               <View style={styles.qtyBtnContainer}>
                  <Pressable
                     onPress={() => {
                        dispatch(decreaseCartQuantity(item)); // cart
                        dispatch(decreaseProductQuantity(item)); // product
                     }}
                  >
                     <Text style={styles.qtyBtn}>-</Text>
                  </Pressable>
                  <Text style={{ fontSize: 16, fontWeight: "500", color: "teal" }}>
                     {item.quantity}
                  </Text>
                  <Pressable
                     onPress={() => {
                        dispatch(increaseCartQuantity(item)); // cart
                        dispatch(increaseProductQuantity(item)); // product
                     }}
                  >
                     <Text style={styles.qtyBtn}>+</Text>
                  </Pressable>
               </View>
            ) : (
               <Pressable style={{ width: 80 }} onPress={addItemToCart}>
                  <Text style={styles.addBtn}>Add</Text>
               </Pressable>
            )}
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
   cardContentAlign: {
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
   qtyBtnContainer: {
      flexDirection: "row",
      width: 80,
      justifyContent: "center",
      alignItems: "center",
   },
   qtyBtn: {
      textAlign: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: 5,
      fontSize: 16,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: "teal",
      height: 25,
      width: 25,
      color: "teal",
   },
});
