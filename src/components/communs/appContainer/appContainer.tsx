// C:\Users\tibof\Desktop\Projet\Project B3\front-projet-final-thibautfgi\src\components\communs\appContainer\appContainer.tsx
import './appContainer.css';
import Header from "../header/header";
import Footer from "../footer/footer";
import { Outlet } from 'react-router-dom';
import { BackgroundProvider, useBackground } from '../background/background';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

function AppContainerContent() {
    const { isFire } = useBackground();
    const { t, i18n: i18nInstance } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18nInstance.changeLanguage(lng);
    };

    return (
        <div className={`app-container ${isFire ? 'fire-background' : ''}`}>
            <div className="top">
                <Header changeLanguage={changeLanguage} />
            </div>
            <div className="main-content">
                <Outlet /> {/* Tous les autres composants ici utiliseront useTranslation */}
            </div>
            <div className="bot">
                <Footer /> {/* Ajoutez des traductions dans Footer si nécessaire */}
            </div>
        </div>
    );
}

function AppContainer() {
    return (
        <I18nextProvider i18n={i18n}>
            <BackgroundProvider>
                <AppContainerContent />
            </BackgroundProvider>
        </I18nextProvider>
    );
}

export default AppContainer;