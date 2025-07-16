// // src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Profile from "./components/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import { AuthProvider } from "./context/AuthContext";
// import AuthPage from "./components/AuthPage";
// import { ThemeProvider } from "./context/ThemePage";

// function App() {
//   //const { token } = useContext(AuthContext);
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//       <ThemeProvider>
//         <Navbar />
        
//         <Routes>
//           <Route path="/" element={<AuthPage />} />
//           <Route path="/signup" element={<AuthPage />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         </ThemeProvider>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react"; // Added useContext import
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Also import AuthContext
import AuthPage from "./components/AuthPage";
import { ThemeProvider } from "./context/ThemePage"; // Corrected the import path and name

// We create a new component for the routes.
// This is necessary because a component cannot use a context (like AuthContext)
// that is provided in the same component. The hook must be used in a child component.
function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Route 1: The main auth page. */}
          {/* If the user is logged in, redirect them to their profile. */}
          <Route 
            path="/" 
            element={token ? <Navigate to="/profile" /> : <AuthPage />} 
          />
          
          {/* Route 2 (Alias): If user goes to /auth, do the same thing. */}
          <Route 
            path="/auth" 
            element={token ? <Navigate to="/profile" /> : <AuthPage />} 
          />

          {/* Route 3: The Profile Page */}
          {/* The single, correct route for the profile. It is wrapped by your
              ProtectedRoute component to ensure only logged-in users can access it. */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route: Redirect any unknown URL to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}


function App() {
  // The main App component is now only responsible for setting up the Providers.
  // The logic has been moved to the AppRoutes component above.
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          {/* We render the new AppRoutes component here */}
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;