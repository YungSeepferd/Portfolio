import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { useThree, useFrame } from '@react-three/fiber';
import { Line, Trail, Html, Torus } from '@react-three/drei';
import * as THREE from 'three';

import { useSceneState } from '../SceneContext';
import { getDynamicColor } from '../utils/sceneThemeUtils';
import { SHAPE_TYPES } from '../constants';

/**
 * FlowFieldScene — “light-painting ribbons”
 *
 * Interaction
 * - Move mouse: injects a subtle directional wind + color bias
 * - Click/drag: spawns a temporary vortex (attract); hold Shift while dragging to repel
 * - Double click (or press "Enter"): call onCycle() to go 1->2->3->1
 *
 * Visual
 * - Hundreds of short ribbons (polylines) advected by curl noise
 * - Theme-driven colors (getDynamicColor) + emissive boost with excitement
 * - Direction-based hue nudge (like your other scenes)
 * - Idle: slow flowing field; Active: expressive “painting”
 */

const VORTEX_LIFETIME = 1.2;           // seconds
const VORTEX_STRENGTH = 2.5;           // base attract/repel
const RIBBON_LEN = 20;                  // points per ribbon
const NOISE_SCALE = 0.35;               // spatial scale of curl field
const BASE_SPEED = 0.35;                // idle drift
const DRAW_SPEED_MULT = 1.25;           // extra speed while interacting
const NEAR_MOUSE_BOOST_RADIUS = 1.6;    // distance to boost color/width
const DIRECTION_EMISSIVE_BOOST = 0.35;

function FlowFieldScene({ onCycle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  const { size, viewport } = useThree();
  const { state } = useSceneState(); // expects easterEggActive, directionIntensity, etc.

  const easterEggActive = state?.easterEggActive ?? false;
  const directionIntensityRef = state?.directionIntensity ?? { current: 0 };
  const isInteractionEnabled = state?.isInteractionEnabled ?? true;

  // Responsive ribbon count
  const RIBBON_COUNT = isMobile ? 80 : 160;

  // Camera-space drawing plane
  const planeNormal = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const plane = useMemo(() => new THREE.Plane(planeNormal, 0), [planeNormal]);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseNdc = useRef(new THREE.Vector2());
  const mouseWorld = useRef(new THREE.Vector3());
  const pointerVel = useRef(new THREE.Vector2(0, 0));
  const lastPointer = useRef(new THREE.Vector2(0, 0));
  const isPointerDown = useRef(false);
  const shiftKey = useRef(false);

  // Vortices (attractors/repulsors) from clicks
  const vortices = useRef([]);

  // Ribbons data (positions arrays + energies)
  const ribbons = useRef([]);
  const colorsCache = useRef({
    main: new THREE.Color(),
    emissive: new THREE.Color(),
  });

  // Helper: world intersection with Z=0 plane
  const pointerToWorld = useCallback((event) => {
    const { camera } = event;
    mouseNdc.current.set(
      (event.clientX / size.width) * 2 - 1,
      -(event.clientY / size.height) * 2 + 1
    );
    raycaster.setFromCamera(mouseNdc.current, camera);
    const hit = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, hit);
    mouseWorld.current.copy(hit);
  }, [plane, raycaster, size.width, size.height]);

  // Simple curl-ish noise (cheap pseudo curl using finite differences)
  const curlAt = useCallback((p, t) => {
    // Use a few trig mixes — cheap and smooth enough for a visual field
    const s = NOISE_SCALE;
    const x = p.x * s, y = p.y * s, z = p.z * s;
    const tt = t * 0.15;

    // Scalar fields
    const n1 = Math.sin(x + tt) * Math.cos(y * 1.3 - tt) * Math.sin(z * 0.7 + tt);
    const n2 = Math.cos(y + tt * 0.8) * Math.sin(z * 1.7 - tt * 1.2) * Math.cos(x * 1.2 + tt);

    // Pseudo curl = perpendicular gradients
    const cx = (n2 - n1 * 0.7);
    const cy = (n1 - n2 * 0.7);
    const cz = Math.sin(x * 0.6 + y * 0.6 + tt) * 0.3;

    return new THREE.Vector3(cx, cy, cz).multiplyScalar(0.8);
  }, []);

  // Init ribbons
  useEffect(() => {
    const randInBox = () => {
      // Spawn in a calm rectangle around origin
      const w = Math.min(viewport.width * 0.7, 8);
      const h = Math.min(viewport.height * 0.7, 5);
      return new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(w),
        THREE.MathUtils.randFloatSpread(h),
        0
      );
    };

    ribbons.current = new Array(RIBBON_COUNT).fill(0).map(() => {
      const pts = new Array(RIBBON_LEN).fill(0).map(() => randInBox());
      return {
        points: pts,                         // array of Vector3
        velocity: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(0.3),
          THREE.MathUtils.randFloatSpread(0.3),
          0
        ),
        energy: Math.random() * 0.25 + 0.15, // influences width/emissive
        width: 0.02,
        hovered: false,
      };
    });

    // Clear vortices
    vortices.current = [];
  }, [RIBBON_COUNT, viewport.width, viewport.height]);

  // Pointer handlers (attach to the R3F root via onPointer* props on <group>)
  const onPointerMove = useCallback((e) => {
    if (!isInteractionEnabled) return;
    pointerToWorld(e);
    // Track velocity in NDC for direction intensity nudging (already handled in state)
    const nx = e.uv?.x ?? e.pointer.x;
    const ny = e.uv?.y ?? e.pointer.y;
    if (lastPointer.current.x !== 0 || lastPointer.current.y !== 0) {
      pointerVel.current.set(nx - lastPointer.current.x, ny - lastPointer.current.y);
    }
    lastPointer.current.set(nx, ny);
  }, [isInteractionEnabled, pointerToWorld]);

  const onPointerDown = useCallback((e) => {
    if (!isInteractionEnabled) return;
    isPointerDown.current = true;
    pointerToWorld(e);
    // Spawn a vortex at mouse world position
    vortices.current.push({
      pos: mouseWorld.current.clone(),
      strength: shiftKey.current ? -VORTEX_STRENGTH : VORTEX_STRENGTH,
      age: 0,
    });
  }, [isInteractionEnabled, pointerToWorld]);

  const onPointerUp = useCallback(() => {
    isPointerDown.current = false;
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Shift') shiftKey.current = true;
      if (e.key === 'Enter' && typeof onCycle === 'function') onCycle();
    };
    const onKeyUp = (e) => {
      if (e.key === 'Shift') shiftKey.current = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onCycle]);

  // Main animation loop
  const timeRef = useRef(0);
  useFrame((_, dt) => {
    timeRef.current += dt;
    const t = timeRef.current;

    // Age/decay vortices
    for (let i = vortices.current.length - 1; i >= 0; i--) {
      const v = vortices.current[i];
      v.age += dt;
      // fade strength
      v.strength *= 0.98;
      if (v.age > VORTEX_LIFETIME) vortices.current.splice(i, 1);
    }

    // Update ribbons
    const dirIntensity = directionIntensityRef.current || 0;
    const hasPointer = !Number.isNaN(mouseWorld.current.x);

    ribbons.current.forEach((r) => {
      const head = r.points[0];

      // Base curl field
      const curl = curlAt(head, t);

      // Pointer wind (weak, directional)
      if (hasPointer) {
        const toMouse = mouseWorld.current.clone().sub(head);
        const dist = toMouse.length() + 1e-5;
        const pull = toMouse.multiplyScalar(0.15 / Math.max(dist, 0.35));
        curl.add(pull);
      }

      // Vortex forces
      for (const v of vortices.current) {
        const d = head.clone().sub(v.pos);
        const L = Math.max(d.length(), 0.001);
        // Swirl around the vortex center + radial push/pull
        const tangent = new THREE.Vector3(-d.y, d.x, 0).normalize().multiplyScalar(v.strength * 0.4 / L);
        const radial = d.normalize().multiplyScalar(v.strength * -0.25 / (L * L + 0.25));
        curl.add(tangent).add(radial);
      }

      // Idle speed + interaction boost
      const speed = BASE_SPEED * (1 + (isPointerDown.current ? (0.5 + dirIntensity * 0.8) : 0));
      r.velocity.lerp(curl.multiplyScalar(speed * (isPointerDown.current ? DRAW_SPEED_MULT : 1)), 0.35);

      // Shift ribbon: move head forward, drag the rest
      for (let i = r.points.length - 1; i > 0; i--) {
        r.points[i].copy(r.points[i - 1]);
      }
      head.add(r.velocity);

      // Slight wrap-around to keep them near center
      const wrapW = Math.max(viewport.width, 10) * 0.6;
      const wrapH = Math.max(viewport.height, 6) * 0.6;
      if (head.x > wrapW) head.x = -wrapW;
      if (head.x < -wrapW) head.x = wrapW;
      if (head.y > wrapH) head.y = -wrapH;
      if (head.y < -wrapH) head.y = wrapH;

      // Energy update (proximity + motion)
      const nearMouse = hasPointer ? head.distanceTo(mouseWorld.current) < NEAR_MOUSE_BOOST_RADIUS : false;
      const targetEnergy = Math.min(
        1.0,
        (nearMouse ? 0.85 : 0.25) + dirIntensity * 0.6 + (isPointerDown.current ? 0.2 : 0)
      );
      r.energy += (targetEnergy - r.energy) * 0.08;

      // Width easing
      const baseWidth = isMobile ? 0.008 : 0.012;
      r.width += ((baseWidth + r.energy * 0.03) - r.width) * 0.15;
    });
  });

  // Render
  const clockRef = useRef(new THREE.Clock());

  return (
    <group
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onDoubleClick={() => typeof onCycle === 'function' && onCycle()}
    >
      {/* Subtle hint */}
      <Html center transform sprite style={{ pointerEvents: 'none' }}>
        <div style={{
          fontSize: isMobile ? 10 : 12,
          opacity: 0.6,
          userSelect: 'none',
          padding: '4px 8px',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(2px)',
        }}>
          Drag to paint. Shift = repel. Double-click to next scene.
        </div>
      </Html>

      {/* Pointer comet trail */}
      {isInteractionEnabled && (
        <Trail
          width={isMobile ? 3 : 5}
          color={'white'}
          length={14}
          decay={0.4}
          attenuation={(w) => w * 0.75}
        >
          <mesh position={mouseWorld.current} />
        </Trail>
      )}

      {/* Ribbons */}
      {ribbons.current.map((r, i) => {
        // Theme-driven dynamic colors (match other scenes)
        const dynamic = getDynamicColor(
          theme,
          clockRef.current.getElapsedTime() + i * 0.05,
          r.energy,
          SHAPE_TYPES.TORUS, // use one of your existing shape keys for consistent palette
          false
        );
        const colorMain = colorsCache.current.main.copy(dynamic.main);
        const colorEm = colorsCache.current.emissive.copy(dynamic.emissive);

        // Direction-based hue/emissive nudge (cohesion with other scenes)
        const dir = directionIntensityRef.current || 0;
        if (dir > 0.05) {
          const hueShift = (0.6 * dir) % 1.0;
          const nudged = new THREE.Color().setHSL(hueShift, 0.8, 0.55);
          colorMain.lerp(nudged, dir * 0.35);
          colorEm.lerp(nudged, dir * 0.25);
        }

        return (
          <Line
            key={i}
            points={r.points}
            color={colorMain}
            lineWidth={r.width}
            transparent
            opacity={0.9}
            depthWrite={false}
            dashed={false}
            onPointerOver={() => (r.hovered = true)}
            onPointerOut={() => (r.hovered = false)}
          >
            {/* Extra emissive “glow” pass */}
            <meshStandardMaterial
              transparent
              opacity={0.25 + r.energy * 0.25}
              emissive={colorEm}
              emissiveIntensity={0.2 + r.energy * (DIRECTION_EMISSIVE_BOOST + (easterEggActive ? 0.3 : 0))}
              metalness={0.1}
              roughness={0.7}
            />
          </Line>
        );
      })}
    </group>
  );
}

export default FlowFieldScene;
