// src/components/3d/Lights.jsx
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />
    </>
  );
};

export default Lights;  // Add this line