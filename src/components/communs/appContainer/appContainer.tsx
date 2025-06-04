import { JSX } from 'react';
import './appContainer.css';
import {Outlet} from "react-router";

function AppContainer({ children }: { children: JSX.Element }): JSX.Element {
    return (
        <>
            <header>
                <h1>Mon En-tête</h1>
                <nav>
                    <a href="/">Accueil</a>
                    <a href="/autre">Autre Page</a>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default AppContainer;