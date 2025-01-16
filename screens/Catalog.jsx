import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const CatalogScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState(''); // 'priceAsc', 'priceDesc', 'rating'
  const [filterRating, setFilterRating] = useState(null); // Filter products by rating
  const [filterCategory, setFilterCategory] = useState(''); // Filter products by category
  const [categories, setCategories] = useState([]); // Store available categories
  const [showCategoryMenu, setShowCategoryMenu] = useState(false); // Control visibility of category dropdown

  useEffect(() => {
    axios
      .get('http://10.0.2.2:8000/api/product/')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        const productCategories = [
          ...new Set(response.data.map(product => product.category)),
        ];
        setCategories(['Все товары', ...productCategories]); // Add 'All Products' as the first option
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        setLoading(false);
      });
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);
    filterProducts(text, filterCategory);
  };

  const handleSort = option => {
    setSortOption(option);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (option === 'priceAsc') return a.price - b.price;
      if (option === 'priceDesc') return b.price - a.price;
      if (option === 'rating') return b.rating - a.rating;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const handleFilterByRating = rating => {
    setFilterRating(rating);
    filterProducts(searchQuery, filterCategory, rating);
  };

  const handleFilterByCategory = category => {
    setFilterCategory(category === 'Все товары' ? '' : category); // Clear category filter for "All Products"
    filterProducts(
      searchQuery,
      category === 'Все товары' ? '' : category,
      filterRating,
    );
    setShowCategoryMenu(false); // Close the category dropdown
  };

  // Function to filter products based on search, category, and rating
  const filterProducts = (searchText, category, rating) => {
    let filtered = products;

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by rating
    if (rating !== null) {
      filtered = filtered.filter(product => product.rating >= rating);
    }

    setFilteredProducts(filtered);
  };

  const renderItem = ({item}) => {
    const ratingText =
      item.rating === 1
        ? 'Звезда'
        : item.rating >= 2 && item.rating <= 4
        ? 'Звезды'
        : 'Звёзд';

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() =>
          navigation.navigate('ProductDetail', {productId: item.id})
        }>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.productImage} />
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>
            {item.price.toLocaleString()}₽
          </Text>
        </View>
        <Text style={styles.productRating}>
          Рейтинг: {item.rating} {ratingText}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Товары</Text>
        </View>
        <View style={styles.subtitleBox}>
          <Text style={styles.subtitle}>Широкий выбор аудиотехники</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.filters}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleSort('priceAsc')}>
          <Text>Цена ↑</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleSort('priceDesc')}>
          <Text>Цена ↓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleSort('rating')}>
          <Text>Рейтинг</Text>
        </TouchableOpacity>

        {/* Category Dropdown */}
        <View style={styles.categoryFilter}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowCategoryMenu(!showCategoryMenu)}>
            <Text>{filterCategory || 'Категория'}</Text>
          </TouchableOpacity>
          {showCategoryMenu && (
            <View style={styles.dropdownMenu}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleFilterByCategory(category)}>
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 10,
  },
  header: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchInput: {
    padding: 8,
    borderColor: '#ccc',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  productCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000', // Цвет тени
    shadowOffset: {width: 0, height: 2}, // Смещение тени по горизонтали и вертикали
    shadowOpacity: 0.5, // Прозрачность тени
    shadowRadius: 4, // Радиус размытия тени
    elevation: 1, // Для Android, чтобы добавить тень
    marginRight: 10,
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 135,

    borderRadius: 20,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  priceContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productPrice: {
    color: 'white',
    fontSize: 16,
  },
  productRating: {
    fontSize: 14,
    color: 'grey',
  },
  categoryFilter: {
    position: 'relative',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 50,
    top: 40,
    left: -10,
    right: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100', // Set width to the container's size
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  header: {
    marginVertical: 20,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row', // Ensure the title and subtitle are in a row
    alignItems: 'center', // Align items vertically in the center
  },
  titleBox: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  subtitleBox: {
    marginTop: 6,
    marginLeft: 10, // Space between the title and subtitle
    flex: 1, // Ensures subtitle takes up the remaining space
    alignItems: 'flex-end', // Aligns the subtitle to the right
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
    right: 5, // Aligns the text inside subtitle to the right
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default CatalogScreen;
