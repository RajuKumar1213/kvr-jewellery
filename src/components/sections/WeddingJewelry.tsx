import React from "react";
import Container from "../Container";

const WeddingJewelry = () => {
  const categories = [
    {
      name: "Gold",
      image:
        "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/194/1737539642_bdac2baf411a5259c0b3.jpg",
      description: "Elegant gold jewelry for your special day",
    },
    {
      name: "Diamond",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Sparkling diamonds to make you shine",
    },
    {
      name: "Dailywear",
      image:
        "https://www.soosi.co.in/cdn/shop/products/WhatsApp_Image_2019-11-21_at_17.43.12_580x.jpg?v=1574601194",
      description: "Beautiful pieces for everyday elegance",
    },
  ];

  return (
    <div className="-mt-10">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-rose-900 mb-4 tracking-wide">
            KVR World
          </h1>
          <p className="text-xl text-rose-700 font-light mb-8 max-w-2xl mx-auto">
            A companion for every occasion
          </p>
          <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
        </div>

        {/* Wedding Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-semibold text-gray-900 mb-6">
            Wedding
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="h-96 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide">
                  {category.name}
                </h3>
                <p className="text-rose-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {category.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-rose-700 text-white rounded-full font-medium hover:bg-rose-800 transition-colors duration-300 shadow-md hover:shadow-lg">
            Explore Wedding Collection
          </button>
        </div>

        {/* Pattern background */}
        <div className="absolute left-0 right-0 -z-10 top-1/3 opacity-10">
          <div className="flex justify-center">
            <svg
              width="400"
              height="100"
              viewBox="0 0 400 100"
              className="text-rose-400"
            >
              <path
                fill="currentColor"
                d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5c0-17.2-22-17.1-22.1-45.3c0-21.1,15.2-33.5,33.5-33.5 c21.1,0,31.9,14.8,31.9,31.9c0,20.1-16.2,30.7-16.2,56.7c0,14.8,10.2,26.5,26.5,26.5c17.9,0,25.2-14.8,25.2-30.7 c0-23.5-17.9-33.5-33.5-56.7c-9.5-14.2-5-25.9,7.8-33.5c14.8-9.5,34.7-4.3,40.2,12.4c5,15.2-3.3,28.5-12.4,37.6 c-9.5,9.5-17.9,17.9-17.9,33.5c0,14.8,12.4,26.5,26.5,26.5c17.9,0,31.9-14.8,31.9-31.9c0-20.1-16.2-30.7-16.2-56.7 c0-14.8,10.2-26.5,26.5-26.5c17.9,0,25.2,14.8,25.2,30.7c0,23.5-17.9,33.5-33.5,56.7c-9.5,14.2-5,25.9,7.8,33.5 c14.8,9.5,34.7,4.3,40.2-12.4c5-15.2-3.3-28.5-12.4-37.6c-9.5-9.5-17.9-17.9-17.9-33.5c0-14.8,12.4-26.5,26.5-26.5 c17.9,0,31.9,14.8,31.9,31.9c0,20.1-16.2,30.7-16.2,56.7c0,14.8,10.2,26.5,26.5,26.5c17.9,0,25.2-14.8,25.2-30.7"
              ></path>
            </svg>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WeddingJewelry;
