import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Review from '../components/Review'; // Import the Review component

const ProductDetailScreen = ({route}) => {
  const {productId} = route.params; // Retrieve productId from navigation params
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details
    axios
      .get(`http://10.0.2.2:8000/api/product/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });

    // Fetch reviews for the specific product
    axios
      .get(`http://10.0.2.2:8000/api/review/?product=${productId}`) // Filter reviews by productId
      .then(response => {
        console.log('Reviews data:', response.data); // Debugging: Log reviews data
        setReviews(response.data); // Reviews filtered by productId
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
  }, [productId]); // Refetch when productId changes

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  // Header component for FlatList (product details)
  const renderHeader = () => (
    <View>
      <Image source={{uri: product.image}} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price.toLocaleString()}₽</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
      <Text style={styles.productRating}>
        Rating: {product.rating} {product.rating === 1 ? 'Star' : 'Stars'}
      </Text>
    </View>
  );

  // Footer component for FlatList (Review component)
  const renderFooter = () => <Review product={product} />;

  return (
    <FlatList
      data={reviews}
      ListHeaderComponent={renderHeader} // Product details at the top
      ListFooterComponent={renderFooter} // Review component at the bottom
      renderItem={({item}) => (
        <View style={styles.reviewItem}>
          <Text style={styles.reviewUsername}>{item.name}</Text>
          <Text style={styles.reviewText}>{item.comment}</Text>
          <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  productCategory: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  productRating: {
    fontSize: 16,
    color: 'gray',
  },
  reviewItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: 'gray',
  },
  reviewRating: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
});

export default ProductDetailScreen;
