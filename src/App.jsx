// App.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const scrollEffectRef = useRef(null);

  const moveX = useRef(0);
  const scrollDistance = 500;
  let scrollInterval = null;

  const startScrolling = (direction) => {
    stopScrolling();  
    scrollInterval = setInterval(() => {
      // Mettez à jour moveX.current en fonction de la direction et appliquez l'animation
      moveX.current += direction === "right" ? 100 : -100;
      gsap.to(".list-item", {
        x: moveX.current * 0.5,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }, 50);  
  };

  const stopScrolling = () => {
    if (scrollInterval) clearInterval(scrollInterval);
  };

  const scrollLeft = () => {
    moveX.current -= scrollDistance;
    gsap.to(".list-item", {
      x: moveX.current,
      duration: 2,
      ease: "power1.inOut",
    });
  };

  const scrollRight = () => {
    moveX.current += scrollDistance;
    gsap.to(".list-item", {
      x: moveX.current,
      duration: 2,
      ease: "power1.inOut",
    });
  };

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

  const horizontalScroll = () => {
    gsap.to(".list-item", {
      x: -1500,
      scale: 0.3,
      duration: 5,
      ease: "power1.inOut",
    });
  };

  const animateSequence = () => {
    // Créer une timeline GSAP
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power1.out" } });

    // Ajouter une animation qui déplace l'élément vers la droite
    tl.to(".list-item", { x: 100 });

    // Ensuite, mettre à l'échelle l'élément à 0.3
    tl.to(".list-item", { scale: 0.3 });

    // Enfin, faire tourner l'élément de 360 degrés
    tl.to(".list-item", { rotation: 360 });

    // Vous pouvez également ajouter des labels et jouer des animations à des moments spécifiques
    // tl.addLabel("label1")
    //   .to(".list-item", { x: 100 }, "label1")
    //   .to(".list-item", { scale: 0.3 }, "label1+=0.5") // Démarrer cette animation 0.5 seconde après le label1
    //   .to(".list-item", { rotation: 360 }, "label1+=1"); // Démarrer cette animation 1 seconde après le label1
  };

  const horizontalScroll2 = (e) => {
    gsap.to(e.target, {
      x: -250,
      scale: 0.3,
      duration: 5,
      ease: "power1.inOut",
    });
  };

  const horizontalScroll3 = () => {
    // OK
    moveX.current -= 500;
    gsap.to(".list-item", {
      x: moveX.current,
      duration: 2,
      ease: "power1.inOut",
    });
  };

  return (
    <div className="Body">
      <div className="container-2">
        <ul className="liste">
          {new Array(50).fill(null).map((_, index) => (
            <li key={index} className="list-item" onClick={horizontalScroll2}>
              lorem
            </li>
          ))}
        </ul>
        <button onClick={horizontalScroll}>O</button>
        <button onClick={animateSequence}>X</button>
        <button onClick={horizontalScroll3}>T</button>
        <button onClick={scrollLeft}>L</button>
        <button onClick={scrollRight}>R</button>
        <button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
        >
          ⬅️
        </button>
        {/* ...éléments de liste ici... */}
        <button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
        >
          ➡️
        </button>
      </div>
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
