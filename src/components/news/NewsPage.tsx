import React, { useState } from 'react';
import { LATEST_NEWS_DATA } from '../../data/samdukData';
import { NewsItem, NavSection } from '../../types';
import { Newspaper, ArrowRight, Clock, Calendar } from 'lucide-react';

interface NewsPageProps {
  onOpenNewsModal: (news: NewsItem) => void;
  onNavigate: (section: NavSection) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  onOpenNewsModal,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'EXHIBITION' | 'PRODUCT' | 'ESG' | 'CORPORATE'>('ALL');

  const categories: { label: string; value: typeof activeCategory }[] = [
    { label: '전체 (ALL)', value: 'ALL' },
    { label: '국제 박람회 (EXHIBITION)', value: 'EXHIBITION' },
    { label: '신제품 소식 (PRODUCT)', value: 'PRODUCT' },
    { label: '친환경/ESG (ESG)', value: 'ESG' },
    { label: '기업 공지 (CORPORATE)', value: 'CORPORATE' },
  ];

  const filteredNews = activeCategory === 'ALL'
    ? LATEST_NEWS_DATA
    : LATEST_NEWS_DATA.filter(item => item.category === activeCategory);

  const getBadgeColor = (category: NewsItem['category']) => {
    switch (category) {
      case 'EXHIBITION': return 'bg-blue-600 text-white';
      case 'PRODUCT': return 'bg-neutral-900 text-white';
      case 'ESG': return 'bg-emerald-600 text-white';
      case 'CORPORATE': return 'bg-neutral-700 text-white';
      default: return 'bg-neutral-900 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 pb-24">
      {/* Editorial Title Banner */}
      <div className="bg-neutral-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-blue-500 uppercase mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>SAMDUK FOOTWEAR PLATFORM · PRESS ROOM</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
              NEWS & PRESS
            </h1>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              삼덕통상의 최신 연구 개발, 국제 안전 박람회 A+A / ISPO 참가 소식, ESG 친환경 리포트를 전달합니다.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenNewsModal(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-60 overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md ${getBadgeColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed font-light">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono font-bold text-blue-600">
                  <span>READ FULL ARTICLE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
