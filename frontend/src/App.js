import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Tasks onLogout={handleLogout} />;
  }

  return (
    <div>
      {showRegister ? (
        <Register onRegister={() => setIsLoggedIn(true)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? "Already have an account? Login" : "New user? Register"}
      </button>
    </div>
  );
}

export default App;
