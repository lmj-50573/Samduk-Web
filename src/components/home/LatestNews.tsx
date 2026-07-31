import React from 'react';
import { LATEST_NEWS_DATA } from '../../data/samdukData';
import { NewsItem, NavSection } from '../../types';
import { Newspaper, ArrowRight, Clock } from 'lucide-react';

interface LatestNewsProps {
  onOpenNewsModal: (news: NewsItem) => void;
  onNavigate: (section: NavSection) => void;
}

export const LatestNews: React.FC<LatestNewsProps> = ({
  onOpenNewsModal,
  onNavigate,
}) => {
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
    <section className="py-24 bg-neutral-100 text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>09 · PRESS & INNOVATION DESK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              LATEST NEWS
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              국제 신발·안전 박람회 참가 소식, 고기능성 신제품 발표, 그리고 친환경 스마트공장 전환 소식을 확인하세요.
            </p>
          </div>

          <button
            onClick={() => onNavigate('NEWS')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <span>VIEW ALL PRESS ROOM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LATEST_NEWS_DATA.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenNewsModal(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-blue-500/80 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-2xl cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="relative h-56 overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md ${getBadgeColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                    <span>{item.date}</span>
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
                  <span>READ FULL REPORT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
