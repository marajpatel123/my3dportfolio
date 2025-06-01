import { motion } from "framer-motion";
import { FaCode, FaServer, FaMobile, FaCube } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            About Me
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-lg sm:text-xl leading-relaxed mb-6">
            Hi, I'm <span className="text-purple-300 font-semibold">Raj Patel</span> — a passionate and creative Full Stack Web Developer with a strong foundation in the MERN stack (MongoDB, Express.js, React.js, Node.js) and a flair for building immersive 3D web experiences using Three.js.
          </p>
          
          <p className="text-lg sm:text-xl leading-relaxed">
            With a background in Computer Science (B.Tech), I specialize in crafting modern, scalable, and performance-driven web applications that not only function flawlessly but also deliver engaging user experiences. Whether it's building robust backend systems or designing dynamic frontend interfaces, I enjoy working across the entire development lifecycle.
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-300">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skill Card 1 */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all">
              <div className="flex items-center mb-4">
                <FaCode className="text-purple-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Frontend Development</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  React.js & Next.js
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Three.js & WebGL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Tailwind CSS & GSAP
                </li>
              </ul>
            </div>

            {/* Skill Card 2 */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all">
              <div className="flex items-center mb-4">
                <FaServer className="text-blue-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Backend Development</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Node.js & Express.js
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  MongoDB & PostgreSQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  RESTful & GraphQL APIs
                </li>
              </ul>
            </div>

            {/* Skill Card 3 */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all">
              <div className="flex items-center mb-4">
                <FaMobile className="text-green-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">Mobile & Others</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  React Native
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Java, C, and Python
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Docker & AWS
                </li>
              </ul>
            </div>

            {/* Skill Card 4 */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-pink-500 transition-all">
              <div className="flex items-center mb-4">
                <FaCube className="text-pink-400 text-2xl mr-3" />
                <h3 className="text-xl font-semibold">3D & Animation</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  Three.js & React Three Fiber
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  Blender & 3D Modeling
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  WebGL & Shaders
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800/30 p-6 sm:p-8 rounded-xl border border-gray-700"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-300">My Development Philosophy</h2>
          <p className="text-lg sm:text-xl leading-relaxed mb-4">
            I believe in <span className="text-blue-300 font-medium">continuous learning</span> and always strive to stay ahead with the latest tools, frameworks, and best practices in web development. My goal is to build solutions that are not only technically sound but also intuitive and impactful.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed">
            When I'm not coding, you can find me exploring new 3D rendering techniques, contributing to open-source projects, or mentoring aspiring developers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}