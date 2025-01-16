import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Navbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../public/home.png')}
          style={styles.footerIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Catalog')}>
        <Image
          source={require('../public/catalog.png')}
          style={styles.footerIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('Cart')}>
        <Image
          source={require('../public/cart.png')}
          style={styles.footerIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2B2A2C',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  footerIcon: {
    width: 30, // Укажите нужные размеры
    height: 30, // Укажите нужные размеры
  },
});

export default Navbar;
