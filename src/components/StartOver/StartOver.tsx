import React, {useRef} from "react";
import "./StartOver.css";

interface StartOverProps {
    handleStartOver: () => void;
    }

export const StartOver: React.FC<StartOverProps> = ({ handleStartOver }) => {
    const startOverRef = useRef<HTMLButtonElement>(null);
    const handleStartOverWrapper = () => {
        handleStartOver();
        if (startOverRef.current) {
            startOverRef.current.blur();
        }
    }
    return (
        <div className="start-over">
            <button ref={startOverRef} onClick={handleStartOverWrapper}>Start Over</button>
        </div>
    );
};

