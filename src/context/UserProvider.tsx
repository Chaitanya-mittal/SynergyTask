import React, { createContext, useState, useContext } from "react";
import { User } from "../features/users/interface/UserInterface";

// Define the context type
interface UserContextType {
  createdUsers: User[];
  deleteUsersId: string[];
  editedUsers: User[];
  addCreatedUser: (user: User) => void;
  updateCreatedUser: (newUser: User) => void;
  addDeleteUserId: (id: string) => void;
  addEditedUser: (user: User) => void; // New function for edited users
}

// Initial context value
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [createdUsers, setCreatedUsers] = useState<User[]>([]);
  const [deleteUsersId, setDeleteUsersId] = useState<string[]>([]);
  const [editedUsers, setEditedUsers] = useState<User[]>([]); // New state for edited users

  const addCreatedUser = (user: User) => {
    setCreatedUsers((prevUsers) => [...prevUsers, user]);
  };

  const addDeleteUserId = (id: string) => {
    setDeleteUsersId((prevIds) => [...prevIds, id]);
  };

  const updateCreatedUser = (newUser: User) => {
    const updated = createdUsers.map((user: User) => {
      if (user.id === newUser.id) {
        return newUser;
      }
      return user;
    });
    setCreatedUsers(updated);
  };

  const addEditedUser = (user: User) => {
    setEditedUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((u) => u.id !== user.id); // Remove if user already exists
      return [...updatedUsers, user]; // Add the updated user
    });
  };

  return (
    <UserContext.Provider
      value={{
        updateCreatedUser,
        createdUsers,
        deleteUsersId,
        editedUsers, // Provide editedUsers state
        addCreatedUser,
        addDeleteUserId,
        addEditedUser, // Provide addEditedUser function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
