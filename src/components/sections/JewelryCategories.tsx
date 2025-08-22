import React from "react";
import Container from "../Container";

const JewelryCategories = () => {
  const categories = [
    {
      name: "EARRINGS",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "FINGER RINGS",
      image:
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "PENDANTS",
      image:
        "https://image-thumbs.shafastatic.net/102450224_310_430",
    },
    {
      name: "MANGALSUTRA",
      image:
        "https://i.etsystatic.com/26647628/r/il/6cb1d9/4060264472/il_570xN.4060264472_b5v6.jpg",
    },
    {
      name: "BRACELETS",
      image:
        "https://everstylish.com/media/catalog/product/cache/fc1e90810f81d5d5f869fad087b9d639/j/e/jew1105963-m.jpg",
    },
    {
      name: "BANGLES",
      image:
        "https://www.shyle.in/cdn/shop/files/moh-intricate-flower-leaf-gold-tone-bangle-2.jpg?v=1737112717&width=2048",
    },
    {
      name: "CHAINS",
      image:
        "https://i.etsystatic.com/25844886/r/il/17f65d/5471411799/il_570xN.5471411799_89es.jpg",
    },
    {
      name: "VIEW ALL",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isViewAll: true,
    },
  ];

  return (
    <div className="">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-rose-900 mb-4 tracking-wide">
            Find Your Perfect Jewelry
          </h1>
          <p className="text-xl text-rose-700 font-light mb-8 max-w-2xl mx-auto">
            Shop By Category
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full cursor-pointer h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3
                  className={`text-lg font-semibold ${
                    category.isViewAll ? "text-amber-500" : "text-white"
                  } tracking-wider`}
                >
                  {category.name}
                </h3>
              </div>

              {category.isViewAll && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium px-3 py-1 bg-amber-600 rounded-full">
                    Explore All
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </Container>
    </div>
  );
};

export default JewelryCategories;
