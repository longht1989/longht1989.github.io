import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav style={{
            background: 'rgba(15, 12, 41, 0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#a78bfa', fontSize: '1.5rem', fontFamily: 'Style Script, serif', fontWeight: 'bold' }}>
                    <Moon size={24} /> Mystic
                </Link>

                {/* Desktop Links */}
                <div className="nav-links desktop-only" style={{ display: 'flex', gap: '2rem' }}>
                    {['Tử Vi', 'Tarot', 'Phong Thủy', 'Blog', 'Admin'].map((item) => (
                        <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}>
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-only">
                    <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
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
                        style={{ background: 'rgba(15, 12, 41, 0.98)', overflow: 'hidden', borderBottom: '1px solid #a78bfa' }}
                    >
                        <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem 0' }}>
                            {['Tử Vi', 'Tarot', 'Phong Thủy', 'Blog', 'Admin'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        color: 'white', textDecoration: 'none', fontSize: '1.2rem', padding: '1rem',
                                        borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center'
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
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
            <main style={{ minHeight: '80vh', padding: '2rem 0' }}>
                <Outlet />
            </main>
            <footer style={{ textAlign: 'center', padding: '2rem', background: 'rgba(0,0,0,0.3)', color: '#64748b' }}>
                <p>&copy; {new Date().getFullYear()} Mystic Horoscope. AI Powered.</p>
            </footer>
        </>
    );
};

export default Layout;
