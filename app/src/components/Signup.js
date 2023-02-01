import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
function Signup() {
  const [regname, setRegname] = useState("");
  const [regsurname, setRegsurname] = useState("");
  const [regemail, setRegemial] = useState("");
  const [regpass, setRegpass] = useState("");
  const register = () => {
    Axios.post("http://localhost:5000/post", {
      name: regname,
      surname: regsurname,
      email: regemail,
      password: regpass,
    }).then((response) => {
      if (response.data === "User already exist.") {
        document.getElementById("h1").innerHTML =
          "E-mail başka bir hesap tarafından kullanılıyor.";
      }
      if (response.data === "Creating Failed") {
        document.getElementById("h1").innerHTML = "Bir Hata Oluştu.";
      } else {
        document.getElementById("h1").innerHTML = "Hesabınız Başarıyla oluştu.";
      }
      console.log(response);
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "antiquewhite",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            marginTop: "100px",
            backgroundColor: "#f2f2f2",
            padding: "30px",
            height: "50vh",
            borderRadius: "10%",
            borderStyle: "groove",
          }}
        >
          <h1 style={{ fontFamily: "sans-serif", color: "grey" }}>Register</h1>
          <label>İsim Giriniz</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setRegname(e.target.value);
            }}
          />
          <br />
          <label>Soyisim Giriniz</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setRegsurname(e.target.value);
            }}
          />{" "}
          <br />
          <label>Email Giriniz</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setRegemial(e.target.value);
            }}
          />
          <br />
          <label>Şifre Giriniz</label>
          <br />
          <input
            type="password"
            onChange={(e) => {
              setRegpass(e.target.value);
            }}
          />
          <br />
          <button
            style={{
              width: "90%",
              color: "white",
              marginTop: "10px",
              padding: "8px",
              backgroundColor: "#4CAF50",
              cursor: "4px",
              borderStyle: "none",
              borderRadius: "8px",
            }}
            onClick={register}
          >
            Register
          </button>
          <Link
            to="/"
            style={{
              display: "block",
              marginTop: "10px",
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Giriş yapmak mı istiyorsun ?
          </Link>
        </div>
      </div>
      <h3
        id="h1"
        style={{ display: "flex", justifyContent: "center", color: "red" }}
      ></h3>
    </div>
  );
}

export default Signup;
