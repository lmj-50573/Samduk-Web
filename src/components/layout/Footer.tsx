import React, { useState } from 'react';
import { NavSection, BrandId } from '../../types';
import { BRANDS_DATA } from '../../data/samdukData';
import { 
  ExternalLink, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Award, 
  Globe,
  Loader2,
  Check
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
  onSelectBrandFilter: (brand: BrandId) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectBrandFilter,
  onOpenBrandStore,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xjgndoae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: '뉴스레터 및 카탈로그 구독 신청',
          _subject: `[삼덕통상 뉴스레터/카탈로그 신청] ${email}`,
        }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      } else {
        alert('구독 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (err) {
      alert('네트워크 연결 문제로 구독 요청에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800">
      {/* Top newsletter & certification band */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-blue-500 uppercase tracking-widest block mb-2 font-bold">
              SAMDUK FOOTWEAR PLATFORM · EST 1997
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase">
              ENGINEERED FOR EXTREMES. CRAFTED FOR LIFE.
            </h3>
            <p className="text-neutral-400 text-sm mt-3 max-w-xl">
              삼덕통상은 한국을 대표하는 글로벌 첨단 풋웨어 제조 기업입니다.<br />
              GORE-TEX® 및 BOA® Fit System 공식 제조 파트너로서 산업현장과 대자연을 위한 최고의 품질을 약속합니다.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 bg-blue-900/40 border border-blue-500/40 rounded-xl flex items-center space-x-3 text-blue-300 text-xs">
                <Check className="w-5 h-5 text-blue-400 shrink-0" />
                <span>카탈로그 및 뉴스레터 구독 신청이 Formspree를 통해 접수되었습니다.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="기업 B2B 뉴스레터 또는 제품 카탈로그 이메일"
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center space-x-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>전송 중...</span>
                    </>
                  ) : (
                    <span>SUBSCRIBE</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Company Identity Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black text-base rounded-sm">
              S
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              SAMDUK <span className="text-blue-500">FOOTWEAR</span>
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            비에스앤디(BS&D) 기반의 신발 R&D 및 바이오메카닉스 전문 엔지니어링을 통해 대한민국을 넘어 전 세계 60여 개국 브랜드에 프리미엄 풋웨어를 공급합니다.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-mono text-neutral-300">
              <Award className="w-3.5 h-3.5 text-blue-500 mr-1" />
              GORE-TEX Partner
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-mono text-neutral-300">
              <Award className="w-3.5 h-3.5 text-blue-500 mr-1" />
              BOA® Certified
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-mono text-neutral-300">
              <Globe className="w-3.5 h-3.5 text-blue-500 mr-1" />
              K-Safety No.1
            </span>
          </div>
        </div>

        {/* Quick Navigation (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            PLATFORM
          </h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li>
              <button 
                onClick={() => onNavigate('HOME')} 
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                HOME
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('SHOP')} 
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                SHOP CATALOG
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('BRANDS')} 
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                BRANDS
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('LOOKBOOK')} 
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                LOOKBOOK
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('STORY')} 
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                FACTORY STORY
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('NEWS')} 
                className="hover:text-blue-500 transition-colors cursor-pointer"
              >
                NEWS & PRESS
              </button>
            </li>
          </ul>
        </div>

        {/* Official Brand Stores (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            OFFICIAL BRAND MALLS
          </h4>
          <ul className="space-y-2.5 text-sm">
            {BRANDS_DATA.map((brand) => (
              <li key={brand.id}>
                <div className="flex items-center justify-between group">
                  <button
                    onClick={() => {
                      onSelectBrandFilter(brand.id);
                      onNavigate('SHOP');
                    }}
                    className="text-neutral-300 group-hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>{brand.name}</span>
                    <span className="text-[11px] text-neutral-500">({brand.nameKo})</span>
                  </button>
                  <button
                    onClick={() => onOpenBrandStore(brand.officialStoreUrl, brand.name)}
                    className="text-neutral-500 hover:text-blue-500 transition-colors cursor-pointer inline-flex items-center text-xs"
                    title={`${brand.name} 공식몰 바로가기`}
                  >
                    <span>공식몰</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate & Factory Info (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            CORPORATE INFO
          </h4>
          <div className="space-y-2.5 text-xs text-neutral-400">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-300 font-bold block">부산 HQ 및 R&D 센터</span>
                <span>부산광역시 강서구 녹산산업중로 192번길 45</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-300 font-bold block">베트남 스마트공장</span>
                <span>Binh Duong Province, Republic of Vietnam</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span>+82 051-831-8800 (대표전화)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span>contact@samduk.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer Bottom */}
      <div className="border-t border-neutral-900 bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
          <div>
            삼덕통상(주) | 대표이사: 문창섭 | 사업자등록번호: 605-81-34892
            <span className="hidden md:inline"> | ISO 9001 · 14001 · 45001 인증 기업</span>
          </div>
          <div className="mt-2 sm:mt-0 font-mono">
            © {new Date().getFullYear()} SAMDUK FOOTWEAR CO., LTD. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
