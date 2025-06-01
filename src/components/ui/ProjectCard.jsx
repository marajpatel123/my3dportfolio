import { useState } from 'react'

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false)

  console.log(project.image)

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg bg-dark/50 backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden ">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-scale-down transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-90'}`} />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-light mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-secondary transition-colors"
          >
            Live Demo
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  )
}