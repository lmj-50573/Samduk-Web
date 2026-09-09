import React, { useEffect, useRef } from 'react';

// 홈페이지에 처음 들어왔을 때 재생되는 스크롤 연동 인트로.
// 스크롤한 만큼 신발이 내려와 박스에 담기고, 뚜껑이 닫히고, 화면이 서서히 사라지며
// 그 뒤에 있던 실제 홈페이지 콘텐츠(히어로 배너 등)가 드러남.
// 별도 라이브러리 없이 순수 스크롤 위치 계산 + CSS 3D 트릭(옆면 skew)으로 입체감을 표현함.
export const IntroShoeBox: React.FC = () => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const spacer = spacerRef.current;
      if (!spacer) return;

      const rect = spacer.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      let progress = total > 0 ? scrolled / total : 0;
      progress = Math.max(0, Math.min(1, progress));

      // 0 ~ 0.6 구간: 신발이 위에서 아래로 내려오며 작아지고 살짝 회전 (원근감 연출)
      const dropProgress = Math.min(1, progress / 0.6);
      const startY = -230;
      const endY = 6;
      const y = startY + (endY - startY) * dropProgress;
      const scale = 1 - dropProgress * 0.6;
      const rotate = dropProgress * -18;
      if (shoeRef.current) {
        shoeRef.current.style.transform = `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
        shoeRef.current.style.opacity = progress > 0.62 ? '0' : '1';
      }

      // 0.55 ~ 0.85 구간: 박스 뚜껑이 닫힘
      const lidProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.3));
      const lidAngle = -165 + 165 * lidProgress;
      if (lidRef.current) {
        lidRef.current.style.transform = `rotateX(${lidAngle}deg)`;
      }

      if (captionRef.current) {
        captionRef.current.style.opacity = progress > 0.1 ? '0' : '1';
      }

      // 0.85 ~ 1.0 구간: 뚜껑이 닫힌 뒤 화면 전체가 서서히 사라지며 실제 페이지가 드러남
      const fadeProgress = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));
      if (pinRef.current) {
        pinRef.current.style.opacity = String(1 - fadeProgress);
        pinRef.current.style.pointerEvents = fadeProgress >= 1 ? 'none' : 'auto';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={spacerRef} className="relative" style={{ height: '280vh' }}>
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
        style={{ perspective: '1200px' }}
      >
        {/* 신발 실루엣 (배경 없는 깔끔한 SVG 아이콘, 사진 대신 사용해 이상한 사각 배경이 안 보이게 함) */}
        <div ref={shoeRef} className="absolute z-20" style={{ width: '200px' }}>
          <svg
            viewBox="0 0 100 50"
            width="100%"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 20px 24px rgba(0,0,0,0.5))' }}
          >
            <path
              d="M6 38 C4 34 4 28 8 25 C10 18 18 10 30 8 C34 7 38 9 40 12 L60 12 C74 12 88 16 94 26 C97 31 96 37 92 40 C88 43 78 44 68 43 L14 43 C9 43 6 41 6 38 Z"
              fill="#171717"
            />
            <line x1="34" y1="12" x2="34" y2="20" />
            <line x1="42" y1="12" x2="42" y2="20" />
            <line x1="50" y1="12" x2="50" y2="20" />
          </svg>
        </div>

        {/* CSS로 만든 입체 신발 박스 (옆면을 skew로 표현해 3D처럼 보이게 함) */}
        <div className="absolute" style={{ width: '260px', height: '170px' }}>
          {/* 박스 몸통 */}
          <div
            className="absolute bottom-0 left-0 w-full rounded-sm overflow-visible"
            style={{
              height: '110px',
              background: 'linear-gradient(160deg, #d6cdbf, #a8998a)',
              boxShadow: '0 25px 45px rgba(0,0,0,0.55)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[#6b5c4a] font-black text-sm tracking-widest">
              WANTU
            </div>
            {/* 옆면: skew로 입체감 표현 */}
            <div
              className="absolute top-0 h-full"
              style={{
                width: '24px',
                right: '-24px',
                background: 'linear-gradient(160deg, #b6a993, #8a7a66)',
                transform: 'skewY(45deg)',
                transformOrigin: 'top left',
              }}
            />
          </div>

          {/* 박스 뚜껑: 스크롤에 따라 rotateX로 닫힘 */}
          <div
            ref={lidRef}
            className="absolute top-0 left-0 w-full rounded-sm"
            style={{
              height: '68px',
              background: 'linear-gradient(160deg, #eae2d4, #c9bda9)',
              boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
              transformOrigin: 'bottom center',
              transform: 'rotateX(-165deg)',
            }}
          >
            <div
              className="absolute top-0 h-full"
              style={{
                width: '20px',
                right: '-20px',
                background: 'linear-gradient(160deg, #dcd2bf, #b3a58e)',
                transform: 'skewY(45deg)',
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>

        <div
          ref={captionRef}
          className="absolute bottom-16 text-center text-neutral-500 text-[11px] font-bold tracking-widest z-30"
        >
          SCROLL DOWN
        </div>
      </div>
    </div>
  );
};