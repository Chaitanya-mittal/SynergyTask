/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { User } from "../features/users/interface/UserInterface";

export async function getUsers() {
  try {
    const res = await axios<User[]>("https://jsonplaceholder.typicode.com/users");
    console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function getUserById(id: string) {
  try {
    const res = await axios<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function deleteUser(id: string) {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    return id;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
export async function editUser({ id, newUser }: { id: string, newUser: User }) {
  try {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newUser);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function createUser(newUser: User) {
  try {
    const res = await axios.post(`https://jsonplaceholder.typicode.com/users/`, newUser);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

