import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function WireframeSphere() {
  const sphereRef = useRef()

  // Animation loop (optional rotation)
  useFrame(({ clock }) => {
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[3, 50, 50]} />
      <meshBasicMaterial
        color="#918b8a"       // Purple color (Tailwind's primary)
        wireframe={true}
        wireframeLinewidth={1} // Note: Linewidth may not work in all browsers
      />
    </mesh>
  )
}