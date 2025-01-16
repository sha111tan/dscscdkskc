import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../redux/user.slice';
import Loader from '../components/Loader';
import Error from '../components/Error';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginReducer = useSelector(state => state.loginReducer);

  const {loading, error, currentUser} = loginReducer;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.jwtToken) {
      navigation.navigate('Home');
    }
  }, [currentUser, navigation]);

  const login = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    dispatch(loginUser(formData));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Вход в учетную запись</Text>

        {error && <Error error="Неправильные данные" />}
        {loading && <Loader />}

        <TextInput
          style={styles.input}
          placeholder="логин"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          required
        />

        <TextInput
          style={styles.input}
          placeholder="пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          required
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Вход</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.link}>
          <Text style={styles.linkText}>Регистрация</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  link: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
