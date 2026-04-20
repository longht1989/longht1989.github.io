'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow group-hover:scale-110 transition-transform">
                            <span className="text-2xl md:text-3xl">🔮</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl md:text-2xl font-serif font-bold gradient-text">
                                Mystic
                            </h1>
                            <p className="text-xs text-accent">Tử Vi Trực Tuyến</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-foreground hover:text-accent transition-colors font-medium relative group"
                        >
                            Trang Chủ
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#gioi-thieu"
                            className="text-foreground hover:text-accent transition-colors font-medium relative group"
                        >
                            Giới Thiệu
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#huong-dan"
                            className="text-foreground hover:text-accent transition-colors font-medium relative group"
                        >
                            Hướng Dẫn
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#lien-he"
                            className="text-foreground hover:text-accent transition-colors font-medium relative group"
                        >
                            Liên Hệ
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* CTA Button (Desktop) */}
                    <div className="hidden md:block">
                        <button className="px-6 py-2.5 rounded-xl btn-gradient text-white font-semibold hover:scale-105 transition-transform shadow-lg">
                            Xem Ngay
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg card transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t border-border/30">
                        <Link
                            href="/"
                            className="block px-4 py-3 text-foreground hover:bg-surface-light rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Trang Chủ
                        </Link>
                        <Link
                            href="#gioi-thieu"
                            className="block px-4 py-3 text-foreground hover:bg-surface-light rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Giới Thiệu
                        </Link>
                        <Link
                            href="#huong-dan"
                            className="block px-4 py-3 text-foreground hover:bg-surface-light rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Hướng Dẫn
                        </Link>
                        <Link
                            href="#lien-he"
                            className="block px-4 py-3 text-foreground hover:bg-surface-light rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Liên Hệ
                        </Link>
                        <button className="w-full px-6 py-3 rounded-xl btn-gradient text-white font-semibold shadow-lg">
                            Xem Ngay
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
