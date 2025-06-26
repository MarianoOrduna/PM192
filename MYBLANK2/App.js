import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  Switch,
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default function App() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [cargando, setCargando] = useState(true); // splash

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCargando(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const manejarRegistro = () => {
    if (!nombreCompleto || !correoElectronico) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    if (!terminosAceptados) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return;
    }
    Alert.alert('Registro exitoso', `Nombre: ${nombreCompleto}\nCorreo: ${correoElectronico}`);
  };

  if (cargando) {
    return (
      <View style={estilos.splash}>
        <Image source={require('./assets/logoo.jpg')} style={estilos.logoSplash} />
        {}
      </View>
    );
  }

  return (
    <ImageBackground source={require('./assets/fondoo.jpg')} style={estilos.fondo}>
      <View style={estilos.contenedor}>
        <Image source={require('./assets/logoo.jpg')} style={estilos.logo} />
        <Text style={estilos.titulo}>Registro de Usuario</Text>

        <TextInput
          placeholder="Nombre completo"
          style={estilos.entrada}
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
        />
        <TextInput
          placeholder="Correo electrónico"
          style={estilos.entrada}
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
          keyboardType="email-address"
        />

        <View style={estilos.seccionSwitch}>
          <Switch value={terminosAceptados} onValueChange={setTerminosAceptados} />
          <Text style={estilos.textoSwitch}>Aceptar términos y condiciones</Text>
        </View>

        <Button title="Registrarse" onPress={manejarRegistro} />
      </View>
    </ImageBackground>
  );
}

const estilos = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoSplash: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  textoCargando: {
    fontSize: 16,
    color: '#555',
  },
  fondo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contenedor: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  seccionSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoSwitch: {
    marginLeft: 10,
  },
});
