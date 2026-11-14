import axios from "axios";

export const API_URL = "http://10.125.170.203:5000/api/todos";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const res = await axios.post(API_URL, { title });
  return res.data;
};

export const updateTodo = async (
  id: string,
  changes: { title?: string; completed?: boolean }
): Promise<Todo> => {
  const res = await axios.put(`${API_URL}/${id}`, changes);
  return res.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};