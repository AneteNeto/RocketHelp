import {useState} from 'react';
import { VStack , Heading, useTheme,Icon } from "native-base";
import Logo from '../assets/logo_primary.svg'
import{ Envelope ,Key} from "phosphor-react-native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
    
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const {colors}=useTheme();
    return(
        <VStack  flex={1}  alignItems="center" bg="gray.600" px={8} pt={24}>
          <Logo/>
        <Heading color="gray.100" mt={20} mb={6} fontSize="xl">Time to restart</Heading >
        <Input 
          mb={4}
          placeholder="E-mail" 
          InputLeftElement={<Icon as={<Envelope  color={colors.gray[300]}/>} ml={4} />}
          onChangeText={setName}
        />
        <Input 
          mb={7}
          placeholder="Senha"
          InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4} />}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button title="Entrar" w="full"/>
      </VStack>
    );
    
}