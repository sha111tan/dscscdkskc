import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import { Animated } from "react-native";

export const Footer = () => {
  // Анимация для "fade down"
  const [fadeAnim] = useState(new Animated.Value(0)); // начальное значение opacity = 0

  React.useEffect(() => {
    // Начинаем анимацию после монтирования компонента
    Animated.spring(fadeAnim, {
      toValue: 1,
      friction: 3, // для плавности анимации
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fadeIn, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>Версия приложения: 0.0.7</Text>
        <Text style={styles.footerText}>Разработчики: @shaita1n @whayido</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
    position: "absolute", // Чтобы футер был внизу экрана
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10, // Немного отступа сверху
    paddingHorizontal: 20,
    backgroundColor: "white", // Цвет фона футера
    alignItems: "center", // Центрируем текст
    justifyContent: "center",
    zIndex: 1,
  },
  fadeIn: {
    transform: [{ translateY: 0 }], // Можно добавить эффект подъема по оси Y
  },
  footerText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});
