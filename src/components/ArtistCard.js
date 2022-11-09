import React from "react";

const ArtistCard = ({ artist }) => {
  const getCard = () => {
    return (
      <div className="bg-[#191819] p-4 rounded-xl">
        <div className="pb-[100%] relative mb-3 ">
          {artist.images.length !== 0 ? (
            <img
              className="rounded-xl h-full w-full object-cover absolute"
              src={artist.images[0].url}
              alt=""
            />
          ) : null}
        </div>
        <p className="text-[#FEFFFE] font-semibold text-lg text-end">
          {artist.name}
        </p>{" "}
      </div>
    );
  };

  return <div key={artist.id}>{artist === null ? null : getCard()}</div>;
};

export default ArtistCard;
