import { FlatList, Text, View, } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetch from '../../Hooks/useFetch'
import Card from '../../components/CustomCard/Card'
import styles from './Home.style'
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import Clock from '../../components/Clock/Clock'
import { AntDesign } from '@expo/vector-icons';

const apiUrl ="https://api.collectapi.com/pray/all?data.city="



const Home = () => {
  const [city, setCity] = useState('gaziantep');
  const [url, setUrl] = useState(`${apiUrl}${city}`);
  const [data, setData] = useState({
    "result": [{"saat": "03:20", "vakit": "İmsak"}, {"saat": "05:04", "vakit": "Güneş"}, {"saat": "12:34", "vakit": "Öğle"}, {"saat": "16:25", "vakit": "İkindi"}, {"saat": "19:54", "vakit": "Akşam"}, {"saat": "21:30", "vakit": "Yatsı"}]
  })



  let nextTime = '';

  const now = new Date();
const currentTime = now.getHours() * 60 + now.getMinutes(); // Şu anki saati dakika cinsinden al
const times = data.result.map(item => item.saat.split(':').map(Number)); // Saatleri ayrıştır ve sayısal değerlere dönüştür

for (let i = 0; i < times.length; i++) {
  const [hour, minute] = times[i];
  const timeInMinutes = hour * 60 + minute; // Vakti dakika cinsinden al
  if (timeInMinutes > currentTime) { // Şu anki zamandan sonra olan ilk vakti bul
    nextTime = data.result[i].saat;; // İlgili vaktin saati
    break; // Bulduktan sonra döngüyü sonlandır
  }
}

if (!nextTime || moment().isAfter(moment(nextTime, 'HH:mm'))) {
  nextTime = data.result[0].saat; // İlk vakti alırız
}

console.log(nextTime)
    

  // const {data} = useFetch(url,
  //   {
  //       headers: {
  //         'content-type': 'application/json',
  //         'authorization': 'apikey 2EKqpGBZT799DrlVLrpR0g:71k5c2RIxO2SnL3g5PU8U2',
  //       },
  //     })

      // console.log("data",data)
      

      // useEffect(() => {
      //   setUrl(`${apiUrl}${city}`);
      // }, [city]);


      const renderItem = ({ item }) => {
        return <Card item={item}/>
      };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Ezan Saatim</Text>
        <Clock hour={nextTime} />
          <View style={styles.pickerSelect}>
            <RNPickerSelect
            style={{
              inputAndroid: styles.inputAndroid
            }}
            onValueChange={(value) => setCity(value)}
            items={[
              { label: 'Gaziantep', value: 'gaziantep' },
              { label: 'İstanbul', value: 'istanbul' },
              { label: 'Ankara', value: 'ankara' },
            ]}    
            placeholder={{
              label: 'Şehir Seç',
              value: city,
              color: '#000',
            }}
            Icon={()=> <AntDesign style={styles.icon} name="caretdown" size={15} color="#fff" />}
            />
          </View>
          
      </View>
        <View>
        <FlatList 
        data={data.result}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

export default Home



