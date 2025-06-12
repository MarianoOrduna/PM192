/* Zona 1 importaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

const Texto=(props)=>{
  const{contenido}=props
  return(<Text>{contenido}</Text>)
}

/* Zona 2 Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Texto contenido = "Hola"> </Texto>
      <Texto contenido = "Mariano"> </Texto>
      <Texto contenido = "React Native"> </Texto>
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
