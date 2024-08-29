import React from 'react';

const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar-fill"
                style={{ width: `${percentage}%` }}
            ></div>
            <span>{Math.round(percentage)}%</span>
        </div>
    );
};

export default ProgressBar;
