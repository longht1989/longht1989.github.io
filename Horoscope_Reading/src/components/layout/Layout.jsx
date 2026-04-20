import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Layout.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems = ['Tử Vi', 'Tarot', 'Phong Thủy', 'Blog', 'Admin'];

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link to="/" className={styles.logo}>
                    <Moon size={24} className={styles.logoIcon} /> Mystic
                </Link>

                {/* Desktop Links */}
                <div className={styles.desktopLinks}>
                    {menuItems.map((item) => {
                        const path = item
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/đ/g, "d")
                            .replace(/\s+/g, "-");
                        return (
                            <Link key={item} to={`/${path}`} className={styles.navLink}>
                                {item}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <div className={styles.mobileToggle}>
                    <button onClick={() => setIsOpen(!isOpen)} className={styles.mobileToggle}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={styles.mobileMenu}
                    >
                        <div className={`container ${styles.mobileLinksContainer}`}>
                            {menuItems.map((item) => {
                                const path = item
                                    .toLowerCase()
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .replace(/đ/g, "d")
                                    .replace(/\s+/g, "-");

                                return (
                                    <Link
                                        key={item}
                                        to={`/${path}`}
                                        onClick={() => setIsOpen(false)}
                                        className={styles.mobileLink}
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Layout = () => {
    return (
        <>
            <div className="stars"></div>
            <div className="twinkling"></div>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Mystic Horoscope. AI Powered.</p>
            </footer>
        </>
    );
};

export default Layout;
