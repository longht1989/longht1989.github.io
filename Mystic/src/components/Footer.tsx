'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 border-t border-border/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
                                <span className="text-2xl">🔮</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold gradient-text">
                                    Mystic
                                </h3>
                                <p className="text-xs text-accent">Tử Vi Trực Tuyến</p>
                            </div>
                        </div>
                        <p className="text-secondary-light text-sm mb-4 max-w-md leading-relaxed">
                            Ứng dụng xem la số Tử Vi trực tuyến hiện đại, giúp bạn khám phá vận mệnh
                            và hiểu rõ hơn về bản thân qua nghệ thuật chiêm tinh học cổ truyền Việt Nam.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl card hover:glow transition-all flex items-center justify-center group"
                                aria-label="Facebook"
                            >
                                <svg className="w-5 h-5 text-secondary-light group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl card hover:glow transition-all flex items-center justify-center group"
                                aria-label="YouTube"
                            >
                                <svg className="w-5 h-5 text-secondary-light group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl card hover:glow transition-all flex items-center justify-center group"
                                aria-label="Email"
                            >
                                <svg className="w-5 h-5 text-secondary-light group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="text-accent">🔗</span>
                            Liên Kết
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="#gioi-thieu" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Giới Thiệu
                                </Link>
                            </li>
                            <li>
                                <Link href="#huong-dan" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Hướng Dẫn
                                </Link>
                            </li>
                            <li>
                                <Link href="#lien-he" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Liên Hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="text-accent">📚</span>
                            Tài Nguyên
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Blog Tử Vi
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Tra Cứu Sao
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-secondary-light hover:text-accent transition-colors text-sm flex items-center gap-2 group">
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    Chính Sách
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-secondary-light text-sm text-center md:text-left">
                        © {currentYear} <span className="text-accent font-semibold">Mystic</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="#" className="text-secondary-light hover:text-accent transition-colors">
                            Điều Khoản
                        </Link>
                        <Link href="#" className="text-secondary-light hover:text-accent transition-colors">
                            Bảo Mật
                        </Link>
                        <Link href="#" className="text-secondary-light hover:text-accent transition-colors">
                            Cookie
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
