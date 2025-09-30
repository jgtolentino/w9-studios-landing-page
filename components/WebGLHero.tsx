'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Particle system component
function ParticleField() {
  const points = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()

  // Generate random particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  // Animate particles
  useFrame((state, delta) => {
    if (!points.current) return

    // Rotate particle field
    points.current.rotation.y += delta * 0.05
    points.current.rotation.x += delta * 0.02

    // React to mouse movement
    const targetX = (mouse.x * viewport.width) / 10
    const targetY = -(mouse.y * viewport.height) / 10

    points.current.position.x += (targetX - points.current.position.x) * 0.02
    points.current.position.y += (targetY - points.current.position.y) * 0.02
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3}>
      <PointMaterial
        transparent
        color="#0066FF"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating geometric shapes
function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return

    // Smooth rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
    meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.4

    // React to mouse
    meshRef.current.position.x = mouse.x * 2
    meshRef.current.position.y = mouse.y * 1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#E84141"
          emissive="#E84141"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// Energy waves effect
function EnergyWaves() {
  const wavesRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!wavesRef.current) return

    const time = state.clock.elapsedTime
    wavesRef.current.rotation.z = time * 0.1

    // Pulse effect
    const scale = 1 + Math.sin(time * 2) * 0.1
    wavesRef.current.scale.set(scale, scale, 1)
  })

  return (
    <mesh ref={wavesRef} position={[0, 0, -2]}>
      <ringGeometry args={[2, 3, 64]} />
      <meshBasicMaterial
        color="#0066FF"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Main WebGL hero component
export default function WebGLHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        style={{
          background: 'transparent'
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0066FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E84141" />

        {/* 3D Elements */}
        <ParticleField />
        <FloatingMesh />
        <EnergyWaves />

        {/* Performance optimization */}
        <fog attach="fog" args={['#1A1A1A', 5, 15]} />
      </Canvas>

      {/* Gradient overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-studio-black/50 pointer-events-none" />
    </div>
  )
}