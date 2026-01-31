"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Float, Environment, MeshDistortMaterial, Sphere, Torus, Box } from "@react-three/drei"
import { Suspense, useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh, Group } from "three"
import { useTheme } from "next-themes"


function AshokaChakra3D({ position = [0, 0, -3] }: { position?: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Clockwise rotation
      groupRef.current.rotation.z = -state.clock.elapsedTime * 0.6
    }
  })

  const spokes = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2
      return angle
    })
  }, [])

  return (
    <group ref={groupRef} position={position} scale={1.8}>
      {/* Outer White Ring */}
      <Torus args={[1.1, 0.06, 32, 200]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.2}
        />
      </Torus>

      {/* Inner Blue Ring */}
      <Torus args={[0.9, 0.05, 32, 200]}>
        <meshStandardMaterial
          color="#000080"
          emissive="#1a1aff"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
        />
      </Torus>

      {/* Center Hub */}
      <Sphere args={[0.12, 32, 32]}>
        <meshStandardMaterial
          color="#000080"
          emissive="#1a1aff"
          emissiveIntensity={0.8}
        />
      </Sphere>

      {/* 24 Spokes */}
      {spokes.map((angle, i) => (
        <Box
          key={i}
          args={[0.05, 1.6, 0.05]}
          rotation={[0, 0, angle]}
        >
          <meshStandardMaterial
            color="#000080"
            emissive="#1a1aff"
            emissiveIntensity={0.7}
          />
        </Box>
      ))}
      
    </group>
  )
}


function FloatingOrb({ position, color, speed = 1, distort = 0.3, size = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
  size?: number
}) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingTorus({ position, color, speed = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
}) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 * speed
    }
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.8} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[0.8, 0.25, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
        />
      </Torus>
    </Float>
  )
}

function FloatingCube({ position, color, speed = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
}) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4 * speed
    }
  })

  return (
    <Float speed={speed * 0.6} rotationIntensity={0.6} floatIntensity={0.6}>
      <Box ref={meshRef} args={[0.6, 0.6, 0.6]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </Box>
    </Float>
  )
}

function ParticleRing({ color = "#7c3aed" }: { color?: string }) {
  const groupRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * Math.PI * 2
    const radius = 4
    return {
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * 0.3,
        Math.sin(angle) * radius
      ] as [number, number, number],
      scale: 0.05 + Math.random() * 0.05
    }
  }), [])

  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.scale, 8, 8]} position={particle.position}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  )
}


function SceneContent({ isDark }: { isDark: boolean }) {
  // Indian National Flag Colors
  // Saffron: #FF9933, White: #FFFFFF, Navy Blue: #000080, Green: #138808
  const colors = useMemo(() => ({
    saffron: isDark ? "#FFB366" : "#FF9933",
    green: isDark ? "#2ECC71" : "#138808",
    navyBlue: isDark ? "#4169E1" : "#000080",
    white: isDark ? "#F8F8FF" : "#FFFFFF",
    saffronLight: isDark ? "#FFD699" : "#FFAD5C",
    greenLight: isDark ? "#58D68D" : "#1FAA59",
  }), [isDark])

  return (
    <>
      <Environment preset={isDark ? "night" : "sunset"} />
      <ambientLight intensity={isDark ? 0.5 : 0.7} />
      <pointLight
        position={[12, 12, 8]}
        intensity={isDark ? 2.2 : 2.5}
        distance={40}
        decay={1.5}
        color={colors.saffron}
      />

      <pointLight
        position={[-12, -12, 8]}
        intensity={isDark ? 1.8 : 2.1}
        distance={40}
        decay={1.5}
        color={colors.green}
      />

      <pointLight
      position={[0, 8, 6]}
      intensity={isDark ? 0.9 : 1.1}
      distance={30}
      color={colors.navyBlue}
      />

      {/* Saffron orbs - top section */}
      <FloatingOrb position={[-4, 3, -2]} color={colors.saffron} speed={0.8} distort={0.4} size={1.2} />
      <FloatingOrb position={[3, 2.5, -3]} color={colors.saffronLight} speed={1.1} distort={0.3} size={0.7} />
      <FloatingOrb position={[0, 4, -4]} color={colors.saffron} speed={0.9} distort={0.35} size={0.5} />
      
      {/* Green orbs - bottom section */}
      <FloatingOrb position={[4, -2, -2]} color={colors.green} speed={1.2} distort={0.3} size={1} />
      <FloatingOrb position={[-3, -3, -3]} color={colors.greenLight} speed={0.9} distort={0.25} size={0.6} />
      <FloatingOrb position={[1, -2.5, -2]} color={colors.green} speed={1} distort={0.3} size={0.4} />
      
      {/* Navy Blue elements - center accents */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <AshokaChakra3D position={[0, 0, -3]} />
      </Float>


      
      {/* Decorative torus - tricolor effect */}
      <FloatingTorus position={[5, 1, -2]} color={colors.saffron} speed={0.7} />
      <FloatingTorus position={[-5, -1, -3]} color={colors.green} speed={0.9} />
      
      
      {/* Wireframe cubes */}
      <FloatingCube position={[2, -3, -2]} color={colors.saffron} speed={0.6} />
      <FloatingCube position={[-2, 3, -3]} color={colors.green} speed={0.8} />
      
     
    </>
  )
}

export default function Scene3D() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
