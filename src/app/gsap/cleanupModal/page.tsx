"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ModalGSAP() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 모달이 열릴 때만 애니메이션 실행
    if (!open) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // 등장 애니메이션
      tl.fromTo(
        modalRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    });

    // cleanup
    return () => ctx.revert();
  }, [open]);

  // 닫을 때 애니메이션 별도로
  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => setOpen(false), // 애니메이션 끝나면 state 변경
    });
    tl.to(modalRef.current, { y: -100, opacity: 0, duration: 0.4 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        GSAP 모달 열기
      </button>

      {/* 오버레이 */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0 }}
      />

      {/* 모달 */}
      {open && (
        <div
          ref={modalRef}
          className="fixed top-1/2 left-1/2 w-80 bg-white p-6 rounded-xl shadow-lg -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="text-lg font-bold mb-4">GSAP 모달</h2>
          <p className="mb-6">GSAP으로 구현한 위→아래 애니메이션</p>
          <button
            onClick={handleClose}
            className="px-3 py-2 bg-gray-700 text-white rounded-md"
          >
            닫기
          </button>
        </div>
      )}
    </>
  );
}
