import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { products } from "../data/products";
import SingleProduct from "./SingleProduct";

const ProductList = () => {
  return (
    <View style={{ paddingHorizontal: 10, marginHorizontal: 10 }}>
      {products.map((item) => {
        return <SingleProduct item={item} key={item.id} />;
      })}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
