import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import Header from './components/Header';
import ListTodo from './components/ListTodo';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos([]);
    const abortController = new AbortController();
    const loadTodos = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos',
          {signal: abortController.signal},
        );
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTodos();
    return () => abortController.abort();
  }, []);

  const mockDelete = () => {
    Alert.alert('Pretend to delete this?', 'Click OK to do nothing', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Todo List" />
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <ListTodo todo={item} deleteItem={mockDelete} />
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
