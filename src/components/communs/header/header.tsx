// src/components/communs/header/Header.tsx (ajustez le chemin selon votre structure)
import { JSX } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faLanguage, faLeaf } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import logo from '../../../assets/image/wow-logo.png';
import { useAuth } from '../authProvider/authProvider'; // Ajustez le chemin
import { useBackground } from '../background/background'; // Mise à jour de l'import

function Header(): JSX.Element {
    const { isAdmin } = useAuth();
    const { isFire, toggleFire } = useBackground(); // Mise à jour pour useBackground

    return (
        <div className="header-container">
            <div className="header-top-row">
                <Link to="/" className="wow-logo"></Link>
            </div>

            <div className="header-nav-row">
                <nav className="navbar">
                    <Link to="/armurerie" className="nav-link">Armurerie</Link>
                    <Link to="/inventaire" className={isAdmin ? "nav-link" : "nav-link-last"}>Inventaire</Link>
                    {isAdmin && <Link to="/admin" className="nav-link-last">Admin</Link>}
                </nav>
                <div className="header-nav-buttons">
                    <button className="buttonHeader">
                        <FontAwesomeIcon icon={faLanguage} size="2xs" />
                    </button>
                    <button
                        className={isFire ? "buttonHeader buttonFire" : "buttonHeader buttonLeaf"}
                        onClick={toggleFire}
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