import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

const API_KEY = 'c4e5eaa042c042a18fe202807250707';

export default function App() {
  const [query, setQuery] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollViewRef = useRef();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const searchCities = async (text) => {
    setQuery(text);
    if (text.length < 2) {
      setCityOptions([]);
      return;
    }
    setLoadingCities(true);
    setError('');
    try {
      const res = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${text}`);
      setCityOptions(res.data);
    } catch (err) {
      setError('Error buscando ciudades.');
      setCityOptions([]);
    }
    setLoadingCities(false);
  };

  const selectCity = async (city) => {
    setLoading(true);
    setError('');
    setCityOptions([]);
    setQuery('');

    try {
      const locationQuery = `${city.name},${city.region},${city.country}`;
      const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}`);
      const data = res.data;

      if (!weatherData.find(w => w.id === data.location.name + data.current.last_updated_epoch)) {
        setWeatherData(prev => [
          ...prev,
          {
            id: data.location.name + data.current.last_updated_epoch,
            name: data.location.name,
            country: data.location.country,      // <-- Agregado aquí
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            iconCode: data.current.condition.code,
            is_day: data.current.is_day,
            animation: new Animated.Value(0),
          },
        ]);
      }
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    } catch (err) {
      setError('Error cargando clima.');
    }
    setLoading(false);
  };

  const removeCity = (id) => {
    setWeatherData(weatherData.filter((item) => item.id !== id));
  };

  const getCustomIconUrl = (code, is_day) => {
    return `https://cdn.weatherapi.com/weather/64x64/${is_day ? 'day' : 'night'}/${code}.png`;
  };

  // Animar tarjetas al agregarse
  useEffect(() => {
    weatherData.forEach((item, index) => {
      Animated.timing(item.animation, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }).start();
    });
  }, [weatherData]);

  if (!isLoaded) {
    return (
      <ImageBackground
        source={require('./assets/clima.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { justifyContent: 'center', alignItems: 'center' }]}>
          <Animated.Image
            source={require('./assets/nubelogo.jpg')}
            style={[
              styles.logo,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
            resizeMode="contain"
          />
          <Animated.Text
            style={[
              styles.splashText,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            Bienvenido
          </Animated.Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/clima.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.overlay}>
          <Text style={styles.title}>🌦️ Consulta del Clima</Text>

          <TextInput
            style={styles.input}
            placeholder="Escribe una ciudad"
            placeholderTextColor="#ccc"
            value={query}
            onChangeText={searchCities}
          />
          {loadingCities && <ActivityIndicator size="small" color="#fff" style={{ marginVertical: 8 }} />}

          {cityOptions.length > 0 && (
            <View style={styles.cityOptionsContainer}>
              <ScrollView style={{ maxHeight: 150 }}>
                {cityOptions.map((c) => (
                  <TouchableOpacity
                    key={`${c.name}-${c.region}-${c.country}-${c.lat}-${c.lon}`}
                    style={styles.cityOption}
                    onPress={() => selectCity(c)}
                  >
                    <Text style={styles.cityOptionText}>{c.name}, {c.region ? c.region + ', ' : ''}{c.country}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />}
          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{ paddingBottom: 20 }}
            ref={scrollViewRef}
          >
            {weatherData.map((city, index) => {
              const animatedStyle = {
                opacity: city.animation,
                transform: [
                  {
                    translateY: city.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              };

              return (
                <Animated.View key={city.id} style={[styles.cityCard, animatedStyle]}>
                  <View style={styles.cardHeader}>
                    <Feather name="map-pin" size={28} color="#007AFF" style={{ marginRight: 10 }} />
                    <Text style={styles.cityName}>{city.name}, {city.country}</Text>
                    <TouchableOpacity onPress={() => removeCity(city.id)}>
                      <Feather name="x-circle" size={28} color="#ff3b30" />
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: getCustomIconUrl(city.iconCode, city.is_day) }} style={styles.icon} />
                  <Text style={styles.temp}>{city.temp} °C</Text>
                  <Text style={styles.condition}>{city.condition}</Text>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 120, 255, 0.3)',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 25,
    textShadowColor: '#0059b3',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 14,
    borderRadius: 30,
    marginBottom: 15,
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  loading: { marginTop: 10 },
  error: {
    color: '#ffdddd',
    backgroundColor: '#cc0000',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  scroll: {
    marginTop: 25,
  },
  cityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 25,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: '#3399ff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cityName: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#007AFF',
    textShadowColor: '#aaddff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 20,
  },
  temp: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#0059b3',
  },
  condition: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 12,
  },
  cityOptionsContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    maxHeight: 160,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  cityOption: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomColor: '#a0cfff',
    borderBottomWidth: 1,
  },
  cityOptionText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
});
