import {useState, useEffect, JSX} from 'react';
import { apiGetItembyId } from '../../../service/apiService';

function TestItem(): JSX.Element {
    const [itemData, setItemData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiGetItembyId(19019, (data, err) => {
            if (err) {
                setError(err);
            } else {
                setItemData(data);
            }
        });
    }, []);

    if (error) return <p>Erreur : {error}</p>;

    if (!itemData) return <p>Chargement...</p>;

    return (
        <div>
            <h1>{itemData.name}</h1>
            <p>Qualité : {itemData.quality.name}</p>
            <p>Niveau requis : {itemData.required_level}</p>
            <p>Prix d'achat : {itemData.purchase_price} pièces</p>
            <p>Prix de vente : {itemData.sell_price} pièces</p>
            <p>Type : {itemData.item_class.name} - {itemData.item_subclass.name}</p>
            <p>Durabilité : {itemData.preview_item.durability.display_string}</p>
            <h2>Statistiques :</h2>
            <ul>
                {itemData.preview_item.stats.map((stat: any, index: number) => (
                    <li key={index}>{stat.display.display_string}</li>
                ))}
            </ul>
            <h2>Sorts :</h2>
            <ul>
                {itemData.preview_item.spells.map((spell: any, index: number) => (
                    <li key={index}>
                        <strong>{spell.spell.name}</strong>: {spell.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestItem;