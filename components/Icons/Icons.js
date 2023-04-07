import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconF from 'react-native-vector-icons/FontAwesome' 

export const ItemsIcon = ({
    color
}) => (
    <View style={{bottom: 1}}>
        <View style={styles.row}>
            <IconF name="circle" color={color} size={12} style={styles.icon}/>
            <IconF name="circle" color={color} size={12} style={styles.icon}/>
        </View>
        <View style={styles.row}>
            <IconF name="circle" color={color} size={12} style={styles.icon} />
            <IconF name="circle" color={color} size={12} style={styles.icon}/>
        </View>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    col: {
        flexDirection: 'column'
    },
    icon : {
        margin: .5
    }
})