import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";




function HorizontalScroll() {
  const moveX = useRef(0);
  const listeRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [cardData, setCardData] = useState([
    { id: 1, title: "Card 1", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Card 2", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Card 3", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Card 4", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Card 5", image: "https://via.placeholder.com/150" },
    { id: 6, title: "Card 6", image: "https://via.placeholder.com/150" },
    { id: 7, title: "Card 7", image: "https://via.placeholder.com/150" },
    { id: 8, title: "Card 8", image: "https://via.placeholder.com/150" },
    { id: 9, title: "Card 9", image: "https://via.placeholder.com/150" },
    { id: 10, title: "Card 10", image: "https://via.placeholder.com/150" },
    { id: 11, title: "Card 10", image: "https://via.placeholder.com/150" },
    { id: 12, title: "Card 10", image: "https://via.placeholder.com/150" },
    { id: 13, title: "Card 10", image: "https://via.placeholder.com/150" },
    { id: 14, title: "Card 10", image: "https://via.placeholder.com/150" },
    { id: 15, title: "Card 10", image: "https://via.placeholder.com/150" },
    { id: 16, title: "Card 10", image: "https://via.placeholder.com/150" },
  ]);
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
    // findCenterItem ne sera appelé que après que le défilement se soit arrêté grâce au debounce
    debouncedFindCenterItem();
  };

  listeElement.addEventListener("scroll", handleScroll);

  return () => {
    listeElement.removeEventListener("scroll", handleScroll);
  };
}, [findCenterItem]); // Assurez-vous de ne pas avoir de dépendances inutiles ici

  /*---------------------------------------------------*/


  return (
    <div className="container-2">
      <ul className="liste" ref={listeRef}>
        {cardData.map((card) => (
          <li key={card.id} className="list-item" data-index={card.id}>
            <div className="index">{card.id}</div>
            <img src={card.image} className="image image-shadow" alt={card.title} />
            <h3 className="Item-Text">{card.title}</h3>
          </li>
        ))}
      </ul>
      {selectedIem && (
        <div className="selected-item-info">
          {selectedIem}
        </div>
      )}
    </div>
  );
}  

export default HorizontalScroll;
