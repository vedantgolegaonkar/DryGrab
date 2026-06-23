import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Configurations per flavor
const flavorConfigs = {
  chana: {
    name: 'KALA CHANA',
    tagline: 'High Fiber, Roasted Vibe',
    bg: '#3D2F28', // Dark Toasted Brown
    text: '#9ED660', // Lime Pop
    accent: '#2F6F4E', // Sprout Green
  },
  matki: {
    name: 'MATKI SPROUTS',
    tagline: 'Rich in Minerals',
    bg: '#C9794B', // Toasted Clay
    text: '#F8F3E9', // Warm Cream
    accent: '#16291E', // Deep Forest
  },
  mung: {
    name: 'MUNG SPROUTS',
    tagline: 'Classic High Protein',
    bg: '#2F6F4E', // Sprout Green
    text: '#9ED660', // Lime Pop
    accent: '#F8F3E9', // Warm Cream
  },
  chawli: {
    name: 'CHAWLI SPROUTS',
    tagline: 'Light & Nutritious',
    bg: '#D2B48C', // Light Tan / Chawli color
    text: '#2A2118', // Espresso Ink
    accent: '#C9794B', // Toasted Clay
  }
};

const RevealTubCanvas = ({ scrollProgress = 0, activeFlavor = 'mung' }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  
  const tubMeshRef = useRef(null);
  const lidMeshRef = useRef(null);
  const bowlMeshRef = useRef(null);
  const foodMeshRef = useRef(null);
  const textureRef = useRef(null);
  const textureCanvasRef = useRef(null);

  // Lists of animated objects
  const legumesRef = useRef([]);
  const waterParticlesRef = useRef([]);
  const steamParticlesRef = useRef([]);

  // Helper to draw the label dynamically
  const drawLabel = (config) => {
    const canvas = textureCanvasRef.current || document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = config.bg;
    ctx.fillRect(0, 0, 512, 256);

    // Draw borders/graphics
    ctx.strokeStyle = config.text;
    ctx.lineWidth = 6;
    ctx.strokeRect(15, 15, 512 - 30, 256 - 30);
    
    ctx.fillStyle = config.accent;
    ctx.fillRect(25, 25, 512 - 50, 45);

    // Draw brand name
    ctx.fillStyle = '#F8F3E9'; // Warm Cream
    ctx.font = 'bold 24px Sora, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('DRY GRAB', 256, 56);

    // Draw Sprout Graphic/Vibe
    ctx.fillStyle = config.text;
    ctx.beginPath();
    ctx.arc(256, 120, 10, 0, Math.PI * 2);
    ctx.fill();

    // Flavor text
    ctx.fillStyle = '#F8F3E9';
    ctx.font = 'bold 36px Sora, sans-serif';
    ctx.fillText(config.name, 256, 165);

    // Subtitle
    ctx.fillStyle = config.text;
    ctx.font = 'italic 16px Inter, sans-serif';
    ctx.fillText(config.tagline, 256, 205);

    // Nutrition tag
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('100% SPROUTED • ZERO ADDED SUGAR • GLUTEN FREE', 256, 230);

    textureCanvasRef.current = canvas;
    return canvas;
  };

  const scrollProgressRef = useRef(0);

  // Sync scroll progress prop to ref to avoid stale closure in animate loop
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    let animId;
    let handleResize;

    try {
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || 500;

      sceneRef.current = new THREE.Scene();
      const scene = sceneRef.current;

      cameraRef.current = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      const camera = cameraRef.current;
      camera.position.set(0, 0.5, 6);

      rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const renderer = rendererRef.current;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      
      // Clear container and append
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(5, 10, 7);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const backLight = new THREE.DirectionalLight(0x9ed660, 0.8);
      backLight.position.set(-5, 5, -5);
      scene.add(backLight);

      // 1. Slate Bowl (at the bottom)
      const bowlGeo = new THREE.CylinderGeometry(1.6, 1.0, 0.8, 32);
      const bowlMat = new THREE.MeshStandardMaterial({
        color: 0x1d221e,
        roughness: 0.6,
        metalness: 0.2
      });
      bowlMeshRef.current = new THREE.Mesh(bowlGeo, bowlMat);
      const bowlMesh = bowlMeshRef.current;
      bowlMesh.position.set(0, -1.8, 0);
      bowlMesh.receiveShadow = true;
      bowlMesh.castShadow = true;
      scene.add(bowlMesh);

      // Inside level flat cylinder (sprout food inside bowl)
      const foodGeo = new THREE.CylinderGeometry(1.48, 1.4, 0.2, 32);
      const foodMat = new THREE.MeshStandardMaterial({
        color: 0x9ed660, // Lime Pop representing legumes
        roughness: 0.8
      });
      foodMeshRef.current = new THREE.Mesh(foodGeo, foodMat);
      const foodMesh = foodMeshRef.current;
      foodMesh.position.y = 0.35; // inside the bowl
      foodMesh.scale.set(0.001, 0.001, 0.001); // invisible at start
      bowlMesh.add(foodMesh);

      // 2. Dynamic Texture & Tub Body
      const initialConfig = flavorConfigs[activeFlavor] || flavorConfigs.mung;
      const canvas = drawLabel(initialConfig);
      textureRef.current = new THREE.CanvasTexture(canvas);
      const texture = textureRef.current;

      // Outer cylinder (label, open-ended)
      const tubGeo = new THREE.CylinderGeometry(1.0, 0.8, 1.6, 32, 1, true);
      const labelMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.1,
        side: THREE.FrontSide
      });
      tubMeshRef.current = new THREE.Mesh(tubGeo, labelMaterial);
      const tubMesh = tubMeshRef.current;
      tubMesh.position.set(0, 0.8, 0); // start higher
      tubMesh.castShadow = true;
      scene.add(tubMesh);

      // Inner cylinder (cream inside, slightly smaller to prevent z-fighting, open-ended)
      const innerGeo = new THREE.CylinderGeometry(0.98, 0.78, 1.58, 32, 1, true);
      const insideMaterial = new THREE.MeshStandardMaterial({
        color: 0xe5dcc6,
        roughness: 0.6,
        side: THREE.BackSide
      });
      const innerMesh = new THREE.Mesh(innerGeo, insideMaterial);
      tubMesh.add(innerMesh);

      // Bottom cap (dark brown, closed circle)
      const bottomGeo = new THREE.CircleGeometry(0.79, 32);
      const bottomMaterial = new THREE.MeshStandardMaterial({
        color: 0x221a14,
        roughness: 0.5,
        side: THREE.DoubleSide
      });
      const bottomCap = new THREE.Mesh(bottomGeo, bottomMaterial);
      bottomCap.position.y = -0.79; // slightly inside to avoid clipping
      bottomCap.rotation.x = Math.PI / 2;
      tubMesh.add(bottomCap);

      // 3. Lid Cylinder
      const lidGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.2, 32);
      lidMeshRef.current = new THREE.Mesh(lidGeo, new THREE.MeshStandardMaterial({
        color: initialConfig.bg,
        roughness: 0.3,
        metalness: 0.1
      }));
      const lidMesh = lidMeshRef.current;
      lidMesh.position.set(0, 1.7, 0); // sits on top of tub (tub body height is 1.6)
      lidMesh.castShadow = true;
      scene.add(lidMesh);

      // 4. Individual Legume Seeds (For Pouring Animation)
      const legumesGroup = new THREE.Group();
      scene.add(legumesGroup);

      const legumeCount = 45;
      const legumeGeo = new THREE.DodecahedronGeometry(0.07, 1);
      const legumeMat = new THREE.MeshStandardMaterial({
        color: 0x9ed660,
        roughness: 0.7
      });

      legumesRef.current = [];
      for (let i = 0; i < legumeCount; i++) {
        const mesh = new THREE.Mesh(legumeGeo, legumeMat);
        mesh.castShadow = true;
        mesh.visible = false;
        legumesGroup.add(mesh);

        // Store custom animation variables
        legumesRef.current.push({
          mesh,
          threshold: 0.04 + (i / legumeCount) * 0.18, // pour triggers staggered between 4% and 22%
          offset: new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3 - 0.2, // inside the tub
            (Math.random() - 0.5) * 0.3
          ),
          randomBowlOffset: new THREE.Vector3(
            (Math.random() - 0.5) * 1.1,
            0.42 + Math.random() * 0.15, // land on top of the bowl surface (Y >= -1.4)
            (Math.random() - 0.5) * 1.1
          )
        });
      }

      // 5. Water Particles (For Water Pouring Animation)
      const waterGroup = new THREE.Group();
      scene.add(waterGroup);

      const waterCount = 30;
      const waterGeo = new THREE.SphereGeometry(0.05, 6, 6);
      const waterMat = new THREE.MeshBasicMaterial({
        color: 0x5dade2,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      waterParticlesRef.current = [];
      for (let i = 0; i < waterCount; i++) {
        const mesh = new THREE.Mesh(waterGeo, waterMat);
        mesh.visible = false;
        waterGroup.add(mesh);

        waterParticlesRef.current.push({
          mesh,
          delay: i * 0.03, // Staggered drop delays
          wobbleOffset: Math.random() * Math.PI * 2
        });
      }

      // 6. Steam Particles (For Step 3: Eat / Aroma)
      const steamGroup = new THREE.Group();
      scene.add(steamGroup);

      const steamCount = 35;
      const steamTexture = (() => {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        grad.addColorStop(0.3, 'rgba(240, 240, 240, 0.12)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
      })();

      const steamMat = new THREE.PointsMaterial({
        size: 0.45,
        map: steamTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const steamGeometry = new THREE.BufferGeometry();
      const steamPositions = new Float32Array(steamCount * 3);
      const steamAges = new Float32Array(steamCount);
      const steamSpeeds = new Float32Array(steamCount);
      const steamOffsets = new Float32Array(steamCount);

      for (let i = 0; i < steamCount; i++) {
        steamPositions[i * 3] = 0;
        steamPositions[i * 3 + 1] = -1.5;
        steamPositions[i * 3 + 2] = 0;
        steamAges[i] = Math.random() * 2;
        steamSpeeds[i] = 0.5 + Math.random() * 0.6;
        steamOffsets[i] = Math.random() * Math.PI * 2;
      }

      steamGeometry.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
      const steamPoints = new THREE.Points(steamGeometry, steamMat);
      steamPoints.visible = false;
      steamGroup.add(steamPoints);
      steamParticlesRef.current = steamPoints;

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

      // Dynamic Animation Loop
      const clock = new THREE.Clock();

      const updateScene = (p, time) => {
        const tub = tubMeshRef.current;
        const lid = lidMeshRef.current;
        const bowl = bowlMeshRef.current;
        const food = foodMeshRef.current;

        if (!tub || !lid || !bowl || !food) return;

        // Step 1: Pour (p from 0 to 0.35)
        if (p < 0.35) {
          const stepP = p / 0.35; // Normalized progress of step 1 (0 to 1)

          // Animate Tub positions and tilting upside down
          tub.position.x = -stepP * 0.8;
          tub.position.y = 0.8 - stepP * 0.3;
          tub.position.z = 0;
          tub.rotation.z = -stepP * Math.PI * 0.75; // Corrected: tilt towards the bowl (negative Z)
          tub.rotation.x = 0;
          tub.rotation.y = stepP * Math.PI;

          // Animate Lid opening and flying off to the left/away
          lid.position.x = -stepP * 2.2;
          lid.position.y = 1.7 + stepP * 0.5;
          lid.position.z = -stepP * 0.5;
          lid.rotation.x = stepP * 1.5;
          lid.rotation.z = stepP * 2.0;

          // Make Bowl stationary
          bowl.position.set(0, -1.8, 0);
          food.scale.set(0.001, 0.001, 0.001); // invisible food

          // Pouring seeds animation
          tub.updateMatrix();
          tub.updateMatrixWorld(true);

          legumesRef.current.forEach((seed) => {
            if (p < seed.threshold) {
              const slideP = p / seed.threshold;
              const localY = THREE.MathUtils.lerp(seed.offset.y, 0.8, slideP);
              
              const localSeedPos = new THREE.Vector3(seed.offset.x, localY, seed.offset.z);
              const worldPos = localSeedPos.applyMatrix4(tub.matrixWorld);
              
              seed.mesh.visible = true;
              seed.mesh.position.copy(worldPos);
              seed.mesh.rotation.copy(tub.rotation);
              seed.mesh.scale.set(1.0, 1.0, 1.0);
            } else {
              seed.mesh.visible = true;
              const fallT = Math.min(1, (p - seed.threshold) / (0.34 - seed.threshold));

              const localMouthPos = new THREE.Vector3(seed.offset.x, 0.8, seed.offset.z);
              const mouthWorld = localMouthPos.applyMatrix4(tub.matrixWorld);

              seed.mesh.position.x = THREE.MathUtils.lerp(mouthWorld.x, bowl.position.x + seed.randomBowlOffset.x, fallT);
              seed.mesh.position.y = THREE.MathUtils.lerp(mouthWorld.y, bowl.position.y + seed.randomBowlOffset.y, fallT);
              seed.mesh.position.z = THREE.MathUtils.lerp(mouthWorld.z, bowl.position.z + seed.randomBowlOffset.z, fallT);

              seed.mesh.rotation.x = fallT * 10;
              seed.mesh.rotation.y = fallT * 5;
              seed.mesh.rotation.z = fallT * 3;
            }
          });

          // Turn off water and steam
          waterParticlesRef.current.forEach(w => w.mesh.visible = false);
          if (steamParticlesRef.current) steamParticlesRef.current.visible = false;
        } 
        // Step 2: Add Water (p from 0.35 to 0.70)
        else if (p >= 0.35 && p < 0.70) {
          const stepP = (p - 0.35) / 0.35; // Normalized progress of step 2 (0 to 1)

          tub.position.x = -0.8 - stepP * 1.5;
          tub.position.y = 0.5 - stepP * 1.5;
          tub.position.z = -stepP * 1.0;
          tub.rotation.z = -Math.PI * 0.75 + stepP * Math.PI * 0.75; // Corrected: tilt towards the bowl (negative Z)
          tub.rotation.y = Math.PI;

          lid.position.x = -2.2 - stepP * 0.4;
          lid.position.y = 2.2 - stepP * 3.2; // Y = -1.0
          lid.position.z = -0.5;

          legumesRef.current.forEach((seed) => {
            seed.mesh.visible = true;
            seed.mesh.position.x = bowl.position.x + seed.randomBowlOffset.x;
            seed.mesh.position.y = bowl.position.y + seed.randomBowlOffset.y;
            seed.mesh.position.z = bowl.position.z + seed.randomBowlOffset.z;
            const swellFactor = 1.0 + stepP * 0.45;
            seed.mesh.scale.set(swellFactor, swellFactor, swellFactor);
          });

          food.scale.set(stepP * 1.0, 1.0, stepP * 1.0);

          // Water flow
          waterParticlesRef.current.forEach((w) => {
            w.mesh.visible = true;
            const waterP = (time * 1.8 + w.delay) % 1.0;
            
            w.mesh.position.y = THREE.MathUtils.lerp(2.5, bowl.position.y + 0.3, waterP);
            w.mesh.position.x = bowl.position.x + Math.sin(time * 12 + w.wobbleOffset) * 0.12;
            w.mesh.position.z = bowl.position.z + Math.cos(time * 12 + w.wobbleOffset) * 0.12;
            
            const scale = waterP > 0.85 ? (1.0 - waterP) * 6.0 : 1.0;
            w.mesh.scale.set(scale, scale, scale);
          });

          if (steamParticlesRef.current) steamParticlesRef.current.visible = false;
        }
        // Step 3: Eat / Aroma (p from 0.70 to 1.0)
        else {
          tub.position.set(-2.3, -1.0, -1.0);
          tub.rotation.set(0, Math.PI, 0);
          lid.position.set(-2.6, -1.7, -0.5);

          legumesRef.current.forEach((seed) => {
            seed.mesh.visible = true;
            seed.mesh.position.x = bowl.position.x + seed.randomBowlOffset.x;
            seed.mesh.position.y = bowl.position.y + seed.randomBowlOffset.y;
            seed.mesh.position.z = bowl.position.z + seed.randomBowlOffset.z;
            seed.mesh.scale.set(1.45, 1.45, 1.45);
          });

          food.scale.set(1.0, 1.0, 1.0);

          waterParticlesRef.current.forEach(w => w.mesh.visible = false);

          if (steamParticlesRef.current) {
            const steam = steamParticlesRef.current;
            steam.visible = true;

            const positions = steam.geometry.attributes.position.array;
            const pCount = positions.length / 3;

            for (let i = 0; i < pCount; i++) {
              const particleP = (time * 0.45 + (i * 0.05)) % 1.0; // loops 0 to 1

              positions[i * 3 + 1] = THREE.MathUtils.lerp(bowl.position.y + 0.3, 1.8, particleP);
              positions[i * 3] = bowl.position.x + Math.sin(time + i * 0.8) * (0.1 + particleP * 0.6);
              positions[i * 3 + 2] = bowl.position.z + Math.cos(time + i * 0.8) * (0.1 + particleP * 0.6);
            }
            steam.geometry.attributes.position.needsUpdate = true;
          }
        }
      };

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        // Slow hover/bob animation for active elements
        if (bowlMesh) {
          bowlMesh.rotation.y = time * 0.05;
        }

        // Apply scroll-based & time-based layouts and particle updates
        updateScene(scrollProgressRef.current, time);

        renderer.render(scene, camera);
      };

      animate();

    } catch (error) {
      console.warn("RevealTubCanvas Three.js failed, displaying 2D fallback:", error);
      render2DFallback();
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        if (containerRef.current && rendererRef.current.domElement && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      if (sceneRef.current) sceneRef.current.clear();
    };
  }, []);

  // Render 2D Fallback HTML structure
  const render2DFallback = () => {
    if (!containerRef.current) return;
    const config = flavorConfigs[activeFlavor] || flavorConfigs.mung;
    containerRef.current.innerHTML = `
      <div class="w-full h-full flex flex-col justify-center items-center p-6">
        <div class="w-48 h-64 rounded-3xl shadow-2xl flex flex-col justify-between p-5 border-4 transition-all duration-500 transform hover:rotate-6 cursor-pointer"
             style="background: linear-gradient(135deg, ${config.bg}, #16171d); border-color: ${config.text}; box-shadow: 0 20px 40px ${config.bg}40">
          <div class="w-full border-b border-white/20 pb-2 flex justify-between items-center">
            <span class="text-[9px] font-black uppercase tracking-widest text-white/50">Pack Premium</span>
            <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${config.text}"></span>
          </div>
          <div class="flex-grow flex flex-col justify-center text-center py-4">
            <h3 class="font-display font-black text-2xl tracking-wider text-white">DRY GRAB</h3>
            <p class="text-[9px] uppercase tracking-widest font-bold mt-1" style="color: ${config.text}">${config.name}</p>
            <span class="text-[8px] text-white/40 italic mt-2">${config.tagline}</span>
          </div>
          <div class="w-full bg-white/10 rounded-xl p-2.5 text-center text-[8px] font-bold text-white/95 uppercase tracking-wider">
            100% Sprouted Legumes
          </div>
        </div>
      </div>
    `;
  };

  // Update flavor colors and textures
  useEffect(() => {
    const config = flavorConfigs[activeFlavor] || flavorConfigs.mung;
    
    // Draw the new label
    drawLabel(config);
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }

    if (lidMeshRef.current) {
      gsap.to(lidMeshRef.current.material.color, {
        r: new THREE.Color(config.bg).r,
        g: new THREE.Color(config.bg).g,
        b: new THREE.Color(config.bg).b,
        duration: 0.5
      });
    }

    if (foodMeshRef.current) {
      gsap.to(foodMeshRef.current.material.color, {
        r: new THREE.Color(config.accent === '#16291E' ? '#C9794B' : config.text).r,
        g: new THREE.Color(config.accent === '#16291E' ? '#C9794B' : config.text).g,
        b: new THREE.Color(config.accent === '#16291E' ? '#C9794B' : config.text).b,
        duration: 0.5
      });
    }

    // Update fallback details if Three.js is not active
    if (!rendererRef.current) {
      render2DFallback();
    }
  }, [activeFlavor]);

  // Scroll-based layouts and positioning are now driven inside the requestAnimationFrame loop

  // Helper to extract points count from Float32Array length
  const steamPositionsLength = (arr) => {
    return arr ? arr.length / 3 : 0;
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[450px] relative pointer-events-auto" />
  );
};

export default RevealTubCanvas;
