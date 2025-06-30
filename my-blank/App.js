import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  SectionList,
  FlatList,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [showFlatList, setShowFlatList] = useState(true);

  const [datosSeccionados, setDatosSeccionados] = useState([
    {
      title: 'Mensajes Destacados',
      data: [
        { id: '1', nombre: 'Ana', mensaje: '¡Hola!' },
        { id: '2', nombre: 'Juan', mensaje: 'Salinas mató a Colosio.' },
      ],
    },
    {
      title: 'Mis Recordatorios',
      data: [
        { id: '3', nombre: 'Yo', mensaje: 'Comprar comida para la semana.' },
        { id: '4', nombre: 'Yo', mensaje: 'Revisar el clima.' },
        { id: '5', nombre: 'Yo', mensaje: 'Preocuparme por las tareas pendientes.' },
      ],
    },
    {
      title: 'Ideas para Proyectos',
      data: [
        { id: '6', nombre: 'Recetas', mensaje: 'App de recetas personalizadas.' },
        { id: '7', nombre: 'Copia de notion', mensaje: 'Un rastreador de hábitos diario.' },
      ],
    },
  ]);

  const [datosFlatList, setDatosFlatList] = useState([
    { id: '1', nombre: 'María', mensaje: 'Buenos días a todos' },
    { id: '2', nombre: 'Pedro', mensaje: 'Recordar la junta de mañana' },
    { id: '3', nombre: 'Luis', mensaje: 'Enviar el reporte semanal' },
    { id: '4', nombre: 'Carmen', mensaje: 'Revisar las tareas pendientes' },
    { id: '5', nombre: 'Roberto', mensaje: 'Actualizar la documentación' },
    { id: '6', nombre: 'Sofia', mensaje: 'Preparar presentación' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemNombre}>{item.nombre}</Text>
      <Text style={styles.itemMensaje}>{item.mensaje}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.titulo}>{showFlatList ? 'Flat List' : 'Section List'}</Text>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setShowFlatList(!showFlatList)}
      >
        <Text style={styles.switchButtonText}>
          Cambiar a {showFlatList ? 'SectionList' : 'FlatList'}
        </Text>
      </TouchableOpacity>

      {showFlatList ? (
        <FlatList
          data={datosFlatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <SectionList
          sections={datosSeccionados}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + index}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  switchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 15,
    color: '#222',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  itemNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  itemMensaje: {
    fontSize: 16,
    color: '#555',
  },
});
