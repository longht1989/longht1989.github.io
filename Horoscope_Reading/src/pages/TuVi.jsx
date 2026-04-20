import React, { useState } from 'react';
import { generateChart } from '../utils/tuviGenerator';
import { solarToLunarSimple } from '../utils/lunisolar';
import styles from './TuVi.module.css';

const TuViCreator = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        gender: 'male'
    });
    const [chart, setChart] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const lunarDate = solarToLunarSimple(formData.date);
        const generatedChart = generateChart(formData);
        setChart({ info: { ...formData, lunarDate }, palaces: generatedChart });
    };

    return (
        <div className="container">
            <h1 className="text-gradient" style={{ textAlign: 'center', margin: '2rem 0' }}>Lập Lá Số Tử Vi</h1>

            {!chart ? (
                <div className={`card-glass ${styles.formContainer}`}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Họ tên</label>
                            <input
                                type="text" required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col}>
                                <label className={styles.label}>Ngày sinh (DL)</label>
                                <input
                                    type="date" required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.col}>
                                <label className={styles.label}>Giờ sinh</label>
                                <input
                                    type="time" required
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Giới tính</label>
                            <select
                                value={formData.gender}
                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                className={styles.select}
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">An Sao Lập Số</button>
                    </form>
                </div >
            ) : (
                <div className={styles.chartContainer}>
                    <div className={styles.centerInfo}>
                        <h2>{chart.info.name}</h2>
                        <p>{chart.info.lunarDate.canChiYear} - {chart.info.gender === 'male' ? 'Nam Mạng' : 'Nữ Mạng'}</p>
                        <button onClick={() => setChart(null)} className="btn-primary" style={{ marginTop: '1rem' }}>Lập Lá Số Khác</button>
                    </div>
                    {/* Simplified Grid Visual: 4x4 grid with empty center */}
                    <div className={styles.grid}>
                        {/* We need to map standard 12 squares to a 4x4 grid 
                            Indices in DIA_CHI: 
                            5 (Tị)  6 (Ngọ)  7 (Mùi)  8 (Thân)
                            4 (Thìn)                  9 (Dậu)
                            3 (Mão)                   10 (Tuất)
                            2 (Dần) 1 (Sửu)  0 (Tý)   11 (Hợi)
                        */}
                        {chart.palaces.map((palace, idx) => (
                            <div key={idx} className={`${styles.palace} ${styles['p' + idx]}`}>
                                <div className={styles.palaceHeader}>{palace.sign}</div>
                                <div className={styles.palaceName}>{palace.palaceName}</div>
                                <div className={styles.stars}>
                                    {palace.stars.map((s, i) => (
                                        <div key={i} className={s.type === 'good' ? styles.starGood : styles.starBad}>{s.name}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div >
    );
};

export default TuViCreator;
