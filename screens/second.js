import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ListView } from 'react-native';
import Dash from 'react-native-dash';
import { TouchableOpacity, TextInput, FlatList } from 'react-native-gesture-handler';


function Second({navigation}) {
   
    const [city,changeCity] = useState('');
    const [data, recData] = useState();
    const [set, setList] = useState(false);

    async function searchCities(city){
      await fetch('https://www.cleartrip.com/places/airports/search?string='+city)
        .then((res)=> res.json())
        .then((res)=>{
          recData(res)
          setList(true)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    

    return (
      <SafeAreaView>
        <TextInput 
          style={styles.input}
          placeholder = "Enter City"
          onChangeText={(text)=>{
            changeCity(text);
            if(city.length>=2)
                searchCities()
          }}
          onSubmitEditing={()=>{
            searchCities();
          }}
        />
       <FlatList
          numColumns = {3}
          data = {data}
          renderItem = {(row)=>{
            var cityLen = row.item['v'].indexOf('-')
            var code = row.item['v'].indexOf('(');

            var town = row.item['v'].slice(0, cityLen);
            var air = row.item['v'].slice(cityLen+1, code);

            return (
              <TouchableOpacity onPress={()=>{navigation.navigate('FlightBooking', {data: {dat:row.item['k']}})}}>
                <View style={styles.main}>
                  <View style={styles.city}>
                    <Text style={{fontSize: 20}}>{town}</Text>
                    <Text style={{fontSize: 16}}>{air}</Text>
                  </View>
                  <Text style={{fontSize: 18, alignSelf: 'center'}}>{row.item['k']}</Text>
                </View>
            </TouchableOpacity>
            )
          }}
          keyExtractor= {(row)=>row["k"].toString()}
          extraData = {data}
        />
      </SafeAreaView>
    )
  }

const styles = StyleSheet.create({

  city:{
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: '5%'
  },

  main:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: '5%',
    padding: '2%',
    // marginLeft: 'auto',
    width: '80%',
    // alignSelf: 'center',
    backgroundColor: 'white',
    shadowOpacity: 0.2,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 5,
    elevation: 5,
  },

  input:{
    width: '100%',
    padding: '5%'
,    paddingLeft: '15%',
    paddingRight: '5%',
    marginTop: '10%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor:'grey',
  fontSize: 18,
  backgroundColor: 'white',
  shadowOpacity: 0.2,
        shadowOffset: { height: 5, width: 0 },
        shadowRadius: 5,
        elevation: 5,
  }
});


export default Second;
