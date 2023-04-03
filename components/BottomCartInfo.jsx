import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase/firebase.config";
import { clearCart } from "../redux/slice/cartSlice";

const BottomCartInfo = ({ currentScreen }) => {
  const { cart } = useSelector((store) => store.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const userId = auth.currentUser.uid;

  //! Place Order
  const placeOrder = async () => {
    navigation.navigate("Orders");
    dispatch(clearCart());
    await setDoc(
      doc(db, "users", userId),
      {
        orders: [...cart],
        pickupDetails: route.params,
      },
      { merge: true }
    );
  };

  const navigate_to_next_screen = () => {
    if (currentScreen === "HomeScreen") {
      navigation.navigate("Pickup");
    } else if (currentScreen === "PickupScreen") {
      navigation.navigate("Cart");
    } else if (currentScreen === "CartScreen") {
      placeOrder();
    }
  };
  // Cart Total Price
  const total_cart_price = cart
    .map((item) => item.quantity * item.price)
    .reduce((total, current) => total + current, 0);
  return (
    <>
      {total_cart_price === 0 ? null : (
        <Pressable style={styles.container}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 500, color: "#f5f5f5" }}>
              {cart.length} item(s) | ₹{total_cart_price}
            </Text>
            <Text style={{ fontSize: 13, color: "#f5f5f5" }}>* Extra Charges might apply</Text>
          </View>
          <Pressable style={styles.proceedFurtherBtn} onPress={navigate_to_next_screen}>
            <Text style={{ fontSize: 17, fontWeight: 500, color: "teal", textAlign: "center" }}>
              {currentScreen === "CartScreen" ? "Place Order" : "Proceed to Pickup"}
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default BottomCartInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "teal",
    padding: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  proceedFurtherBtn: {
    width: 160,
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 7,
  },
});
