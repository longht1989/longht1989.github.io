import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAJOR_ARCANA } from '../data/tarotData';
import styles from './Tarot.module.css';
import { RefreshCcw, Sparkles } from 'lucide-react';

const Tarot = () => {
    const [deck, setDeck] = useState([...MAJOR_ARCANA]);
    const [drawnCards, setDrawnCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleDeck = () => {
        setIsShuffling(true);
        setDrawnCards([]);

        // Simulate shuffle time
        setTimeout(() => {
            const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
            setDeck(shuffled);
            setIsShuffling(false);
        }, 1000);
    };

    const drawCards = () => {
        if (drawnCards.length > 0) return; // Already drawn

        // Take top 3
        const selected = deck.slice(0, 3);
        setDrawnCards(selected);
    };

    const spreadLabels = ["Quá Khứ", "Hiện Tại", "Tương Lai"];

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Bói Bài Tarot</h1>
                <p style={{ color: '#94a3b8' }}>Đặt một câu hỏi trong tâm trí và rút 3 lá bài để soi sáng vận mệnh.</p>
            </div>

            {/* Deck Area */}
            <div className={styles.deckContainer} onClick={drawnCards.length === 0 ? drawCards : null}>
                <AnimatePresence>
                    {drawnCards.length === 0 && (
                        <motion.div
                            className={styles.deck}
                            animate={isShuffling ? {
                                x: [0, -10, 10, -10, 10, 0],
                                rotate: [0, -5, 5, -5, 5, 0]
                            } : {}}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#a78bfa' }}>
                                <Sparkles size={40} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            {drawnCards.length === 0 ? (
                <button onClick={shuffleDeck} disabled={isShuffling} className="btn-primary" style={{ minWidth: '150px' }}>
                    {isShuffling ? 'Đang xáo bài...' : 'Xáo Bài & Rút'}
                </button>
            ) : (
                <button onClick={shuffleDeck} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <RefreshCcw size={18} /> Làm Lại
                </button>
            )}

            {/* Spread Area */}
            <div className={styles.spread}>
                {spreadLabels.map((label, index) => (
                    <div key={index} className={styles.cardSlot}>
                        <div className={styles.cardLabel}>{label}</div>
                        {drawnCards[index] && (
                            <CardReveal card={drawnCards[index]} index={index} />
                        )}
                        {!drawnCards[index] && (
                            <div style={{
                                width: '100%', height: '100%',
                                border: '2px dashed rgba(255,255,255,0.1)',
                                borderRadius: '15px'
                            }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Sub-component for individual card flip animation
const CardReveal = ({ card, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateY: 0 }}
            animate={{
                opacity: 1,
                y: 0,
                rotateY: isFlipped ? 180 : 0
            }}
            transition={{
                delay: index * 0.1,
                duration: 0.3
            }}
            className={styles.cardInner}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={styles.cardBack}>
                <Sparkles size={32} style={{ opacity: 0.5 }} />
                <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>Chạm để lật</p>
            </div>
            <div className={styles.cardFront}>
                {/* Visuals for the card */}
                <div className={styles.cardImagePlaceholder}>
                    {/* Simplified iconography based on ID or Name could go here */}
                    🔮
                </div>
                <h3 style={{ marginBottom: '0.5rem', fontFamily: 'Cinzel, serif', color: '#b45309' }}>{card.name}</h3>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{card.keywords}</p>
                <div style={{ width: '30px', height: '2px', background: '#cbd5e1', margin: '0.5rem 0' }}></div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.4', fontStyle: 'italic' }}>"{card.meaning}"</p>
            </div>
        </motion.div>
    );
};

export default Tarot;
