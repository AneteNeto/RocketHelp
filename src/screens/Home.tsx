import React, { useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { Heading, HStack, Text, VStack, useTheme, IconButton, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { dateFormat } from 'utils/firestoreDataFormat';
import Logo from 'assets/logo_secondary.svg';

import { Order, OrderProps } from 'components/Order';
import { Filter } from 'components/Filter';
import { Loading } from 'components/Loading';
import { Button } from 'components/Button';

export function Home() {
    const {colors}=useTheme();
    const [isLoading,setIsLoading]=useState(true);
    const [statusSelected,setStatusSelected]=useState<'open' | 'closed'>('open');
    const [orders,setOrders]=useState<OrderProps[]>([]);
    const navigation=useNavigation();

    function handleNewRegister(){
        navigation.navigate('new');
    }
    function handleOPenDetails(orderId:string){
        navigation.navigate('details',{orderId});
    }

    function handleSignOut(){
        auth()
        .signOut()
        .catch(error=>{
            console.log(error);
            Alert.alert("Sair","Não foi possível Sair");
        })
    }

    useEffect(() =>{

        setIsLoading(true);

        const subscriber=firestore()
        .collection('orders')
        .where('status', '==',statusSelected)
        .onSnapshot(snapshot =>{
            const data=snapshot.docs.map(doc=>{
                const {patrimony, description,status,created_at}=doc.data();

                return{ 
                    id:doc.id,
                    patrimony,
                    description,
                    when:dateFormat(created_at),
                    status
                }
            });
            setOrders(data);
            setIsLoading(false);
        });

        return subscriber;
           
    },[statusSelected]);
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
            onPress={handleSignOut}
            />
        </HStack>

        <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center" >
                <Heading color="gray.100">Solicitações</Heading >
                <Text color="gray.200">{orders.length}</Text>
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
            {
                isLoading ? <Loading/> :
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
        }
            <Button title="Nova soliciatação" onPress={handleNewRegister}/>
        </VStack>
    </VStack>
  );
}