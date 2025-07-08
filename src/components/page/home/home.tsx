// src/components/page/home/Home.tsx
import { JSX } from 'react';
import './home.css';
import { useAuth } from "../../communs/authProvider/authProvider";

// @ts-ignore
import Connect from "../../communs/connect/connect";
import { useTranslation } from 'react-i18next';

function Home(): JSX.Element {
    const { isAuthenticated, user, login } = useAuth();
    const { t } = useTranslation();

    return (
        <div className={'home-container'}>
            <div className="container">
                <h4>{t('home.welcome')}</h4><br />
                {isAuthenticated ? (
                    <>
                        <h6>{t('home.welcomeAuthenticated', { user: user })}</h6><br />
                        <Connect />
                    </>
                ) : (
                    <>
                        <h6>{t('home.welcomeUnauthenticated')}</h6><br />
                        <Connect />
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;