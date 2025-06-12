/* Zona 1 importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

const Texto=(props)=>{
  const{children}=props
  return(<Text>{children}</Text>)
}

/* Zona 2 Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Texto > Hola </Texto>
      <Texto >Mariano  </Texto>
      <Texto > Children</Texto>
      <Button title="Presioname"> </Button>
      <StatusBar style="auto" />
    </View>
  );
}
/*  zona 3 estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
