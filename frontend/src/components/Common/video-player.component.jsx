import React, { Component } from 'react';
import plyr from 'plyr';
import "plyr/dist/plyr.css"

export default class Plyr extends Component {
  componentDidMount() {
    const options = {};
    this.player = plyr.setup('#plyr-player', options);
  }
  componentWillUnmount() {
    // if (this.player.length > 0) {
    //   for (const playerEl of this.player) {
    //     playerEl.destroy();
    //   }
    // }
  }
  render() {
    const { videoUrl, videoProvider } = this.props;
    return (
        <video id="plyr-player" playsInline controls data-poster="">
            <source src={videoUrl} type="video/mp4"/>
            <source src={videoUrl} type="video/webm"/>

            {/*<track kind="captions" label="English captions" src="/path/to/captions.vtt" srcLang="en" default/>*/}
        </video>
    );
  }
}