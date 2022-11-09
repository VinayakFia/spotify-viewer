import React, { useContext, useState } from "react";
import { Context } from "../App";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";

const Home = () => {
  const { token, setToken } = useContext(Context);
  const [artists, setArtists] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50
      },
    });

    console.log(data);

    setArtists(data.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => <ArtistCard artist={artist} />);
  };

  return (
    <div className="bg-slate-700 w-full h-full grid grid-cols-4 gap-5 p-10">
      <form className="col-span-4 m-auto" onSubmit={searchArtists}>
        <input
          className="bg-slate-800 text-violet-200 rounded-xl mr-4 p-3"
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button
          className="border-4 border-opacity-0 border-violet-200 bg-violet-500 
          rounded-xl p-2 text-violet-200 hover:border-opacity-75"
          type={"submit"}
        >
          Search
        </button>
      </form>
      {renderArtists()}
      <button
        className="h-10 col-span-4 rounded-xl bg-violet-500 text-violet-200 w-20 
        place-self-end border-4 border-opacity-0 border-violet-200 hover:border-opacity-75"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
