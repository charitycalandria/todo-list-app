import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../api/todoApi";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.left} onPress={() => onToggle(todo)}>
        <View style={[styles.box, todo.completed && styles.boxChecked]} />
        <Text style={[styles.title, todo.completed && styles.done]}>
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo._id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  left: { flexDirection: "row", alignItems: "center", flex: 1 },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 4,
    marginRight: 12,
  },
  boxChecked: { backgroundColor: "#333" },
  title: { fontSize: 16, flex: 1 },
  done: { textDecorationLine: "line-through", color: "#999" },
  deleteButton: {
    backgroundColor: "#e53935",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});