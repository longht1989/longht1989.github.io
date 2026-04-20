'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InputForm from '@/components/InputForm';
import NatalChart from '@/components/NatalChart';
import Interpretation from '@/components/Interpretation';

export default function Home() {
  const [currentView, setCurrentView] = useState<'input' | 'chart' | 'interpretation'>('input');
  const [birthData, setBirthData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    setBirthData(data);
    setCurrentView('chart');
  };

  const handleViewInterpretation = () => {
    setCurrentView('interpretation');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section - only show on input view */}
        {currentView === 'input' && (
          <section className="relative py-16 md:py-24 lg:py-32 px-4 overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 -z-10">
              {/* Gradient Orbs */}
              <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float opacity-50"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '4s' }}></div>

              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="max-w-6xl mx-auto text-center mb-20">
              {/* Main Title */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass mb-8 animate-pulse-glow">
                  <span className="text-accent text-sm md:text-base font-semibold">✨ Chào mừng đến với Mystic</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight">
                  <span className="gradient-text block">Khám Phá Vận Mệnh</span>
                  <span className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 block">
                    Qua La Số Tử Vi
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-secondary-light mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Xem la số Tử Vi trực tuyến với công nghệ hiện đại,
                kết hợp nghệ thuật chiêm tinh học cổ truyền Việt Nam
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                <div className="card px-6 py-4 flex items-center gap-3 hover:glow transition-all">
                  <span className="text-2xl">✨</span>
                  <span className="font-semibold text-base md:text-lg">Chính xác cao</span>
                </div>
                <div className="card px-6 py-4 flex items-center gap-3 hover:glow transition-all">
                  <span className="text-2xl">🎯</span>
                  <span className="font-semibold text-base md:text-lg">Dễ hiểu</span>
                </div>
                <div className="card px-6 py-4 flex items-center gap-3 hover:glow transition-all">
                  <span className="text-2xl">🔮</span>
                  <span className="font-semibold text-base md:text-lg">Miễn phí</span>
                </div>
                <div className="card px-6 py-4 flex items-center gap-3 hover:glow transition-all">
                  <span className="text-2xl">⚡</span>
                  <span className="font-semibold text-base md:text-lg">Nhanh chóng</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 md:gap-10 max-w-3xl mx-auto px-4">
                <div className="card p-6 md:p-8">
                  <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">10K+</div>
                  <div className="text-sm md:text-base text-secondary-light">Người dùng</div>
                </div>
                <div className="card p-6 md:p-8">
                  <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-sm md:text-base text-secondary-light">Độ chính xác</div>
                </div>
                <div className="card p-6 md:p-8">
                  <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">24/7</div>
                  <div className="text-sm md:text-base text-secondary-light">Hỗ trợ</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation tabs - show when data exists */}
        {birthData && (
          <div className="sticky top-16 md:top-20 z-40 glass border-b border-border/30 py-4 md:py-6 px-4 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 md:gap-5">
              <button
                onClick={() => setCurrentView('chart')}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all text-sm md:text-base font-semibold ${currentView === 'chart'
                    ? 'btn-gradient text-white shadow-lg'
                    : 'card text-foreground hover:glow'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span>📊</span>
                  La Số
                </span>
              </button>
              <button
                onClick={() => setCurrentView('interpretation')}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all text-sm md:text-base font-semibold ${currentView === 'interpretation'
                    ? 'btn-gradient text-white shadow-lg'
                    : 'card text-foreground hover:glow'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span>📖</span>
                  Luận Giải
                </span>
              </button>
              <button
                onClick={() => {
                  setBirthData(null);
                  setCurrentView('input');
                }}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl card text-foreground hover:glow transition-all text-sm md:text-base font-semibold"
              >
                <span className="flex items-center gap-2">
                  <span>🔄</span>
                  Tính Mới
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="py-12 md:py-16 lg:py-20">
          {currentView === 'input' && <InputForm onSubmit={handleSubmit} />}
          {currentView === 'chart' && birthData && (
            <NatalChart birthData={birthData} onViewInterpretation={handleViewInterpretation} />
          )}
          {currentView === 'interpretation' && birthData && (
            <Interpretation birthData={birthData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
