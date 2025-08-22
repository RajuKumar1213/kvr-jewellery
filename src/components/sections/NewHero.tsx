"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const jewelryItems = [
    {
      id: 1,
      name: "Diamond Ring",
      image: "/images/bangle.png",
      description: "Exquisite diamond solitaire ring",
      price: 120000,
    },
    {
      id: 2,
      name: "Pearl Necklace",
      image: "/images/bangle3.png",
      description: "Luxurious cultured pearl necklace",
      price: 85000,
    },
    {
      id: 3,
      name: "Gold Bracelet",
      image: "/images/braclet.png",
      description: "Elegant gold chain bracelet",
      price: 65000,
    },
    {
      id: 4,
      name: "Sapphire Earrings",
      image: "/images/earring.png",
      description: "Stunning blue sapphire earrings",
      price: 95000,
    },
    {
      id: 5,
      name: "Emerald Pendant",
      image: "/images/neclace.png",
      description: "Vibrant emerald pendant",
      price: 70000,
    },
    {
      id: 6,
      name: "Ruby Ring",
      image: "/images/ring.png",
      description: "Brilliant ruby-studded ring",
      price: 55000,
    },
    {
      id: 7,
      name: "Diamond Cluster Ring",
      image: "/images/ring2.png",
      description: "Elegant cluster diamond ring",
      price: 110000,
    },
    {
      id: 8,
      name: "Traditional Tika",
      image: "/images/tika.png",
      description: "Graceful gold tika with stonework",
      price: 40000,
    },
    {
      id: 9,
      name: "Designer Tika",
      image: "/images/tika2.png",
      description: "Modern design tika with gemstones",
      price: 60000,
    },
  ];

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalItems = jewelryItems.length;
  const angleStep = (2 * Math.PI) / totalItems;

  // Responsive radius values
  const radiusX = isMobile ? 220 : 420;
  const radiusZ = isMobile ? 20 : 120;

  const getItemPositionAndStyles = useCallback(
    (index: number, currentIndex: number) => {
      const angle = (index - currentIndex) * angleStep;
      const x = radiusX * Math.sin(angle);
      const z = radiusZ * Math.cos(angle);
      const normalizedZ = (z + radiusZ) / (2 * radiusZ);
      const isCenter = index === currentIndex;

      const scale = 0.5 + normalizedZ * 0.8;
      const opacity = 0.4 + normalizedZ * 0.6;
      const blur = (1 - normalizedZ) * 2;
      const brightness = 0.7 + normalizedZ * 0.5;
      const rotateY = -angle * (180 / Math.PI);

      return {
        x,
        z,
        scale,
        opacity,
        blur,
        brightness,
        isCenter,
        rotateY,
        transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale}) rotateY(${rotateY}deg)`,
        filter: `brightness(${brightness}) blur(${blur}px)`,
        zIndex: Math.round(normalizedZ * 100),
      };
    },
    [radiusX, radiusZ, angleStep]
  );

  // Play tick sound function
  const playTickSound = useCallback(() => {
    if (audioRef.current) {
      // Reset audio to start for quick successive plays
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        // Handle autoplay restrictions gracefully
        console.log("Audio play failed:", e);
      });
    }
  }, []);

  // Auto rotation with better performance
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          playTickSound();
          return (prev + 1) % totalItems;
        });
      }, 2000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, totalItems, playTickSound]);

  const resetAutoRotation = useCallback(() => {
    setIsAutoPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  const nextItem = useCallback(() => {
    playTickSound();
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    resetAutoRotation();
  }, [totalItems, resetAutoRotation, playTickSound]);

  const prevItem = useCallback(() => {
    playTickSound();
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    resetAutoRotation();
  }, [totalItems, resetAutoRotation, playTickSound]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      // Play sound at different speeds based on swipe velocity
      const swipeVelocity = Math.abs(distance) / 100; // Normalize velocity
      const playbackRate = Math.min(Math.max(swipeVelocity, 0.5), 2.0); // Clamp between 0.5x and 2x speed

      if (audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
        playTickSound();
        // Reset playback rate after playing
        setTimeout(() => {
          if (audioRef.current) audioRef.current.playbackRate = 1.0;
        }, 200);
      }
    }

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
      resetAutoRotation();
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      resetAutoRotation();
    }
  };

  // Floating particles animation
  useEffect(() => {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;

    particlesContainer.innerHTML = "";
    const particleCount = isMobile ? 20 : 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute rounded-full bg-yellow-400/20 pointer-events-none";

      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = 15 + Math.random() * 10;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        animation: float ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
      `;

      particlesContainer.appendChild(particle);
    }
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden ">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,69,198,0.4)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.3)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.3)_0%,_transparent_50%)]" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-screen w-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Particles */}
      <div id="particles" className="absolute inset-0 z-1 bg-blue-800/20" />

      {/* Audio element for tick sound */}
      <audio ref={audioRef} preload="auto" className="hidden">
        <source src="/audio3.m4a" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* 3D Jewelry Carousel */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center z-10"
        style={{
          height: isMobile ? "400px" : "500px",
          perspective: isMobile ? "1200px" : "1800px",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {jewelryItems.map((item, index) => {
            const styles = getItemPositionAndStyles(index, currentIndex);

            return (
              <div
                key={item.id}
                className={`absolute flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-out ${
                  styles.isCenter ? "z-30" : "z-10"
                }`}
                style={{
                  transform: styles.transform,
                  opacity: styles.opacity,
                  filter: styles.filter,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                    ${
                      styles.isCenter
                        ? isMobile
                          ? "w-27 h-28"
                          : "w-40 h-40"
                        : isMobile
                        ? "w-16 h-16"
                        : "w-28 h-28"
                    } 
                    rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10
                    transition-all duration-700 ease-out transform hover:scale-105
                  `}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading={index <= 2 ? "eager" : "lazy"}
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format`;
                      }}
                    />
                  </div>

                  {styles.isCenter && (
                    <div
                      className="absolute top-full mt-2 text-center w-full  z-40"
                      style={{
                        transform: `rotateY(${-styles.rotateY}deg)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className="backdrop-blur-xl bg-black/20 rounded-2xl ">
                        {/* <h3 className="text-lg md:text-sm font-bold text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-300 mb-3">
                          {item.description}
                        </p> */}
                        <div className="flex items-center justify-center gap-1 text-xl md:text-2xl font-bold text-yellow-400 mb-4">
                          <span>₹</span>
                          <span>{item.price.toLocaleString("en-IN")}</span>
                        </div>
                        {/* <button className="w-full px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                          Buy Now
                        </button> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          className={`absolute ${
            isMobile ? "left-4" : "left-12"
          } top-1/2 -translate-y-1/2 
            bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20
            ${isMobile ? "w-10 h-10" : "w-12 h-12"} rounded-full 
            flex justify-center items-center text-yellow-400 z-20 
            transition-all duration-300 hover:scale-110 active:scale-95`}
          onClick={prevItem}
        >
          <ChevronLeft size={isMobile ? 20 : 32} />
        </button>

        <button
          className={`absolute ${
            isMobile ? "right-4" : "right-12"
          } top-1/2 -translate-y-1/2 
            bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20
            ${isMobile ? "w-10 h-10" : "w-12 h-12"} rounded-full 
            flex justify-center items-center text-yellow-400 z-20 
            transition-all duration-300 hover:scale-110 active:scale-95`}
          onClick={nextItem}
        >
          <ChevronRight size={isMobile ? 20 : 32} />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 z-20 gap-2 flex-wrap px-4">
        {jewelryItems.map((_, index) => (
          <button
            key={index}
            className={`${
              isMobile ? "w-2 h-2" : "w-3 h-3"
            } rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50"
                : "bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => {
              playTickSound();
              setCurrentIndex(index);
              resetAutoRotation();
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.2);
            opacity: 0.4;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }
        }

        /* Smooth hardware acceleration */
        * {
          -webkit-backface-visibility: hidden;
          -webkit-transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default NewHero;
