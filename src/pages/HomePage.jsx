import { useState, useEffect, useRef } from "react";
import { SearchBar } from "../components/SearchBarNew";
import { CategoryChips } from "../components/CategoryChipsNew";
import { ResearchCard } from "../components/ResearchCardNew";
import { mockResearch, categories } from "../lib/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { TrendingUp, Database, Users } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const highlightedResearch = mockResearch.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#152238] to-[#0d1b2a]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-[#0a1628] via-[#152238] to-[#1e3a5f] py-24 overflow-hidden">
        {/* Soft blurred leaf texture background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1650731900879-b5f25088ff31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjB0ZXh0dXJlJTIwbmF0dXJlfGVufDF8fHx8MTc2NDU2MzkyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              filter: 'blur(8px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/85 via-[#152238]/90 to-[#1e3a5f]/85" />
        </div>

        {/* Floating particles */}
        <motion.div 
          className="absolute top-20 left-20 w-2 h-2 rounded-full bg-[#44b44b]"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-32 w-3 h-3 rounded-full bg-[#867ddd]"
          animate={{ 
            y: [0, 40, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-40 w-2 h-2 rounded-full bg-[#44b44b]"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#44b44b]/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#867ddd]/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          style={{ y, opacity }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Text Content - Centered */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-block mb-6 px-5 py-2.5 bg-gradient-to-r from-[#44b44b]/20 to-[#867ddd]/20 backdrop-blur-md rounded-full border border-[#44b44b]/30 shadow-lg shadow-[#44b44b]/10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="text-[#5ec465] text-sm">🧬 Powered by Scientific Data & AI</span>
              </motion.div>
              
              <motion.h1 
                className="mb-6 text-white leading-tight text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Biology in <span className="bg-gradient-to-r from-[#44b44b] via-[#5ec465] to-[#867ddd] bg-clip-text text-transparent">Data</span>
              </motion.h1>
              
              <motion.p 
                className="mb-8 text-[#a0b3c8] text-xl leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Access comprehensive biological research studies with interactive data visualizations. 
                Search through thousands of peer-reviewed papers in genetics, microbiology, and ecology.
              </motion.p>
              
              {/* Sub-features tags */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-10 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
              >
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f]/60 backdrop-blur-md border border-[#44b44b]/30 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05, borderColor: "#44b44b", backgroundColor: "#1e3a5f" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#44b44b] animate-pulse" />
                  <span className="text-sm text-[#e0e7f0]">Real-time Data</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f]/60 backdrop-blur-md border border-[#867ddd]/30 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05, borderColor: "#867ddd", backgroundColor: "#1e3a5f" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#867ddd] animate-pulse" />
                  <span className="text-sm text-[#e0e7f0]">Peer-reviewed</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f]/60 backdrop-blur-md border border-[#44b44b]/30 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05, borderColor: "#44b44b", backgroundColor: "#1e3a5f" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#44b44b] animate-pulse" />
                  <span className="text-sm text-[#e0e7f0]">Interactive Charts</span>
                </motion.div>
              </motion.div>
              
              {/* Search Bar */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <SearchBar 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="max-w-2xl mx-auto"
                />
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <StatCard icon={<Database className="w-6 h-6" />} value="2,500+" label="Research Papers" delay={0.7} />
                <StatCard icon={<Users className="w-6 h-6" />} value="1,200+" label="Contributors" delay={0.8} />
                <StatCard icon={<TrendingUp className="w-6 h-6" />} value="50+" label="Institutions" delay={0.9} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Category Filters */}
      <AnimatedSection className="py-16 bg-gradient-to-b from-[#152238] to-[#0d1b2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-3 text-white">Browse by Category</h2>
            <p className="text-[#a0b3c8]">Discover research across different biological disciplines</p>
          </motion.div>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Highlighted Research */}
      <AnimatedSection className="py-16 bg-gradient-to-b from-[#0d1b2a] via-[#152238] to-[#0d1b2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-white mb-2">Recent Research</h2>
              <p className="text-[#a0b3c8]">Latest studies and discoveries from our database</p>
            </div>
            <motion.a 
              href="/research" 
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#44b44b] to-[#5ec465] text-white rounded-xl hover:shadow-xl hover:shadow-[#44b44b]/40 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View all
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {highlightedResearch.map((research, index) => (
              <motion.div
                key={research.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <ResearchCard {...research} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Featured Categories */}
      <AnimatedSection className="py-16 bg-gradient-to-b from-[#0d1b2a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="mb-12 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Research Areas
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <CategoryCard
              title="Genetics"
              description="Explore gene editing, genomics, and evolutionary biology research."
              image="https://images.unsplash.com/photo-1755107504698-380320b632bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkbmElMjBoZWxpeCUyMGFic3RyYWN0fGVufDF8fHx8MTc2NDI1Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              color="bg-[#44b44b]"
            />
            <CategoryCard
              title="Microbiology"
              description="Discover microbial diversity, pathogen studies, and microbiome research."
              image="https://images.unsplash.com/photo-1743792930023-774d74a015cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3Njb3BlJTIwYmlvbG9neSUyMHNjaWVuY2V8ZW58MXx8fHwxNzY0MjUyNzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              color="bg-[#867ddd]"
            />
            <CategoryCard
              title="Ecology"
              description="Study ecosystem dynamics, biodiversity, and environmental impacts."
              image="https://images.unsplash.com/photo-1590073139156-861678ba66f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBlY29sb2d5JTIwZ3JlZW58ZW58MXx8fHwxNzY0MjUyNzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              color="bg-[#558B2F]"
            />
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}

function StatCard({ icon, value, label, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const targetValue = parseInt(value.replace(/[+,]/g, ''));
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);
  
  const formatNumber = (num) => {
    if (value.includes(',')) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <motion.div 
      ref={ref}
      className="text-center bg-gradient-to-br from-[#1e3a5f]/80 via-[#2a4a6f]/60 to-[#1e3a5f]/80 backdrop-blur-md rounded-2xl p-6 border border-[#44b44b]/30 shadow-xl shadow-[#44b44b]/20 group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: "0 25px 50px rgba(68, 180, 75, 0.3)", borderColor: "#44b44b" }}
    >
      <motion.div 
        className="flex justify-center mb-3 text-white bg-gradient-to-br from-[#44b44b] to-[#5ec465] w-14 h-14 rounded-xl mx-auto items-center shadow-lg shadow-[#44b44b]/30"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <div className="text-white text-2xl mb-1">{formatNumber(count)}{value.includes('+') && '+'}</div>
      <div className="text-sm text-[#a0b3c8]">{label}</div>
    </motion.div>
  );
}

function CategoryCard({ title, description, image, color }) {
  return (
    <motion.div 
      className="group bg-gradient-to-br from-[#1e3a5f]/80 to-[#152238]/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-[#44b44b]/20 cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(68, 180, 75, 0.3)", borderColor: "#44b44b" }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 overflow-hidden relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/40 to-transparent" />
      </div>
      <div className="p-6">
        <motion.div 
          className={`inline-block px-4 py-2 rounded-xl text-white mb-3 shadow-lg ${color}`}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(68, 180, 75, 0.4)" }}
        >
          {title}
        </motion.div>
        <p className="text-[#a0b3c8] leading-relaxed">{description}</p>
        <motion.div 
          className="mt-4 flex items-center text-[#5ec465] group-hover:text-[#44b44b]"
          initial={{ opacity: 0.7, x: 0 }}
          whileHover={{ opacity: 1, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm">Explore {title.toLowerCase()}</span>
          <motion.svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Helper component for animated sections
function AnimatedSection({ children, className = "" }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}