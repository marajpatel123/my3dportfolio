import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLORS = {
  accent: '#ffd166',
  neutral: '#918b8a',
  background: '#a5a8b3',
  glow: '#ffffff'
};

const SPHERE_COLORS = [
  new THREE.Color('#ff6b6b'), // Red
  new THREE.Color('#45b7d1'), // Blue
  new THREE.Color('#4ecdc4'), // Teal
  new THREE.Color('#9b5de5'), // Purple
  new THREE.Color('#f15bb5'), // Pink
  new THREE.Color('#00bbf9'), // Light Blue
  new THREE.Color('#00f5d4'), // Turquoise
  new THREE.Color('#fee440'), // Yellow
];

export default function BubblesBackground() {
  const sphereRef = useRef();
  const [hovered, setHover] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.2);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [targetColor, setTargetColor] = useState(SPHERE_COLORS[0]);
  const [currentColor, setCurrentColor] = useState(SPHERE_COLORS[0]);
  const transitionStartTime = useRef(0);
  const transitionDuration = 1.0; // 1 second transition

  // Set new target color every 2 seconds when not hovered
  useEffect(() => {
    if (hovered) return;
    
    const interval = setInterval(() => {
      setCurrentColorIndex(prev => (prev + 1) % SPHERE_COLORS.length);
      setTargetColor(SPHERE_COLORS[(currentColorIndex + 1) % SPHERE_COLORS.length]);
      transitionStartTime.current = performance.now() / 1000;
    }, 2000);
    
    return () => clearInterval(interval);
  }, [hovered, currentColorIndex]);

  // Central sphere animation
  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    
    const elapsed = clock.getElapsedTime();
    sphereRef.current.rotation.y = elapsed * rotationSpeed;
    
    // Smooth pulsing effect
    const pulse = 1 + Math.sin(elapsed * 2) * 0.1;
    sphereRef.current.scale.set(pulse, pulse, pulse);
    
    // Color transition logic
    if (!hovered) {
      const currentTime = performance.now() / 1000;
      const timeSinceTransition = currentTime - transitionStartTime.current;
      const transitionProgress = Math.min(timeSinceTransition / transitionDuration, 1);
      
      // Create a new color that's interpolated between current and target
      const interpolatedColor = new THREE.Color().lerpColors(
        currentColor,
        targetColor,
        transitionProgress
      );
      
      sphereRef.current.material.color.copy(interpolatedColor);
      
      // Update current color when transition completes
      if (transitionProgress === 1) {
        setCurrentColor(targetColor.clone());
      }
    } else {
      // Hover color transition (continuous rainbow effect)
      const hue = (elapsed * 0.2) % 1;
      sphereRef.current.material.color.setHSL(hue, 0.8, 0.7);
    }
  });

  const toggleRotation = () => setRotationSpeed(speed => speed === 0.2 ? 0.8 : 0.2);

  return (
    <group>
      {/* Central Wireframe Sphere */}
      <mesh
        ref={sphereRef}
        onClick={toggleRotation}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => {
          setHover(false);
          // Reset to current color when hover ends
          setTargetColor(SPHERE_COLORS[currentColorIndex]);
          setCurrentColor(SPHERE_COLORS[currentColorIndex]);
          transitionStartTime.current = performance.now() / 1000;
        }}
      >
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          wireframe
          color={currentColor}
          transparent
          opacity={hovered ? 0.95 : 0.8}
        />
      </mesh>

      {/* Central Glow Sphere */}
      <mesh
        position={[0, 0, 0]}
        onClick={toggleRotation}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => {
          setHover(false);
          // Reset to current color when hover ends
          setTargetColor(SPHERE_COLORS[currentColorIndex]);
          setCurrentColor(SPHERE_COLORS[currentColorIndex]);
          transitionStartTime.current = performance.now() / 1000;
        }}
      >
        <sphereGeometry args={[1, 6, 30]} />
        <meshBasicMaterial

          color={COLORS.glow}
          transparent
          opacity={hovered ? 0.8 : 0.5}
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting Bubbles */}
      {Array.from({ length: 80 }).map((_, i) => (
        <OrbitingBubble key={i} index={i} hovered={hovered} />
      ))}

      {/* Background Bubbles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <DriftingBubble key={`bubble-${i}`} />
      ))}
    </group>
  );
}

// ... (OrbitingBubble and DriftingBubble components remain the same as previous implementation)

// Orbiting bubbles that change color every 2 seconds when not hovered.
function OrbitingBubble({ index, hovered }) {
  const bubbleRef = useRef();
  const materialRef = useRef();
  
  // Generate initial properties only once.
  const { size, orbitRadius, phase } = useMemo(() => ({
    size: 0.03 + Math.random() * 0.07,
    orbitRadius: 3.5 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2
  }), []);
  
  useFrame(({ clock }) => {
    if (!bubbleRef.current) return;
    
    const time = clock.getElapsedTime();
    const speed = hovered ? 0.03 : 0.008;
    const angle = time * speed + index + phase;
    
    // Compute orbital position with offsets.
    bubbleRef.current.position.set(
      Math.cos(angle) * orbitRadius,
      Math.sin(angle * 0.7) * orbitRadius,
      Math.sin(angle * 1.3) * orbitRadius
    );
    
    // Apply a pulsing scale effect.
    const pulse = 0.8 + Math.sin(time * 3 + index) * 0.2;
    bubbleRef.current.scale.set(pulse, pulse, pulse);
    
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        hovered ? 0.7 : 0.4,
        0.1
      );
      
      // When not hovered, update the color every 2 seconds.
      if (!hovered) {
        const cycle = Math.floor(time / 2);
        if (bubbleRef.current.userData.lastCycle !== cycle) {
          // Vary the hue using the cycle count and a slight phase offset.
          const newHue = ((cycle * 0.3) + phase * 0.1) % 1;
          materialRef.current.color.setHSL(newHue, 0.8, 0.6);
          bubbleRef.current.userData.lastCycle = cycle;
        }
      }
    }
  });
  
  return (
    <mesh ref={bubbleRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        ref={materialRef}
        color={hovered ? COLORS.accent : COLORS.background}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
}

// Drifting background bubbles that cycle their color every 2 seconds.
function DriftingBubble() {
  const bubbleRef = useRef();
  const startY = useRef(-10 - Math.random() * 10);
  
  // Generate initial parameters and a random hue offset.
  const { size, speed, horizontalAmplitude, driftHueOffset } = useMemo(() => ({
    size: 0.1 + Math.random() * 0.3,
    speed: 0.3 + Math.random() * 0.4,
    horizontalAmplitude: 0.5 + Math.random() * 0.8,
    driftHueOffset: Math.random()
  }), []);
  
  useFrame(({ clock }) => {
    if (!bubbleRef.current) return;
    
    const elapsed = clock.getElapsedTime();
    const yPos = startY.current + elapsed * speed;
    
    // Reset the bubble's vertical position when it goes off-screen.
    if (yPos > 10) {
      startY.current = -10 - Math.random() * 5;
      bubbleRef.current.position.x = (Math.random() - 0.5) * 10;
      bubbleRef.current.position.z = (Math.random() - 0.5) * 8;
      return;
    }
    
    bubbleRef.current.position.set(
      Math.sin(elapsed * 0.5) * horizontalAmplitude,
      yPos,
      Math.cos(elapsed * 0.7) * horizontalAmplitude
    );
    
    // Gentle scale oscillation.
    const scale = 0.9 + Math.sin(elapsed * 2) * 0.1;
    bubbleRef.current.scale.set(scale, scale, scale);
    
    // Update color every 2 seconds.
    const cycle = Math.floor(elapsed / 2);
    if (bubbleRef.current.userData.lastCycle !== cycle) {
      const newHue = ((cycle * 0.3) + driftHueOffset) % 1;
      bubbleRef.current.material.color.setHSL(newHue, 0.8, 0.6);
      bubbleRef.current.userData.lastCycle = cycle;
    }
  });
  
  return (
    <mesh ref={bubbleRef}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshBasicMaterial
        color={COLORS.background}
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </mesh>
  );
}
