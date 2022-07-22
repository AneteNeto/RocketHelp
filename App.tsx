import React from 'react';
import { NativeBaseProvider ,StatusBar} from 'native-base';
import {useFonts,Roboto_700Bold,Roboto_400Regular} from '@expo-google-fonts/roboto'

import {THEME} from "./src/styles/theme";

import { SignIn } from "./src/screens/SignIn";
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontLoaded]=useFonts({Roboto_700Bold,Roboto_400Regular});
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {fontLoaded ? <SignIn/> :<Loading/>}
    </NativeBaseProvider>
  );
}
