import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

function Chat() {
  const socket = io("http://localhost:5000");
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    return () => socket.disconnect("connect");
  }, []);

  const emit = () => {
    setList((oldlist) => [...oldlist, "BEN : " + message]);
    socket.emit("first", { message });
    socket.on("second", (res) => {
      setList((oldlist) => [...oldlist, "BOT : " + res]);
      console.log(res);
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          marginTop: "100px",
          backgroundColor: "#f2f2f2",
          padding: "30px",
          borderRadius: "5%",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "400px",
            borderStyle: "groove",
            overflow: "scroll",
          }}
        >
          {list.map((a) => (
            <p style={{}}>{a}</p>
          ))}
        </div>

        <div>
          <input
            style={{ borderStyle: "groove", width: "80%" }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
          />
          <button
            onClick={() => {
              emit();
            }}
            style={{
              width: "17%",
              marginLeft: "3px",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "3px",
              border: "none",
              cursor: "2px",
              borderRadius: "4px",
            }}
          >
            SEND
          </button>
        </div>
        <Link
          style={{
            color: "blue",
            textDecoration: "none",
            fontSize: "18px",
          }}
          to="/addlistelement"
        >
          Geri
        </Link>
      </div>
    </div>
  );
}

export default Chat;
