import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const { token, logout } = useContext(AuthContext);
  const user = token ? jwtDecode(token) : {};

  const profileCardStyle = {
    background: 'var(--bg-form)',
    color: 'var(--text-primary)',
    borderColor: 'var(--border-color)',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-8 text-center border" style={profileCardStyle}>
        <h1 className="text-4xl font-bold mb-4">Welcome, {user.username}</h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Email: {user.email}
        </p>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}