"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Effect = "default" | "spark" | "wave" | "vortex";
type AdditionalEffect = "explode" | "scatter" | "implode" | "spiral" | "morph";

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentEffect, setCurrentEffect] = useState<Effect>("default");
  const [activeEffects, setActiveEffects] = useState<{
    [key in AdditionalEffect]?: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    geometry: THREE.BufferGeometry;
    originalPositions: Float32Array;
    velocities: Float32Array;
    phases: Float32Array;
    intersectionPoint: THREE.Vector3 | null;
    rotationX: number;
    rotationY: number;
    isDragging: boolean;
    previousMouseX: number;
    previousMouseY: number;
    particleCount: number;
  } | null>(null);

  const currentEffectRef = useRef<Effect>(currentEffect);
  const activeEffectsRef =
    useRef<{ [key in AdditionalEffect]?: boolean }>(activeEffects);

  useEffect(() => {
    currentEffectRef.current = currentEffect;
  }, [currentEffect]);

  useEffect(() => {
    activeEffectsRef.current = activeEffects;
  }, [activeEffects]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(2000, 2000);
    renderer.setClearColor(0xf4f4f0);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    // Generate 45-degree angled grid
    const gridSize = 100;
    const spacing = 0.1; // Space between particles
    const positions = [];
    const colors = [];

    // Create grid at 45 degrees by rotating coordinates
    const angle = Math.PI / 4; // 45 degrees
    const cos45 = Math.cos(angle);
    const sin45 = Math.sin(angle);

    for (let i = -gridSize; i <= gridSize; i++) {
      for (let j = -gridSize; j <= gridSize; j++) {
        // Original grid position
        const x = i * spacing;
        const y = j * spacing;

        // Rotate by 45 degrees
        const rotatedX = x * cos45 - y * sin45;
        const rotatedY = x * sin45 + y * cos45;

        positions.push(rotatedX, rotatedY, 0);
        colors.push(0, 0, 0); // Black particles
      }
    }

    const numParticles = positions.length / 3;
    const positionsArray = new Float32Array(positions);
    const colorsArray = new Float32Array(colors);
    const originalPositions = positionsArray.slice();
    const phases = new Float32Array(numParticles);
    const velocities = new Float32Array(numParticles * 3);

    for (let j = 0; j < numParticles; j++) {
      phases[j] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsArray, 3),
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.set(0, 0, 5);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      points,
      geometry,
      originalPositions,
      velocities,
      phases,
      intersectionPoint: null,
      rotationX: 0,
      rotationY: 0,
      isDragging: false,
      previousMouseX: 0,
      previousMouseY: 0,
      particleCount: numParticles,
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      mouse.x = (offsetX / canvas.clientWidth) * 2 - 1;
      mouse.y = -(offsetY / canvas.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersect = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, intersect)) {
        sceneRef.current.intersectionPoint = intersect;
      }
    };

    const handleMouseLeave = () => {
      if (sceneRef.current) {
        sceneRef.current.intersectionPoint = null;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationId: number;
    const animate = (timestamp: number) => {
      if (!sceneRef.current) return;
      const time = timestamp * 0.001;

      const {
        geometry,
        points,
        originalPositions,
        velocities,
        phases,
        intersectionPoint,
        rotationX,
        rotationY,
        particleCount,
      } = sceneRef.current;

      const positionAttribute = geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      const colorAttribute = geometry.getAttribute(
        "color",
      ) as THREE.BufferAttribute;

      const radiusSwirl = 0.01;
      const angularSpeed = 1;
      const effectRadius = 0.5;

      let repelStrength = 0;
      if (currentEffectRef.current === "default") {
        repelStrength = 0.05;
      } else if (currentEffectRef.current === "spark") {
        repelStrength = 0.5;
      }

      const attractStrength = 0.05;
      const damping = 0.95;

      points.rotation.y += (rotationY - points.rotation.y) * 0.1;
      points.rotation.x += (rotationX - points.rotation.x) * 0.1;

      const euler = new THREE.Euler(
        points.rotation.x,
        points.rotation.y,
        points.rotation.z,
        "XYZ",
      );
      const inverseQuaternion = new THREE.Quaternion()
        .setFromEuler(euler)
        .invert();

      let localIntersection: THREE.Vector3 | null = null;
      if (intersectionPoint) {
        localIntersection = intersectionPoint
          .clone()
          .applyQuaternion(inverseQuaternion);
      }

      const additionalFactors: { [key in AdditionalEffect]?: number } = {};
      for (const key in activeEffectsRef.current) {
        additionalFactors[key as AdditionalEffect] = activeEffectsRef.current[
          key as AdditionalEffect
        ]
          ? 1
          : 0;
      }

      for (let j = 0; j < particleCount; j++) {
        const idx = j * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        const theta = angularSpeed * time + phases[j];
        const swirlDx = radiusSwirl * Math.cos(theta);
        const swirlDy = radiusSwirl * Math.sin(theta);

        const targetX = ox + swirlDx;
        const targetY = oy + swirlDy;
        const targetZ = oz;

        let px = positionAttribute.getX(j);
        let py = positionAttribute.getY(j);
        let pz = positionAttribute.getZ(j);

        let vx = velocities[idx];
        let vy = velocities[idx + 1];
        let vz = velocities[idx + 2];

        const explodeFactor = additionalFactors.explode || 0;
        const scatterFactor = additionalFactors.scatter || 0;
        const implodeFactor = additionalFactors.implode || 0;
        const spiralFactor = additionalFactors.spiral || 0;
        const morphFactor = additionalFactors.morph || 0;

        const cx = px - 0;
        const cy = py - 0;
        const cz = pz - 0;
        const cdistSq = cx * cx + cy * cy + cz * cz;
        const cdist = Math.sqrt(cdistSq);

        if (explodeFactor > 0 && cdist > 0.001) {
          vx += (cx / cdist) * 0.1 * explodeFactor;
          vy += (cy / cdist) * 0.1 * explodeFactor;
          vz += (cz / cdist) * 0.1 * explodeFactor;
        }

        if (scatterFactor > 0) {
          vx += (Math.random() - 0.5) * 0.05 * scatterFactor;
          vy += (Math.random() - 0.5) * 0.05 * scatterFactor;
          vz += (Math.random() - 0.5) * 0.05 * scatterFactor;
        }

        if (implodeFactor > 0 && cdist > 0.001) {
          vx -= (cx / cdist) * 0.1 * implodeFactor;
          vy -= (cy / cdist) * 0.1 * implodeFactor;
          vz -= (cz / cdist) * 0.1 * implodeFactor;
        }

        if (spiralFactor > 0 && cdist > 0.05) {
          const vortexStrength = 0.15 * spiralFactor;
          const tangentX = -cy;
          const tangentY = cx;
          const tangentLength = Math.sqrt(
            tangentX * tangentX + tangentY * tangentY,
          );
          if (tangentLength > 0.001) {
            vx += (tangentX / tangentLength) * vortexStrength;
            vy += (tangentY / tangentLength) * vortexStrength;
          }
          const pullStrength = vortexStrength * 0.3;
          vx -= (cx / cdist) * pullStrength;
          vy -= (cy / cdist) * pullStrength;
        }

        if (morphFactor > 0) {
          const angle = Math.atan2(py, px) + time * 2;
          const radius = Math.sqrt(px * px + py * py + pz * pz);
          const offsetX =
            Math.cos(angle) * Math.sin(radius * 2) * 0.2 * morphFactor;
          const offsetY = Math.sin(angle * 1.5) * 0.15 * morphFactor;
          vx += offsetX;
          vy += offsetY;
        }

        if (localIntersection) {
          const dx = px - localIntersection.x;
          const dy = py - localIntersection.y;
          const dz = pz - localIntersection.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          if (currentEffectRef.current === "wave") {
            if (distSq < effectRadius * effectRadius) {
              const waveStrength = 0.3;
              const waveFreq = 15;
              const wavePhase = time * 8 - dist * waveFreq;
              const waveForce =
                Math.sin(wavePhase) * waveStrength * (1 - dist / effectRadius);
              if (dist > 0.001) {
                vx += (dx / dist) * waveForce;
                vy += (dy / dist) * waveForce;
                vz += waveForce * 0.5;
              }
            }
          } else if (currentEffectRef.current === "vortex") {
            if (distSq < effectRadius * effectRadius && dist > 0.05) {
              const vortexStrength = 0.15;
              const spiralForce = vortexStrength * (1 - dist / effectRadius);
              const tangentX = -dy;
              const tangentY = dx;
              const tangentLength = Math.sqrt(
                tangentX * tangentX + tangentY * tangentY,
              );
              if (tangentLength > 0.001) {
                vx += (tangentX / tangentLength) * spiralForce;
                vy += (tangentY / tangentLength) * spiralForce;
              }
              const pullStrength = spiralForce * 0.3;
              vx -= (dx / dist) * pullStrength;
              vy -= (dy / dist) * pullStrength;
            }
          } else if (
            currentEffectRef.current === "default" ||
            currentEffectRef.current === "spark"
          ) {
            if (distSq < effectRadius * effectRadius && distSq > 0.0001) {
              const force = (1 - dist / effectRadius) * repelStrength;
              vx += (dx / dist) * force;
              vy += (dy / dist) * force;
              vz += (dz / dist) * force;
            }
          }
        }

        const attractDx = targetX - px;
        const attractDy = targetY - py;
        const attractDz = targetZ - pz;
        vx += attractDx * attractStrength;
        vy += attractDy * attractStrength;
        vz += attractDz * attractStrength;

        vx *= damping;
        vy *= damping;
        vz *= damping;

        px += vx;
        py += vy;
        pz += vz;

        positionAttribute.setXYZ(j, px, py, pz);
        velocities[idx] = vx;
        velocities[idx + 1] = vy;
        velocities[idx + 2] = vz;

        const r = 0,
          g = 0,
          b = 0;
        colorAttribute.setXYZ(j, r, g, b);
      }

      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!sceneRef.current) return;
    sceneRef.current.isDragging = true;
    sceneRef.current.previousMouseX = event.clientX;
    sceneRef.current.previousMouseY = event.clientY;
  };

  const handleMouseMoveDrag = (event: React.MouseEvent) => {
    if (!sceneRef.current || !sceneRef.current.isDragging) return;
    const deltaX = event.clientX - sceneRef.current.previousMouseX;
    const deltaY = event.clientY - sceneRef.current.previousMouseY;
    sceneRef.current.rotationY -= deltaX * 0.005;
    sceneRef.current.rotationX -= deltaY * 0.005;
    sceneRef.current.previousMouseX = event.clientX;
    sceneRef.current.previousMouseY = event.clientY;
  };

  const handleMouseUp = () => {
    if (sceneRef.current) {
      sceneRef.current.isDragging = false;
    }
  };

  return (
    <div className="bg-[#F4F4F0] max-w-full h-full">
      <canvas
        ref={canvasRef}
        width={1600}
        height={800}
        className="w-full h-full block bg-[#F4F4F0]"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
