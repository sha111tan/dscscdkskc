import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings"; // Используем библиотеку для звездного рейтинга

const Product = ({ product }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.productContainer}>
      <View style={styles.productInnerContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            alt={product.name}
          />
        </View>
        <View style={styles.productNameWrapper}>
          <Text style={styles.productName}>{product.name}</Text>
        </View>
        <View style={styles.ratingWrapper}>
          <Rating
            ratingCount={5}
            imageSize={20}
            startingValue={product.rating}
            readonly
            tintColor="#fbf1a9"
            type="custom"
            ratingColor="#ffb700"
            style={styles.rating}
          />
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.priceText}>{product.price} ₽</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5, // Тень для Android
    shadowColor: "#000", // Тень для iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productInnerContainer: {
    flex: 1,
    justifyContent: "space-between",
    textAlign: "center",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "contain",
  },
  productNameWrapper: {
    marginTop: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    maxHeight: 48, // Ограничиваем высоту для текста
    overflow: "hidden",
  },
  ratingWrapper: {
    marginTop: 10,
    alignItems: "center",
  },
  rating: {
    maxWidth: 100,
  },
  priceWrapper: {
    marginTop: 10,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  priceText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Product;
