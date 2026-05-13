'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TorusKnot, Environment, Float, Sparkles } from '@react-three/drei'

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-slate-950">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <TorusKnot args={[1.5, 0.4, 256, 64]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#3b82f6" 
              roughness={0.1}
              metalness={0.8}
            />
          </TorusKnot>
        </Float>

        <Sparkles count={200} size={2} scale={15} color="#ffffff" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
