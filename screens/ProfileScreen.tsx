import React from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  ProfileScreen: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const username = 'Livia Aditria';

  const handleLogin = () => {
    navigation.navigate('Login'); // Navigasi ke halaman Login
  };

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/avatar.png')}
        style={styles.avatar}
      />
      <Text style={styles.username}>{username}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProfileScreen;
