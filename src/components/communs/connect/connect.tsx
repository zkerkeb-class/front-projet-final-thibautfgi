// src/components/communs/connect/Connect.tsx
import { useAuth } from '../authProvider/authProvider'; // Ajustez le chemin si nécessaire
import './connect.css';
import { useTranslation } from 'react-i18next';

function Connect() {
    const { isAuthenticated, user, login, logout, error } = useAuth(); // Ajout de isLoading si géré par useAuth
    const { t } = useTranslation();

    return (
        <div className="connect-container">
            <div className="connect-content">
                <div style={{ marginBottom: '10px' }}>
                    {!isAuthenticated && (
                        <button
                            className="recover-button"
                            onClick={login}
                        >
                            {t('connect.login')}
                        </button>
                    )}
                    {isAuthenticated && (
                        <button
                            className="recover-button"
                            onClick={logout}
                            style={{ marginLeft: '10px' }}
                        >
                            {t('connect.logout')}
                        </button>
                    )}
                </div>
                {isAuthenticated && (
                    <div>
                        <p>{t('connect.user')} : {user}</p>
                        {/* <p>Token d'accès : {accessToken}</p> Optionnel, pour débogage */}
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{t('connect.error')} : {error}</p>}
            </div>
        </div>
    );
}

export default Connect;