import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todolist from "./components/ToDoList";
import AddListElement from "./components/AddListElement";
import Chat from "./components/Chat";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} exact element={<Login />} />
        <Route path={"/register"} exact element={<Signup />} />
        <Route path={"/todolist"} exact element={<Todolist />} />
        <Route path={"/addlistelement"} exact element={<AddListElement />} />
        <Route path={"/chat"} exact element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
