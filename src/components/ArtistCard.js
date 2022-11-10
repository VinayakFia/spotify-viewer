import React from "react";

const ArtistCard = ({ artist }) => {
  const getCard = () => {
    return (
      <div
        className="bg-[#191819] p-4 rounded-xl hover:bg-stone-800 
        transition-all ease-in-out duration-200"
      >
        <div className="pb-[100%] relative mb-3 ">
          {artist.album.images.length !== 0 ? (
            <img
              className="rounded-xl h-full w-full object-cover absolute"
              src={artist.album.images[0].url}
              alt=""
            />
          ) : null}
        </div>
        <p className="text-stone-400 font-semibold text-sm text-end">
          {artist.artists[0].name}
        </p>
        <p className="text-[#FEFFFE] font-semibold text-md text-end">
          {artist.name}
        </p>
      </div>
    );
  };

  if (artist === null) {
    // NOTE: this is a really bad workaround but works for the time being
    return (
      <div className="bg-[#191819] p-4 rounded-xl text-[#191819] animate-pulse h-100">.</div>
    );
  }

  return (
    <a href={artist.external_urls.spotify} key={artist.id}>
      {getCard()}
    </a>
  );
};

export default ArtistCard;
