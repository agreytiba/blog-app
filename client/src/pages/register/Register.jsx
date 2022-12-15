import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="register">
      <h2 className="registerTitle">Register</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
       
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <div>
        {error && <span style={{color:"red", marginBlock:"10px"}}>Something went wrong!</span>}
        <div>
          <div className="Tologin">
            <p>already have account</p>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
