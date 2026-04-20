'use client';

import starsData from '@/data/stars.json';
import palacesData from '@/data/palaces.json';

interface NatalChartProps {
    birthData: any;
    onViewInterpretation: () => void;
}

// Mock function to generate chart data (simplified)
function generateChartData(birthData: any) {
    // This is a simplified mock. Real implementation would use complex Tu Vi algorithms
    const { palaces } = palacesData;

    // Randomly assign stars to palaces for demo purposes
    return palaces.map((palace, index) => {
        const numStars = Math.floor(Math.random() * 3) + 1;
        const assignedStars = [];

        // Add some main stars
        if (index === 0) {
            assignedStars.push(starsData.chinhTinh[0]); // Tử Vi at Mệnh
        }
        if (index === 4) {
            assignedStars.push(starsData.chinhTinh[4]); // Thiên Đồng at Quan Lộc
        }

        // Add random secondary stars
        for (let i = 0; i < Math.min(numStars, 2); i++) {
            const randomStar = starsData.phuTinh[Math.floor(Math.random() * starsData.phuTinh.length)];
            assignedStars.push(randomStar);
        }

        return {
            ...palace,
            stars: assignedStars,
        };
    });
}

export default function NatalChart({ birthData, onViewInterpretation }: NatalChartProps) {
    const chartData = generateChartData(birthData);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="space-y-8 md:space-y-12">
                {/* User Info */}
                <div className="glass rounded-xl p-6 md:p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-accent mb-3">
                        {birthData.name}
                    </h2>
                    <p className="text-base md:text-lg text-secondary-light">
                        Sinh ngày {birthData.birthDate} lúc {birthData.birthTime} ({birthData.calendarType === 'am' ? 'Âm lịch' : 'Dương lịch'})
                    </p>
                </div>

                {/* Main Chart - 12 Palaces Grid */}
                <div className="glass rounded-xl md:rounded-2xl p-6 md:p-10 glow">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-center mb-8 md:mb-12 gradient-text">
                        La Số Tử Vi
                    </h3>

                    {/* Responsive grid - 2 cols on mobile, 3 on tablet, 4 on desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {chartData.map((palace, index) => (
                            <div
                                key={palace.id}
                                className="card p-4 md:p-6 hover:border-primary hover:glow transition-all group min-h-[160px] sm:min-h-[180px]"
                            >
                                {/* Palace Header */}
                                <div className="mb-4 pb-3 border-b border-border">
                                    <h4 className="font-serif font-bold text-accent text-lg md:text-xl">
                                        {palace.name}
                                    </h4>
                                    <p className="text-xs md:text-sm text-secondary-light mt-2 line-clamp-1">
                                        {palace.description.split(' - ')[1]}
                                    </p>
                                </div>

                                {/* Stars in this palace */}
                                <div className="space-y-2">
                                    {palace.stars && palace.stars.length > 0 ? (
                                        palace.stars.map((star: any, starIndex: number) => (
                                            <div
                                                key={`${star.id}-${starIndex}`}
                                                className={`text-sm md:text-base px-3 py-2 rounded-lg ${star.type === 'chính'
                                                        ? 'bg-primary/20 text-primary-light font-semibold'
                                                        : 'bg-surface text-foreground'
                                                    }`}
                                            >
                                                {star.name}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs md:text-sm text-secondary/50 italic">Không có sao</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Legend - responsive layout */}
                    <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t border-border">
                        <div className="flex flex-wrap gap-6 md:gap-8 justify-center text-sm md:text-base">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded bg-primary/20"></div>
                                <span className="text-secondary-light font-medium">Chính Tinh</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded bg-surface"></div>
                                <span className="text-secondary-light font-medium">Phụ Tinh</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                    <button
                        onClick={onViewInterpretation}
                        className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-xl btn-gradient text-white font-bold text-lg md:text-xl transition-all hover:scale-[1.02] hover:glow shadow-lg"
                    >
                        <span className="flex items-center justify-center gap-3">
                            <span className="text-2xl">📖</span>
                            Xem Luận Giải Chi Tiết
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
