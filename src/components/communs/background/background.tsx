import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
    isFire: boolean;
    toggleFire: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
    const [isFire, setIsFire] = useState(false);

    const toggleFire = () => {
        setIsFire((prev) => !prev);
    };

    return (
        <BackgroundContext.Provider value={{ isFire, toggleFire }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (context === undefined) {
        throw new Error('useBackground must be used within a BackgroundProvider');
    }
    return context;
};