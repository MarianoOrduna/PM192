import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

const IndicadorCarga = ({ color, size }) => {
  return <ActivityIndicator style={styles.indicador} color={color} size={size} />;
};

export default function App() {
  const [cargando, setCargando] = useState(false);

  const iniciarCarga = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoPrincipal}>Uso de ActivityIndicator</Text>
      {cargando ? (
        <IndicadorCarga color="deepskyblue" size="large" />
      ) : (
        <Text style={styles.textoSecundario}>Presiona el botón comenzar</Text>
      )}
      <Button title="Iniciar Carga" onPress={iniciarCarga} color="blue" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textoPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'green',
  },
  textoSecundario: {
    fontSize: 16,
    marginVertical: 20,
    color: '#3a3a3a',
  },
  indicador: {
    marginBottom: 20,
  },
});
