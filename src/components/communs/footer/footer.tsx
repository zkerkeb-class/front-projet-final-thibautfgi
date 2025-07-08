
import { JSX } from 'react';
import './footer.css';
import { useTranslation } from 'react-i18next';

function Footer(): JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <footer className="footer-container">
                <p>{t('footer.copyright')}</p>
            </footer>
        </>
    );
}

export default Footer;