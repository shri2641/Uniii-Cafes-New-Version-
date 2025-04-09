import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FoodItem {
  mesh: THREE.Mesh;
  rotationSpeed: number;
  floatSpeed: number;
  floatOffset: number;
}

const FloatingFoodScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const foodItemsRef = useRef<FoodItem[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create food items
    const foodItems: FoodItem[] = [];
    const foodShapes = [
      { geometry: new THREE.SphereGeometry(0.3, 32, 32), color: 0xff6b6b }, // Apple
      { geometry: new THREE.BoxGeometry(0.4, 0.4, 0.4), color: 0x4caf50 }, // Sandwich
      { geometry: new THREE.CylinderGeometry(0.2, 0.2, 0.4, 32), color: 0x795548 }, // Coffee cup
      { geometry: new THREE.TorusGeometry(0.3, 0.1, 16, 100), color: 0xffd700 }, // Donut
    ];

    for (let i = 0; i < 8; i++) {
      const shape = foodShapes[i % foodShapes.length];
      const material = new THREE.MeshPhongMaterial({ color: shape.color });
      const mesh = new THREE.Mesh(shape.geometry, material);
      
      // Random position
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 5;

      scene.add(mesh);
      foodItems.push({
        mesh,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    foodItemsRef.current = foodItems;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      foodItemsRef.current.forEach((item) => {
        // Rotate
        item.mesh.rotation.x += item.rotationSpeed;
        item.mesh.rotation.y += item.rotationSpeed;

        // Float
        item.mesh.position.y += Math.sin(time + item.floatOffset) * item.floatSpeed;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default FloatingFoodScene; 