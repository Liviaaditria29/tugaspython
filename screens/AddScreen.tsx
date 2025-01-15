import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {database} from '../firebase/config';
import {ref, push} from 'firebase/database';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGl2aWFhZGl0cmlhIiwiYSI6ImNtNHZkeTZ6bzAxdTUya29nd25pbzh6ODgifQ.hzbwcY9aLN46aIwDVrmF7A',
);

const AddScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'You cancelled the image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Error picking image');
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setImageUri(selectedImage.uri || null);
        }
      },
    );
  };

  const handleJourney = async () => {
    try {
      if (
        !name ||
        !location ||
        !date ||
        !description ||
        !imageUri ||
        latitude === null ||
        longitude === null
      ) {
        Alert.alert(
          'Error',
          'Please fill in all fields and select a location on the map',
        );
        return;
      }

      const journeyData = {
        name,
        location,
        date,
        description,
        imageUri,
        latitude,
        longitude,
      };

      await push(ref(database, 'journeys'), journeyData);

      Alert.alert('Success', 'Journey saved to Firebase!');
      setName('');
      setLocation('');
      setDate('');
      setDescription('');
      setImageUri(null);
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to save journey to Firebase.');
      console.error(error);
    }
  };

  const handleLocationChange = (event: any) => {
    const {coordinates} = event.geometry;
    setLatitude(coordinates[1]);
    setLongitude(coordinates[0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Save your journey</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nama Tempat"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Tanggal"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Deskripsi"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={styles.imagePicker}
          onPress={handleSelectImage}>
          <Text style={styles.imagePickerText}>Select Image</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
        )}

        <MapboxGL.MapView style={styles.map} onPress={handleLocationChange}>
          <MapboxGL.Camera
            zoomLevel={10}
            centerCoordinate={[longitude || -122.4324, latitude || 37.78825]} // Longitude, Latitude
          />
          {latitude && longitude && (
            <MapboxGL.PointAnnotation
              id="pointAnnotation"
              coordinate={[longitude, latitude]} // Koordinat yang valid
            />
          )}
          {latitude && longitude && (
            <MapboxGL.Callout>
              <View>
                <Text>{name}</Text>
              </View>
            </MapboxGL.Callout>
          )}
        </MapboxGL.MapView>

        <TouchableOpacity style={styles.button} onPress={handleJourney}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {flex: 1},
  input: {borderBottomWidth: 1, marginBottom: 15, padding: 10},
  imagePicker: {padding: 15, backgroundColor: '#007bff', alignItems: 'center'},
  imagePickerText: {color: '#fff'},
  imagePreview: {height: 200, width: '100%', marginVertical: 10},
  map: {flex: 1, marginBottom: 20},
  button: {padding: 15, backgroundColor: '#28a745', alignItems: 'center'},
  buttonText: {color: '#fff', fontWeight: 'bold'},
});

export default AddScreen;
