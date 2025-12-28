"use client";

import "../styles/NailPolishAuth.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/components/redax/authSlice";

export default function NailPolishAuth() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);

  const [isRegister, setIsRegister] = useState(false);
  const [openCap, setOpenCap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginUser({ email, password })).then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        setOpenCap(true);
        // setTimeout(() => window.location.href = "/home", 1200);
      }
    });
  };

  const handleRegister = () => {
    dispatch(registerUser({ name, email, password })).then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        setOpenCap(true);
        // setTimeout(() => window.location.href = "/home", 1200);
      }
    });
  };

  return (
    <div className="scene" onClick={e => e.stopPropagation()}>
      <div className={`bottle ${isRegister ? "rotate" : ""}`}>
        <div className={`cap ${openCap ? "open" : ""}`} />
        <div className="glass">

          {/* Login */}
          <div className="face front">
            <h2>התחברות</h2>
            <input placeholder="אימייל" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="סיסמה" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={status === "loading"}>התחברי</button>
            <span onClick={() => setIsRegister(true)}>עדיין לא נרשמת?</span>
          </div>

          {/* Register */}
          <div className="face back">
            <h2>הרשמה</h2>
            <input placeholder="שם מלא" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="אימייל" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="סיסמה" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister} disabled={status === "loading"}>הרשמה</button>
            <span onClick={() => setIsRegister(false)}>כבר יש לך חשבון?</span>
          </div>

        </div>
      </div>
    </div>
  );
}
