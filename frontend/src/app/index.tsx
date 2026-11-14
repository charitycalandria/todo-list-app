import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import {
  Todo,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../api/todoApi";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

// Hindi pa tapos = nasa taas, tapos na = nasa baba
const sortTodos = (list: Todo[]): Todo[] =>
  [...list].sort((a, b) => Number(a.completed) - Number(b.completed));

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setTodos(sortTodos(await getTodos()));
    } catch (err) {
      Alert.alert("Error", "Could not load to-dos. Is the server running?");
    }
  };

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos(sortTodos([newTodo, ...todos]));
    } catch (err) {
      Alert.alert("Error", "Could not add to-do.");
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo._id, {
        title: todo.title,
        completed: !todo.completed,
      });
      setTodos(
        sortTodos(todos.map((t) => (t._id === updated._id ? updated : t)))
      );
    } catch (err) {
      Alert.alert("Error", "Could not update to-do.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      Alert.alert("Error", "Could not delete to-do.");
    }
  };

  return (
    <View style={styles.container}>
      <TodoForm onAdd={handleAdd} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nothing to do yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f7" },
  empty: { textAlign: "center", color: "#888", marginTop: 30 },
});