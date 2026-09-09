import React, { useEffect, useRef, useState } from 'react';

// 데스크톱(마우스가 있는 환경)에서만 기본 커서를 숨기고, 신발 커서 효과를 보여줘요.
// - 컬러 신발: 실제 마우스 위치에 항상 정확히 붙어있음 (메인 커서)
// - 고스트 신발: 흐릿한 회색 실루엣, 살짝 늦게 부드럽게 따라옴 (트레일 효과)
// - 클릭하면 클릭한 위치에서 물결(그라데이션 리플) + 신발 도장이 나타났다 사라짐
interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const colorRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    // 터치 기기(모바일/태블릿)에서는 켜지 않음
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(hasFinePointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = 0;
    let mouseY = 0;
    let ghostX = 0;
    let ghostY = 0;

    // 값이 작을수록 고스트가 더 천천히, 부드럽게 따라옴
    const FOLLOW_SPEED = 0.08;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 컬러 신발(메인 커서)은 항상 실제 마우스 위치에 즉시 붙어있음
      if (colorRef.current) {
        colorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-30%, -60%) scaleX(-1)`;
      }

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        'button, a, [role="button"], input, select, textarea, .cursor-pointer'
      );
      setIsHoveringInteractive(isInteractive);
    };

    // 고스트(회색) 신발: 부드럽게 천천히 마우스 위치로 수렴 (트레일)
    let rafId: number;
    const animateGhost = () => {
      ghostX += (mouseX - ghostX) * FOLLOW_SPEED;
      ghostY += (mouseY - ghostY) * FOLLOW_SPEED;

      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate3d(${ghostX}px, ${ghostY}px, 0) translate(-30%, -60%) scaleX(-1)`;
      }
      rafId = requestAnimationFrame(animateGhost);
    };

    // 사이트 아무 곳이나 클릭하면 그 위치에서 물결 리플 + 신발 도장 생성
    const handleClick = (e: MouseEvent) => {
      const id = rippleIdRef.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    rafId = requestAnimationFrame(animateGhost);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  const shoeSize = isHoveringInteractive ? 34 : 26;

  return (
    <>
      <style>{`
        /* 커스텀 커서가 켜져 있을 때만 기본 화살표 커서를 숨김 */
        body.custom-cursor-active,
        body.custom-cursor-active * {
          cursor: none !important;
        }
        /* 특정 영역(예: Spline 3D 히어로)에 마우스가 있을 때는 신발 커서를 숨기고 기본 커서로 되돌림 */
        body.hide-shoe-cursor .wantu-shoe-cursor {
          opacity: 0 !important;
        }
        body.hide-shoe-cursor,
        body.hide-shoe-cursor * {
          cursor: auto !important;
        }
        @keyframes clickRipple {
          from {
            transform: scale(0);
            opacity: 0.8;
          }
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
        .click-ripple {
          position: fixed;
          width: 240px;
          height: 240px;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 9997;
          border: 2px solid rgba(37,99,235,0.7);
          background: radial-gradient(circle, rgba(37,99,235,0.7) 0%, rgba(37,99,235,0.25) 40%, transparent 70%);
          animation: clickRipple 0.9s ease-out forwards;
        }
        @keyframes clickStamp {
          0% {
            transform: translate(-50%, -50%) scaleX(-1) scale(1.3);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scaleX(-1) scale(0.6);
            opacity: 0;
          }
        }
        .click-stamp {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          font-size: 30px;
          animation: clickStamp 0.6s ease-out forwards;
        }
      `}</style>

      {/* 클릭할 때 퍼지는 물결 리플들 */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="click-ripple"
          style={{ left: r.x - 120, top: r.y - 120 }}
          onAnimationEnd={() => setRipples((prev) => prev.filter((rp) => rp.id !== r.id))}
        />
      ))}

      {/* 클릭할 때 나타났다 사라지는 신발 도장 */}
      {ripples.map((r) => (
        <div
          key={`stamp-${r.id}`}
          className="click-stamp"
          style={{ left: r.x, top: r.y }}
        >
          👟
        </div>
      ))}

      {/* 고스트(회색) 신발: 살짝 늦게 부드럽게 따라오는 트레일 */}
      <div
        ref={ghostRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] select-none transition-[font-size,opacity] duration-200 ease-out wantu-shoe-cursor"
        style={{
          fontSize: `${shoeSize}px`,
          filter: 'grayscale(1) brightness(0) opacity(0.28)',
        }}
      >
        👟
      </div>

      {/* 컬러 신발: 실제 마우스 위치(메인 커서) */}
      <div
        ref={colorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] select-none transition-[font-size,opacity] duration-200 ease-out wantu-shoe-cursor"
        style={{
          fontSize: `${shoeSize}px`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        }}
      >
        👟
      </div>
    </>
  );
};