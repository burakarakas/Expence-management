import { Link } from "react-router-dom";
import Axios from "axios";
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
function Login() {
  const [logemail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [logpass, setLogpass] = useState("");

  const onClick = () => {
    Axios.post("http://localhost:5000/login", {
      email: logemail,
      password: logpass,
    }).then((response) => {
      console.log(response.data);
      if (response.data === "User not found") {
        setMessage("Kullanıcı bulunumadı.");
      } else if (response.data === "Wrong password") {
        setMessage("E-mail ile şifre uyuşmuyor");
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        window.location.href = "http://localhost:3000/addlistelement";
      }
    });
  };
  return (
    <Box
      id="firstDiv"
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "antiquewhite",
      }}
    >
      <Box
        id="secondDiv"
        sx={{
          backgroundColor: "#f2f2f2",
          height: "45vh",
          marginTop: "120px",
          padding: "45px",
          borderRadius: "10%",
          borderStyle: "groove",
        }}
      >
        <h1
          style={{
            fontFamily: "sans-serif",
            width: "100%",
            color: "grey",
          }}
        >
          LOGIN
        </h1>
        <Box id="Box" sx={{ width: "100%" }}>
          <label
            style={{
              fontFamily: "sans-serif",
            }}
          >
            E-Mail Giriniz
          </label>
          <br />
          <TextField
            type="text"
            id="email"
            style={{
              fontFamily: "sans-serif",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label
            style={{
              fontFamily: "sans-serif",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            Şifre Giriniz
          </label>
          <br />
          <TextField
            type="password"
            id="password"
            style={{ fontFamily: "sans-serif" }}
            onChange={(e) => {
              setLogpass(e.target.value);
            }}
          />
          <br />
          <Button
            style={{
              width: "100%",
              marginTop: "8px",
              padding: "8px",
              color: "white",
              backgroundColor: "#4CAF50",
              borderStyle: "none",
              borderRadius: "8px",
            }}
            onClick={onClick}
          >
            Login
          </Button>
          <br />
          <Link
            to="/register"
            style={{
              display: "block",
              marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "none",
              marginLeft: "30px",
            }}
          >
            Üye Değilmisiniz ?
          </Link>
          <br />
          <h3
            style={{ display: "flex", justifyContent: "center", color: "red" }}
          >
            {message}
          </h3>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
