import React, { useState } from 'react';
import { Compass, Wind, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './PhongThuy.module.css';

// --- Data & Logic ---

const CAN = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
const CHI = ['Thân', 'Dậu', 'Tuất', 'Hợi', ' Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', ' Mùi'];

const CUNG_NAMES = [
    '', 'Khảm (Thủy)', 'Khôn (Thổ)', 'Chấn (Mộc)', 'Tốn (Mộc)',
    'Trung Cung', 'Càn (Kim)', 'Đoài (Kim)', 'Cấn (Thổ)', 'Ly (Hỏa)'
];

const DIRECTIONS = {
    1: { // Khảm
        good: [
            { dir: 'Đông Nam', star: 'Sinh Khí' },
            { dir: 'Đông', star: 'Thiên Y' },
            { dir: 'Nam', star: 'Diên Niên' },
            { dir: 'Bắc', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Tây Nam', star: 'Tuyệt Mệnh' },
            { dir: 'Đông Bắc', star: 'Ngũ Quỷ' },
            { dir: 'Tây Bắc', star: 'Lục Sát' },
            { dir: 'Tây', star: 'Họa Hại' }
        ]
    },
    2: { // Khôn
        good: [
            { dir: 'Đông Bắc', star: 'Sinh Khí' },
            { dir: 'Tây', star: 'Thiên Y' },
            { dir: 'Tây Bắc', star: 'Diên Niên' },
            { dir: 'Tây Nam', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Bắc', star: 'Tuyệt Mệnh' },
            { dir: 'Đông Nam', star: 'Ngũ Quỷ' },
            { dir: 'Nam', star: 'Lục Sát' },
            { dir: 'Đông', star: 'Họa Hại' }
        ]
    },
    3: { // Chấn
        good: [
            { dir: 'Nam', star: 'Sinh Khí' },
            { dir: 'Bắc', star: 'Thiên Y' },
            { dir: 'Đông Nam', star: 'Diên Niên' },
            { dir: 'Đông', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Tây', star: 'Tuyệt Mệnh' },
            { dir: 'Tây Bắc', star: 'Ngũ Quỷ' },
            { dir: 'Đông Bắc', star: 'Lục Sát' },
            { dir: 'Tây Nam', star: 'Họa Hại' }
        ]
    },
    4: { // Tốn
        good: [
            { dir: 'Bắc', star: 'Sinh Khí' },
            { dir: 'Nam', star: 'Thiên Y' },
            { dir: 'Đông', star: 'Diên Niên' },
            { dir: 'Đông Nam', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Đông Bắc', star: 'Tuyệt Mệnh' },
            { dir: 'Tây Nam', star: 'Ngũ Quỷ' },
            { dir: 'Tây', star: 'Lục Sát' },
            { dir: 'Tây Bắc', star: 'Họa Hại' }
        ]
    },
    6: { // Càn
        good: [
            { dir: 'Tây', star: 'Sinh Khí' },
            { dir: 'Đông Bắc', star: 'Thiên Y' },
            { dir: 'Tây Nam', star: 'Diên Niên' },
            { dir: 'Tây Bắc', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Nam', star: 'Tuyệt Mệnh' },
            { dir: 'Đông', star: 'Ngũ Quỷ' },
            { dir: 'Bắc', star: 'Lục Sát' },
            { dir: 'Đông Nam', star: 'Họa Hại' }
        ]
    },
    7: { // Đoài
        good: [
            { dir: 'Tây Bắc', star: 'Sinh Khí' },
            { dir: 'Tây Nam', star: 'Thiên Y' },
            { dir: 'Đông Bắc', star: 'Diên Niên' },
            { dir: 'Tây', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Đông', star: 'Tuyệt Mệnh' },
            { dir: 'Nam', star: 'Ngũ Quỷ' },
            { dir: 'Đông Nam', star: 'Lục Sát' },
            { dir: 'Bắc', star: 'Họa Hại' }
        ]
    },
    8: { // Cấn
        good: [
            { dir: 'Tây Nam', star: 'Sinh Khí' },
            { dir: 'Tây Bắc', star: 'Thiên Y' },
            { dir: 'Tây', star: 'Diên Niên' },
            { dir: 'Đông Bắc', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Đông Nam', star: 'Tuyệt Mệnh' },
            { dir: 'Bắc', star: 'Ngũ Quỷ' },
            { dir: 'Đông', star: 'Lục Sát' },
            { dir: 'Nam', star: 'Họa Hại' }
        ]
    },
    9: { // Ly
        good: [
            { dir: 'Đông', star: 'Sinh Khí' },
            { dir: 'Đông Nam', star: 'Thiên Y' },
            { dir: 'Bắc', star: 'Diên Niên' },
            { dir: 'Nam', star: 'Phục Vị' }
        ],
        bad: [
            { dir: 'Tây Bắc', star: 'Tuyệt Mệnh' },
            { dir: 'Tây', star: 'Ngũ Quỷ' },
            { dir: 'Tây Nam', star: 'Lục Sát' },
            { dir: 'Đông Bắc', star: 'Họa Hại' }
        ]
    }
};

const calculatePhongThuy = (year, gender) => {
    // 1. Can Chi
    const can = CAN[year % 10];
    const chi = CHI[year % 12];
    const lunarYear = `${can} ${chi}`;

    // 2. Cung Mệnh (Kua)
    // Sum digits
    let sum = year.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    while (sum > 9) {
        sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    let kua = 0;
    if (year < 2000) {
        if (gender === 'male') kua = 11 - sum;
        else kua = 4 + sum;
    } else {
        // 2000+
        if (gender !== 'male') kua = 4 + sum;
        else kua = 11 - sum; // Used same logic as pre-2000, consistent with common simple formulas for close range
    }

    // Reduce kua to single
    while (kua > 9) {
        kua = kua.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }

    // Handle 5
    if (kua === 5 || kua === 0) { // Safety check for 0 though unlikely
        if (gender === 'male') kua = 2; // Khôn
        else kua = 8; // Cấn
    }

    return {
        lunarYear,
        kua,
        element: CUNG_NAMES[kua],
        directions: DIRECTIONS[kua]
    };
};

const PhongThuy = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const res = calculatePhongThuy(parseInt(year), gender);
        setResult(res);
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>
                    <Compass size={40} />
                    Phong Thủy Bát Trạch
                </h1>

                <div className={styles.card}>
                    <div className={styles.formGroup}>
                        <div>
                            <label className={styles.label}>Năm Sinh (Dương Lịch)</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <label className={styles.label}>Giới Tính</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={styles.select}
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        className={styles.button}
                    >
                        Xem Phong Thủy
                    </button>
                </div>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.resultSection}
                    >
                        <div className={styles.resultTitle}>
                            <h2 className={styles.lunarYear}>{result.lunarYear}</h2>
                            <p className={styles.element}>Cung Mệnh: <strong className={styles.elementHighlight}>{result.element}</strong></p>
                        </div>

                        <div className={styles.directionGrid}>
                            {/* Good Directions */}
                            <div className={`${styles.directionCard} ${styles.goodCard}`}>
                                <h3 className={`${styles.cardHeader} ${styles.goodHeader}`}>
                                    <Wind size={20} /> Hướng Tốt (Cát)
                                </h3>
                                <ul className={styles.list}>
                                    {result.directions.good.map((d, i) => (
                                        <li key={i} className={styles.listItem}>
                                            <span>{d.dir}</span>
                                            <strong className={styles.goodStar}>{d.star}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bad Directions */}
                            <div className={`${styles.directionCard} ${styles.badCard}`}>
                                <h3 className={`${styles.cardHeader} ${styles.badHeader}`}>
                                    <Info size={20} /> Hướng Xấu (Hung)
                                </h3>
                                <ul className={styles.list}>
                                    {result.directions.bad.map((d, i) => (
                                        <li key={i} className={styles.listItem}>
                                            <span>{d.dir}</span>
                                            <strong className={styles.badStar}>{d.star}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default PhongThuy;
