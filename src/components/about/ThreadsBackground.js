import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@mui/material';
import * as THREE from 'three';

/**
 * OrbBackground
 * 
 * Three.js-based animated orb/lava lamp effect for the WhoAmI profile card.
 * Features a 3D sphere with iridescent material, proper lighting, and hover effects.
 * 
 * Inspired by React Bits Orb but optimized for profile card use.
 */

const Orb = ({ color, isActive, mousePos }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const lightRef = useRef();

  // Vertex shader with distortion
  const vertexShader = `
    uniform float uTime;
    uniform float uIntensity;
    uniform vec2 uMouse;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    // Noise function for organic distortion
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      
      // Organic distortion
      float noise = snoise(pos * 2.0 + uTime * 0.3);
      float distortion = noise * 0.15 * uIntensity;
      
      // Mouse influence
      vec2 mouseInfluence = (uMouse - 0.5) * 2.0;
      distortion += length(mouseInfluence) * 0.1 * uIntensity;
      
      pos += normal * distortion;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader with iridescent material
  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      // Fresnel effect for glass-like appearance
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
      
      // Iridescent color shift
      float iridescence = sin(vUv.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
      vec3 iridColor = mix(uColor, uColor * 1.5, iridescence);
      
      // Rim lighting
      float rim = pow(1.0 - dot(viewDirection, vNormal), 2.0);
      vec3 rimColor = vec3(1.0, 0.8, 0.6) * rim * 0.5;
      
      // Combine effects
      vec3 finalColor = iridColor * (0.3 + fresnel * 0.7) + rimColor;
      finalColor *= (1.0 + uIntensity * 0.5);
      
      // Soft alpha for blending
      float alpha = 0.6 + fresnel * 0.4;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [color]
  );

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Update time
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth intensity transition
      const targetIntensity = isActive ? 1.5 : 0.5;
      materialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uIntensity.value,
        targetIntensity,
        0.05
      );
      
      // Update mouse position
      if (mousePos) {
        materialRef.current.uniforms.uMouse.value.lerp(
          new THREE.Vector2(mousePos.x, mousePos.y),
          0.1
        );
      }
      
      // Rotate orb
      meshRef.current.rotation.y += isActive ? 0.01 : 0.003;
      meshRef.current.rotation.x += isActive ? 0.005 : 0.002;
    }
    
    // Animate light
    if (lightRef.current) {
      const intensity = isActive ? 2 : 0.8;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        intensity,
        0.05
      );
    }
  });

  return (
    <group>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Point light that follows the orb */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 2]}
        color={color}
        intensity={0.8}
        distance={5}
      />
      
      {/* Main orb mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

const OrbBackground = ({ 
  color = '#ff9800',
  isActive = false,
  enableMouseInteraction = false 
}) => {
  const theme = useTheme();
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef();

  // Use theme color
  const threeColor = useMemo(() => {
    return color || theme.palette.accent.main;
  }, [color, theme]);

  const handleMouseMove = React.useCallback((e) => {
    if (!enableMouseInteraction || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
  }, [enableMouseInteraction]);

  const handleMouseLeave = React.useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: enableMouseInteraction ? 'auto' : 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Orb 
          color={threeColor}
          isActive={isActive}
          mousePos={mousePos}
        />
      </Canvas>
    </div>
  );
};

export default OrbBackground;
