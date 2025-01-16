import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import CatalogScreen from './screens/Catalog';
import ProductDetailScreen from './screens/ProductDetail';
import CartScreen from './screens/Cart';
import Navbar from './components/Navbar';
import {Footer} from './components/Footer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Correct use of Stack.Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
};

export default App;
