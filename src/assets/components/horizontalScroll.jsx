import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HorizontalScroll() {
  const moveX = useRef(0);
  const listeRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Déclenche le défilement et la mise à jour de l'échelle
  const scrollAndUpdateScale = (direction) => {
    moveX.current += direction === 'right' ? scrollDistance : -scrollDistance;
    gsap.to('.list-item', {
      x: moveX.current,
      duration: 0.5,
      ease: 'power1.inOut',
      onUpdate: updateScale,
    });
  };

  // Met à l'échelle les éléments en fonction de leur position après le défilement
  const updateScale = () => {
    const center = windowWidth / 2; // Utiliser windowWidth du state pour le centre

    gsap.utils.toArray('.list-item').forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distanceFromCenter = Math.abs(center - itemCenter);
      const scale = Math.max(0.3, 1 - distanceFromCenter / center);
      gsap.to(item, { scale: scale, ease: 'none', duration: 0.5 });
    });
  };

  // Distance de défilement
  const scrollDistance = 350;

  // Initialisation de l'écouteur de redimensionnement
  useEffect(() => {
    // Mise à jour de la position x initiale et de l'échelle
    moveX.current = 0;
    updateScale();
  }, []);

  // Écouteur de redimensionnement de la fenêtre pour ajuster la mise à l'échelle
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updateScale(); // Mise à jour de l'échelle lors du redimensionnement
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScale]);

  // Écouteur de défilement sur la liste pour ajuster la mise à l'échelle
  useEffect(() => {
    const handleScroll = () => {
      updateScale(); // Mise à jour de l'échelle lors du défilement
    };

    const listeElement = listeRef.current;
    listeElement.addEventListener('scroll', handleScroll);

    return () => {
      listeElement.removeEventListener('scroll', handleScroll);
    };
  }, [windowWidth, updateScale]); // Se re-abonne lorsque windowWidth change



  return (
    <div className="container-2">
      <ul className="liste" ref={listeRef}>
        {new Array(50).fill(null).map((_, index) => (
          <li key={index} className="list-item">
            lorem
          </li>
        ))}
      </ul>
      <button onClick={() => scrollAndUpdateScale('left')}>⬅️</button>
      <button onClick={() => scrollAndUpdateScale('right')}>➡️</button>
    </div>
  );
}

export default HorizontalScroll;
