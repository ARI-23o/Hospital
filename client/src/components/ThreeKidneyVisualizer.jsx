import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Layers, Info, Play, Pause } from 'lucide-react';

export default function ThreeKidneyVisualizer() {
  const mountRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mode, setMode] = useState('nephrology'); // 'nephrology' | 'urology'
  const [isRotating, setIsRotating] = useState(true);

  const hotspots = {
    nephrology: [
      { id: 'cortex', title: 'Renal Cortex', desc: 'Outer region containing ~1 million nephrons & glomeruli filtering metabolic toxins (Urea, Creatinine).' },
      { id: 'medulla', title: 'Renal Medulla', desc: 'Regulates electrolyte balance (Sodium, Potassium) and water concentration.' },
      { id: 'artery', title: 'Renal Artery', desc: 'High-pressure vessel delivering 1.2 L/min of blood for precise renal filtration.' },
      { id: 'vein', title: 'Renal Vein', desc: 'Transports purified, electrolyte-balanced blood back into systemic circulation.' }
    ],
    urology: [
      { id: 'pelvis', title: 'Renal Pelvis', desc: 'Central collection funnel directing produced urine towards the ureter.' },
      { id: 'ureter', title: 'Ureter Conduit', desc: 'Muscular tubular duct propelling urine down to the urinary bladder.' },
      { id: 'calyces', title: 'Calyces System', desc: 'Primary site for urine drainage and kidney stone crystal evaluation.' }
    ]
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 380;
    const height = currentMount.clientHeight || 300;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0d9488, 2.2);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.6);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 10);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    const organGroup = new THREE.Group();
    scene.add(organGroup);

    // Procedural Kidney Shape
    const kidneyShape = new THREE.Shape();
    kidneyShape.moveTo(-0.2, 1.5);
    kidneyShape.bezierCurveTo(-1.6, 1.5, -1.8, -1.2, -0.6, -1.6);
    kidneyShape.bezierCurveTo(0.2, -1.8, 0.8, -1.4, 0.5, -0.6);
    kidneyShape.bezierCurveTo(0.2, 0.0, 0.2, 0.6, 0.6, 1.1);
    kidneyShape.bezierCurveTo(0.8, 1.4, 0.5, 1.5, -0.2, 1.5);

    const extrudeSettings = {
      steps: 2,
      depth: 0.9,
      bevelEnabled: true,
      bevelThickness: 0.45,
      bevelSize: 0.4,
      bevelSegments: 16
    };

    const kidneyGeo = new THREE.ExtrudeGeometry(kidneyShape, extrudeSettings);
    kidneyGeo.center();

    const kidneyMat = new THREE.MeshPhysicalMaterial({
      color: 0x991b1b,
      emissive: 0x1e1b4b,
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      transmission: 0.15,
      thickness: 1.2
    });

    const kidneyMesh = new THREE.Mesh(kidneyGeo, kidneyMat);
    organGroup.add(kidneyMesh);

    // Renal Pelvis
    const pelvisGeo = new THREE.ConeGeometry(0.5, 1.2, 16);
    const pelvisMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.2 });
    const pelvisMesh = new THREE.Mesh(pelvisGeo, pelvisMat);
    pelvisMesh.position.set(0.4, -0.2, 0.1);
    pelvisMesh.rotation.z = -Math.PI / 4;
    organGroup.add(pelvisMesh);

    // Ureter
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, -0.4, 0.1),
      new THREE.Vector3(0.7, -1.1, 0.2),
      new THREE.Vector3(0.6, -1.8, 0.3),
      new THREE.Vector3(0.4, -2.4, 0.2)
    ]);
    const ureterGeo = new THREE.TubeGeometry(curve, 32, 0.12, 12, false);
    const ureterMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3, emissive: 0x78350f, emissiveIntensity: 0.2 });
    const ureterMesh = new THREE.Mesh(ureterGeo, ureterMat);
    organGroup.add(ureterMesh);

    // Renal Artery (Red) & Vein (Blue)
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, 0.4, 0.2),
      new THREE.Vector3(0.9, 0.6, 0.3),
      new THREE.Vector3(1.6, 0.8, 0.1)
    ]);
    const arteryGeo = new THREE.TubeGeometry(arteryCurve, 20, 0.14, 12, false);
    const arteryMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25, emissive: 0x991b1b, emissiveIntensity: 0.4 });
    const arteryMesh = new THREE.Mesh(arteryGeo, arteryMat);
    organGroup.add(arteryMesh);

    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, 0.0, 0.3),
      new THREE.Vector3(0.9, -0.1, 0.4),
      new THREE.Vector3(1.6, -0.3, 0.2)
    ]);
    const veinGeo = new THREE.TubeGeometry(veinCurve, 20, 0.16, 12, false);
    const veinMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.25, emissive: 0x0369a1, emissiveIntensity: 0.4 });
    const veinMesh = new THREE.Mesh(veinGeo, veinMat);
    organGroup.add(veinMesh);

    // Glowing Micro-Filtration Particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.0;
      particlePositions[i * 3] = Math.cos(theta) * radius - 0.4;
      particlePositions[i * 3 + 1] = Math.sin(theta) * radius * 1.3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;

      if (Math.random() > 0.5) {
        particleColors[i * 3] = 0.05;
        particleColors[i * 3 + 1] = 0.8;
        particleColors[i * 3 + 2] = 0.7;
      } else {
        particleColors[i * 3] = 0.95;
        particleColors[i * 3 + 1] = 0.7;
        particleColors[i * 3 + 2] = 0.1;
      }
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    organGroup.add(particleSystem);

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      organGroup.rotation.y += deltaX * 0.008;
      organGroup.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      organGroup.rotation.y += deltaX * 0.01;
      organGroup.rotation.x += deltaY * 0.01;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        organGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.35;
        organGroup.rotation.x = Math.cos(elapsedTime * 0.4) * 0.15;
      }

      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 2 + i) * 0.002;
      }
      particleGeo.attributes.position.needsUpdate = true;

      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      kidneyMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  const currentHotspots = hotspots[mode];

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#0A1D37] via-[#0F2D59] to-[#081528] p-4 sm:p-5 text-white shadow-2xl border border-teal-500/25 overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1 text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-400/20">
            <Sparkles className="w-3 h-3 text-teal-300" /> Interactive 3D Anatomy
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
            Renal & Urology 3D Model
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-xl border border-white/10">
          <button
            onClick={() => setMode('nephrology')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              mode === 'nephrology' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3" /> Nephrology
          </button>
          <button
            onClick={() => setMode('urology')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              mode === 'urology' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" /> Urology
          </button>
        </div>
      </div>

      <div className="relative w-full h-[250px] sm:h-[290px] my-1 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full" />

        <div className="absolute top-1 right-1 flex flex-col gap-1 z-20">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause Rotation' : 'Resume Rotation'}
            className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-200 hover:text-white hover:bg-black/60 transition"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-teal-400" /> : <Play className="w-3.5 h-3.5 text-teal-400" />}
          </button>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1 left-1 flex flex-wrap gap-1 pointer-events-auto max-w-full">
            {currentHotspots.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHotspot(h)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all ${
                  activeHotspot?.id === h.id
                    ? 'bg-teal-500 text-white border-teal-300 shadow-md scale-105'
                    : 'bg-slate-800/80 text-slate-300 border-white/10 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {h.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeHotspot ? activeHotspot.id : mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 bg-slate-800/90 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-xs flex items-start gap-2.5 shadow-md"
        >
          <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs">
              {activeHotspot ? activeHotspot.title : (mode === 'nephrology' ? 'Kidney Filtration Anatomy' : 'Urinary Drainage Anatomy')}
            </h4>
            <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
              {activeHotspot ? activeHotspot.desc : (mode === 'nephrology' ? 'Filters ~180 liters of blood daily, regulating blood pressure, electrolytes, and removing toxins under Dr. Sagar Sarda.' : 'Directs urine from the kidney pelvis through the ureters into the bladder for healthy voiding.')}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}