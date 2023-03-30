import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://www.goteso.com/products/assets/images/clone-scripts/laundrapp/laundrapp-clone-banner.png",
    "https://richestsoft.com/images/flycleaners-clone-banner.png",
    "https://www.lilacinfotech.com/lilac_assets/images/what-we-do/app-development/on-demand/laundry/banner.jpg",
  ];
  return (
    <SliderBox
      images={images}
      autoplay
      autoplayInterval={5000}
      circleLoop
      dotColor="#13274f"
      inactiveDotColor="#90A4AE"
      ImageComponentStyle={{ borderRadius: 7, width: "95%", marginTop: 5 }}
    />
  );
};

export default Carousel;
