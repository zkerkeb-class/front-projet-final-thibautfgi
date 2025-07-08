// C:\Users\tibof\Desktop\Projet\Project B3\front-projet-final-thibautfgi\src\components\communs\header\header.tsx
import { JSX } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faLanguage, faLeaf } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import logo from '../../../../assets/image/wow-logo.png';
import { useAuth } from '../authProvider/authProvider';
import { useBackground } from '../background/background';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    changeLanguage: (lng: string) => void;
}

function Header({ changeLanguage }: HeaderProps): JSX.Element {
    const { isAdmin } = useAuth();
    const { isFire, toggleFire } = useBackground();
    const { t, i18n } = useTranslation(); // Ajout de i18n pour accéder à la langue actuelle

    const toggleLanguage = () => {
        const newLang = i18n.language === 'fr' ? 'en' : 'fr';
        changeLanguage(newLang);
    };

    return (
        <div className="header-container">
            <div className="header-top-row">
                <Link to="/" className="wow-logo"></Link>
            </div>

            <div className="header-nav-row">
                <nav className="navbar">
                    <Link to="/armurerie" className="nav-link">{t('header.armurerie')}</Link>
                    <Link to="/inventaire" className={isAdmin ? "nav-link" : "nav-link-last"}>{t('header.inventaire')}</Link>
                    {isAdmin && <Link to="/admin" className="nav-link-last">{t('header.admin')}</Link>}
                </nav>
                <div className="header-nav-buttons">
                    <button className="buttonHeader" onClick={toggleLanguage} title={t('header.language')}>
                        <span className="language-indicator">{i18n.language.toUpperCase()}</span> {/* Indique la langue actuelle */}
                    </button>
                    <button
                        className={isFire ? "buttonHeader buttonFire" : "buttonHeader buttonLeaf"}
                        onClick={toggleFire}
                        title={t('header.toggle')}
                    >
                        <FontAwesomeIcon icon={isFire ? faFire : faLeaf} size="2xs" />
                    </button>
                </div>
            </div>

            <div className="header-image-band-inverted"></div>
        </div>
    );
}

export default Header;