"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { FaRupeeSign } from "react-icons/fa";

const JewelryHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const jewelryItems = [
    {
      id: 1,
      name: "Diamond Ring",
      image: "/images/bangle.png",
      description: "Exquisite diamond solitaire ring",
      price: 120000, // ₹1,20,000
    },
    {
      id: 2,
      name: "Pearl Necklace",
      image: "/images/bangle3.png",
      description: "Luxurious cultured pearl necklace",
      price: 85000, // ₹85,000
    },
    {
      id: 3,
      name: "Gold Bracelet",
      image: "/images/braclet.png",
      description: "Elegant gold chain bracelet",
      price: 65000, // ₹65,000
    },
    {
      id: 4,
      name: "Sapphire Earrings",
      image: "/images/earring.png",
      description: "Stunning blue sapphire earrings",
      price: 95000, // ₹95,000
    },
    {
      id: 5,
      name: "Emerald Pendant",
      image: "/images/neclace.png",
      description: "Vibrant emerald pendant",
      price: 70000, // ₹70,000
    },
    {
      id: 6,
      name: "Ruby Ring",
      image: "/images/ring.png",
      description: "Brilliant ruby-studded ring",
      price: 55000, // ₹55,000
    },
    {
      id: 7,
      name: "Diamond Cluster Ring",
      image: "/images/ring2.png",
      description: "Elegant cluster diamond ring",
      price: 110000, // ₹1,10,000
    },
    {
      id: 8,
      name: "Traditional Tika",
      image: "/images/tika.png",
      description: "Graceful gold tika with stonework",
      price: 40000, // ₹40,000
    },
    {
      id: 9,
      name: "Designer Tika",
      image: "/images/tika2.png",
      description: "Modern design tika with gemstones",
      price: 60000, // ₹60,000
    },
  ];

  const totalItems = jewelryItems.length;
  const angleStep = (2 * Math.PI) / totalItems;
  const radiusX = 400;
  const radiusZ = 150;

  const getItemPositionAndStyles = (index: number, currentIndex: number) => {
    const angle = (index - currentIndex) * angleStep;
    const x = radiusX * Math.sin(angle);
    const z = radiusZ * Math.cos(angle);
    const normalizedZ = (z + radiusZ) / (2 * radiusZ); // 0 (back) to 1 (front)
    const isCenter = index === currentIndex;

    const scale = 0.5 + normalizedZ * 0.8; // From 0.5 to 1.3
    const opacity = 0.4 + normalizedZ * 0.6; // From 0.4 to 1
    const blur = (1 - normalizedZ) * 3; // More blur at back
    const filter = `brightness(${0.7 + normalizedZ * 0.5}) blur(${blur}px)`;
    // Rotate item to face viewer (opposite of orbital angle)
    const rotateY = -angle * (180 / Math.PI); // Convert radians to degrees

    return { x, z, scale, opacity, filter, isCenter, rotateY };
  };

  // Auto rotation effect
  useEffect(() => {
    autoRotateRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [totalItems]);

  // Play sound on item change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [currentIndex]);

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    resetAutoRotation();
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    resetAutoRotation();
  };

  const resetAutoRotation = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    autoRotateRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3000);
  };

  // Create particles for background
  useEffect(() => {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute rounded-full bg-yellow-400/30 animate-float";
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = 15 + Math.random() * 10;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      particlesContainer.appendChild(particle);
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#0a0a16] to-[#1a1a2e] text-white">
      {/* Animated Background */}
      {/* <div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_#1a1a2e_0%,_#0a0a16_70%)] 
        before:content-[''] before:absolute before:top-[-50%] before:left-[-50%] before:w-[200%] before:h-[200%] 
        before:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_10%,_transparent_10.5%)] before:bg-[length:20px_20px] 
        before:animate-sparkle before:rotate-30"
      ></div> */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.hdqwalls.com/wallpapers/dark-gold-pattern-4k-po.jpg"
          alt="Backgroundttp"
          // fill="cover"
          className=""
          // priority={false}
        />
      </div>
      {/* Particles */}
      <div id="particles" className="absolute inset-0 z-1"></div>
      {/* Audio for carousel movement */}
      <audio ref={audioRef} src="/sounds/carousel-slide.mp3" preload="auto" />
      {/* Jewelry Carousel */}
      <div
        className="relative w-full h-[500px] flex items-center justify-center z-10"
        style={{ perspective: "1800px" }}
      >
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {jewelryItems.map((item, index) => {
            const { x, z, scale, opacity, filter, isCenter, rotateY } =
              getItemPositionAndStyles(index, currentIndex);

            return (
              <motion.div
                key={item.id}
                className={`absolute -left-20 -top-15
                  ${isCenter ? "h-[195px] w-[160px]" : "h-[130px] w-[130px]"}
                  rounded-lg cursor-pointer overflow-hidden
                  transition-all duration-500 ease-in-out
                `}
                animate={{
                  x,
                  y: 0,
                  z,
                  scale,
                  opacity,
                  filter,
                  rotateY,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={250}
                    height={250}
                    className={` ${
                      isCenter ? "h-[160px] w-[160px]" : "h-[130px] w-[130px]"
                    } object-cover drop-shadow-lg z-20 ${
                      !isCenter && "opacity-50"
                    }`}
                  />

                  {isCenter && (
                    <motion.div
                      className="absolute -bottom-0 text-center w-full px-4 z-30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      style={{ transform: `rotateY(${-rotateY}deg)` }} // Counter-rotate text to face viewer
                    >
                      <p className="flex items-center justify-center my-2 gap-1 text-lg font-semibold text-yellow-600">
                        <FaRupeeSign className="w-4 h-4 text-yellow-700" />
                        {item.price.toLocaleString("en-IN")}
                      </p>
                      {/* <button className="px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#0a0a16] font-bold text-sm rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ">
                        Buy Now
                      </button> */}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-12 top-1/2 -translate-y-1/2 bg-yellow-400/20 w-12 h-12 rounded-full 
            flex justify-center items-center text-yellow-400 z-20 transition-all hover:bg-yellow-400/30 hover:scale-110"
          onClick={prevItem}
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="absolute right-12 top-1/2 -translate-y-1/2 bg-yellow-400/20 w-12 h-12 rounded-full 
            flex justify-center items-center text-yellow-400 z-20 transition-all hover:bg-yellow-400/30 hover:scale-110"
          onClick={nextItem}
        >
          <ChevronRight size={32} />
        </button>
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 z-10">
        {jewelryItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full mx-2 transition-all ${
              index === currentIndex
                ? "bg-yellow-400 scale-125 shadow-[0_0_10px_#FFD700]"
                : "bg-white/30"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              resetAutoRotation();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default JewelryHero;
