import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  RESPONSE_TYPE,
  CLIENT_ID,
  AUTH_ENDPOINT,
  REDIRECT_URI,
} from "./config";
import Login from "./pages/Login";
import Home from "./pages/Home";

export const Context = React.createContext();

function App() {
  const [token, setToken] = useState("");
  const [artists, setArtists] = useState(Array(50).fill(null));
  const [range, setRange] = useState("medium_range");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const getPage = () => {
    if (!token) return <Login />;
    else return <Home />;
  };

  return (
    <Context.Provider value={{ token, setToken, artists, setArtists, range, setRange }}>
      <div className="absolute w-full lg:h-full xl:h-ful 2xl:h-full">
        {getPage()}
      </div>
    </Context.Provider>
  );
}

export default App;
