import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function CartScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Товары в корзине:</Text>
        <View style={styles.tableContainer}>
          <View style={styles.row}>
            <Text style={styles.tableHeader}>Название товара</Text>
            <Text style={styles.tableHeader}>Цена</Text>
            <Text style={styles.tableHeader}>Количество</Text>
            <Text style={styles.tableHeader}>Цена за товар</Text>
            <Text style={styles.tableHeader}>Удалить</Text>
          </View>
        </View>

        <Text style={styles.total}>Итого: ₽</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  tableContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  tableCell: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
