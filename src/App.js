// import logo from './logo.svg';
import { signup, useAuth, logout, login } from "./firebase";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const handelSignup = async () => {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  };
  const handelLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  };
  const handelLogout = async () => {
    try {
      await logout();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="App">
      <div style={{ marginBottom: "20px" }}>Currently logged in as {currentUser?.email}</div>
      <input ref={emailRef} type="email" placeholder="Enter your email" />
      <input ref={passwordRef} type="password" placeholder="Enter your password" />
      <button type="button" disabled={loading || currentUser} onClick={handelSignup}>
        {" "}
        signup{" "}
      </button>

      <button type="button" disabled={loading || currentUser} onClick={handelLogin}>
        {" "}
        Login{" "}
      </button>
      {currentUser && <button onClick={handelLogout}>Logout</button>}
    </div>
  );
}

export default App;
