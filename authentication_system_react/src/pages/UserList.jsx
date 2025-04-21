import React, { useState, useEffect } from 'react';
import { userList } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userList();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleBack = () => {
    navigate('/'); // route to home
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 underline decoration-purple-500">User List</h2>
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="bg-indigo-500 hover:bg-indigo-600 text-black px-4 py-2 rounded shadow transition duration-200"
          >
            ← Back to Home
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white text-sm text-gray-700 border border-gray-300 shadow-md rounded-xl">
            <thead className="bg-purple-600 text-white text-sm uppercase tracking-wider">
              <tr>
                {/* <th className="py-3 px-6 text-left">ID</th> */}
                <th className="py-3 px-6 text-left">Full Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                    {/* <td className="py-3 px-6">{user.id}</td> */}
                    <td className="py-3 px-6 font-medium">{user.fullName}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.userName}</td>
                    <td className="py-3 px-6">
                      {user.createdDate === "0001-01-01T00:00:00"
                        ? "N/A"
                        : new Date(user.createdDate).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 px-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
