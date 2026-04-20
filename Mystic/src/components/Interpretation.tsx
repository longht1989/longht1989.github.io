'use client';

import starsData from '@/data/stars.json';

interface InterpretationProps {
    birthData: any;
}

export default function Interpretation({ birthData }: InterpretationProps) {
    // Get a few stars to show interpretations for
    const mainStars = starsData.chinhTinh.slice(0, 5);
    const secondaryStars = starsData.phuTinh.slice(0, 3);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="space-y-8 md:space-y-12">
                {/* User Info */}
                <div className="glass rounded-xl p-6 md:p-8 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3">
                        <span className="gradient-text">Luận Giải Tử Vi</span>
                    </h2>
                    <p className="text-base md:text-lg text-secondary-light">
                        {birthData.name} - Sinh ngày {birthData.birthDate}
                    </p>
                </div>

                {/* Main Stars Interpretation */}
                <div className="glass rounded-xl md:rounded-2xl p-6 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 md:mb-10 gradient-text border-b border-border pb-4 md:pb-6">
                        <span className="flex items-center gap-3">
                            <span className="text-3xl">⭐</span>
                            Chính Tinh
                        </span>
                    </h3>

                    <div className="space-y-6 md:space-y-8">
                        {mainStars.map((star) => (
                            <div
                                key={star.id}
                                className="card p-6 md:p-8 hover:glow transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-3">
                                    <h4 className="text-xl md:text-2xl font-serif font-bold text-primary-light">
                                        {star.name}
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {star.element && (
                                            <span className="px-4 py-2 bg-primary/20 rounded-full text-sm font-medium">
                                                {star.element}
                                            </span>
                                        )}
                                        {star.category && (
                                            <span className="px-4 py-2 bg-accent/20 text-accent-dark rounded-full text-sm font-medium">
                                                {star.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
                                    {star.description}
                                </p>
                                <div className="pt-5 border-t border-border/50">
                                    <p className="text-sm md:text-base text-secondary-light italic">
                                        Sao này ảnh hưởng đến các khía cạnh liên quan đến {star.category},
                                        mang tính chất {star.yinYang}, thuộc hành {star.element}.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secondary Stars Interpretation */}
                <div className="glass rounded-xl md:rounded-2xl p-6 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 md:mb-10 gradient-text border-b border-border pb-4 md:pb-6">
                        <span className="flex items-center gap-3">
                            <span className="text-3xl">✨</span>
                            Phụ Tinh & Các Sao Khác
                        </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        {secondaryStars.map((star) => (
                            <div
                                key={star.id}
                                className="card p-6 md:p-7 hover:glow transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                                    <h4 className="text-lg md:text-xl font-semibold text-foreground">
                                        {star.name}
                                    </h4>
                                    <span className="px-3 py-1.5 bg-secondary/20 rounded text-sm font-medium w-fit">
                                        {star.category}
                                    </span>
                                </div>
                                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                                    {star.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Interpretation */}
                <div className="glass rounded-xl md:rounded-2xl p-6 md:p-10 bg-gradient-to-br from-surface to-surface-light">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 gradient-text">
                        <span className="flex items-center gap-3">
                            <span className="text-3xl">📝</span>
                            Tổng Quan
                        </span>
                    </h3>
                    <div className="space-y-5 md:space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed">
                        <p>
                            Dựa trên thông tin ngày giờ sinh, la số Tử Vi của bạn được lập ra với sự phân bố
                            các sao chính và phụ tinh trong 12 cung. Mỗi cung đại diện cho một khía cạnh
                            khác nhau trong cuộc sống của bạn.
                        </p>
                        <div className="card p-5 md:p-6 border-l-4 border-accent">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <p className="font-semibold text-accent text-lg mb-2">Lưu ý quan trọng</p>
                                    <p className="text-secondary-light text-sm md:text-base">
                                        Đây là phiên bản demo với dữ liệu mẫu. Để có kết quả chính xác, cần áp dụng các
                                        thuật toán tính toán phức tạp dựa trên âm dương ngũ hành và các quy tắc Tử Vi truyền thống.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
