import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  useEffect(() => {
    [boxRef, box2Ref, box3Ref].forEach((box, index) => {
      if (box.current) {
        gsap.fromTo(
          box.current,
          { x: 0, opacity: 0, marker: true }, // état de départ
          {
            x: 250 + index * 100,
            opacity: 1,
            duration: 2,
            scrollTrigger: {
              trigger: box.current,
              start: "top+=00 750", // premier start, second scroll start
              end: "200 525",
              scrub: true,
              markers: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="Body">
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
