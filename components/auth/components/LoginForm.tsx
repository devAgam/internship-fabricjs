import React, { useState } from "react";
import styles from "../../styles/LoginForm.module.css";
import Loading from "./Loading";
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (data.success) {
      window.location.href = "/draw";
      return;
    }
    setIsLoading(false);
    alert("something went wrong");
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1>Sign in to account</h1>
      <h2>Sign up or login to draw!</h2>
      <input id="username" type="username" name="username" />
      <input id="password" type="password" name="password" />
      <button type="submit">{isLoading ? <Loading /> : "Sign in"}</button>
      <h3>
        Built By <span>devAgam</span>
      </h3>
      {/* add loading */}
    </form>
  );
}
