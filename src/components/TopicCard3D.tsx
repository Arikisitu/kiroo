import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getCardTexture } from '../lib/cardTexture';
import type { Topic } from '../types/topic';

interface TopicCard3DProps {
  topic: Topic;
  index: number;
  activeIndex: number;
  totalCards: number;
  onSelect: (index: number) => void;
  onOpenDetail: (topic: Topic) => void;
  onHoverCard?: (isActive: boolean | null) => void;
}

export const TopicCard3D: React.FC<TopicCard3DProps> = ({
  topic,
  index,
  activeIndex,
  onSelect,
  onOpenDetail,
  onHoverCard,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const isSelected = index === activeIndex;
  const offset = index - activeIndex;

  // Generate canvas texture for editorial cover
  const frontTexture = useMemo(() => {
    return getCardTexture(topic);
  }, [topic]);

  // Materials: front face with texture, edges and back with subtle paper grain
  const materials = useMemo(() => {
    const paperColor = topic.coverTheme?.paperColor || '#E9E4D8';
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(paperColor).multiplyScalar(0.9),
      roughness: 0.65,
      metalness: 0.05,
    });
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.55,
      metalness: 0.05,
    });
    const backMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(paperColor).multiplyScalar(0.95),
      roughness: 0.7,
      metalness: 0.02,
    });

    // Box order in Three.js: +X, -X, +Y, -Y, +Z (front), -Z (back)
    return [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontMaterial,
      backMaterial,
    ];
  }, [frontTexture, topic.coverTheme?.paperColor]);

  // Target coordinates
  const targetX = offset * 2.15;
  const targetY = isSelected ? 0.12 : -0.05;
  const targetZ = isSelected ? 0.75 : -Math.abs(offset) * 0.45;
  const targetRotY = isSelected ? 0 : -Math.sign(offset) * 0.32;
  const targetScale = isSelected ? 1.04 : Math.max(0.85, 1 - Math.abs(offset) * 0.06);

  // Smooth frame interpolation (damped motion system)
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const group = meshRef.current;

    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 10, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 10, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 10, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 10, delta);

    const currentScale = group.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 10, delta);
    group.scale.set(nextScale, nextScale, nextScale);
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isSelected) {
      onOpenDetail(topic);
    } else {
      onSelect(index);
    }
  };

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (onHoverCard) onHoverCard(isSelected);
  };

  const handlePointerOut = () => {
    if (onHoverCard) onHoverCard(null);
  };

  // Only render cards that are reasonably close to active card to preserve high performance
  if (Math.abs(offset) > 5) {
    return null;
  }

  return (
    <group
      ref={meshRef}
      position={[targetX, targetY, targetZ]}
      rotation={[0, targetRotY, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 3D Physical Card Body */}
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry args={[2.3, 3.3, 0.08]} />
      </mesh>

      {/* Subtle violet rim glow behind active card */}
      {isSelected && (
        <pointLight
          position={[0, 0, -0.2]}
          color="#9B8AFB"
          intensity={1.8}
          distance={2.8}
          decay={2}
        />
      )}
    </group>
  );
};
