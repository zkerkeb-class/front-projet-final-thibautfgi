import { useState } from 'react';
import axios from '../../../config/axiosConfig';
import {Outlet} from "react-router";

const Login = () => {
    const [status, setStatus] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);

    const handleLogin = () => {
        console.log('Redirection vers /auth/bnet');
        window.location.href = 'http://localhost:3000/auth/bnet';
    };

    const checkStatus = () => {
        console.log('Vérification du statut...');
        axios
            .get('/auth/status')
            .then((response) => {
                console.log('Réponse:', response.data);
                setStatus(response.data.message);
                if (response.data.message === 'Connecté') {
                    setUser(response.data.user);
                    setAccessToken(response.data.accessToken);
                } else {
                    setUser(null);
                    setAccessToken(null);
                }
            })
            .catch((error) => {
                console.error('Erreur checkStatus:', error.response ? error.response.data : error.message);
                setStatus('Erreur lors de la vérification du statut: ' + (error.response?.data?.message || error.message));
            });
    };

    const handleLogout = () => {
        console.log('Déconnexion...');
        axios
            .get('/auth/logout')
            .then(() => {
                setStatus('Déconnecté');
                setUser(null);
                setAccessToken(null);
            })
            .catch((error) => {
                console.error('Erreur handleLogout:', error.response ? error.response.data : error.message);
                setStatus('Erreur lors de la déconnexion: ' + (error.response?.data?.message || error.message));
            });
    };

    return (
        <div style={{padding: '20px'}}>
            <h1>Connexion à Battle.net</h1>
            <div style={{marginBottom: '10px'}}>
                <button onClick={handleLogin}>Se connecter</button>
                <button onClick={checkStatus} style={{marginLeft: '10px'}}>
                    Vérifier le statut
                </button>
                {user && (
                    <button onClick={handleLogout} style={{marginLeft: '10px'}}>
                        Se déconnecter
                    </button>
                )}
            </div>
            {status && <p>Statut : {status}</p>}
            {user && <p>Utilisateur : {user}</p>}
            {accessToken && <p>Token d'accès : {accessToken}</p>}

            <main>
                <Outlet/>
            </main>

        </div>


    ) ;
};

export default Login;