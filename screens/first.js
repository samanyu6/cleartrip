import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView , Image, TouchableOpacity} from 'react-native';
import Dash from 'react-native-dash';
import { TextInput, FlatList } from 'react-native-gesture-handler';

function First (){

    const [city,changeCity] = useState('');
    const [data, recData] = useState();
    const [set, setList] = useState(false);
    const [show, setShow] = useState(false);
    const [town, setTown] = useState('From');

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
     (!show)? <SafeAreaView style={{ flex:1,flexDirection: 'column', justifyContent: 'space-evenly'}}>

        <View style={styles.mainTab}>
          <View style={styles.tabView}>
            <View style={styles.text}>
              <Text style={styles.textStyle}>One-Way</Text>
              <Dash style={{width: '90%', height: 0.25, flexDirection: 'row', alignSelf: 'center'}} dashGap={0} dashColor='blue'/>
            </View>
            <Dash style={{width: 0.25, height: '75%', flexDirection: 'column',}} dashThickness={1} dashGap={0} dashColor='grey'/>
            <Text style={styles.common}>Round-Trip</Text>
            <Dash style={{width: 0.25, height: '75%', flexDirection: 'column'}} dashThickness={1} dashGap={0} dashColor='grey'/>
            <Text style={styles.common}>Multi-City</Text>
          </View>
        </View>

        <View style={styles.fromTo}>
          <TouchableOpacity onPress={()=> setShow(true)}>
           <Text style={styles.fromtoText}> {town} </Text>
          </TouchableOpacity>
          <Image source={require('../assets/double-arrow.png') }/>
          <Text style={styles.fromtoText}> To </Text>
        </View>

        <View style={styles.bookings}>
          
          <View style={styles.withinBookings}>
            <View style={styles.depart}>
              <Text style={styles.depText}>Departure date</Text>
              <Text style={styles.depDate}>Wed, 16 Jan '19</Text>
            </View>
            <Text style={{alignSelf: 'center', fontSize: 22}}>&gt;</Text>
          </View>
          <Dash style={{width: '90%', height: 0.25, flexDirection: 'row', alignSelf: 'center'}} dashThickness={0.5} dashGap={0} dashColor='grey'/>
          
          <View style={styles.withinBookings}>
            <View style={styles.depart}>
              <Text style={styles.depText}>Passengers</Text>
              <Text style={styles.depDate}>2 Adults</Text>
            </View>
            <Text style={{alignSelf: 'center', fontSize: 22}}>&gt;</Text>
          </View>
          <Dash style={{width: '90%', height: 0.25, flexDirection: 'row', alignSelf: 'center'}} dashThickness={0.5} dashGap={0} dashColor='grey'/>
          <View style={styles.withinBookings}>
            <View style={styles.depart}>
                <Text style={styles.depText}>Cabin class</Text>
                <Text style={styles.depDate}>Business</Text>
              </View>
            <Text style={{alignSelf: 'center', fontSize: 22}}>&gt;</Text>
          </View>
          <Dash style={{width: '90%', height: 0.25, flexDirection: 'row', alignSelf: 'center'}} dashThickness={0.5} dashGap={0} dashColor='grey'/>
        </View>

        <View style={styles.button}>
          <Text style={{alignSelf: 'center', color: 'white', fontSize: 26}}>Search</Text>
        </View>

      </SafeAreaView>
      :
      <SafeAreaView>
        <TouchableOpacity onPress={()=> setShow(false)}>
            <Text style={{fontSize: 24, color: 'black', marginLeft: '2%'}}>X</Text>
        </TouchableOpacity>
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
              <TouchableOpacity onPress={()=> {setTown(row.item['k']); setShow(false); changeCity(''); recData([])}}>
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
          flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: '5%',
        // padding: '2%',
        // marginLeft: 'auto',
        width: '100%',
        height: '100%',
        // alignSelf: 'center',
        borderWidth: 0.25,
        borderColor: 'grey',
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
      },

  button:{
    height: '10%',
    alignSelf: 'center',
    borderRadius:8,
    backgroundColor: 'blue',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  depText:{
    fontSize: 14,
    color: 'grey',
  },

  depDate:{
    fontSize: 20
  },

  depart:{
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  withinBookings:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5%'
  },

  bookings:{
    width: '90%',
    height: '40%',
    // borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'grey',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    shadowOpacity: 0.2,
        shadowOffset: { height: 5, width: 0 },
        shadowRadius: 5,
        elevation: 5,
  },

  mainTab:{
    alignItems: 'center',
  },

  text:{
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },

  tabView:{
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 10,
    //   borderWidth: 0.25,
      borderColor: 'grey',
      shadowColor: 'grey',
      backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowOffset: { height: 5, width: 0 },
        shadowRadius: 5,
        elevation: 5,
  },

  textStyle:{
      fontWeight: '300',
      fontSize: 14,
    //   borderBottomWidth: 5,
    //   borderBottomColor: 'purple',
      padding: '5%',
      color: 'blue',

  },

  common:{
      borderRightColor: 'grey',
    //   borderBottomWidth: 5,
      padding: '5%'
  },

  fromTo:{
    width: '90%',
    height: '15%',
    borderRadius : 8,
    borderColor: 'grey',
    // borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowOpacity: 0.2,
        shadowOffset: { height: 5, width: 0 },
        shadowRadius: 5,
        elevation: 5,
  },

  fromtoText:{
    fontSize: 42,
    fontWeight: '300'
  }

});


export default First;
