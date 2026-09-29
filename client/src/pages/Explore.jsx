import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreDestinations.css";

const destinations = [
  {
    name: "Goa",
    location: "Goa, India",
    category: "Beach",
    image:"/images/goa.jpg",
    description: "Relax on beautiful beaches, explore coastal towns and enjoy vibrant nightlife.",
    icon: "🏝️",
  },
  {
    name: "Kerala",
    location: "Kerala, India",
    category: "Nature",
    image:"/images/kerala.jpg",
    description: "Discover peaceful backwaters, lush landscapes, tea gardens and local culture.",
    icon: "🌴",
  },
  {
    name: "Manali",
    location: "Himachal Pradesh, India",
    category: "Mountains",
    image:"/images/manali.jpg",
    description: "Escape to the mountains with scenic valleys, rivers and adventure activities.",
    icon: "🏔️",
  },
  {
    name: "Jaipur",
    location: "Rajasthan, India",
    category: "Heritage",
    image:"/images/jaipur.jpeg",
    description: "Experience royal palaces, historic forts, colorful markets and Rajasthani culture.",
    icon: "🏰",
  },
  {
    name: "Kashmir",
    location: "Jammu & Kashmir, India",
    category: "Nature",
    image:"/images/kashmir.webp",
    description: "Explore breathtaking valleys, peaceful lakes and spectacular mountain scenery.",
    icon: "🏞️",
  },
  {
    name: "Ladakh",
    location: "Ladakh, India",
    category: "Adventure",
    image:"/images/ladakh.jpg",
    description: "Discover dramatic landscapes, high-altitude lakes and unforgettable road trips.",
    icon: "🚵",
  },
  {
    name: "Varanasi",
    location: "Uttar Pradesh, India",
    category: "Heritage",
    image:"/images/varanasi.jpg",
    description: "Experience ancient ghats, spiritual traditions and the timeless Ganges.",
    icon: "🛕",
  },
  {
    name: "Andaman",
    location: "Andaman & Nicobar, India",
    category: "Beach",
    image:"/images/and.jpg",
    description: "Enjoy turquoise waters, tropical beaches, snorkeling and island adventures.",
    icon: "🌊",
  },
];

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Nature",
  "Heritage",
  "Adventure",
];

function ExploreDestinations() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      destination.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-page">

      {/* Hero */}
      <section className="explore-hero">
        <div className="explore-hero-content">
          <span className="explore-badge">
            ✨ Discover Your Next Adventure
          </span>

          <h1>
            Explore Amazing
            <span> Destinations</span>
          </h1>

          <p>
            Discover inspiring places, unforgettable experiences and
            destinations waiting to become your next adventure.
          </p>

          <div className="explore-search">
            <span>🔎</span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="category-section">
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category === "All" && "🌍 "}
              {category === "Beach" && "🏝️ "}
              {category === "Mountains" && "🏔️ "}
              {category === "Nature" && "🌿 "}
              {category === "Heritage" && "🏛️ "}
              {category === "Adventure" && "🚵 "}
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="destinations-section">
        <div className="section-heading">
          <div>
            <span className="small-heading">TRAVEL INSPIRATION</span>
            <h2>Popular Destinations</h2>
          </div>

          <p>
            Find a destination that matches your travel mood.
          </p>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="destination-grid">
            {filteredDestinations.map((destination) => (
              <div className="destination-card" key={destination.name}>

                <div className="destination-image">
                  <img
                    src={destination.image}
                    alt={destination.name}
                  />

                  <span className="destination-category">
                    {destination.icon} {destination.category}
                  </span>
                </div>

                <div className="destination-content">
                  <div className="destination-title">
                    <div>
                      <h3>{destination.name}</h3>
                      <span>📍 {destination.location}</span>
                    </div>
                  </div>

                  <p>{destination.description}</p>

                  <button
                    className="plan-button"
                    onClick={() =>
                      navigate("/create-trip", {
                        state: { destination: destination.name },
                      })
                    }
                  >
                    Plan a Trip <span>→</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div>🔎</div>
            <h3>No destinations found</h3>
            <p>Try searching for another destination.</p>
          </div>
        )}
      </section>

      {/* AI CTA */}
      <section className="ai-trip-section">
        <div className="ai-trip-content">
          <span className="ai-icon">🤖</span>

          <div>
            <span className="small-heading">YOUR PERSONAL TRAVEL AI</span>

            <h2>
              Not sure where to go?
            </h2>

            <p>
              Let our AI create a personalized trip based on your
              destination, budget, interests and travel preferences.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-trip")}
            className="ai-plan-button"
          >
            Create My Trip ✨
          </button>
        </div>
      </section>

    </div>
  );
}

export default ExploreDestinations;