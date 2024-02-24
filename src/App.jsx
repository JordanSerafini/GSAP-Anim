// App.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import HorizontalScroll from "./assets/components/horizontalScroll";

function App() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const scrollEffectRef = useRef(null);

  const scrollEffect = () => {
    gsap.to(scrollEffectRef.current, {
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top-=600 top+=100",
        end: "top-=300 top-=500",
        scrub: true,
        markers: false,
        toggleActions: "play reverse play reverse",
      },
      x: 450,
      y: 450,
      rotation: 360,
      opacity: 0,
      //duration: 3,
      scale: 0.3,
    });
  };

  useEffect(() => {
    const boxAnimations = [
      {
        ref: boxRef,
        x: 250,
        start: "top+=50 800",
        end: "200 500",
        duration: 2,
      },
      {
        ref: box2Ref,
        x: 350,
        start: "top+=120 900",
        end: "200 550",
        duration: 2.5,
      },
      {
        ref: box3Ref,
        x: 450,
        start: "top+=140 1000",
        end: "200 600",
        duration: 3,
      },
    ];

    boxAnimations.forEach((boxAnim) => {
      if (boxAnim.ref.current) {
        gsap.fromTo(
          boxAnim.ref.current,
          { x: 0, opacity: 0 },
          {
            x: boxAnim.x,
            opacity: 1,
            duration: boxAnim.duration,
            scrollTrigger: {
              trigger: boxAnim.ref.current,
              start: boxAnim.start,
              end: boxAnim.end,
              scrub: true,
              markers: false,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="Body">
      <HorizontalScroll />
      
      <div className="Test" onClick={scrollEffect} ref={scrollEffectRef}>
        <div className="product">produit 1</div>
        <div className="product">produit 2</div>
        <div className="product">produit 3</div>
        <div className="product">produit 4</div>
        <div className="product">produit 5</div>
      </div>

      <div className="Container">
        <div className="Box" ref={boxRef}>
          <p className="text">LOREM IPSUM DOLOR SIT AMET</p>
        </div>
        <div className="Box" ref={box2Ref}>
          <p className="text">LOREM IPSUM DOLOR SIT AMET</p>
        </div>
        <div className="Box" ref={box3Ref}>
          <p className="text">LOREM IPSUM DOLOR SIT AMET</p>
        </div>
      </div>
    </div>
  );
}

export default App;
