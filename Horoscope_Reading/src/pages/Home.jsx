import React from 'react';
import { motion } from 'framer-motion';
import { Star, Compass, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, to }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="card-glass"
        style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
    >
        <div style={{ padding: '1rem', background: 'rgba(167, 139, 250, 0.1)', borderRadius: '50%', color: '#a78bfa' }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem' }}>{title}</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{desc}</p>
        <Link to={to} className="btn-primary" style={{ marginTop: 'auto', textDecoration: 'none', display: 'inline-block' }}>Khám Phá</Link>
    </motion.div>
);

const Home = () => {
    return (
        <div className="container">
            <section style={{ textAlign: 'center', padding: '4rem 0 6rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Cinzel, serif', marginBottom: '1.5rem', lineHeight: '1.2' }}
                >
                    Khám Phá Vận Mệnh
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem', color: '#e2e8f0' }}
                >
                    Kết hợp tinh hoa Tử Vi Đông Phương và công nghệ AI để giải mã cuộc đời bạn.
                </motion.p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/tu-vi" className="btn-primary">Lập Lá Số</Link>
                    <Link to="/ai-readings" className="btn-primary" style={{ background: 'transparent', border: '1px solid #a78bfa' }}>Hỏi AI</Link>
                </div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
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
