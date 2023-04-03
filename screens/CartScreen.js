import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomCartInfo from "../components/BottomCartInfo";
import { decreaseCartQuantity, increaseCartQuantity } from "../redux/slice/cartSlice";
import { decreaseProductQuantity, increaseProductQuantity } from "../redux/slice/productSlice";

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { cart } = useSelector((store) => store.cart);
  const total_cart_price = cart
    .map((item) => item.quantity * item.price)
    .reduce((total, current) => total + current, 0);

  return (
    <>
      <ScrollView>
        <SafeAreaView style={{ padding: 0 }}>
          {total_cart_price === 0 ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ marginVertical: 40 }}>Cart is Empty</Text>
            </View>
          ) : (
            <>
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
                <Text style={{ fontSize: 16 }}>Your Bucket</Text>
              </View>
              <Pressable style={styles.card}>
                {cart.map((item, idx) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: 12,
                      }}
                    >
                      {/* name */}

                      <View style={{ alignItems: "center" }}>
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                        <Text
                          style={{
                            width: 100,
                            fontWeight: "500",
                            fontSize: 16,
                            textAlign: "center",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* Button to + / - cart qty */}
                      <View style={styles.qtyBtnContainer}>
                        <Pressable
                          onPress={() => {
                            dispatch(decreaseCartQuantity(item)); // cart
                            dispatch(decreaseProductQuantity(item)); // product
                          }}
                        >
                          <Text style={styles.qtyBtn}>-</Text>
                        </Pressable>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: "teal",
                          }}
                        >
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
                      {/* Price */}

                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 16,
                          width: 80,
                          textAlign: "right",
                        }}
                      >
                        ₹{item.price * item.quantity}.00
                      </Text>
                    </View>
                  );
                })}
              </Pressable>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Billing Details</Text>
                <View style={styles.card}>
                  {/*   Total*/}
                  <View style={styles.contentAlignment}>
                    <Text style={{ fontSize: 15, color: "gray" }}>Item Total</Text>
                    <Text style={{ fontWeight: "500", fontSize: 15 }}>₹{total_cart_price}.00</Text>
                  </View>
                  {/*Delivery Detail*/}
                  <View style={styles.contentAlignment}>
                    <Text style={{ color: "gray", fontSize: 15 }}>Delivery charges </Text>
                    <Text style={{ fontWeight: "500", fontSize: 15, color: "teal" }}>₹15.00</Text>
                  </View>
                  {/* Horizontal line */}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#C0C0C0",
                      marginVertical: 3,
                    }}
                  ></View>
                  {/* Pickup and Delivery Time */}
                  <View style={styles.contentAlignment}>
                    <Text style={{ color: "gray", fontSize: 15 }}>Pickup Date</Text>
                    <Text style={{ fontWeight: "500", fontSize: 15, color: "teal" }}>
                      {route.params.selectedDate}
                    </Text>
                  </View>
                  <View style={styles.contentAlignment}>
                    <Text style={{ color: "gray", fontSize: 15 }}>Pickup Time</Text>
                    <Text style={{ fontWeight: "500", fontSize: 15, color: "teal" }}>
                      {route.params.selectedTime}
                    </Text>
                  </View>
                  <View style={styles.contentAlignment}>
                    <Text style={{ color: "gray", fontSize: 15 }}>Estimate Delivery</Text>
                    <Text style={{ fontWeight: "500", fontSize: 15, color: "teal" }}>
                      {route.params.selectedDeliveryDate}
                    </Text>
                  </View>
                  {/* Horizontal line */}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#C0C0C0",
                      marginVertical: 3,
                    }}
                  ></View>
                  {/* Total Payment */}
                  <View style={styles.contentAlignment}>
                    <Text style={{ color: "gray", fontSize: 18 }}>Amount to Pay</Text>
                    <Text style={{ fontWeight: "500", fontSize: 18 }}>
                      ₹{total_cart_price + 15}.00
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </SafeAreaView>
      </ScrollView>
      <BottomCartInfo currentScreen={"CartScreen"} />
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 7,
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
  contentAlignment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
