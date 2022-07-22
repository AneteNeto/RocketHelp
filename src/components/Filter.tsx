import { Text, Button, IButtonProps ,useTheme,Heading} from 'native-base';


type Props= IButtonProps & {
    title:string,
    isActive?:boolean,
    type:'open' | 'closed';
}
export function Filter({title, isActive=false,type,...rest}:Props) {
    const {colors}=useTheme();
    const colorType= type==='open' ? colors.secondary[700] : colors.green[300];
    return (
    <Button
        variant="outline"
        bg="gray.600"
        rounded="sm"
        flex={1}
        size="sm"
        borderWidth={isActive ? 1 : 0}
        borderColor={colorType}
        {...rest}
    >
        <Text  fontSize="xs" textTransform="uppercase" color={isActive ?colorType:colors.gray[300]}>{title}</Text>
    </Button>
  );
}