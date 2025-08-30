import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'

export default function GlassRefractionSphere() {
  const meshRef = React.useRef<THREE.Mesh>(null!)
  const { scene, gl } = useThree()

  // CubeCamera для отражения/преломления
  const cubeRenderTarget = React.useMemo(() => new THREE.WebGLCubeRenderTarget(3, { format: THREE.RGBAFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter }), [])
  const cubeCamera = React.useMemo(() => new THREE.CubeCamera(1, 10, cubeRenderTarget), [cubeRenderTarget])

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.visible = false
    cubeCamera.update(gl, scene)
    meshRef.current.visible = true
  })

  return (
    <>
      <primitive object={cubeCamera} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          envMap={cubeRenderTarget.texture}
          envMapIntensity={1}
          transmission={1}      // прозрачность
          thickness={5.5}       // толщина преломления
          roughness={0}
          metalness={0}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={2.0}             // показатель преломления для сильного эффекта
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}