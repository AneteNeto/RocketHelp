import { Heading, HStack, Text, VStack, useTheme, IconButton, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import { useState} from 'react';
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo_secondary.svg';

import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import {Order, OrderProps} from '../components/Order';

export function Home() {
    const {colors}=useTheme();
    const [statusSelected,setStatusSelected]=useState<'open' | 'closed'>('open');
    const [orders,setOrders]=useState<OrderProps[]>([
        {
            id:'134',
            patrimony:'178902',
            when:'10/07/2002 às 11h',
            status:'open'
        }
    ]);
    const navigation=useNavigation();

    function handleNewRegister(){
        navigation.navigate('new');
    }
    function handleOPenDetails(orderId:string){
        navigation.navigate('details',{orderId});
    }
  return (
    <VStack flex={1} pb={6} bg="gray.700">
        <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
        >
            <Logo/>
            <IconButton
                icon={<SignOut size={26} color={colors.green[500]} />}
            
            />
        </HStack>

        <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center" >
                <Heading color="gray.100">Solicitações</Heading >
                <Text color="gray.200">1</Text>
            </HStack>


            <HStack space={4} mb={8} >
               <Filter title="Em andamento" type='open'
               isActive={statusSelected==='open'}
               onPress={() => setStatusSelected('open')} 
               />
               <Filter title="Finalizados" type='closed'
               onPress={() => setStatusSelected('closed')}
               isActive={statusSelected==='closed'}
               />
            </HStack>
            <FlatList
                data={orders}
                keyExtractor={item=>item.id}
                renderItem={({item})=> <Order data={item} onPress={()=> handleOPenDetails(item.id)}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:80}}
                ListEmptyComponent={()=>(

                    <Center>
                    <ChatTeardropText size={40} color={colors.gray[300]}/>
                    <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                        Você ainda não possui {'\n'}
                        solicitações {statusSelected==='open' ? 'em andamento' : 'finalizadas'}
                        </Text>
                    </Center>
                )}
            />
            <Button title="Nova soliciatação" onPress={handleNewRegister}/>
        </VStack>
    </VStack>
  );
}