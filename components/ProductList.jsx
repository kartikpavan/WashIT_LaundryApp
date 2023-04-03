import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../data/products";
import { db } from "../firebase/firebase.config";
import { getProducts } from "../redux/slice/productSlice";
import SingleProduct from "./SingleProduct";

const ProductList = () => {
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (product.length > 0) return; // to prevent duplication of items after each dispatch event is called.
    const fetch_products = async () => {
      const querySnapshot = await getDocs(collection(db, "types"));
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((p) => dispatch(getProducts(p)));
    };
    fetch_products();
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
