// App.js
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const boxRef = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const listeRef = useRef(null);
  const scrollEffectRef = useRef(null);

  const moveX = useRef(0);
  const scrollDistance = 500;
  let scrollInterval = null;

  /*
  useEffect(() => {
    const liste = listeRef.current;
    const items = liste.querySelectorAll('.list-item');
    const threshold = liste.offsetWidth * 0.1; // 10% de la largeur du conteneur

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const listeRect = liste.getBoundingClientRect();

      // Calculer la distance de l'élément par rapport aux bords gauche et droit du conteneur
      const distanceFromLeft = itemRect.left - listeRect.left;
      const distanceFromRight = listeRect.right - itemRect.right;

      // Appliquer la mise à l'échelle si l'élément est dans les 10% des bords gauche ou droit
      if (distanceFromLeft <= threshold || distanceFromRight <= threshold) {
        gsap.to(item, { scale: 0.3, duration: 0.5 });
      }
    });
  }, []);
  */
  /*
  useEffect(() => {
    adjustScale();
  }, [moveX]);


  useEffect(() => {
    // Déterminez le point de déclenchement horizontal, par exemple, 10% de la largeur de l'écran
    const triggerPoint = window.innerWidth * 0.1;
  
    // Créez un ScrollTrigger pour chaque élément de la liste
    gsap.utils.toArray('.list-item').forEach(item => {
      ScrollTrigger.create({
        trigger: item,
        start: () => triggerPoint + " " + item.offsetTop, // Démarre lorsque le bord gauche de l'item dépasse 10% de la largeur de l'écran
        end: () => (triggerPoint + 100) + " " + item.offsetTop, // Un peu après le début pour avoir une zone de déclenchement
        horizontal: true, // Pour un défilement horizontal
        onEnter: () => gsap.to(item, { scale: 0.3, duration: 0.5 }), // Réduit la mise à l'échelle
        onLeave: () => gsap.to(item, { scale: 1, duration: 0.5 }), // Remet à l'échelle d'origine
        onEnterBack: () => gsap.to(item, { scale: 0.3, duration: 0.5 }), // Réduit la mise à l'échelle quand on revient
        onLeaveBack: () => gsap.to(item, { scale: 1, duration: 0.5 }), // Remet à l'échelle d'origine quand on revient
        markers: true // Pour le débogage, à enlever en production
      });
    });
  
    // Nettoyez les ScrollTriggers lors du démontage du composant
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  
  const adjustScale = () => {
    const liste = listeRef.current;
    const items = liste.querySelectorAll('.list-item');
    const threshold = liste.offsetWidth * 0.3; // 10% de la largeur du conteneur
  
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const listeRect = liste.getBoundingClientRect();
      const distanceFromLeft = Math.abs(itemRect.left - listeRect.left);
      const distanceFromRight = Math.abs(listeRect.right - itemRect.right);
      const listeWidth = liste.offsetWidth; // Largeur du conteneur
    
      // Calculez la mise à l'échelle en fonction de la distance du bord
      // plus l'élément est proche du bord, plus l'échelle sera petite.
      let scale = 1; // Définir la mise à l'échelle par défaut à 1
      if (distanceFromLeft < threshold) {
        scale = 0.3 + (distanceFromLeft / threshold) * (1 - 0.3); // Mise à l'échelle augmentée progressivement de 0.3 à 1
      } else if (distanceFromRight < threshold) {
        scale = 0.3 + (distanceFromRight / threshold) * (1 - 0.3); // Mise à l'échelle augmentée progressivement de 0.3 à 1
      }
    
      // Appliquez la mise à l'échelle à l'élément
      gsap.to(item, { scale: scale, duration: 0.5, ease: "power1.inOut" });
    });
    
  };
  */

  const scrollAndUpdateScale = (direction) => {
    // Calcul de la nouvelle position x en fonction de la direction du défilement
    moveX.current += direction === "right" ? scrollDistance : -scrollDistance;

    // Animation de défilement horizontal
    gsap.to(".list-item", {
      x: moveX.current,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: updateScale, // Mise à jour de l'échelle pendant l'animation
    });
  };

  // Fonction pour mettre à l'échelle les éléments basée sur leur position horizontale après le défilement
  const updateScale = () => {
    const liste = listeRef.current;
    const center = window.innerWidth / 2; // Centre horizontal du viewport

    gsap.utils.toArray(".list-item").forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distanceFromCenter = Math.abs(center - itemCenter);
      const scale = Math.max(0.3, 1 - distanceFromCenter / center);

      gsap.to(item, { scale: scale, ease: "none", duration: 0.5 });
    });
  };

  const doScroll = (direction) => {
    // Votre logique de défilement existante, puis ajustez la mise à l'échelle
    moveX.current += direction === "right" ? scrollDistance : -scrollDistance;
    gsap.to(".list-item", {
      x: moveX.current,
      duration: 2,
      ease: "power1.inOut",
      //scale: 0.3,
      //onComplete: adjustScale, // Ajustez la mise à l'échelle après le défilement
    });
  };

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
        <ul className="liste" ref={listeRef}>
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
        <button onClick={() => doScroll("right")}>➡️</button>
        <button onClick={() => doScroll("left")}>⬅️</button>
        <button onClick={() => scrollAndUpdateScale("right")}>➡️</button>
        <button onClick={() => scrollAndUpdateScale("left")}>⬅️</button>
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
