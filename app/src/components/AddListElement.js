import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function AddListElement() {
  const root = {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };
  const [kat, setKat] = useState([]);
  const [urunAd, setUrunad] = useState("");
  const [urunFiyat, setUrunfiyat] = useState();
  const [selected, setSelected] = useState(1);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [cKat, setCkat] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/show/kat").then((result) => {
      setKat(result.data);
    });
  }, []);
  const token = localStorage.getItem("token");
  const handleClick = () => {
    axios
      .post(
        "http://localhost:5000/create/urun",
        {
          urunAd: urunAd,
          urunfiyat: urunFiyat,
          kat_Id: selected,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result.data);

        if (result.data === "create successfuly") {
          setMessage("Başarıyla Eklendi.");
        }
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const categoryCreate = () => {
    axios
      .post(
        "http://localhost:5000/create/kat",
        {
          katAd: cKat,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        axios
          .get("http://localhost:5000/show/kat", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setKat(res.data));
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      style={{
        backgroundColor: "antiquewhite",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          width: "378px",
          backgroundColor: "#f2f2f2",
          height: "550px",
          marginTop: "50px",
          borderRadius: "30px",
          padding: "20px",
          borderStyle: "groove",
        }}
      >
        <form action="">
          <label htmlFor="">Kategori</label>
          <select
            style={root}
            name="kategori"
            id="kategori"
            options={kat}
            placeholder="Kategori seçiniz "
            onChange={(e) => setSelected(e.target.value)}
          >
            {kat.map((item) => (
              <option key={item.katId} value={item.katId}>
                {item.katAd}
              </option>
            ))}
          </select>
          <label htmlFor="urun">Ürün</label>
          <input
            style={root}
            onChange={(e) => {
              setUrunad(e.target.value);
            }}
            type="text"
            placeholder="Ürün Adı Giriniz"
          />
          <label htmlFor="fiyat">Fiyat</label>
          <input
            style={root}
            onChange={(e) => {
              setUrunfiyat(e.target.value);
            }}
            type=""
            placeholder="Fiyatı Giriniz"
          />
          <button
            onClick={handleClick}
            type={"button"}
            style={{
              width: "100%",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "14px 20px",
              margin: "8px 0",
              border: "none",
              borderRadius: "4px",
              cursor: "4px",
            }}
          >
            Submit
          </button>
          <Link
            to="/todolist"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              border: "none",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "5px",
              backgroundColor: "#4CAF50",
              padding: "10px 15px",
              marginBottom: "30px",
              textDecoration: "none",
            }}
          >
            Geçmiş Harcamalarım
          </Link>
          <Button
            onClick={handleClickOpen}
            style={{
              display: "flex",
              color: "#B22222",
              textDecoration: "none",
            }}
          >
            YENİ BİR ALIŞVERİŞ KATEGORİSİ EKLEMEK İSTER MİSİN?
          </Button>
          <Link
            to="/"
            style={{
              float: "right",
              textDecoration: "none",
              marginLeft: "29px",
              marginTop: "15px",
              borderRadius: "4px",
            }}
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            <LogoutIcon sx={{ color: "black", fontSize: "40px" }} />
          </Link>
          <Link to="/chat" style={{ color: "blue" }}>
            <LiveHelpIcon sx={{ color: "orange", marginTop: "15px" }} />
            Destek
          </Link>
          <h2
            style={{ display: "flex", justifyContent: "center", color: "red" }}
          >
            {message}
          </h2>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Gerçekten zorunlu değilse yeni bir kategori açmayınız.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setCkat(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={categoryCreate}>Create</Button>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </Box>
  );
}

export default AddListElement;
