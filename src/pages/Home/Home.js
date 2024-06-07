import { FlatList, Text, View, } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetch from '../../Hooks/useFetch'
import Card from '../../components/CustomCard/Card'
import styles from './Home.style'
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import Clock from '../../components/Clock/Clock'
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'


const apiUrl ="https://api.collectapi.com/pray/all?data.city="



const Home = () => {
  const [city, setCity] = useState('gaziantep');
  const [url, setUrl] = useState(`${apiUrl}${city}`);


  const {data, loading, error} = useFetch(url,
    {
        headers: {
          'content-type': 'application/json',
          'authorization': 'apikey 7dCHhADQi7QYfLKCkcyfWx:6sPgImQySbItNoVcsFLhJ3',
        },
      })

      

      useEffect(() => {
        setUrl(`${apiUrl}${city}`);
      }, [city, nextTime]);



  let nextTime = '';

  const now = new Date();
const currentTime = now.getHours() * 60 + now.getMinutes(); 
const times = data.result && data.result.map(item => item.saat.split(':').map(Number));

for (let i = 0; i < times.length; i++) {
  const [hour, minute] = times[i];
  const timeInMinutes = hour * 60 + minute; 
  if (timeInMinutes > currentTime) { 
    nextTime = data.result[i].saat;; 
    break; 
  }
}

if (!nextTime || moment().isAfter(moment(nextTime, 'HH:mm'))) {
  nextTime = data.result[0].saat;
}

console.log(nextTime)

    



 
      const renderItem = ({ item }) => {
        return <Card item={item}/>
      };

      
      if (loading) return <Loading />;
      if (error) return <Error />; 

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
        <View style={styles.flatContainer}>
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



