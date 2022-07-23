import { FirebaseFirestoreTypes} from '@react-native-firebase/firestore';


export function dateFormat(timestmap: FirebaseFirestoreTypes.Timestamp){

    if(timestmap){

        const date=new Date(timestmap.toDate());
        const day=date.toLocaleDateString("pt-PT");
        const hour=date.toLocaleTimeString("pt-PT");

        return `${day} às ${hour}`;
    }
}