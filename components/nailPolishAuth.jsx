"use client";

import "../styles/NailPolishAuth.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/components/redax/authSlice";

export default function NailPolishAuth() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  const [isRegister, setIsRegister] = useState(false);
  const [openCap, setOpenCap] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setMessage("");
    setError("");

    dispatch(loginUser({ email, password })).then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        setOpenCap(true);
        setMessage("התחברת בהצלחה 💖");

        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        setError(res.payload || "שגיאה בהתחברות");
      }
    });
  };

  const handleRegister = () => {
    setMessage("");
    setError("");

    dispatch(registerUser({ name, email, password })).then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        setOpenCap(true);
        setMessage("נרשמת בהצלחה 💅");

        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        setError(res.payload || "שגיאה בהרשמה");
      }
    });
  };

  // מונע שהאירועים של המגע יפריעו לכפתורים
  const stopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <div
      className="scene"
      onClick={stopPropagation}
      onTouchStart={stopPropagation}
    >
      {/* הודעות */}
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className={`bottle ${isRegister ? "rotate" : ""}`}>
        <div className={`cap ${openCap ? "open" : ""}`} />
        <div className="glass">

          {/* Login */}
          <div className="face front">
            <h2>התחברות</h2>

            <input
              placeholder="אימייל"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              onTouchStart={handleLogin}
              disabled={status === "loading"}
            >
              {status === "loading" ? "מתחברת..." : "התחברי"}
            </button>

            <span
              onClick={() => setIsRegister(true)}
              onTouchStart={() => setIsRegister(true)}
            >
              עדיין לא נרשמת?
            </span>
          </div>

          {/* Register */}
          <div className="face back">
            <h2>הרשמה</h2>

            <input
              placeholder="שם מלא"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              placeholder="אימייל"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              onClick={handleRegister}
              onTouchStart={handleRegister}
              disabled={status === "loading"}
            >
              {status === "loading" ? "נרשמת..." : "הרשמה"}
            </button>

            <span
              onClick={() => setIsRegister(false)}
              onTouchStart={() => setIsRegister(false)}
            >
              כבר יש לך חשבון?
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
