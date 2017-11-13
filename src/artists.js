import data from "./data";
import defaultImage from "./Artboard Copy 4.png";
import formatNumber from "./formatNumber";

var artists = new Map();

const itemToArtist = d => {
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
    streams: formatNumber(d["Streams"]),
    downloads: formatNumber(d["Downloads"]),
    releases: releases,
    genre: d["Genre"],
    description:
      d["Bio"] ||
      "Hardly anybody has brought electronic music from Berlin to the farthest flung corners of the world with more passion and enthusiasm than these two heavyweights."
  };
};

for (let artist of data.map(itemToArtist)) {
  artists.set(artist.id, artist);
}

export default artists;
