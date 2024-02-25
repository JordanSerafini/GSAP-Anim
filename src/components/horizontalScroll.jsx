import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "../assets/image.webp";

gsap.registerPlugin(ScrollTrigger);

function HorizontalScroll() {
  const moveX = useRef(0);
  const listeRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [selectedIem, setSelectedItem] = useState(null);


  // Met à l'échelle les éléments en fonction de leur position après le défilement
  const updateScale = useCallback(() => {
    const center = windowWidth / 2; // Utiliser windowWidth du state pour le centre

    gsap.utils.toArray(".list-item").forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distanceFromCenter = Math.abs(center - itemCenter);
      const scale = Math.max(0.3, 1 - distanceFromCenter / center);
      gsap.to(item, { scale: scale, ease: "none", duration: 0.5 });
    });
  }, [windowWidth]);

  // Initialisation de l'écouteur de redimensionnement
  useEffect(() => {
    // Mise à jour de la position x initiale et de l'échelle
    moveX.current = 0;
    updateScale();
  }, [updateScale]);

  // Écouteur de redimensionnement de la fenêtre pour ajuster la mise à l'échelle
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updateScale(); // Mise à jour de l'échelle lors du redimensionnement
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScale]);

  // Écouteur de défilement sur la liste pour ajuster la mise à l'échelle
  useEffect(() => {
    const handleScroll = () => {
      updateScale(); // Mise à jour de l'échelle lors du défilement
    };

    const listeElement = listeRef.current;
    listeElement.addEventListener("scroll", handleScroll);

    return () => {
      listeElement.removeEventListener("scroll", handleScroll);
    };
  }, [windowWidth, updateScale]);


  /*---------------------------------------------------*/
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  

  const findCenterItem = useCallback(() => {
    const list = listeRef.current;
    if (!list) return;
  
    // Calculer le centre de la fenêtre d'affichage
    const viewportCenter = list.scrollLeft + list.clientWidth / 2;
  
    // Initialiser les variables pour stocker l'élément le plus proche du centre
    let centerItem = null;
    let smallestDistanceToCenter = Infinity;
  
    // Récupérer tous les éléments de la liste
    const listItems = Array.from(list.querySelectorAll('.list-item'));
  
    // Parcourir tous les éléments pour trouver celui qui est le plus proche du centre
    listItems.forEach(item => {
      // Calculer le centre de l'élément
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distanceToCenter = Math.abs(viewportCenter - itemCenter);
  
      // Mettre à jour l'élément le plus proche du centre si nécessaire
      if (distanceToCenter < smallestDistanceToCenter) {
        smallestDistanceToCenter = distanceToCenter;
        centerItem = item;
      }
    });
  
    // Retourner l'élément le plus proche du centre
    if (centerItem) {
      const itemId = centerItem.dataset.index;
      setSelectedItem(itemId);
    }
  }, []); 
   

  // ...
useEffect(() => {
  // Fonction déclenchée après que le défilement se soit arrêté
  const debouncedFindCenterItem = debounce(() => {
    findCenterItem();
  }, 50); 

  const listeElement = listeRef.current;
  const handleScroll = () => {
    // Appelé à chaque événement de défilement, mais `findCenterItem` ne sera appelé que
    // après que le défilement se soit arrêté grâce au debounce
    debouncedFindCenterItem();
  };

  listeElement.addEventListener("scroll", handleScroll);

  return () => {
    listeElement.removeEventListener("scroll", handleScroll);
  };
}, [findCenterItem]); // Assurez-vous de ne pas avoir de dépendances inutiles ici

// ...




  return (
    <div className="container-2">
      <ul className="liste" ref={listeRef}>
        {new Array(500).fill(null).map((_, index) => (
          <li key={index} className="list-item" data-index={index}>
            {index}
            <img src={Image} className="image" alt="" />
            <h3>L&apos;orbe mystère</h3>
          </li>
        ))}
      </ul>
      {selectedIem}
      
    </div>
  );
}

export default HorizontalScroll;
