import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Clock = ({ hour }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const targetTime = new Date();
    const [targetHour, targetMinute] = hour.split(':');
    targetTime.setHours(parseInt(targetHour, 10));
    targetTime.setMinutes(parseInt(targetMinute, 10));
    targetTime.setSeconds(0);

    const updateRemainingTime = () => {
      const now = new Date();
      let difference = targetTime - now;

      if (difference < 0) {
        difference += 24 * 60 * 60 * 1000; // 24 saat ekle
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setRemainingTime(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    };

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [hour]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{remainingTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 80,
    marginVertical: 10,
    backgroundColor: '#444db3',
    color: '#fff',
    fontWeight: 'semibold',
    padding: 10,
    borderRadius: 10,
  },
});

export default Clock;
