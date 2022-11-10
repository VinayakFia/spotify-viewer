import React from "react";
import {
  RESPONSE_TYPE,
  CLIENT_ID,
  AUTH_ENDPOINT,
  REDIRECT_URI,
  SCOPE,
} from "../config";

const Login = () => {
  return (
    <div className="bg-[#131312] h-screen text-xl text-[#FEFFFE] font-bold grid grid-rows-2">
      <p className="m-auto text-7xl">Spotify Stats</p>
      <a
        className="rounded-full bg-[#1DB954] p-3 m-auto"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default Login;
