import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Airbnb Clone
        </Link>

        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/rooms" className="hover:text-red-500">Rooms</Link>
          {user && <Link to="/profile" className="hover:text-red-500">Profile</Link>}
          {user && <Link to="/admin" className="hover:text-red-500">Admin</Link>}
        </nav>

        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user.name || user.email}</span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="px-3 py-1 border rounded hover:bg-gray-100">
                Login
              </Link>
              <Link to="/signup" className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
