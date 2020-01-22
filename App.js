import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';

import First from './screens/first';
import Second from './screens/second';
import { createAppContainer } from 'react-navigation';

// const Routes = {
  
// }

const Appl = createAppContainer(
  createStackNavigator({
    FlightBooking:{
      screen: First,
      route: '/'
    },
    // Destination:{
    //   screen: Second,
    //   route: '/s'
    // }
  },{
    initialRouteName: 'FlightBooking',
    headerMode: 'none'
  })
)

class App extends React.Component{
    render(){
    return(
          <Appl/>
    )
    }
}


export default App;
