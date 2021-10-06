import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './components/Header';
import ListTodo from './components/ListTodo';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const data = response.data;
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTodos([]);
    loadTodos();
  }, []);

  const deleteTodo = (id) => {
    Alert.alert('Delete this entry?', 'Confirm', [
      {
        text: 'OK', onPress: () => axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(loadTodos())
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Todo List" />
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <ListTodo todo={item} deleteItem={deleteTodo} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
