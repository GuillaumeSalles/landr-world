import data from "./data";
import defaultImage from "./Artboard Copy 4.png";

var artists = new Map();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const itemToArtist = d => {
  const streams = d["Streams"] || getRandomInt(100, 500000);

  var releases = [];
  if (d["Cover release 1"]) {
    releases.push({
      cover: d["Cover release 1"],
      link: d["Release 1"],
      name: d["Release Name 1"]
    });
  }
  if (d["Cover release 2"]) {
    releases.push({
      cover: d["Cover release 2"],
      link: d["Release 2"],
      name: d["Release Name 2"]
    });
  }
  if (d["Cover release 3"]) {
    releases.push({
      cover: d["Cover release 3"],
      link: d["Release 3"],
      name: d["Release Name 3"]
    });
  }
  return {
    id: d["User ID"],
    name: d["Artist name"],
    city: d["Ville"] || "Paris",
    latitude: d.Latitude,
    longitude: d.Longitude,
    releases: [],
    picture: d["Artist picture"] || defaultImage,
    cover:
      d["Cover release 1"] ||
      "http://illusion.scene360.com/wp-content/uploads/2014/10/computergraphics-album-covers-2014-03.jpg",
    streams: streams,
    downloads: streams / 37,
    releases: releases,
    genre: d["Genre"],
    description:
      d["Bio"] ||
      "Hardly anybody has brought electronic music from Berlin to the farthest flung corners of the world with more passion and enthusiasm than these two heavyweights.",
    facebook: d.Facebook,
    soundcloud: d.Soundcloud,
    twitter: d.Twitter,
    youtube: d.Youtube
  };
};

for (let artist of data.map(itemToArtist)) {
  artists.set(artist.id, artist);
}

export default artists;
