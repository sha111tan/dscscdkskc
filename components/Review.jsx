import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Review({product}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const sendReview = async () => {
    const currentUser = await AsyncStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      let alreadyReviewed = false;

      // Check if the user has already reviewed the product
      for (let i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].user_id === user.id) {
          alreadyReviewed = true;
        }
      }

      if (alreadyReviewed) {
        Alert.alert('You have already reviewed this product');
      } else {
        const review = {
          rating: rating,
          comment: comment,
          user_id: user.id, // Assuming you are passing the user id
          product_id: product.id,
        };

        // Send the review via API
        try {
          await axios.post('http://10.0.2.2:8000/api/product/review', review);
          Alert.alert('Review submitted successfully!');
          // You can dispatch a Redux action or update state to reflect the new review
        } catch (error) {
          console.error(error);
          Alert.alert('Failed to submit review');
        }
      }
    } else {
      Alert.alert('Please log in to leave a review');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Review:</Text>

      <Rating
        imageSize={30}
        style={styles.rating}
        startingValue={rating}
        onFinishRating={setRating}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your comment"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity onPress={sendReview} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    marginVertical: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
