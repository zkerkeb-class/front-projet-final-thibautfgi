import { JSX } from 'react';
import './footer.css';
import TestItem from "../../communs/test/testItem";

function Footer(): JSX.Element {

    return (
        <>
             <footer className=" footer-container">
                <p>© 2024 Mountain Journey. All Rights Reserved</p>
            </footer>
        </>
    )
}

export default Footer;