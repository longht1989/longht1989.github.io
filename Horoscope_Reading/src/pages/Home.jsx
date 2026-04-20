import React from 'react';
import { motion } from 'framer-motion';
import { Star, Compass, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const FeatureCard = ({ icon: Icon, title, desc, to }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`card-glass ${styles.featureCard}`}
    >
        <div className={styles.iconWrapper}>
            <Icon size={32} />
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDesc}>{desc}</p>
        <Link to={to} className={`btn-primary ${styles.cardButton}`}>Khám Phá</Link>
    </motion.div>
);

const Home = () => {
    return (
        <div className={styles.container}>
            <section className={styles.heroSection}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '1.5rem', lineHeight: '1.2' }}
                >
                    Khám Phá Vận Mệnh
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={styles.heroDesc}
                >
                    Kết hợp tinh hoa Tử Vi Đông Phương và công nghệ AI để giải mã cuộc đời bạn.
                </motion.p>
                <div className={styles.buttonGroup}>
                    <Link to="/tu-vi" className="btn-primary">Lập Lá Số</Link>
                    <Link to="/ai-readings" className={styles.btnSecondary}>Hỏi AI</Link>
                </div>
            </section>

            <section className={styles.featuresGrid}>
                <FeatureCard
                    icon={Star}
                    title="Tử Vi Trọn Đời"
                    desc="Lập và bình giải lá số chi tiết dựa trên giờ sinh chính xác của bạn."
                    to="/tu-vi"
                />
                <FeatureCard
                    icon={Compass}
                    title="Phong Thủy & Tarot"
                    desc="Xem hướng nhà, màu hợp mệnh và bói bài Tarot hàng ngày."
                    to="/tarot"
                />
                <FeatureCard
                    icon={BookOpen}
                    title="Thư Viện Kiến Thức"
                    desc="Kho tàng kiến thức về huyền học và các bài viết chuyên sâu."
                    to="/blog"
                />
            </section>
        </div>
    );
};

export default Home;
