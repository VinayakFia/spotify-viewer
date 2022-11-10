import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";

const Home = () => {
  const { token, setToken, artists, setArtists, range, setRange } =
    useContext(Context);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    searchArtists().then(renderArtists());
    searchGenres().then(renderGenres());
  }, [range]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 40,
          time_range: `${range}`,
        },
      }
    );

    setArtists(data.items);
  };

  const searchGenres = async () => {
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

    let genreObj = [];

    data.items
      .map((x) => x.genres)
      .flat(1)
      .sort()
      .map((x) => (x in genreObj ? (genreObj[x] += 1) : (genreObj[x] = 1)));

    let genresArr = [];

    // TODO: THIS HAS ABSOLUTELY ABYSMAL STYLE BUT IT WORKS OOFT
    for (let i = 0; i < 5; i++) {
      let max = 0;
      let obj = {};
      for (let j = 0; j < Object.values(genreObj).length; j++) {
        if (
          Object.values(genreObj)[j] >= max &&
          !Object.values(genresArr)
            .map((x) => x[0])
            .includes(Object.keys(genreObj)[j])
        ) {
          max = Object.values(genreObj)[j];
          obj = [Object.keys(genreObj)[j], Object.values(genreObj)[j]];
        }
      }
      genresArr.push(obj);
    }

    setGenres(genresArr);
  };

  const renderArtists = () => {
    return artists.map((artist) => <ArtistCard artist={artist} />);
  };

  const renderGenres = () => {
		if (genres.length === 0) return null;
		const max = genres[0][1];

		function roundUpNearest10(num) {
			return Math.ceil(num / 10) * 10;
		}

		const getWidth = (x) => {
			x = roundUpNearest10(x * 100);
			switch(x) {
				case 100: return "w-[100%]";
				case 90: return "w-[90%]";
				case 80: return "w-[80%]";
				case 70: return "w-[70%]";
				case 60: return "w-[60%]";
				case 50: return "w-[50%]";
				case 40: return "w-[40%]";
				case 30: return "w-[30%]";
				case 20: return "w-[20%]";
				case 10: return "w-[10%]";
				default: return "w-[0%]"
			}
		}

    return genres.map((x) => (
      <div
        className="col-span-3 relative
			rounded-full text-[#FEFFFE] font-semibold hover:bg-neutral-800"
      >
        <div className={`bg-[#1DB954] ${getWidth(x[1]/max)} absolute rounded-full p-3`}>{x[0]}</div>
        <div className="bg-[#222322] rounded-full p-3 text-[#FEFFFE] font-semibold">.</div>
      </div>
    ));
  };

	setRange("medium_term");

  return (
    <div className="w-full h-full p-10 bg-[#131312] lg:flex xl:flex 2xl:flex">
      <div className="grid grid-cols-3 gap-5 lg:h-0 xl:h-0 2xl:h-0">
        <div
          className="col-span-full border-4 border-opacity-0 border-green-200 bg-[#1DB954]
          rounded-full p-2 text-green-100 font-bold text-xl text-center m-auto"
        >
          Top Genres
        </div>
        <button
          className="col-span-1 bg-[#222322] 
          rounded-full p-2 text-[#FEFFFE]  font-semibold hover:bg-neutral-800 m-auto"
          onClick={(e) => {
            setRange("short_term");
          }}
        >
          Short Range
        </button>
        <button
          className="col-span-1  bg-[#222322] 
          rounded-full p-2 text-[#FEFFFE] font-semibold hover:bg-neutral-800 m-auto"
          onClick={(e) => {
            setRange("medium_term");
          }}
        >
          Medium Range
        </button>
        <button
          className="col-span-1 bg-[#222322] 
          rounded-full p-2 text-[#FEFFFE] font-semibold hover:bg-neutral-800 m-auto"
          onClick={(e) => {
            setRange("long_term");
          }}
        >
          Long Range
        </button>
        {renderGenres()}
        <button
          className="h-10  w-20 bg-[#222322] place-self-end col-span-3
        rounded-full p-2 text-[#FEFFFE] font-semibold hover:bg-neutral-800"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="col-span-2 w-full h-full grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 p-10 bg-[#131312]">
        {renderArtists()}
      </div>
    </div>
  );
};

export default Home;
