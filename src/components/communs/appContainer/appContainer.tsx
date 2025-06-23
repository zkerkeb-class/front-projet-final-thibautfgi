
import './appContainer.css';

import Header from "../header/header";
import Footer from "../footer/footer";
import { Outlet } from 'react-router';

function AppContainer() {
    return (

        <div className={"app-container"}>
            <Header/>
            <div className="app-content">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}

export default AppContainer;