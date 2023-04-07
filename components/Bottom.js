import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useImperativeHandle } from 'react';
import {View, Text, StyleSheet, Touchable, Animated as Anim, ScrollView, Dimensions } from 'react-native'
import { GestureDetector, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


export const BottomComponent = () => {

const [country, setCountry] = useState('')
  
  const Seperator = () => {
      return (
        <View style={{height: 1, borderWidth: .2, marginHorizontal: 20, borderColor: '#B2A496', marginHorizontal:20}}></View>
      )
  }
  
    const Cell = ({title, icon, backColor, style, onPress, iso}) => {
      return (
          <TouchableOpacity style={[styles.cell, {backgroundColor : 'white',},style]} onPress={onPress} >
              <View style={{borderWidth: 0, padding:3, borderRadius: 6, marginLeft: 10, backgroundColor: backColor}}>
                  <Icon style={{}} name={icon} size={18} color={'white'}/>
              </View> 
              <Text style={[styles.title, {opacity:country === title ? 1 : 1}]}>{title}</Text> 
              <Text style={[styles.cellTxt, {opacity:country === title ? 1 : 0}]}>
                  <Icon name='checkmark' size={22} />
              </Text>
          {/* <Ionicons name='chevron-forward-outline' size={20} style={{marginEnd:16}} /> */}
          </TouchableOpacity>
      )
    }


  const [isWriting, setIsWriting] = useState(false)
  const [txt, setTxt] = useState('Search')
  const [txt1, setTxt1] = useState('Search')
  const [search, setSearch] = useState('Search')

  const [filteredData, setFilteredData] = useState(countries.ref_country_codes)
  const [masterData, setMasterData] = useState(countries.ref_country_codes) 

  
  
  
  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
  
  const scrollTo = useCallback((destination) => {
    'worklet';
    translateY.value = withSpring(-destination, { damping: 50 })
  }, [])
  
  
  
  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    translateY.value = event.translationY + context.value.y
    translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
  })
  .onEnd(() => {
    if(translateY.value > -SCREEN_HEIGHT ) {
      if(!isWriting){
        scrollTo(0)
      }
    } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
      scrollTo(MAX_TRANSLATE_Y)
    }
  })
  useEffect(() => {
    
  })
  
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-MAX_TRANSLATE_Y + 100, -MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
      )
      
      return {
        borderRadius,
        transform: [{translateY: translateY.value}]
      }
    })
    
    const handleText = (txt) => {
        if (txt) {
          // scrollTo(SCREEN_HEIGHT / 3)
          setIsWriting(true)
          const newData = masterData.filter(
          function (item, index) {
            const itemData = item.country
                ? item.country.toUpperCase()
                : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
        })
          setFilteredData(newData);
          setSearch(txt);
        } else {
          setIsWriting(false)
            setTimeout(() => {
                // setIsDisabled(true)
            },500)
            setFilteredData(countries.ref_country_codes);
            setSearch(txt);
        }
    }
    
    return (
      <GestureHandlerRootView>
          <TouchableOpacity onPress={() => {scrollTo(SCREEN_HEIGHT)}}>
          <Icon style={{alignSelf: 'flex-end', marginHorizontal: 50, marginTop: 80, opacity : 1}} size={30} name={'add'}/>
        </TouchableOpacity>
        <GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
        <View style={styles.line}></View>
        <Text style={{fontWeight: 600, fontSize: 22, left: 30, bottom: 10}}>Where have you been?</Text>
        <View style={{borderWidth: 1, borderRadius: 30, borderColor: 'transparent', backgroundColor: '#F2F3F5',  flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, bottom: 5}}>
          <View style={{height: 35, top: 6}}>
          <Icon style={{ marginLeft: 10, bottom: 3}} name="search" size={27} color="#C4C5C9" />
          <TextInput
          placeholder={txt}
          style={[styles.input, {left: 5}]} 
          onChangeText={(txt) => {handleText(txt);}}
          >
          </TextInput>
          </View>
        </View>
      </Animated.View>
      </GestureDetector>
      </GestureHandlerRootView>
      )
    }

    const styles = StyleSheet.create({
        line : {width: 75, borderWidth: 1, backgroundColor: 'black', color: 'black', alignSelf: 'center', height: 4, marginVertical: 15, borderRadius: 5},
        bottomSheet : {marginTop: 'auto', height: SCREEN_HEIGHT, width: '100%', top:SCREEN_HEIGHT, backgroundColor: 'white'},
        seperator: {height: .6, borderWidth: .2, borderColor: '#B2A496', marginHorizontal:40},
        countryIcon : {marginLeft: 20},
        cellTxt: {fontSize: 13, color: 'black', marginRight: 20},
        title: {
        fontSize: 18,
        marginStart: 32,
        fontWeight: 500,
        flex: 1,
    
    },
    input: {
      backgroundColor: 'transparent',
      marginLeft: 40,
      borderRadius: 40,
      color: 'black',
      fontSize: 20,
      bottom: 29
    },
        cell: {
            paddingVertical: 6,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
        },
        searchBox: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderRadius: 1,
          color: 'gray',
          borderColor: 'transparent',
          fontSize: 28,
          marginHorizontal:20,
          height: 40,
        },
      })
