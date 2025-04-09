import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingObject {
  mesh: THREE.Mesh;
  rotationSpeed: THREE.Vector3;
  floatSpeed: number;
  floatOffset: number;
  scale: number;
}

const FunkyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<FloatingObject[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Initializing Three.js scene...');

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
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create food items and clouds
    const objects: FloatingObject[] = [];
    
    // Food items with brighter colors
    const foodItems = [
      { geometry: new THREE.SphereGeometry(0.3, 32, 32), color: 0xff4444, scale: 1 }, // Apple
      { geometry: new THREE.BoxGeometry(0.4, 0.4, 0.4), color: 0x00c853, scale: 1 }, // Sandwich
      { geometry: new THREE.CylinderGeometry(0.2, 0.2, 0.4, 32), color: 0x8d4513, scale: 1 }, // Coffee cup
      { geometry: new THREE.TorusGeometry(0.3, 0.1, 16, 100), color: 0xffeb3b, scale: 1 }, // Donut
      { geometry: new THREE.ConeGeometry(0.2, 0.4, 32), color: 0xff9800, scale: 1 }, // Ice cream cone
      { geometry: new THREE.OctahedronGeometry(0.3, 0), color: 0xff4081, scale: 1 }, // Candy
      { geometry: new THREE.TetrahedronGeometry(0.3, 0), color: 0x4caf50, scale: 1 }, // Watermelon slice
      { geometry: new THREE.IcosahedronGeometry(0.3, 0), color: 0xff5722, scale: 1 }, // Orange
      { geometry: new THREE.DodecahedronGeometry(0.3, 0), color: 0x9c27b0, scale: 1 }, // Grape
      { geometry: new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32), color: 0xffd700, scale: 1 }, // Cookie
      { geometry: new THREE.BoxGeometry(0.3, 0.3, 0.3), color: 0x795548, scale: 1 }, // Chocolate
      { geometry: new THREE.SphereGeometry(0.2, 32, 32), color: 0xff69b4, scale: 1 }, // Strawberry
    ];

    // Cloud shapes with more contrast
    const createCloud = (position: THREE.Vector3, color: number) => {
      const cloudGroup = new THREE.Group();
      const cloudGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
        shininess: 100,
      });

      // Create main cloud body
      const positions = [
        { x: 0, y: 0, z: 0 },
        { x: 0.2, y: 0.1, z: 0 },
        { x: -0.2, y: 0.1, z: 0 },
        { x: 0.1, y: -0.1, z: 0 },
        { x: -0.1, y: -0.1, z: 0 },
      ];

      positions.forEach(pos => {
        const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial);
        sphere.position.set(pos.x, pos.y, pos.z);
        cloudGroup.add(sphere);
      });

      cloudGroup.position.copy(position);
      return cloudGroup;
    };

    // Create custom food shapes
    const createPizza = (position: THREE.Vector3) => {
      const pizzaGroup = new THREE.Group();
      
      // Pizza base
      const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
      const baseMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 1,
        shininess: 100,
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      pizzaGroup.add(base);

      // Toppings
      const toppings = [
        { color: 0xff0000, position: { x: 0.2, y: 0.1, z: 0 } }, // Tomato
        { color: 0x00ff00, position: { x: -0.2, y: 0.1, z: 0 } }, // Pepper
        { color: 0xffffff, position: { x: 0, y: 0.1, z: 0.2 } }, // Mushroom
        { color: 0x8b4513, position: { x: 0.1, y: 0.1, z: -0.2 } }, // Olive
      ];

      toppings.forEach(topping => {
        const toppingGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const toppingMaterial = new THREE.MeshPhongMaterial({
          color: topping.color,
          transparent: true,
          opacity: 1,
          shininess: 100,
        });
        const toppingMesh = new THREE.Mesh(toppingGeometry, toppingMaterial);
        toppingMesh.position.set(topping.position.x, topping.position.y, topping.position.z);
        pizzaGroup.add(toppingMesh);
      });

      pizzaGroup.position.copy(position);
      return pizzaGroup;
    };

    const createBurger = (position: THREE.Vector3) => {
      const burgerGroup = new THREE.Group();
      
      // Bun top
      const topBunGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
      const topBunMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 1,
        shininess: 100,
      });
      const topBun = new THREE.Mesh(topBunGeometry, topBunMaterial);
      topBun.position.y = 0.2;
      burgerGroup.add(topBun);

      // Patty
      const pattyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
      const pattyMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b4513,
        transparent: true,
        opacity: 1,
        shininess: 100,
      });
      const patty = new THREE.Mesh(pattyGeometry, pattyMaterial);
      patty.position.y = 0.1;
      burgerGroup.add(patty);

      // Lettuce
      const lettuceGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
      const lettuceMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 1,
        shininess: 100,
      });
      const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
      lettuce.position.y = 0.05;
      burgerGroup.add(lettuce);

      // Bun bottom
      const bottomBunGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
      const bottomBunMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 1,
        shininess: 100,
      });
      const bottomBun = new THREE.Mesh(bottomBunGeometry, bottomBunMaterial);
      bottomBun.position.y = 0;
      burgerGroup.add(bottomBun);

      burgerGroup.position.copy(position);
      return burgerGroup;
    };

    // Add food items
    for (let i = 0; i < 12; i++) {
      const food = foodItems[i % foodItems.length];
      const material = new THREE.MeshPhongMaterial({
        color: food.color,
        transparent: true,
        opacity: 1,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(food.geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      mesh.scale.set(food.scale, food.scale, food.scale);
      
      scene.add(mesh);
      objects.push({
        mesh,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2,
        scale: food.scale,
      });
    }

    // Add custom food items
    const customFoods = [
      { create: createPizza, position: new THREE.Vector3(-3, 2, -2) },
      { create: createBurger, position: new THREE.Vector3(3, -2, -2) },
    ];

    customFoods.forEach(food => {
      const mesh = food.create(food.position);
      scene.add(mesh);
      objects.push({
        mesh: mesh as unknown as THREE.Mesh,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2,
        scale: 1,
      });
    });

    // Add clouds with more contrast
    const cloudColors = [0xffffff, 0xf0f0f0, 0xe0e0e0];
    for (let i = 0; i < 5; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 3
      );
      const cloud = createCloud(position, cloudColors[i % cloudColors.length]);
      scene.add(cloud);
      objects.push({
        mesh: cloud as unknown as THREE.Mesh,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        floatSpeed: 0.0005 + Math.random() * 0.001,
        floatOffset: Math.random() * Math.PI * 2,
        scale: 1,
      });
    }

    objectsRef.current = objects;

    // Add lights with increased intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add colored point lights with increased intensity
    const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4];
    colors.forEach((color, index) => {
      const light = new THREE.PointLight(color, 2.5, 10);
      light.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      scene.add(light);
    });

    console.log('Scene setup complete, starting animation...');

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update objects
      objectsRef.current.forEach((obj) => {
        // Rotate
        obj.mesh.rotation.x += obj.rotationSpeed.x;
        obj.mesh.rotation.y += obj.rotationSpeed.y;
        obj.mesh.rotation.z += obj.rotationSpeed.z;

        // Float
        obj.mesh.position.y += Math.sin(time + obj.floatOffset) * obj.floatSpeed;

        // Mouse interaction
        const dx = mousePositionRef.current.x * 5 - obj.mesh.position.x;
        const dy = mousePositionRef.current.y * 5 - obj.mesh.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
          obj.mesh.position.x += dx * 0.01;
          obj.mesh.position.y += dy * 0.01;
        }
      });

      // Rotate camera slowly
      camera.position.x = Math.sin(time * 0.2) * 0.5;
      camera.position.y = Math.cos(time * 0.2) * 0.5;

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
      window.removeEventListener('mousemove', handleMouseMove);
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
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(45deg, #f0f4f8, #e6eef7, #f0f4f8)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    />
  );
};

export default FunkyBackground; 