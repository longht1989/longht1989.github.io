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
            <div className={styles.titleSection}>
                <h1 className={`text-gradient ${styles.title}`}>Bói Bài Tarot</h1>
                <p className={styles.subtitle}>Đặt một câu hỏi trong tâm trí và rút 3 lá bài để soi sáng vận mệnh.</p>
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
                            <div className={styles.deckIcon}>
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
                            <div className={styles.emptySlot} />
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
                <p className={styles.cardBackInstruction}>Chạm để lật</p>
            </div>
            <div className={styles.cardFront}>
                {/* Visuals for the card */}
                <div className={styles.cardImagePlaceholder}>
                    {/* Simplified iconography based on ID or Name could go here */}
                    🔮
                </div>
                <h3 className={styles.cardName}>{card.name}</h3>
                <p className={styles.cardKeywords}>{card.keywords}</p>
                <div className={styles.separator}></div>
                <p className={styles.cardMeaning}>"{card.meaning}"</p>
            </div>
        </motion.div>
    );
};

export default Tarot;
