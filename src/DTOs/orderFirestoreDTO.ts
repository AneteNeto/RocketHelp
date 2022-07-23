import { FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

export type OrderFirestoreDTO={
    id:string;
    patrimony:string;
    description:string;
    status:'open' | 'closed';
    solucion?:string;
    created_at:FirebaseFirestoreTypes.Timestamp;
    closed_at?:FirebaseFirestoreTypes.Timestamp;
}