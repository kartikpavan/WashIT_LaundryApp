import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../data/products";
import { getProducts } from "../redux/slice/productSlice";
import SingleProduct from "./SingleProduct";

const ProductList = () => {
   const { product } = useSelector((store) => store.product);
   const dispatch = useDispatch();

   useEffect(() => {
      if (product.length > 0) return; // to prevent duplication of items after each dispatch event is called.
      const fetch_local_products = () => {
         products.map((item) => dispatch(getProducts(item)));
      };
      fetch_local_products();
   }, []);

   return (
      <View style={{ paddingHorizontal: 10, marginHorizontal: 10 }}>
         {product.map((item) => {
            return <SingleProduct item={item} key={item.id} />;
         })}
      </View>
   );
};

export default ProductList;

const styles = StyleSheet.create({});
