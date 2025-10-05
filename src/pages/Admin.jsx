import React, { useEffect, useState } from "react";
import { UsersAPI } from "../services/api";
import ModalCRUD from "../components/ModalCRUD";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchUsers = () => {
    UsersAPI.getAll().then((res) => setUsers(res.data.content));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = (data) => {
    if (editing) {
      UsersAPI.update(editing.id, data).then(() => {
        fetchUsers();
        setEditing(null);
      });
    } else {
      UsersAPI.create(data).then(fetchUsers);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin - Manage Users</h1>
      <button onClick={() => setEditing({})} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">+ Add User</button>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th>Email</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-4 py-2">{u.name}</td>
              <td>{u.email}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => setEditing(u)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
                <button onClick={() => UsersAPI.delete(u.id).then(fetchUsers)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalCRUD
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        onSubmit={handleSave}
        defaultValues={editing}
      />
    </div>
  );
}
