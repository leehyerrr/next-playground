"use client";
import { useRef } from "react";
import { gsap } from "gsap";

import { useIsomorphicLayoutEffect } from "./isomorphicEffect";

export default function Boxes() {
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const toggleTimeline = () => {
    const t = tl.current;
    if (!t) return;
    t.reversed(!t.reversed());
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      // use the context selector if available, otherwise fall back to the container's querySelectorAll
      const selector = (self?.selector ??
        ((s: string) => container.current?.querySelectorAll(s))) as unknown as (
        s: string
      ) => NodeListOf<Element> | undefined;
      const nodeList = selector(".box");
      const boxes: Element[] = nodeList ? Array.from(nodeList) : [];
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, "<")
        .to(boxes[2], { y: -166 })
        .reverse();
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section className="boxes-container" ref={container}>
        <h1>Use the button to toggle a Timeline</h1>
        <div>
          <button onClick={toggleTimeline}>Toggle Timeline</button>
        </div>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 3</div>
      </section>
    </main>
  );
}
