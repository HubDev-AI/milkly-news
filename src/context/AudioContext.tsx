import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface AudioContextType {
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [soundEnabled, setSoundEnabled] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (soundEnabled) {
                audioRef.current.play().catch(e => console.error("Audio playback blocked:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [soundEnabled]);

    return (
        <AudioContext.Provider value={{ soundEnabled, setSoundEnabled }}>
            <audio 
                ref={audioRef}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
                loop 
                className="hidden"
            />
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
