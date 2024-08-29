import React, { useState, useEffect } from 'react';
import { getVideos, getUserProgress } from '../api';
import VideoPlayer from './VideoPlayer.jsx';
import ProgressBar from './ProgressBar.jsx';

const Dashboard = () => {
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = '66cf364165db7a0186e4ad5e'; // Replace with actual user ID from auth

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videosResponse = await getVideos();
                if (videosResponse.data && videosResponse.data.length > 0) {
                    setVideos(videosResponse.data);
                } else {
                    console.warn('No videos found in the response');
                }

                const progressResponse = await getUserProgress(userId);
                if (progressResponse.data) {
                    setProgress(progressResponse.data);
                } else {
                    console.warn('No progress data found for user');
                }

                const lastWatchedVideo = progressResponse.data.find(p => !p.completed);
                if (lastWatchedVideo) {
                    const index = videosResponse.data.findIndex(v => v._id === lastWatchedVideo.videoId);
                    if (index !== -1) setCurrentVideoIndex(index);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const handleVideoComplete = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const getProgressPercentage = () => {
        if (videos.length === 0) return 0;
        const completedVideos = progress.filter(p => p.completed).length;
        return (completedVideos / videos.length) * 100;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <h1>Training Module</h1>
            {videos.length > 0 ? (
                <>
                    <VideoPlayer
                        video={videos[currentVideoIndex]}
                        userId={userId}
                        onVideoComplete={handleVideoComplete}
                    />
                    <ProgressBar percentage={getProgressPercentage()} />
                </>
            ) : (
                <div>No videos available</div>
            )}
        </div>
    );
};

export default Dashboard;
