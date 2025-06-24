import { useState, useEffect, JSX } from 'react';
import { searchItems } from '../../../communs/service/apiService';
import { Link } from 'react-router-dom';
import './item-search.css'; // Importation du fichier CSS
import { LocalizedString, ItemQuality, ItemSearchResult } from './item-search.interface';

const getFrenchTranslation = (localized: LocalizedString): string =>
    localized.fr_FR || 'Nom inconnu';

// ✅ Fonction correcte, définie **une seule fois**
const searchItemsCallback = (
    searchTerm: string,
    callback: (allData: ItemSearchResult[] | null, error: string | null) => void
): void => {
    console.log(`🔍 Recherche complète avec "${searchTerm}"`);

    // Remplacer les espaces par %20 dans searchTerm
    const encodedSearchTerm = searchTerm.replace(/ /g, '%20');

    const searchParams = {
        name: encodedSearchTerm,
        _page: 1,
        _pageSize: 50,
        orderby: 'name.fr_FR:asc',
    };
    console.log('Paramètres envoyés à searchItems:', searchParams); // Log des paramètres

    // Requête principale
    searchItems(searchParams).then((response) => {
        console.log('Réponse reçue de searchItems:', response);
        if (response.results?.length > 0) {
            console.log('✅ Résultats trouvés côté API avec filtre name.fr_FR:', response.results);
            callback(response.results, null);
        } else {
            console.warn('⚠️ Aucun résultat avec nom.fr_FR, fallback sans filtre');

            // Fallback total avec le terme encodé
            searchItems({
                name: encodedSearchTerm,
                _page: 1,
                _pageSize: 50,
                orderby: 'name.fr_FR:asc',
            })
                .then((fallbackResponse) => {
                    const all = fallbackResponse.results || [];
                    const filtered = all.filter((item) =>
                        getFrenchTranslation(item.data.name).toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    console.log('🎯 Résultats après fallback local:', filtered);
                    callback(filtered.length ? filtered : null, filtered.length ? null : 'Aucun filtre dispo');
                })
                .catch((error) => {
                    console.error('❌ Erreur fallback:', error);
                    callback(null, error);
                });
        }
    })
        .catch((error) => {
            console.error('❌ Erreur requête principale:', error);
            callback(null, error);
        });
};

function ItemSearch(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');
    const [allResults, setAllResults] = useState<ItemSearchResult[]>([]);
    const [displayedResults, setDisplayedResults] = useState<ItemSearchResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resultsPerPage = 10; // Limite à 10 résultats

    useEffect(() => {
        let timeoutId: number | undefined;

        if (searchTerm.length >= 3) {
            setIsLoading(true);
            console.log('Recherche déclenchée avec:', searchTerm); // Log pour débogage
            timeoutId = window.setTimeout(() => {
                searchItemsCallback(searchTerm, (data, err) => {
                    if (err) {
                        setError(err);
                        setAllResults([]);
                        setDisplayedResults([]);
                    } else if (data) {
                        setError(null);
                        setAllResults(data);
                        // Afficher seulement les 10 premiers résultats
                        setDisplayedResults(data.slice(0, resultsPerPage));
                    }
                    setIsLoading(false);
                });
            }, 800);
        } else {
            setAllResults([]);
            setDisplayedResults([]);
        }

        return () => {
            if (timeoutId !== undefined) clearTimeout(timeoutId);
        };
    }, [searchTerm]);

    return (
        <div className="container">
            <h1 className="title">Recherche d'Items</h1>
            <div className="search-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    className="search-input"
                />

                {searchTerm.length >= 3 && (
                    <div className="dropdown">
                        {isLoading && <p className="loading">Chargement...</p>}

                        {!isLoading && error && <p className="error">{error}</p>}

                        {!isLoading && displayedResults.length > 0 && (
                            <ul className="results-list">
                                {displayedResults.map((item) => (
                                    <li key={item.data.id} className="result-item">
                                        {getFrenchTranslation(item.data.name)} (ID: {item.data.id})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemSearch;