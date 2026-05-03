import React from "react";
import { useNavigate } from "react-router";

const categoriesData = [
  {
    id: 1,
    name: "Action",
    images: ["10", "11", "12", "13"],
  },
  {
    id: 2,
    name: "Adventure",
    images: ["14", "15", "16", "17"],
  },
  {
    id: 3,
    name: "Comedy",
    images: ["18", "19", "20", "21"],
  },
  {
    id: 4,
    name: "Drama",
    images: ["22", "23", "24", "25"],
  },
  {
    id: 5,
    name: "Horror",
    images: ["26", "27", "28", "29"],
  },
  {
    id: 6,
    name: "Documentary",
    images: ["26", "27", "28", "29"],
  },
  {
    id: 7,
    name: "Romance",
    images: ["30", "31", "32", "33"],
  },
  {
    id: 8,
    name: "Sci-Fi",
    images: ["34", "35", "36", "37"],
  },
];

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 md:p-12 font-sans text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-3">
            Explore our wide variety of categories
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-3xl">
            Whether you're looking for a comedy to make you laugh, a drama to make
            you think, or a documentary to learn something new
          </p>
        </div>
        <div onClick={() => navigate("/movies")} className="text-xl bg-orange-500 px-5 py-2.5 rounded-lg hover:bg-orange-600 cursor-pointer">See All</div>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-6  scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categoriesData.map((category) => (
          <div
            onClick={() => navigate(`/movies?genre=${category.name.toLowerCase()}`)}
            key={category.id}
            className="min-w-62 bg-[#1a1a1a] p-4 rounded-2xl cursor-pointer hover:bg-[#222222] transition-colors border border-gray-800/50 group"
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-5">
              {category.images.map((imgSeed, index) => (
                <div key={index} className="relative w-full pt-[100%] overflow-hidden rounded-lg bg-gray-800">
                  <img
                    src={`https://picsum.photos/seed/${imgSeed}/200/200`}
                    alt={`${category.name} movie ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-1">
              <span className="font-semibold text-lg">{category.name}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;