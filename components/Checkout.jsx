import React from 'react';
import {Button, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {placeOrder} from '../redux/order.slice';
import {useStripe} from '@stripe/stripe-react-native';

export default function Checkout({amount}) {
  const dispatch = useDispatch();
  const orderState = useSelector(state => state.orderReducer);
  const cartreducerstate = useSelector(state => state.cartReducer);
  const {cartItems} = cartreducerstate;
  const {placeOrderLoading, placeOrderSuccess, placeOrderError} = orderState;

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const tokenHandler = async () => {
    // Initialize payment sheet
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: 'your-client-secret-here', // Replace with your secret
    });

    if (!error) {
      const {error: presentError, paymentIntent} = await presentPaymentSheet();
      if (presentError) {
        console.log('Payment failed', presentError);
      } else {
        console.log('Payment successful!', paymentIntent);
        dispatch(
          placeOrder({
            cartItems,
            currentUser,
            subtotal: amount,
          }),
        );
      }
    }
  };

  return (
    <View>
      {placeOrderLoading && <Text>Loading...</Text>}
      {placeOrderSuccess && <Text>Order Placed Successfully</Text>}
      {placeOrderError && <Text>Error: {placeOrderError}</Text>}

      <Button title="Оплатить" onPress={tokenHandler} />
    </View>
  );
}
