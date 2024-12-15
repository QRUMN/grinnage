import React from 'react';
import { ArrowRight, Bug, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  const handleFreeInspection = () => {
    navigate('/onboarding');
  };

  return (
    <section className="relative min-h-[90vh] bg-[#131112] text-[#f7f7ff] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#56e39f] to-[#6e8898]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6 space-x-2">
              <Bug className="w-10 h-10 text-[#56e39f]" />
              <span className="text-2xl font-bold text-[#56e39f]">Grinnage Extermination</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Advanced Pest Control <br />
              <span className="text-[#56e39f]">for Modern Living</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#f7f7ff] mb-8 max-w-2xl">
              Protecting your space with eco-friendly pest management solutions. 
              Experience the future of pest control today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleFreeInspection}
                className="btn-primary group"
              >
                Free Inspection
                <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary group">
                Our Services
                <Shield className="ml-2 w-5 h-5 inline" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:max-w-md w-full">
            {[
              { number: "25+", label: "Years Experience" },
              { number: "15K+", label: "Satisfied Clients" },
              { number: "24/7", label: "Emergency Service" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass-card transform hover:scale-105 transition-all"
              >
                <p className="text-3xl font-bold text-[#56e39f]">{stat.number}</p>
                <p className="text-sm text-[#f7f7ff]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full h-auto">
          <path 
            fill="#f7f7ff" 
            fillOpacity="1" 
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};