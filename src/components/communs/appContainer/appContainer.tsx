// src/components/communs/AppContainer.tsx (ajustez le chemin selon votre structure)
import './appContainer.css';
import Header from "../header/header";
import Footer from "../footer/footer";
import { Outlet } from 'react-router-dom';
import { BackgroundProvider, useBackground } from '../background/background'; // Ajusté à ./background

function AppContainerContent() {
    const { isFire } = useBackground(); // Récupère isFire depuis le contexte

    return (
        <div className={`app-container ${isFire ? 'fire-background' : ''}`}>
            <div className="top">
                <Header />
            </div>
            <div className="main-content">
                <Outlet />
            </div>
            <div className="bot">
                <Footer />
            </div>
        </div>
    );
}

function AppContainer() {
    return (
        <BackgroundProvider>
            <AppContainerContent />
        </BackgroundProvider>
    );
}

export default AppContainer;