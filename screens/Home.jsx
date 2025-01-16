import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation(); // Get navigation object

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Main Section */}
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>SOUNDSCAPE</Text>
          <Text style={styles.subHeading}>AUDIOSTORE.</Text>
          <Text style={styles.description}>Онлайн-магазин аудиотехники</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Catalog')}>
              <Text style={styles.buttonText}>Товары</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.header}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Услуги</Text>
          </View>
          <View style={styles.subtitleBox}>
            <Text style={styles.subtitle}>Выбор услуг нашего магазина</Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productContainer}>
          <View style={styles.productList}>
            {/* Example of a Card Component */}
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Image
                  source={require('../public/img7.jpg')} // Укажите правильный путь к изображению
                  style={styles.cardImage}
                />
                {/* Текст поверх изображения */}
                <View style={styles.textOverlay}>
                  <Text style={styles.cardTitle}>Широкий ассортимент</Text>
                  <Text style={styles.cardDescription}>
                    Мы предлагаем широкий выбор аудиооборудования: от наушников
                    и колонок до профессиональной звуковой техники.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={require('../public/img6.jpg')} // Укажите правильный путь к изображению
                style={styles.cardImage}
              />
              {/* Текст поверх изображения */}
              <View style={styles.textOverlay}>
                <Text style={styles.cardTitle}>Консультации экспертов</Text>
                <Text style={styles.cardDescription}>
                  Наши специалисты всегда готовы помочь вам выбрать идеальное
                  аудиооборудование, отвечая на ваши вопросы и предоставляя
                  рекомендации.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={require('../public/img8.jpg')} // Укажите правильный путь к изображению
                style={styles.cardImage}
              />
              {/* Текст поверх изображения */}
              <View style={styles.textOverlay}>
                <Text style={styles.cardTitle}>Быстрая доставка</Text>
                <Text style={styles.cardDescription}>
                  Быстрая и надежная доставка.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={require('../public/img9.jpg')} // Укажите правильный путь к изображению
                style={styles.cardImage}
              />
              {/* Текст поверх изображения */}
              <View style={styles.textOverlay}>
                <Text style={styles.cardTitle}>Гарантия</Text>
                <Text style={styles.cardDescription}>
                  Гарантия на всю продукцию
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 10,
  },

  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2B2A2C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heading: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',

    transform: [{scaleX: 1.15}],
    letterSpacing: -0.06,
  },
  subHeading: {
    fontSize: 38,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -12,

    transform: [{scaleX: 1.15}],
    letterSpacing: -0.06,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
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

  productContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#52525b',
    marginBottom: 15,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    marginBottom: 15,

    marginRight: width > 600 ? 20 : 0, // Add responsive margin for larger screens
  },
  card: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,

    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    position: 'relative', // Для корректного позиционирования текста
  },
  cardImage: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
  },
  textOverlay: {
    position: 'absolute', // Абсолютное позиционирование
    top: 0, // Текст будет внизу изображения
    left: 0,
    right: 0,
    // Полупрозрачный фон для текста
    padding: 25,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // Белый текст для контраста
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#fff', // Белый текст для контраста
  },
});
