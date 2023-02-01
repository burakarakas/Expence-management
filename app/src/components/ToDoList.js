import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ToDoList() {
  const [urunler, setUrunler] = useState([]);
  const [open, setOpen] = useState(false);
  const [kat, setKat] = useState([]);
  const [edit, setEdit] = useState({
    urunAd: "",
    urunId: 0,
    urunfiyat: 0,
    urunKat: 0,
  });

  function handleClickClose() {
    setOpen(false);
  }
  function handleClickEdit() {
    axios
      .put(
        `http://localhost:5000/put/${edit.urunId}`,
        {
          urunAd: edit.urunAd,
          urunfiyat: edit.urunfiyat,
          kat_Id: edit.kat_Id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        axios
          .get("http://localhost:5000/show/urun", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUrunler(res.data);
          });
      });
    setOpen(false);
  }
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/show/urun", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUrunler(result.data);
      });
  }, [token]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/show/kat", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setKat(result.data);
      });
  }, [token]);

  function handleDelete(e) {
    axios.delete(`http://localhost:5000/${e}`).then((res) => {
      axios
        .get("http://localhost:5000/show/urun", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUrunler(res.data);
        });
    });
  }
  return (
    <TableContainer
      sx={{
        margin: "auto",
        width: "75%",
      }}
    >
      <Table
        component={Paper}
        sx={{ minWidth: 700 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>E-Mail</StyledTableCell>
            <StyledTableCell align="right">Kategori</StyledTableCell>
            <StyledTableCell align="right">Ürün</StyledTableCell>
            <StyledTableCell align="right">Fiyat</StyledTableCell>
            <StyledTableCell align="center" sx={{ width: "8%" }}>
              <DeleteIcon />
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ width: "8%" }}>
              <UpdateIcon />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urunler.map((row) => (
            <StyledTableRow key={row.userId}>
              <StyledTableCell component="th" scope="row">
                {row.urunUser.email}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.urunKat.katAd}
              </StyledTableCell>
              <StyledTableCell align="right">{row.urunAd}</StyledTableCell>
              <StyledTableCell align="right">
                {row.urunfiyat} TL
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ width: "8%" }}>
                <Button
                  value={row.urunId}
                  onClick={() => handleDelete(row.urunId)}
                >
                  <DeleteIcon />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ width: "8%" }}>
                <Button
                  onClick={() => {
                    setEdit(row);
                    setOpen(true);
                  }}
                >
                  <UpdateIcon style={{ color: "blue" }} />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Link
          to="/addlistelement"
          style={{
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#4CAF50",
            cursor: "pointer",
            borderRadius: "4px",
            padding: "10px 15px",
            marginRight: "100px",
          }}
        >
          Yeni Ürün
        </Link>
        <Link
          to="/"
          style={{
            marginLeft: "100px",
            marginTop: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <LogoutIcon sx={{ color: "black", fontSize: "40px" }} />
        </Link>
      </Box>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        sx={{ minHeight: "80vh", maxHeight: "80vh" }}
        onClose={handleClickClose}
      >
        <DialogTitle>Update</DialogTitle>
        <DialogContent sx={{ height: "350px" }}>
          <FormControl fullWidth sx={{ marginTop: "30px" }}>
            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
            <Select
              id="demo-simple-select"
              defaultValue={edit.kat_Id}
              label="Kategori"
              onChange={(e) =>
                setEdit((prevState) => ({
                  ...prevState,
                  kat_Id: e.target.value,
                }))
              }
              sx={{ width: "100%" }}
            >
              {kat.map((item) => (
                <MenuItem value={item.katId}>{item.katAd}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel sx={{ marginTop: "45px" }} id="urun">
            Ürün adı
          </InputLabel>
          <TextField
            autoFocus
            labelId="urun"
            margin="dense"
            id="urun"
            type="text"
            fullWidth
            defaultValue={edit.urunAd}
            variant="standard"
            onChange={(e) => {
              setEdit((prevState) => ({
                ...prevState,
                urunAd: e.target.value,
              }));
            }}
          />
          <InputLabel sx={{ marginTop: "45px" }} id="urun">
            Ürün Fiyatı
          </InputLabel>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            fullWidth
            defaultValue={edit.urunfiyat} //
            variant="standard"
            onChange={(e) => {
              setEdit((prevState) => ({
                ...prevState,
                urunfiyat: e.target.value,
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={() => handleClickEdit()}>Edit</Button>
        </DialogActions>
      </Dialog>
      <Link to="/chat" style={{ color: "blue", textDecoration: "none" }}>
        <LiveHelpIcon sx={{ color: "orange" }} /> Destek
      </Link>
    </TableContainer>
  );
}

export default ToDoList;
