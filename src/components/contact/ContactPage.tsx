import React, { useState } from 'react';
import { NavSection } from '../../types';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (section: NavSection) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [inquiryType, setInquiryType] = useState<'ODM_OEM' | 'BRAND_SALES' | 'ESG_MEDIA'>('ODM_OEM');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    brandInterest: 'DISCOVERY',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('https://formspree.io/f/xjgndoae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          inquiryType:
            inquiryType === 'ODM_OEM'
              ? 'OEM / ODM 제조 파트너십'
              : inquiryType === 'BRAND_SALES'
              ? '브랜드 스토어 제휴 / 대량구매'
              : '홍보 및 기타 문의',
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `[삼덕통상 웹사이트 문의] ${formData.companyName} (${formData.contactPerson})`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setErrorMsg(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setErrorMsg('문의 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
      }
    } catch (err) {
      setErrorMsg('네트워크 연결 문제로 전송에 실패했습니다. 인터넷 상태를 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 pb-24">
      {/* Title Header */}
      <div className="bg-neutral-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-2">
            SAMDUK FOOTWEAR PLATFORM · GLOBAL PARTNERSHIP & SUPPORT
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
            CONTACT & INQUIRY
          </h1>
          <p className="text-neutral-400 text-sm mt-2 max-w-xl">
            글로벌 아웃도어·안전화 OEM/ODM 제조 제휴 및 디스커버리, K2, 아이더, K2 세이프티, 네파, 블랙야크 공식 쇼핑 스토어 연동 문의를 환영합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto" />
                <h3 className="text-2xl font-black uppercase text-neutral-900">
                  문의가 성공적으로 접수되었습니다
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  삼덕통상 파트너십 담당자가 접수해주신 귀하의 이메일({formData.email || '입력하신 이메일'})로 24시간 이내에 회신 드리겠습니다.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer mt-4"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 pb-4">
                  <span className="text-xs font-mono font-bold uppercase text-neutral-400">
                    상담 유형 선택
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'OEM / ODM 제조 파트너십', value: 'ODM_OEM' },
                      { label: '브랜드 스토어 제휴 / 대량구매', value: 'BRAND_SALES' },
                      { label: '홍보 및 기타 문의', value: 'ESG_MEDIA' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setInquiryType(type.value as any)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          inquiryType === type.value
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      회사 / 기관명 *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="예: 삼덕통상 파트너스"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      담당자 성함 / 직함 *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="홍길동 팀장"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      이메일 주소 *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      연락처 (전화번호) *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    문의 상세 내용 *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="신제품 공동 개발, 안전화 대량 구매 등 문의 내용을 자세히 기재해 주시면 신속하게 검토 후 안내 드립니다."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-4 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700 text-xs">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>전송 중...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND INQUIRY (상담 문의 전송)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900 text-white rounded-3xl p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center font-black text-lg">
                  S
                </div>
                <div>
                  <div className="text-xl font-black uppercase tracking-tight">SAMDUK FOOTWEAR</div>
                  <div className="text-xs font-mono text-neutral-400">삼덕통상 주식회사 · EST 1997</div>
                </div>
              </div>

              <div className="space-y-4 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">부산 본사 및 R&D 연구소</span>
                    <span>부산광역시 강서구 녹산산업중로 192번길 45 (송정동)</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">베트남 스마트공장</span>
                    <span>Binh Duong Province, Republic of Vietnam</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>+82 051-831-8800 (대표전화)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>contact@samduk.com / b2b@samduk.co.kr</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-blue-600 block">
                OEM / ODM PRODUCTION ASSURANCE
              </span>
              <h4 className="text-base font-black uppercase text-neutral-900">
                GORE-TEX & BOA 공식 기술 지원
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                삼덕통상은 한국 및 베트남 생산 공장 전체에 ISO 9001, ISO 14001, ISO 45001 품질 안전 인증 및 GORE-TEX 공식 생산 자격을 보유하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
