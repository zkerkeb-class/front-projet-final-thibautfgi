import { JSX, useState } from 'react';
import './armurerie.css';
import ItemSearch from "./item-search/item-search";
import { getFrenchTranslation, getItemClass, getBorderColor } from "./service/tools.service";

function Armurerie(): JSX.Element {
    const [selectedItem, setSelectedItem] = useState<{ item: any, media: any } | null>(null);

    const handleItemSelect = (itemWithMedia: { item: any, media: any }) => {
        setSelectedItem(itemWithMedia);
    };

    return (
        <div>
            <div className="search-container">
                <ItemSearch onItemSelect={handleItemSelect} />
            </div>
            <div className="armurerie-container">
                {selectedItem ? (
                    <div className="item-details">
                        <div className="item-header">
                            {selectedItem.media && selectedItem.media.assets && selectedItem.media.assets[0] && (
                                <div className="item-image">
                                    <img
                                        src={selectedItem.media.assets[0].value}
                                        alt={getFrenchTranslation(selectedItem.item.data.name)}

                                        style={{ width: '35px', height: '35px', borderRadius: '5px', border: `2px solid ${getBorderColor(selectedItem.item.data.quality.type)}` }}
                                    />

                                </div>
                            )}
                            <h2 style={{ color: getBorderColor(selectedItem.item.data.quality.type) }}>
                                {getFrenchTranslation(selectedItem.item.data.name)}
                            </h2>
                        </div>
                        <p><strong>Qualité :</strong> {getFrenchTranslation(selectedItem.item.data.quality.name)}</p>
                        <p><strong>Niveau requis :</strong> {selectedItem.item.data.required_level || 'N/A'}</p>
                        <p><strong>Prix de vente :</strong> {selectedItem.item.data.sell_price || 'N/A'} pièces</p>
                        <p><strong>Type :</strong> {getItemClass(selectedItem.item.data.item_class.id)}</p>
                        <p><strong>Type d'inventaire :</strong> {getFrenchTranslation(selectedItem.item.data.inventory_type.name) || 'N/A'}</p>
                        <button className="recover-button">Récupérer l'item</button>
                    </div>
                ) : (
                    <p>Sélectionnez un item dans la recherche.</p>
                )}
            </div>
        </div>
    );
}

export default Armurerie;