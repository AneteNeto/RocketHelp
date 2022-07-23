import { VStack } from 'native-base';
import React,{ useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation} from '@react-navigation/native'
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

import firestore from '@react-native-firebase/firestore';

export function Register() {

  const [isLoading,setIsLoading]=useState(false);
  const [patrimony,setPatrimony]=useState('');
  const [description,setDescription]=useState('');

  const navigation=useNavigation();

  function handleNewOrderRegister(){

    if(!patrimony || !description){
      Alert.alert("Registrar","Preencha todos os campos");
    }

    setIsLoading(true);

    firestore()
     .collection('orders')
     .add({
       patrimony,
       description,
       status:'open',
       created_at:firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        Alert.alert("Solicitação","Solicitação efectuada com sucesso");
        navigation.goBack();
    })
    .catch(error => {
       console.log(error);
       setIsLoading(false);
       return Alert.alert("Solicitação","Não foi possível registrar o Pedido")
    });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova Solicitação"/>
        <Input 
            placeholder="Número do Patrimônio"
            onChangeText={setPatrimony}
        />
        <Input
            placeholder="Descrição do problema"
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
            onChangeText={setDescription}
        />
        <Button title="Cadastrar" mt={6} onPress={handleNewOrderRegister} isLoading={isLoading}/>
    </VStack>
  );
}