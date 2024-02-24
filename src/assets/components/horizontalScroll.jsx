import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HorizontalScroll() {
  const moveX = useRef(0);
  const listeRef = useRef(null);

  const scrollDistance = 200;

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
    const center = window.innerWidth / 2; // Centre horizontal du viewport

    gsap.utils.toArray(".list-item").forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distanceFromCenter = Math.abs(center - itemCenter);
      const scale = Math.max(0.3, 1 - distanceFromCenter / center);

      gsap.to(item, { scale: scale, ease: "none", duration: 0.5 });
    });
  };

  return (
    <div className="container-2">
      <ul className="liste" ref={listeRef}>
        {new Array(50).fill(null).map((_, index) => (
          <li key={index} className="list-item">
            lorem
          </li>
        ))}
      </ul>
      <button onClick={() => scrollAndUpdateScale("left")}>⬅️</button>
      <button onClick={() => scrollAndUpdateScale("right")}>➡️</button>
    </div>
  );
}

export default HorizontalScroll;
