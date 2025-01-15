import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Hi, Livia</Text>
            <Text style={styles.judul}>Let's make</Text>
            <Text style={styles.judul}>your journey!</Text>
          </View>
          <Image
            source={require('../assets/icons/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.containerCard}>
            <View style={styles.card}>
              <Image
                source={require('../assets/images/CurugSawer.jpg')}
                style={styles.menu}
              />
              <Text style={styles.namaTempat}>Curug Sawer</Text>
              <Text style={styles.lokasi}>with Chocolate</Text>
            </View>
            <View style={styles.card}>
              <Image
                source={require('../assets/images/CurugSawer.jpg')}
                style={styles.menu}
              />
              <Text style={styles.namaTempat}>Curug Sawer</Text>
              <Text style={styles.lokasi}>with Chocolate</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7EC',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 5,
    color: '#006989',
  },
  judul: {
    fontSize: 50,
    top: 30,
    left: 5,
    fontWeight: 'bold',
    color: '#006989',
  },
  avatar: {
    width: 60,
    height: 60,
    bottom: '25%',
    left: '83%',
    borderRadius: 14,
  },
  containerCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 11,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 7,
    width: '47%', // Pastikan lebar kartu tidak lebih dari 50%
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Untuk efek bayangan di Android
  },
  menu: {
    width: '100%',
    height: 165,
    borderRadius: 10,
    marginBottom: 10,
  },
  namaTempat: {
    fontWeight: 'bold',
    fontSize: 20,
    left: 6,
  },
  lokasi: {
    fontSize: 15,
    left: 6,
    top: 8,
    color: 'black', // Perbaiki 'dark-grey' menjadi 'darkgrey'
  },
});

export default App;
