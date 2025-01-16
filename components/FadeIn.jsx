import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const FadeIn = ({ children, delay, direction, fullWidth, padding }) => {
  const animationRef = useRef(null);

  const animationType = direction === 'right' ? 'fadeInRight' :
    direction === 'left' ? 'fadeInLeft' :
    direction === 'up' ? 'fadeInUp' :
    direction === 'down' ? 'fadeInDown' : 'fadeIn';

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.animate(animationType, 1000, delay);
    }
  }, [delay, direction]);

  return (
    <View
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        padding && styles.padding,
      ]}
    >
      <Animatable.View
        ref={animationRef}
        style={styles.animatedView}
      >
        {children}
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  padding: {
    paddingHorizontal: 10,
  },
  animatedView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FadeIn;
