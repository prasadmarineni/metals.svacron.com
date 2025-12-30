import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}><a href="https://svacron.com">Svacron</a></h3>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.columnHeader}>Metal Rates</h4>
                    <div className={styles.linkList}>
                        <a href="/gold-rate-today" className={styles.link}>Gold Rate Today</a>
                        <a href="/silver-rate-today" className={styles.link}>Silver Rate Today</a>
                        <a href="/platinum-rate-today" className={styles.link}>Platinum Rate Today</a>
                        <a href="/gold-price-history" className={styles.link}>Gold Price History (60 years)</a> 
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.columnHeader}>Resources</h4>
                    <div className={styles.linkList}>
                        <a href="/sitemap.xml" className={styles.link} target="_blank">Sitemap</a>
                        <a href="https://calculators.svacron.com" className={styles.link}>Svacron - Financial Calculators</a>
                        <a href="https://svacron.com" className={styles.link}>Svacron - AI Automation</a>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.columnHeader}>Legal</h4>
                    <div className={styles.linkList}>
                        <a href="#" className={styles.link}>Privacy Policy</a>
                        <a href="#" className={styles.link}>Terms of Service</a>
                        <a href="https://svacron.com/contact" className={styles.link}>Contact Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
