import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export const MyButton = ({
    title, style, fw, onPress
}) => (
    <TouchableOpacity onPress={onPress} style={[{marginHorizontal: 30, backgroundColor: '#0e0e0e', padding: 14, borderRadius:10, marginTop: 20}, style]}>
        <Text style={{  alignSelf: 'center',  color: 'white', fontWeight: 500, fontSize: 20}}>{title}</Text>
    </TouchableOpacity>
);

export const MyButton2 = ({
    title, style, fw, onPress
}) => (
    <TouchableOpacity onPress={onPress} style={[{marginHorizontal: 30, backgroundColor: '#0e0e0e', padding: 14, borderRadius:10, marginTop: 20}, style]}>
        <Text style={{  alignSelf: 'center',  color: 'white', fontWeight: 400, fontSize: 20}}>{title}</Text>
    </TouchableOpacity>
);
