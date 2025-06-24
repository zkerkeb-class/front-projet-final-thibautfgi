import { JSX } from 'react';
import './armurerie.css';
import ItemSearch from "./item-search/item-search";


function Armurerie(): JSX.Element {

    return (
        <>
            <div className="search-container">
                < ItemSearch/>
            </div>
            <div className="armurerie-container">
              test
            </div>

        </>
    )
}

export default Armurerie;