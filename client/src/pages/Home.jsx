import { NavLink } from "react-router-dom";
import "../index.css";
export const Home = () => {
  return (
    <>
    <div className="home-hero" 
    style={{
    backgroundImage: "url('/images/naturepic6.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
  >
      <h1>Your Journey Begins Here.</h1>

      <h2>Plan. Explore. Experience.</h2>

      

      <h2>Start Planning Your Next Adventure with the power of AI</h2>

      <p>
        Discover amazing destinations, create personalized itineraries and
        make unforgettable memories.
      </p>

      <NavLink to="/create-trip">
        <button>Create your Trip</button>
      </NavLink>

      <NavLink to="/destinations">
        <button>Explore Destinations</button>
      </NavLink>

      <section>
        <h2>WHY AI TRAVEL PLANNER?</h2>
        <h3>Explore Smarter, Not Harder</h3>

        <div>
          <span>🤖</span>
          <h3>AI Powered Planning</h3>
          <p>
            Get personalized travel plans created specially for you.
          </p>
        </div>

        <div>
          <span>🏞️</span>
          <h3>Discover New Places</h3>
          <p>
            Find beautiful destinations and experiences around the world.
          </p>
        </div>

        <div>
          <span>🕰️</span>
          <h3>Save Your Time</h3>
          <p>
            Let AI handle the planning while you focus on enjoying your
            journey.
          </p>
        </div>
      </section>
      </div>
      <section className="destination" id="destinations">
        <div className="section-heading">
            <p>EXPLORE THE WORLD</p>
            <h2>Popular Destinations</h2>
            <div className="place-info">
                <div className="place-info-text">
                    <img src="/images/naturepic2.webp" alt="Lonavla"></img>
                    <p>Lonavala — **where the hills whisper peace.</p>
                </div>
                 <div className="place-info-text">
                    <img src="/images/naturepic3.webp" alt="Switerzland"></img>
                    <p>Switerzland-Mountains,lakes and breathtaking views.</p>
                </div>
                <div className="place-info-text">
                    <img src="/images/naturepic4.jpg" alt="Malayasia"></img>
                    <p>Malaysia — **where tropical beauty meets vibrant culture.</p>
                </div>
                <div className="place-info-text">
                    <img src="/images/naturepic5.jpg" alt="Bali"></img>
                    <p>Bali-Paradise filled with beaches and culture</p>
                </div>

            </div>
        </div>
      </section>
      <div className="last-text">
        <h2>Ready for your next adventure?</h2>
        <p>Let AI create your perfect travel experience</p>
        <NavLink to="/create-trip" className="primary-btn">Start Planning</NavLink>
      </div>
    </>
  );
};



  
      