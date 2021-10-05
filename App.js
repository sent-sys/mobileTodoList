
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import Header from './components/Header';
import ListTodo from './components/ListTodo';


const App = () => {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => setTodos(data))
  }, [])

  

  return(
    <View style={styles.container}>
      <Header title="Todo List"/>
    {todos.length > 0 && <FlatList 
    data={todos}
    renderItem={({todo}) => <ListTodo todo={todo} />}
    />}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  }
})

export default App;
