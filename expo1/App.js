/* Zona 1 importaciones */
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Switch} from 'react-native';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


/* Zona 2 Main */
export default function App() {
const [activarSwitch, setactivarSwitch]=useState(false);
const[modoOscuro,setModoOscuro]=useState(false);

  return (
    <SafeAreaProvider>

    
    <SafeAreaView style={[styles.contenedor, modoOscuro && styles.fondoOscuro]}>

{/* Aqui van los componentes */}

<Text style={[styles.titulo,modoOscuro && styles.textoClaro]}>
practica swith
</Text>

<View style={styles.opcion}> 
<Text style={[styles.etiqueta,modoOscuro && styles.textoClaro]}> 
  Activar Switch2
</Text>
<Switch value={activarSwitch}
onValueChange={setactivarSwitch}
trackColor={{false:'#ccc',true:"#4caf50"}}
thumbColor={activarSwitch? '#fffff':'#999999'}>
</Switch>
</View>

<View style={styles.opcion}> 
<Text style={[styles.etiqueta,modoOscuro && styles.textoClaro]}> 
  modoOscuro
</Text>
<Switch value={modoOscuro}
onValueChange={setModoOscuro}
disabled={activarSwitch}
trackColor={activarSwitch?
  {false:'#ff9999',true:'#ff3b30'}
  :{false:'ccc',true:'#4caf50'}
}
thumbColor={
  activarSwitch? '#ff3b30'
  :modoOscuro
  ?'#fffff'
  :'#999999'
}
>
</Switch>
</View>

    </SafeAreaView>
  </SafeAreaProvider>
    

    
  );
}
/*  zona 3 estilos */
const styles = StyleSheet.create({
  contenedor:{
    flex:1,
    background:"#fff",
    paddingHorizontal:30,
    justifyContent:"center"
  },
  titulo:{
    fontSize:24,
    marginBottom:40,
    textAlign:"center",
    fontWeight:'bold'
  },
  fondoOscuro:{
    backgroundColor:'black',
  },
  textoClaro:{
    color:'white'
  },
  opcion:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:30,
    alignItems:'center'
  },
  etiqueta:{
    fontSize:18,

  }

});
