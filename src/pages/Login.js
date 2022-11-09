import React from "react";
import { RESPONSE_TYPE, CLIENT_ID, AUTH_ENDPOINT, REDIRECT_URI } from "../config";

const Login = () => {
  return (
    <div>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>
    </div>
  );
};

export default Login;
