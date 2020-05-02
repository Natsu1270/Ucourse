import React, {useEffect} from 'react';
import plyr from 'plyr';
import "plyr/dist/plyr.css"

export default function VideoPlayer({videoUrl, videoId}) {
    const target = `plyr-player-${videoId}`
    const options = {
        controls: [
            'play-large', // The large play button in the center
            'restart', // Restart playback
            'rewind', // Rewind by the seek time (default 10 seconds)
            'play', // Play/pause playback
            'fast-forward', // Fast forward by the seek time (default 10 seconds)
            'progress', // The progress bar and scrubber for playback and buffering
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'mute', // Toggle mute
            'volume', // Volume control
            'captions', // Toggle captions
            'settings', // Settings menu
            'pip', // Picture-in-picture (currently Safari only)
            'airplay', // Airplay (currently Safari only)
            'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
            'fullscreen', // Toggle fullscreen
        ],

    };
    useEffect(() => {
        let player;
        if (videoId) {
            player = new plyr(`#${target}`, options);
        }
        return () => {
            if (player && player.length > 0) {
                for (const playerEl of player) {
                    playerEl.destroy();
                }
            }
        }
    }, [])
    return (
        <video id={target} playsInline controls data-poster="">
            <source src={videoUrl} type="video/mp4"/>
            <source src={videoUrl} type="video/webm"/>

            {/*<track kind="captions" label="English captions" src="/path/to/captions.vtt" srcLang="en" default/>*/}
        </video>
    );
}