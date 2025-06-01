import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

export default function Controls({
  autoRotate = true,
  enableZoom = true,
  rotationSpeed = 1.5,
  minDistance = 3,
  maxDistance = 10,
  enableDamping = true
}) {
  const controlsRef = useRef()
  const { camera, gl } = useThree()
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[0, 0, 5]}
      />
      
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        autoRotate={autoRotate}
        autoRotateSpeed={rotationSpeed}
        enableZoom={enableZoom}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={minDistance}
        maxDistance={maxDistance}
        dampingFactor={enableDamping ? 0.05 : 0}
        screenSpacePanning={false}
        makeDefault
        onStart={() => setIsDragging(true)}
        onEnd={() => setIsDragging(false)}
      />
    </>
  )
}