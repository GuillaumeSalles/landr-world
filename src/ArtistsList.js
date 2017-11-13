import React, { Component } from "react";
import "./ArtistsList.css";
import formatNumber from "./formatNumber";

class ArtistsList extends Component {
  render() {
    return (
      <div className="artists-list-container">
        <div className="artists-list-header">
          <div />
          <div className="artist">Artist</div>
          <div className="streams">Streams</div>
          <div className="downloads">Downloads</div>
        </div>
        {this.props.artists
          .sort((a, b) => b.streams - a.streams)
          .map(artist => (
            <div key={artist.id} className="artists-list-item">
              <img className="picture" src={artist.picture} />
              <div className="name">{artist.name}</div>
              <div className="streams">{formatNumber(artist.streams)}</div>
              <div className="downloads">{formatNumber(artist.downloads)}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default ArtistsList;
