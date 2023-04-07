import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageTitle, PageLabel } from '../components/Texts';
import { Cell, Seperator } from '../components/Cell';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from 'react-native-gesture-handler';
import { leftSwipe, rightSwipe } from '../components/Swipes';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export const Home = () => {

  const [items, setItems] = useState([])

  useEffect( () => {
      getData()
  }, [])

  const getData = async () => {
    setItems([])
    try {
      for(let i=0; i<20; i++){
        const value = await AsyncStorage.getItem(String(i))
        if(value !== null ){
          const item = JSON.parse(value)
          setItems(arr => [...arr, {name: item.name, place: item.place, importance: item.importance}])
        }
        if(value == null) {
          break
      }
      }
    } catch(e) {
      alert(e)
    }
  }

   const deleteItem = async (indeX) => {
    try {
    setItems(items.filter((item,index) => index !== indeX))
    await AsyncStorage.removeItem(String(indeX))
    } catch(e) {
      alert(e)
    }

  }

    return (
      <SafeAreaView style={styles.pageView}>
        <PageLabel label={'Items'} bc={'gray'} />
        <ScrollView>
        {
          items.map((item, index) =>
          (
            <React.Fragment key={index}>
              <Swipeable onSwipeableOpen={() => {deleteItem(index); }} renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
              <Cell title={item.name} place={item.place} icon={'infinite'} backColor={'black'}/>
              </Swipeable>       
            </React.Fragment>
          ))
        }
        </ScrollView>
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  pageView: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT,
  }
})

export default Home
