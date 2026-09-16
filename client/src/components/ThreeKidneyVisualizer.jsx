import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, Layers, Info, Play, Pause } from "lucide-react";

export default function ThreeKidneyVisualizer() {
  const mountRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mode, setMode] = useState("nephrology"); // 'nephrology' | 'urology'
  const [isRotating, setIsRotating] = useState(true);

  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
    setActiveHotspot(null);
  }, [mode]);

  const hotspots = {
    nephrology: [
      {
        id: "cortex",
        title: "Renal Cortex",
        desc: "Outer kidney region containing ~1 million nephrons & glomeruli filtering metabolic toxins (Urea, Creatinine).",
      },
      {
        id: "medulla",
        title: "Renal Medulla",
        desc: "Inner renal pyramids regulating electrolyte balance (Sodium, Potassium) and water retention.",
      },
      {
        id: "artery",
        title: "Renal Artery",
        desc: "High-pressure vascular branch delivering 1.2 Liters/min of blood for precise kidney filtration.",
      },
      {
        id: "vein",
        title: "Renal Vein",
        desc: "Transports purified, electrolyte-balanced venous blood back into systemic circulation.",
      },
    ],
    urology: [
      {
        id: "kidneys",
        title: "Bilateral Kidneys",
        desc: "Dual left and right kidneys filtering metabolic waste and continuously generating urine.",
      },
      {
        id: "ureters",
        title: "Dual Ureters",
        desc: "Muscular tubular conduits transporting urine from each kidney to the bladder via peristaltic waves.",
      },
      {
        id: "bladder",
        title: "Urinary Bladder",
        desc: "Expandable hollow muscular dome (capacity 300–500 mL) that securely stores urine until voiding.",
      },
      {
        id: "prostate",
        title: "Prostate & Urethra",
        desc: "Inferior outflow channel and gland regulating smooth urinary flow, voiding control, and continence.",
      },
    ],
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 380;
    const height = currentMount.clientHeight || 300;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0d9488, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 12);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // Root Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Helper: Shared Kidney Geometry
    const shape = new THREE.Shape();
    shape.moveTo(-0.2, 1.5);
    shape.bezierCurveTo(-1.6, 1.5, -1.8, -1.2, -0.6, -1.6);
    shape.bezierCurveTo(0.2, -1.8, 0.8, -1.4, 0.5, -0.6);
    shape.bezierCurveTo(0.2, 0.0, 0.2, 0.6, 0.6, 1.1);
    shape.bezierCurveTo(0.8, 1.4, 0.5, 1.5, -0.2, 1.5);

    const extrudeSettings = {
      steps: 2,
      depth: 0.85,
      bevelEnabled: true,
      bevelThickness: 0.45,
      bevelSize: 0.38,
      bevelSegments: 16,
    };
    const kidneyGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    kidneyGeo.center();

    // ==========================================
    // 1. NEPHROLOGY GROUP (Single Detailed Kidney)
    // ==========================================
    const nephrologyGroup = new THREE.Group();
    mainGroup.add(nephrologyGroup);

    const nephKidneyMat = new THREE.MeshPhysicalMaterial({
      color: 0x991b1b,
      emissive: 0x3b0764,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transmission: 0.15,
      thickness: 1.2,
    });
    const nephKidneyMesh = new THREE.Mesh(kidneyGeo, nephKidneyMat);
    nephKidneyMesh.position.set(-0.2, 0, 0);
    nephrologyGroup.add(nephKidneyMesh);

    // Pelvis
    const pelvisGeo = new THREE.ConeGeometry(0.45, 1.1, 16);
    const pelvisMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.35,
      metalness: 0.2,
    });
    const pelvisMesh = new THREE.Mesh(pelvisGeo, pelvisMat);
    pelvisMesh.position.set(0.35, -0.2, 0.1);
    pelvisMesh.rotation.z = -Math.PI / 4;
    nephrologyGroup.add(pelvisMesh);

    // Single Ureter
    const singleUreterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.45, -0.4, 0.1),
      new THREE.Vector3(0.65, -1.1, 0.2),
      new THREE.Vector3(0.55, -1.8, 0.3),
      new THREE.Vector3(0.4, -2.4, 0.2),
    ]);
    const singleUreterGeo = new THREE.TubeGeometry(singleUreterCurve, 32, 0.12, 12, false);
    const singleUreterMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.3,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });
    const singleUreterMesh = new THREE.Mesh(singleUreterGeo, singleUreterMat);
    nephrologyGroup.add(singleUreterMesh);

    // Artery (Red) & Vein (Blue)
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, 0.4, 0.2),
      new THREE.Vector3(0.9, 0.6, 0.3),
      new THREE.Vector3(1.6, 0.8, 0.1),
    ]);
    const arteryGeo = new THREE.TubeGeometry(arteryCurve, 20, 0.14, 12, false);
    const arteryMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.25,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.5,
    });
    const arteryMesh = new THREE.Mesh(arteryGeo, arteryMat);
    nephrologyGroup.add(arteryMesh);

    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, 0.0, 0.3),
      new THREE.Vector3(0.9, -0.1, 0.4),
      new THREE.Vector3(1.6, -0.3, 0.2),
    ]);
    const veinGeo = new THREE.TubeGeometry(veinCurve, 20, 0.16, 12, false);
    const veinMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.25,
      emissive: 0x0369a1,
      emissiveIntensity: 0.5,
    });
    const veinMesh = new THREE.Mesh(veinGeo, veinMat);
    nephrologyGroup.add(veinMesh);

    // Nephrology Micro-Filtration Particles
    const nephParticleCount = 90;
    const nephParticleGeo = new THREE.BufferGeometry();
    const nephPositions = new Float32Array(nephParticleCount * 3);
    const nephColors = new Float32Array(nephParticleCount * 3);

    for (let i = 0; i < nephParticleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 0.9;
      nephPositions[i * 3] = Math.cos(theta) * radius - 0.3;
      nephPositions[i * 3 + 1] = Math.sin(theta) * radius * 1.25;
      nephPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.1;

      if (Math.random() > 0.5) {
        nephColors[i * 3] = 0.1;
        nephColors[i * 3 + 1] = 0.9;
        nephColors[i * 3 + 2] = 0.8;
      } else {
        nephColors[i * 3] = 0.95;
        nephColors[i * 3 + 1] = 0.75;
        nephColors[i * 3 + 2] = 0.1;
      }
    }
    nephParticleGeo.setAttribute("position", new THREE.BufferAttribute(nephPositions, 3));
    nephParticleGeo.setAttribute("color", new THREE.BufferAttribute(nephColors, 3));
    const nephParticleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nephParticleSystem = new THREE.Points(nephParticleGeo, nephParticleMat);
    nephrologyGroup.add(nephParticleSystem);

    // ==========================================
    // 2. UROLOGY GROUP (Complete Urinary Tract Anatomy)
    // ==========================================
    const urologyGroup = new THREE.Group();
    mainGroup.add(urologyGroup);

    const urologyOrganMat = new THREE.MeshPhysicalMaterial({
      color: 0x881337,
      emissive: 0x4c0519,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
    });

    // Left Kidney (Anatomically Left / Viewer's Left)
    const leftKidneyMesh = new THREE.Mesh(kidneyGeo, urologyOrganMat);
    leftKidneyMesh.scale.set(0.48, 0.48, 0.48);
    leftKidneyMesh.position.set(-1.15, 0.95, 0);
    leftKidneyMesh.rotation.z = 0.1;
    urologyGroup.add(leftKidneyMesh);

    // Right Kidney (Anatomically Right / Viewer's Right)
    const rightKidneyMesh = new THREE.Mesh(kidneyGeo, urologyOrganMat);
    rightKidneyMesh.scale.set(-0.48, 0.48, 0.48);
    rightKidneyMesh.position.set(1.15, 0.8, 0);
    rightKidneyMesh.rotation.z = -0.1;
    urologyGroup.add(rightKidneyMesh);

    // Left & Right Renal Pelvises
    const urologyPelvisMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35 });

    const leftPelvisMesh = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.55, 16), urologyPelvisMat);
    leftPelvisMesh.position.set(-0.9, 0.85, 0.05);
    leftPelvisMesh.rotation.z = -Math.PI / 3;
    urologyGroup.add(leftPelvisMesh);

    const rightPelvisMesh = new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 0.55, 16),
      urologyPelvisMat
    );
    rightPelvisMesh.position.set(0.9, 0.7, 0.05);
    rightPelvisMesh.rotation.z = Math.PI / 3;
    urologyGroup.add(rightPelvisMesh);

    // Left Ureter Conduit
    const leftUreterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85, 0.75, 0.05),
      new THREE.Vector3(-0.65, 0.15, 0.1),
      new THREE.Vector3(-0.45, -0.45, 0.12),
      new THREE.Vector3(-0.25, -0.9, 0.1),
    ]);
    const ureterMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.5,
    });
    const leftUreterGeo = new THREE.TubeGeometry(leftUreterCurve, 32, 0.06, 12, false);
    const leftUreterMesh = new THREE.Mesh(leftUreterGeo, ureterMat);
    urologyGroup.add(leftUreterMesh);

    // Right Ureter Conduit
    const rightUreterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.85, 0.6, 0.05),
      new THREE.Vector3(0.65, 0.05, 0.1),
      new THREE.Vector3(0.45, -0.45, 0.12),
      new THREE.Vector3(0.25, -0.9, 0.1),
    ]);
    const rightUreterGeo = new THREE.TubeGeometry(rightUreterCurve, 32, 0.06, 12, false);
    const rightUreterMesh = new THREE.Mesh(rightUreterGeo, ureterMat);
    urologyGroup.add(rightUreterMesh);

    // Urinary Bladder Dome
    const bladderGeo = new THREE.SphereGeometry(0.58, 32, 32);
    bladderGeo.scale(1.05, 0.95, 0.9);
    const bladderMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.3,
      thickness: 0.8,
    });
    const bladderMesh = new THREE.Mesh(bladderGeo, bladderMat);
    bladderMesh.position.set(0, -1.05, 0.05);
    urologyGroup.add(bladderMesh);

    // Bladder Ring
    const bladderRingGeo = new THREE.TorusGeometry(0.55, 0.02, 16, 64);
    const bladderRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const bladderRing = new THREE.Mesh(bladderRingGeo, bladderRingMat);
    bladderRing.position.set(0, -1.05, 0.05);
    bladderRing.rotation.x = Math.PI / 2;
    urologyGroup.add(bladderRing);

    // Prostate Gland
    const prostateGeo = new THREE.SphereGeometry(0.24, 24, 24);
    prostateGeo.scale(1.2, 0.85, 0.95);
    const prostateMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x581c87,
      emissiveIntensity: 0.3,
      roughness: 0.35,
      metalness: 0.15,
    });
    const prostateMesh = new THREE.Mesh(prostateGeo, prostateMat);
    prostateMesh.position.set(0, -1.6, 0.05);
    urologyGroup.add(prostateMesh);

    // Urethral Outflow Conduit
    const urethraGeo = new THREE.CylinderGeometry(0.055, 0.045, 0.45, 16);
    const urethraMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });
    const urethraMesh = new THREE.Mesh(urethraGeo, urethraMat);
    urethraMesh.position.set(0, -1.9, 0.05);
    urologyGroup.add(urethraMesh);

    // Animated Urine Droplets along Ureters
    const urineDropletCount = 24;
    const urineGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const urineMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const leftDroplets = [];
    const rightDroplets = [];

    for (let i = 0; i < urineDropletCount / 2; i++) {
      const dL = new THREE.Mesh(urineGeo, urineMat);
      urologyGroup.add(dL);
      leftDroplets.push({ mesh: dL, offset: i / (urineDropletCount / 2) });

      const dR = new THREE.Mesh(urineGeo, urineMat);
      urologyGroup.add(dR);
      rightDroplets.push({ mesh: dR, offset: (i + 0.5) / (urineDropletCount / 2) });
    }

    // Default Initial Visibility
    if (mode === "nephrology") {
      nephrologyGroup.scale.set(1, 1, 1);
      urologyGroup.scale.set(0.0001, 0.0001, 0.0001);
      urologyGroup.visible = false;
      nephrologyGroup.visible = true;
    } else {
      urologyGroup.scale.set(1, 1, 1);
      nephrologyGroup.scale.set(0.0001, 0.0001, 0.0001);
      nephrologyGroup.visible = false;
      urologyGroup.visible = true;
    }

    // Interaction Dragging
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
      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

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
      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation
      if (isRotating && !isDragging) {
        mainGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.3;
        mainGroup.rotation.x = Math.cos(elapsedTime * 0.4) * 0.12;
      }

      // Smooth Morphing Between Modes
      const currentMode = modeRef.current;
      if (currentMode === "nephrology") {
        nephrologyGroup.visible = true;
        nephrologyGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

        urologyGroup.scale.lerp(new THREE.Vector3(0.0001, 0.0001, 0.0001), 0.1);
        if (urologyGroup.scale.x < 0.02) {
          urologyGroup.visible = false;
        }

        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
        nephKidneyMesh.scale.set(scale, scale, scale);

        const positions = nephParticleGeo.attributes.position.array;
        for (let i = 0; i < nephParticleCount; i++) {
          positions[i * 3 + 1] += Math.sin(elapsedTime * 2 + i) * 0.002;
        }
        nephParticleGeo.attributes.position.needsUpdate = true;
      } else {
        urologyGroup.visible = true;
        urologyGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

        nephrologyGroup.scale.lerp(new THREE.Vector3(0.0001, 0.0001, 0.0001), 0.1);
        if (nephrologyGroup.scale.x < 0.02) {
          nephrologyGroup.visible = false;
        }

        const bladderPulse = 1 + Math.sin(elapsedTime * 2.0) * 0.025;
        bladderMesh.scale.set(1.05 * bladderPulse, 0.95 * bladderPulse, 0.9 * bladderPulse);

        leftDroplets.forEach((d) => {
          const t = (elapsedTime * 0.4 + d.offset) % 1.0;
          const pt = leftUreterCurve.getPoint(t);
          d.mesh.position.copy(pt);
          d.mesh.scale.setScalar(1.0 - t * 0.4);
        });

        rightDroplets.forEach((d) => {
          const t = (elapsedTime * 0.4 + d.offset) % 1.0;
          const pt = rightUreterCurve.getPoint(t);
          d.mesh.position.copy(pt);
          d.mesh.scale.setScalar(1.0 - t * 0.4);
        });
      }

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

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
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

      {/* Header bar with Mode switcher */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1 text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-teal-400/20">
            <Sparkles className="w-3 h-3 text-teal-300" /> Interactive 3D Anatomy
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-1">
            {mode === "nephrology"
              ? "Renal Nephron & Filtration 3D"
              : "Complete Urinary Tract & Urology 3D"}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMode("nephrology")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              mode === "nephrology"
                ? "bg-teal-500 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Nephrology
          </button>
          <button
            onClick={() => setMode("urology")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              mode === "urology"
                ? "bg-sky-500 text-white shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Urology
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[260px] sm:h-[300px] my-1 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full" />

        <div className="absolute top-2 right-2 flex flex-col gap-1 z-20">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? "Pause Rotation" : "Resume Rotation"}
            className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-200 hover:text-white hover:bg-black/70 transition shadow-sm"
          >
            {isRotating ? (
              <Pause className="w-3.5 h-3.5 text-teal-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-teal-400" />
            )}
          </button>
        </div>

        {/* Anatomical Hotspots Tags */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1.5 pointer-events-auto">
            {currentHotspots.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHotspot(h)}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold border transition-all ${
                  activeHotspot?.id === h.id
                    ? "bg-teal-500 text-white border-teal-300 shadow-md scale-105"
                    : "bg-slate-900/80 backdrop-blur-sm text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {h.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Information Feedback Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHotspot ? activeHotspot.id : mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 bg-slate-800/90 backdrop-blur-md rounded-xl p-3 border border-white/10 text-xs flex items-start gap-2.5 shadow-md mt-1"
        >
          <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white text-xs">
              {activeHotspot
                ? activeHotspot.title
                : mode === "nephrology"
                  ? "Renal Filtration Anatomy"
                  : "Urinary Tract & Bladder Anatomy"}
            </h4>
            <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
              {activeHotspot
                ? activeHotspot.desc
                : mode === "nephrology"
                  ? "Filters ~180 liters of blood daily, regulating blood pressure, electrolytes, and clearing metabolic waste under Dr. Sagar Damodar Sarda."
                  : "Complete urinary tract system featuring bilateral kidneys, muscular peristaltic ureters, hollow urinary bladder dome, and prostatic/urethral outflow channel."}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
