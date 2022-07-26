import React ,{ useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firestore  from '@react-native-firebase/firestore';
import { useRoute,useNavigation } from '@react-navigation/native'
import { VStack, Text, useTheme, HStack, ScrollView, Box } from 'native-base';
import { CircleWavyCheck, DesktopTower, Hourglass, Clipboard }from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { OrderProps } from '../components/Order';
import { CardDetails } from '../components/CardDetails';
import { dateFormat } from '../utils/firestoreDataFormat';
import { OrderFirestoreDTO } from '../DTOs/orderFirestoreDTO';

type RouteParams={
  orderId:string;
}

type OrderDetails=OrderProps &{ 

  description:string;
  solucion:string;
  closed:string;

}
export function Details() {
  const route=useRoute();
  const navigation=useNavigation();
  const {colors}=useTheme();
  const [isLoading,setIsLoading]=useState(true);
  const [solucion,setSolucion]=useState('');
  const [order,setOrder]=useState<OrderDetails>({} as OrderDetails);

  const{ orderId }=route.params as RouteParams;

   useEffect(() =>{

     firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc)=>{

        const { patrimony, description, status, created_at, closed_at, solucion } = doc.data();

        const closed= closed_at ? dateFormat(closed_at) : null;
        setOrder({
           id:doc.id,
           patrimony,
           description,
           status,
           solucion,
           when:dateFormat(created_at),
           closed

        });
          setIsLoading(false);
          console.log(doc.data())
      })
      .catch((error)=>{
         console.log(error);
         Alert.alert("Solicitação","Erro no carregamento");
      });
   },[]);

   if(isLoading){
    return <Loading/>
   }

   function handleOrderClose(){
      if(!solucion){

      }

      firestore()
        .collection<OrderFirestoreDTO>("orders")
        .doc(orderId)
        .update({
           status:'closed',
           solucion,
           closed_at:firestore.FieldValue.serverTimestamp()
        })
        .then(()=>{
           
          Alert.alert("Solicitação","Solicitação encerrada");
           navigation.goBack();
        })
        .catch((error)=>{
          console.log(error);
          Alert.alert("Solicitação","Não foi possível encerrar a solicitação encerrada");
        })

   }
  return (
    <VStack flex={1} bg="gray.700">
        <Box px={6} bg="gray.600">
         <Header title="Solicitação"/>
        </Box>
        <HStack bg="gray.500" justifyContent="center" p={4}>
           {
            order.status === 'closed' 
             ?<CircleWavyCheck size={22} color= {colors.green[300]}/> 
             :<Hourglass size={22} color= {colors.secondary[700]}/>
          }
          <Text
            fontSize="sm"
            ml={2}
            textTransform="uppercase"
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          >
            {order.status === 'closed' ? 'finalizada' :' em andamento'}
          </Text>
        </HStack>
        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails

            title="Equipamento"
            description={`Patrimônio ${order.patrimony}`}
            icon={DesktopTower}
          />

          <CardDetails

            title="descrição do problema"
            description={order.description}
            icon={Clipboard}
            footer={`Registrado em ${order.when}`}
          />
          <CardDetails

            title="solução"
            icon={CircleWavyCheck}
            description={order.solucion}
            footer={order.closed && `Encerrado em ${order.closed}`}
          > 
          {
            order.status === 'open' &&
            <Input
            placeholder="Descrição da solução"
            textAlignVertical="top"
            multiline
            onChangeText={setSolucion}
            h={24}
           />
          }
          </CardDetails>
        </ScrollView>

        {
          order.status=== 'open' &&

          <Button title="Encerrar solicitação"  m={5} onPress={handleOrderClose}/>
        }
    </VStack>
  );
}
