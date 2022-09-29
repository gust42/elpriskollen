import {Slider} from '@miblanchard/react-native-slider';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {calculatePrice} from '../logic/calculate';

const getTime = (time: number) => {
  const date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    time < new Date().getHours()
      ? new Date().getDate() + 1
      : new Date().getDate(),
    time,
  );

  const diff = Math.abs(new Date().getTime() - date.getTime()) / 3.6e6;
  console.log(date, diff);
  return Math.ceil(diff);
};

export const Home = () => {
  const [length, setLength] = useState(1);
  const price = calculatePrice(length);

  const startsIn = getTime(price.time + 1);
  const endsIn =
    startsIn > 12
      ? getTime(price.time + 1 + length) + 24
      : getTime(price.time + 1 + length);
  return (
    <View style={styles.container}>
      <Text>Längd på program som ska köras: {length}h</Text>
      <Slider
        step={1}
        value={length}
        minimumValue={1}
        maximumValue={12}
        onValueChange={value => setLength((value as number[])[0])}
      />
      {/* <Text>{price.price.toPrecision(3)}kr</Text> */}

      <Text>Elen är billigast kl {price.time + 1}:00</Text>
      <Text>
        Programmet ska starta om {startsIn}h och sluta om {endsIn}h
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
