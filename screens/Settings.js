import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageTitle, PageLabel } from '../components/Texts';


const Settings = ({
    params,
}) => (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <PageLabel label={'Settings'} />
        <Text>componentName</Text>
    </SafeAreaView>
);

export default Settings;
