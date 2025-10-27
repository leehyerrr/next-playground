"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalFramer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Framer Motion 모달 열기
      </button>

      {/* AnimatePresence는 조건부 렌더링된 motion 요소의 등장/퇴장 애니메이션을 담당 */}
      <AnimatePresence>
        {open && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            {/* 모달 박스 */}
            <motion.div
              key="modal"
              className="fixed top-1/2 left-1/2 w-80 bg-white p-6 rounded-xl shadow-lg -translate-x-1/2 -translate-y-1/2 text-cyan-500"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-lg font-bold mb-4">Framer Motion 모달</h2>
              <p className="mb-6">
                Framer Motion으로 구현한 위→아래 애니메이션
              </p>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-2 bg-gray-700 text-white rounded-md"
              >
                닫기
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
