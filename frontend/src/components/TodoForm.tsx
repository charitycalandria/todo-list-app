import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

type Props = {
  onAdd: (title: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    backgroundColor: "#fff",
  },
});