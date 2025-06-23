import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import { Outlet, useNavigate } from 'react-router-dom';

const Guard = () => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const checkStatus = () => {
        axios
            .get('/auth/status')
            .then((response) => {
                setStatus(response.data.message);
                if (response.data.message === 'Connecté') {
                    setUser(response.data.user);
                    setError(null);
                } else {
                    setUser(null);
                    setError('Utilisateur non connecté.');
                }
            })
            .catch((error) => {
                console.error('Erreur checkStatus dans Guard:', error.response ? error.response.data : error.message);
                setStatus('Erreur lors de la vérification du statut');
                setError('Erreur lors de la vérification du statut.');
                setUser(null);
            });
    };

    useEffect(() => {
        checkStatus();
        // Vérification réactive si l'état change
        if (!user && !error) {
            navigate('/connect');
        }
    }, [user, error, navigate]);

    return (
        <>
            {user ? <Outlet /> : null} {/* Rend la route protégée uniquement si connecté */}
        </>
    );
};

export default Guard;