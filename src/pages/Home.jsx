import { useEffect, useState } from 'react'
import Scene from '../components/3d/Scene'
import { Link } from 'react-router-dom'

function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <Scene />
      
      <div className={`relative z-10 text-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-light mb-4">
          Hi, I'm <span className="text-primary">Raj Patel</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-secondary mb-8">
          3D Developer & Designer
        </h2>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-primary rounded-lg font-medium hover:bg-secondary transition-colors">
            <Link to={"/projects"}>View Projects</Link>
          </button>
          <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
            <Link to={"/contact"}>Contact Me</Link>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="animate-bounce text-light">
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
};

export default Home;