// import logo from './logo.svg';
import { signup, useAuth, logout, login } from "../firebase";
import { useRef, useState } from "react";
import GoogleButton from "react-google-button";

function SimpleAuth() {
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
    <div className="container w-25 mt-5 bg-dark p-2 text-white rounded">
      <div style={{ marginBottom: "20px" }}>Currently logged in as {currentUser?.email}</div>
      <div className="mb-3">
        <input ref={emailRef} type="email" placeholder="Enter your email" className="form-control" />
      </div>
      <div className="mb-3">
        <input ref={passwordRef} type="password" placeholder="Enter your password" className="form-control" />
      </div>
      <div className="mb-3">
        <button type="button" disabled={loading || currentUser} onClick={handelSignup} className="btn btn-primary mx-2">
          {" "}
          signup{" "}
        </button>

        <button type="button" disabled={loading || currentUser} onClick={handelLogin} className="btn btn-primary mx-2">
          {" "}
          Login{" "}
        </button>
        {currentUser && (
          <button onClick={handelLogout} className="btn btn-primary mx-2">
            Logout
          </button>
        )}
      </div>
      <hr />
      <div className="">
        <GoogleButton />
      </div>
    </div>
  );
}

export default SimpleAuth;
