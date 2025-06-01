import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Lights from './Lights'
import Model from './Model'

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, -5], fov: 40 }}
      className="w-full h-full fixed top-[64px] left-0 z-0 pointer-events-none"
    >
      <Lights />
      <Model />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Environment preset="city" />
    </Canvas>
  )
}