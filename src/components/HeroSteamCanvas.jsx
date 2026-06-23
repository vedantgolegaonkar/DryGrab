import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const HeroSteamCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer, scene, camera, animationId;
    let handleMouseMove, handleResize;
    let bowlGroup;

    try {
      // Dimensions (safeguard zero height)
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || 800;

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.set(0, 0.5, 5);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Reset container and append to prevent duplicates
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      // Light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x9ed660, 1.5, 10);
      pointLight.position.set(2, 3, 2);
      scene.add(pointLight);

      const softGreenLight = new THREE.PointLight(0x2f6f4e, 2, 10);
      softGreenLight.position.set(-2, -1, 1);
      scene.add(softGreenLight);

      // 1. Stylized Slate Bowl
      bowlGroup = new THREE.Group();
      bowlGroup.position.set(0, -2, 0);
      scene.add(bowlGroup);

      const bowlGeo = new THREE.CylinderGeometry(2, 1.3, 1, 32);
      const bowlMat = new THREE.MeshStandardMaterial({
        color: 0x1a120b,
        roughness: 0.8,
        metalness: 0.2,
        flatShading: false
      });
      const bowl = new THREE.Mesh(bowlGeo, bowlMat);
      bowlGroup.add(bowl);

      // Rim of the bowl
      const rimGeo = new THREE.TorusGeometry(2, 0.08, 16, 100);
      rimGeo.rotateX(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, bowlMat);
      rim.position.y = 0.5;
      bowlGroup.add(rim);

      // Dynamic Steam Particle Texture
      const createSteamTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        gradient.addColorStop(0.2, 'rgba(240, 240, 240, 0.15)');
        gradient.addColorStop(0.5, 'rgba(200, 220, 210, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        return new THREE.CanvasTexture(canvas);
      };

      const steamTexture = createSteamTexture();

      // 2. Steam Particles Setup
      const particleCount = 180;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const ages = new Float32Array(particleCount);
      const lifespans = new Float32Array(particleCount);
      const speeds = new Float32Array(particleCount);
      const offsets = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2.5;
        positions[i * 3 + 1] = -1.5 + Math.random() * 0.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;

        ages[i] = Math.random() * 5;
        lifespans[i] = 4 + Math.random() * 3;
        speeds[i] = 0.4 + Math.random() * 0.5;
        offsets[i] = Math.random() * Math.PI * 2;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.8,
        map: steamTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xE2ECE9
      });

      const steamParticles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(steamParticles);

      // Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Rotate bowl
        bowlGroup.rotation.y = time * 0.05;

        // Update particles
        for (let i = 0; i < particleCount; i++) {
          ages[i] += delta;

          if (ages[i] >= lifespans[i]) {
            ages[i] = 0;
            positions[i * 3] = (Math.random() - 0.5) * 2.2;
            positions[i * 3 + 1] = -1.5 + Math.random() * 0.3;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
            speeds[i] = 0.4 + Math.random() * 0.4;
          } else {
            positions[i * 3 + 1] += speeds[i] * delta;
            positions[i * 3] += Math.sin(time + offsets[i]) * 0.2 * delta;
            positions[i * 3 + 2] += Math.cos(time + offsets[i]) * 0.2 * delta;
          }
        }

        const posAttr = particleGeometry.getAttribute('position');
        if (posAttr) posAttr.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      // Mouse Movement Interaction
      handleMouseMove = (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        gsap.to(camera.position, {
          x: mouseX * 2,
          y: 0.5 - mouseY * 1.5,
          duration: 2,
          ease: 'power2.out'
        });
        
        gsap.to(bowlGroup.rotation, {
          x: mouseY * 0.2,
          z: -mouseX * 0.2,
          duration: 2,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Resize Handler
      handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

    } catch (error) {
      console.warn("HeroSteamCanvas Three.js WebGL failed, displaying fallback:", error);
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="absolute inset-0 bg-gradient-to-t from-[#16291E] via-[#2F6F4E]/30 to-[#16291E] flex items-center justify-center opacity-70">
            <div class="w-80 h-80 rounded-full bg-[#9ED660]/10 filter blur-3xl animate-pulse"></div>
          </div>
        `;
      }
    }

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (renderer) {
        if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      if (scene) scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default HeroSteamCanvas;
