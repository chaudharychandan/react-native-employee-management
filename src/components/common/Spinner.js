import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ size, color }) =>
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || 'large'} color={color} />
  </View>;

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export { Spinner };
