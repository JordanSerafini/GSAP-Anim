import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  /*
  useEffect(() => {
    [boxRef, box2Ref, box3Ref].forEach((box, index) => {
      if (box.current) {
        gsap.fromTo(
          box.current,
          { x: 0, opacity: 0, marker: true }, // état de départ
          {
            x: 250, //+ index * 100,
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
*/

  useEffect(() => {
    const boxAnimations = [
      {
        ref: boxRef,
        x: 250,
        start: "top+=50 800",// start - scrollerStart
        end: "300 500",
      },
      {
        ref: box2Ref,
        x: 350,
        start: "top+=120 900",
        end: "200 550",
      },
      {
        ref: box3Ref,
        x: 450,
        start: "top+=140 1000",
        end: "200 600",
      },
    ];

    boxAnimations.forEach((boxAnim) => {
      if (boxAnim.ref.current) {
        gsap.fromTo(
          boxAnim.ref.current,
          { x: 0, opacity: 0 }, // état de départ
          {
            x: boxAnim.x,
            opacity: 1,
            duration: boxAnim.duration,
            scrollTrigger: {
              trigger: boxAnim.ref.current,
              start: boxAnim.start,
              end: boxAnim.end,
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
