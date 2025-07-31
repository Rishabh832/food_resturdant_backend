import React from 'react';

const MainContent = () => {
  const specials = [
    {
      name: 'Sandwiches',
      image: 'https://vatans.com/wp-content/uploads/2024/03/10-Sandwiches-That-Will-Satisfy-Your-Cravings.png',
      description: 'A delicious meal to satisfy your cravings.',
      price: 299,
    },
    {
      name: 'Paneer Tikka',
      image: 'https://carveyourcraving.com/wp-content/uploads/2021/10/paneer-tikka-skewers.jpg',
      description: 'Perfectly grilled paneer with spices.',
      price: 249,
    },
    {
      name: 'Veg Biryani',
      image: 'https://www.dwarakaorganic.com/wp-content/uploads/2024/07/Veg-Biryani-Recipe-870x470-1.jpg',
      description: 'Fragrant rice with fresh vegetables and spices.',
      price: 199,
    },
  ];

  return (
    <main className="bg-white py-16 px-4 md:px-8 lg:px-16 text-gray-800 mt-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
          Delicious Food Delivered To You
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          Order from your favorite local restaurants and get meals delivered hot and fresh!
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Explore Menu
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-16">
        <div className="p-6 rounded-xl shadow hover:shadow-lg border">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2023/9/340258448/ML/BK/TG/183776122/14.jpg"
            alt="Fast Delivery"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-sm text-gray-600">Get your food delivered in 30 minutes or less.</p>
        </div>
        <div className="p-6 rounded-xl shadow hover:shadow-lg border">
          <img
            src="https://tahinis.com/cdn/shop/articles/fresh_ingredients.jpg?v=1650910346"
            alt="Fresh Ingredients"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
          <p className="text-sm text-gray-600">We only use high-quality, fresh ingredients.</p>
        </div>
        <div className="p-6 rounded-xl shadow hover:shadow-lg border">
          <img
            src="https://img.freepik.com/premium-vector/100-secure-payment-green-badge-isolated-transparent-background_105700-1800.jpg"
            alt="Secure Payment"
            className="w-12 h-12 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
          <p className="text-sm text-gray-600">Pay safely with multiple secure options.</p>
        </div>
      </section>

      {/* Specials Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-orange-500">Today's Specials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {specials.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <p className="text-orange-500 font-bold mt-2">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
