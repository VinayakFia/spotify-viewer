import React, { useContext, useState } from "react";
import { Context } from "../App";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";

const Home = () => {
  const { token, setToken } = useContext(Context);
  const [artists, setArtists] = useState([]);
  const [range, setRange] = useState("medium_term");

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    //e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
          time_range: `${range}`,
        },
      }
    );

    console.log(data);

    setArtists(data.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => <ArtistCard artist={artist} />);
  };

  return (
    <div className="w-full h-full p-10 bg-[#131312]">
      <div className="grid grid-cols-3 gap-5">
        <div
          className="col-span-full border-4 border-opacity-0 border-green-200 bg-[#1DB954]
          rounded-full p-2 text-green-100 font-bold text-xl text-center"
        >
          Spotify Top Artists
        </div>
        <button
          className="col-span-1 bg-[#222322] 
          rounded-full p-2 text-[#FEFFFE]  font-semibold hover:bg-neutral-800"
          onClick={(e) => {
            setRange("short_term");
            searchArtists(e);
          }}
        >
          Short Range
        </button>
        <button
          className="col-span-1  bg-[#222322] 
          rounded-full p-2 text-[#FEFFFE]  font-semibold hover:bg-neutral-800"
          onClick={(e) => {
            setRange("medium_term");
            searchArtists(e);
          }}
        >
          Medium Range
        </button>
        <button
          className="col-span-1 bg-[#222322] 
          rounded-full p-2 text-[#FEFFFE] font-semibold hover:bg-neutral-800"
          onClick={(e) => {
            setRange("long_term");
            searchArtists(e);
          }}
        >
          Long Range
        </button>
        <button
        className="h-10  w-20 bg-[#222322] place-self-end col-span-3
        rounded-full p-2 text-[#FEFFFE] font-semibold hover:bg-neutral-800"
        onClick={logout}
      >
        Logout
      </button>
      </div>

      <div className="w-full h-full grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 grid-cols-6 gap-5 p-10 bg-[#131312]">
        {renderArtists()}
      </div>
    </div>
  );
};

export default Home;
