import React, { Component } from "react";
import YouTube from "react-youtube";

class ReactYouTubeExample extends Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    // event.target.playVideo();
    event.target.pauseVideo();
  }
  render() {
    const opts = {
      height: "300",
      width: "300",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <YouTube videoId="it24hicUJkY" opts={opts} onReady={this.videoOnReady} />
    );
  }
}
export default ReactYouTubeExample;
