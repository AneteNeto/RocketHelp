import React, { useState } from 'react';
import { Alert } from 'react-native';
import{ Envelope ,Key } from "phosphor-react-native";
import { VStack , Heading, useTheme,Icon } from "native-base";
import auth  from '@react-native-firebase/auth';

import Logo from '/assets/logo_primary.svg'


import { Input } from "components/Input";
import { Button } from "components/Button";

export function SignIn() {
    
    const [isLoading,setIsLoading] =useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {colors}=useTheme();

    function handleSignIn(){

      if(!email || !password){
         return Alert.alert('Entrar','Informe o E-mail')
      }

      setIsLoading(true);

      auth()
      .signInWithEmailAndPassword(email, password).
      then(response => {
        console.log(response);

      }).catch(error => {
          setIsLoading(false);
        if(error.code==='auth/invalid-email'){
            Alert.alert('Entrar','E.mail Inválido');
        }

        if(error.code==='auth/wrong-password' || error.code==='auth/user-not-found'){
          Alert.alert('Entrar','E-mail ou Senha inválidas');
        }
      });
    }
    return(
        <VStack  flex={1}  alignItems="center" bg="gray.600" px={8} pt={24}>
          <Logo/>
        <Heading color="gray.100" mt={20} mb={6} fontSize="xl">Time to restart</Heading >
        <Input 
          mb={4}
          placeholder="E-mail" 
          InputLeftElement={<Icon as={<Envelope  color={colors.gray[300]}/>} ml={4} />}
          onChangeText={setEmail}
        />
        <Input 
          mb={7}
          placeholder="Senha"
          InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4} />}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button title="Entrar" w="full" onPress={handleSignIn} isLoading={isLoading}/>
      </VStack>
    );
    
}