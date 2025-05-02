import { useNavigate } from "react-router-dom";

// Social media links configuration
const socialLinks = {
  facebookFelix: "https://www.facebook.com/felixyuboi/", 
  githubFelix: "https://github.com/felixjseph",
  facebookAl: "https://www.facebook.com/prince.al.0987",
  githubAl: "https://github.com/princeprog",
  facebookAmar: "https://www.facebook.com/amarfloresjr",
  githubAmar: "https://github.com/AmarFloresJr",
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1c1c1c]">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/HomePageBackground.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <img src="/images/logo.png" alt="CineCity Logo" className="w-40 mx-auto mb-8" />
          <h1 className="text-6xl font-extrabold mb-6 text-green-400 drop-shadow-lg">
            Welcome to CineCity
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Experience the magic of cinema like never before. Discover the
            latest blockbusters, timeless classics, and everything in between.
            Book your tickets now and enjoy a seamless movie experience.
          </p>
          <button
            className="px-8 py-4 bg-green-500 text-white rounded-full text-lg font-semibold hover:scale-105 hover:bg-green-600 transition duration-300 shadow-lg cursor-pointer"
            onClick={() => navigate("/movies")}
          >
            Explore Movies
          </button>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-16 bg-[#1e1e1e]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our team of skilled full-stack developers is dedicated to delivering innovative and efficient solutions. 
              With expertise in both front-end and back-end technologies, we ensure seamless and user-friendly experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <div className="bg-[#2b2b2b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src="images/Felix.jpg" className="w-full h-64 object-cover" alt="Amar Flores Jr" />
              <div className="p-6">
                <h4 className="text-white text-xl font-semibold">Felix Joseph Castañeda</h4>
                <p className="text-green-400 text-sm mb-4">Software Engineer</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    I love to standby at RTL building because there is an aircon and I can sleep there. Combo meal is the best. 
                </p>
                <div className="flex space-x-4">
                  <a href={socialLinks.facebookFelix} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href={socialLinks.githubFelix} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#2b2b2b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src="images/alprince.png" className="w-full h-64 object-cover" alt="Al Prince Llavan" />
              <div className="p-6">
                <h4 className="text-white text-xl font-semibold">Al Prince Llavan</h4>
                <p className="text-green-400 text-sm mb-4">Software Engineer</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  I love hotcakes and Milo, I love CIT, I love my family, I love my friends, I love my girlfriend, I love my life. I love You.
                </p>
                <div className="flex space-x-4">
                  <a href={socialLinks.facebookAl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href={socialLinks.githubAl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#2b2b2b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src="images/Amar.png" className="w-full h-64 object-cover" alt="Felix Joseph Castañeda" />
              <div className="p-6">
                <h4 className="text-white text-xl font-semibold">Amar Flores Jr.</h4>
                <p className="text-green-400 text-sm mb-4">Software Engineer</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  CIT Combo Meal is the best combo meal in the world, Hotcake and Milo is the best thing that ever happened to me.
                </p>
                <div className="flex space-x-4">
                  <a href={socialLinks.facebookAmar} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href={socialLinks.githubAmar} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}