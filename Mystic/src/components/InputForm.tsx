'use client';

import { useState } from 'react';

interface InputFormProps {
    onSubmit: (data: any) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        birthTime: '',
        gender: 'nam',
        calendarType: 'duong',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                {/* Form Card */}
                <div className="card p-6 md:p-10 glow">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block mb-4">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                                <span className="text-4xl md:text-5xl">🔮</span>
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-3">
                            <span className="gradient-text">Nhập Thông Tin</span>
                        </h2>
                        <p className="text-secondary-light text-sm md:text-base">
                            Điền thông tin của bạn để xem la số Tử Vi
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
                                <span className="text-accent">👤</span>
                                Họ và Tên
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl bg-surface-light border-2 border-border text-foreground placeholder-secondary-light focus:outline-none focus:border-primary-light transition-all text-sm md:text-base"
                                placeholder="Ví dụ: Nguyễn Văn A"
                            />
                        </div>

                        {/* Calendar Type */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
                                <span className="text-accent">📅</span>
                                Loại Lịch
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`cursor-pointer transition-all ${formData.calendarType === 'duong' ? 'card glow' : 'card'}`}>
                                    <input
                                        type="radio"
                                        name="calendarType"
                                        value="duong"
                                        checked={formData.calendarType === 'duong'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="p-4 text-center">
                                        <div className="text-2xl mb-2">☀️</div>
                                        <div className={`font-semibold ${formData.calendarType === 'duong' ? 'text-primary-light' : 'text-foreground'}`}>
                                            Dương Lịch
                                        </div>
                                    </div>
                                </label>
                                <label className={`cursor-pointer transition-all ${formData.calendarType === 'am' ? 'card glow' : 'card'}`}>
                                    <input
                                        type="radio"
                                        name="calendarType"
                                        value="am"
                                        checked={formData.calendarType === 'am'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="p-4 text-center">
                                        <div className="text-2xl mb-2">🌙</div>
                                        <div className={`font-semibold ${formData.calendarType === 'am' ? 'text-primary-light' : 'text-foreground'}`}>
                                            Âm Lịch
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Birth Date & Time */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="birthDate" className="block text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
                                    <span className="text-accent">📆</span>
                                    Ngày Sinh
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl bg-surface-light border-2 border-border text-foreground focus:outline-none focus:border-primary-light transition-all text-sm md:text-base"
                                />
                            </div>

                            <div>
                                <label htmlFor="birthTime" className="block text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
                                    <span className="text-accent">⏰</span>
                                    Giờ Sinh
                                </label>
                                <input
                                    type="time"
                                    id="birthTime"
                                    name="birthTime"
                                    value={formData.birthTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl bg-surface-light border-2 border-border text-foreground focus:outline-none focus:border-primary-light transition-all text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
                                <span className="text-accent">⚧️</span>
                                Giới Tính
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`cursor-pointer transition-all ${formData.gender === 'nam' ? 'card glow' : 'card'}`}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="nam"
                                        checked={formData.gender === 'nam'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="p-4 text-center">
                                        <div className="text-2xl mb-2">♂️</div>
                                        <div className={`font-semibold ${formData.gender === 'nam' ? 'text-primary-light' : 'text-foreground'}`}>
                                            Nam
                                        </div>
                                    </div>
                                </label>
                                <label className={`cursor-pointer transition-all ${formData.gender === 'nu' ? 'card glow' : 'card'}`}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="nu"
                                        checked={formData.gender === 'nu'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="p-4 text-center">
                                        <div className="text-2xl mb-2">♀️</div>
                                        <div className={`font-semibold ${formData.gender === 'nu' ? 'text-primary-light' : 'text-foreground'}`}>
                                            Nữ
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-4 md:py-5 rounded-xl btn-gradient text-white font-bold text-base md:text-lg transition-all hover:scale-[1.02] hover:glow shadow-lg"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span>✨</span>
                                Xem La Số Tử Vi
                                <span>✨</span>
                            </span>
                        </button>
                    </form>

                    {/* Info Footer */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                        <p className="text-center text-xs md:text-sm text-secondary-light">
                            🔒 Thông tin của bạn được bảo mật và chỉ dùng để tính toán la số
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
