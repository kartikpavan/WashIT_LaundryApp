import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BottomCartInfo from "../components/BottomCartInfo";
import { deliveryTime, exactTime } from "../data/deliveryTime";

const PickupScreen = () => {
   const [selectedDate, setSelectedDate] = useState("");
   const [selectedTime, setSelectedTime] = useState([]);
   const [selectedDeliveryDate, setSelectedDeliveryDate] = useState([]);
   console.log(selectedDate);
   console.log(selectedTime);
   console.log(selectedDeliveryDate);

   const { cart } = useSelector((store) => store.cart);
   const navigation = useNavigation();
   // Cart Total Price
   const total_cart_price = cart
      .map((item) => item.quantity * item.price)
      .reduce((total, current) => total + current, 0);

   const add_7_days_to_current_day = () => {
      const days = 7;
      const date = new Date();
      const result = date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      return result;
   };

   const proceedToCart = () => {
      if (!selectedDate || !selectedDeliveryDate || !selectedTime) {
         Alert.alert("Invalid Information", "Please fill all the fields", [
            {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
         ]);
      }
      if (selectedDate && selectedDeliveryDate && selectedTime) {
         navigation.replace("Cart");
      }
   };

   return (
      <>
         <ScrollView>
            <SafeAreaView>
               {/* ADDRESS */}
               <View>
                  <Text style={{ fontSize: 16, fontWeight: "500", padding: 10 }}>
                     Enter Address
                  </Text>
                  <TextInput multiline={true} numberOfLines={10} style={styles.textArea} />
               </View>
               {/* DATE PICKUP */}
               <View>
                  <Text style={{ fontSize: 16, fontWeight: "500", padding: 10 }}>Pick up date</Text>
                  <HorizontalDatepicker
                     mode="gregorian"
                     startDate={new Date()}
                     endDate={new Date(add_7_days_to_current_day())}
                     // initialSelectedDate={new Date()}
                     onSelectedDateChange={(date) => setSelectedDate(date)}
                     selectedItemWidth={170}
                     unselectedItemWidth={38}
                     itemHeight={38}
                     itemRadius={10}
                     selectedItemTextStyle={styles.selectedItemTextStyle}
                     unselectedItemTextStyle={styles.selectedItemTextStyle}
                     selectedItemBackgroundColor="#222831"
                     unselectedItemBackgroundColor="#ececec"
                     flatListContainerStyle={styles.flatListContainerStyle}
                  />
               </View>

               {/* TIME PICKUP */}
               <Text style={{ fontSize: 16, fontWeight: "500", padding: 10 }}>Select Time</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {exactTime.map((item) => {
                     return (
                        <Pressable
                           onPress={() => setSelectedTime(item.time)}
                           key={item.id}
                           style={
                              selectedTime.includes(item.time)
                                 ? {
                                      margin: 10,
                                      borderRadius: 7,
                                      padding: 10,
                                      backgroundColor: "black",
                                   }
                                 : {
                                      margin: 10,
                                      borderRadius: 7,
                                      padding: 10,
                                      borderColor: "gray",
                                      borderWidth: 1,
                                   }
                           }
                        >
                           <Text
                              style={
                                 selectedTime.includes(item.time)
                                    ? { color: "white" }
                                    : { color: "black" }
                              }
                           >
                              {item.time}
                           </Text>
                        </Pressable>
                     );
                  })}
               </ScrollView>
               {/* Delivery Date */}
               <View>
                  <Text style={{ fontSize: 16, fontWeight: "500", padding: 10 }}>
                     Delivery date
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                     {deliveryTime.map((item) => {
                        return (
                           <Pressable
                              key={item.id}
                              onPress={() => setSelectedDeliveryDate(item.name)}
                              style={
                                 selectedDeliveryDate.includes(item.name)
                                    ? {
                                         margin: 10,
                                         borderRadius: 7,
                                         padding: 10,
                                         backgroundColor: "black",
                                      }
                                    : {
                                         margin: 10,
                                         borderRadius: 7,
                                         padding: 10,
                                         borderColor: "gray",
                                         borderWidth: 1,
                                      }
                              }
                           >
                              <Text
                                 style={
                                    selectedDeliveryDate.includes(item.name)
                                       ? { color: "white" }
                                       : { color: "black" }
                                 }
                              >
                                 {item.name}
                              </Text>
                           </Pressable>
                        );
                     })}
                  </ScrollView>
               </View>
            </SafeAreaView>
         </ScrollView>
         {total_cart_price === 0 ? null : (
            <Pressable style={styles.container}>
               <View>
                  <Text style={{ fontSize: 16, fontWeight: 500, color: "#f5f5f5" }}>
                     {cart.length} item(s) | ₹{total_cart_price}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#f5f5f5" }}>
                     * Extra Charges might apply
                  </Text>
               </View>
               <Pressable style={styles.proceedFurtherBtn} onPress={proceedToCart}>
                  <Text style={{ fontSize: 17, fontWeight: 500, color: "teal" }}>
                     Proceed to Cart
                  </Text>
               </Pressable>
            </Pressable>
         )}
      </>
   );
};

export default PickupScreen;

const styles = StyleSheet.create({
   textArea: {
      height: 100,
      textAlignVertical: "top",
      borderColor: "gray",
      borderRadius: 7,
      padding: 10,
      borderWidth: 1,
      marginHorizontal: 10,
      marginBottom: 10,
   },
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
      width: 140,
      borderWidth: 1,
      borderColor: "white",
      padding: 5,
      backgroundColor: "#f5f5f5",
      borderRadius: 7,
   },
});
