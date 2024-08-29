import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { updateUserProgress } from '../api';

const VideoPlayer = ({ video, userId, onVideoComplete }) => {
    const videoRef = useRef(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if (!video) {
            console.error('No video provided to VideoPlayer');
            return;
        }

        const vjsPlayer = videojs(videoRef.current, {
            controls: true,
            playbackRates: [1],
            fill: true,
        });

        vjsPlayer.on('timeupdate', () => {
            updateUserProgress({
                userId,
                videoId: video._id,
                lastWatchedTime: vjsPlayer.currentTime(),
                completed: false,
            }).catch(error => console.error('Failed to update user progress:', error));
        });

        vjsPlayer.on('ended', () => {
            onVideoComplete();
        });

        setPlayer(vjsPlayer);

        return () => {
            if (vjsPlayer) {
                vjsPlayer.dispose();
            }
        };
    }, [video, userId, onVideoComplete]);

    useEffect(() => {
        if (player && video && video.url) {
            player.src({ src: video.url, type: 'video/mp4' }); // Ensure 'type' matches the actual video format
        } else {
            console.warn('Player or video URL is missing');
        }
    }, [player, video]);

    return <video ref={videoRef} className="video-js vjs-big-play-centered" />;
};

export default VideoPlayer;
