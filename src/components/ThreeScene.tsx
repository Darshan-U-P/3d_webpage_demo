import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    mount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.36, 120, 20);
    const material = new THREE.MeshStandardMaterial({color: 0x00f2ff, wireframe: true, transparent: true, opacity: 0.8});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.4, 1.4, 1.4);
    scene.add(mesh);

    // Glowing core
    const coreGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.scale.set(1.2, 1.2, 1.2);
    scene.add(coreMesh);
    
    // Core glow
    const glowMaterial = new THREE.MeshBasicMaterial({color: 0x00f2ff, transparent: true, opacity: 0.3});
    const glowMesh = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 32), glowMaterial);
    coreMesh.add(glowMesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    camera.position.z = 6;

    // Responsive handling
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const targetRotation = new THREE.Vector2(0, 0);
    let isHovered = false;

    const onPointerMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(mesh, false);
      isHovered = intersects.length > 0;

      targetRotation.x = pointer.y * 0.4;
      targetRotation.y = pointer.x * 0.8;

      if (isHovered) {
        gsap.to(mesh.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.2 });
        gsap.to(material.color, { r: 0.2, g: 0.9, b: 1, duration: 0.3 });
      } else {
        gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.2 });
        gsap.to(material.color, { r: 0, g: 0.95, b: 1, duration: 0.3 });
      }
    };

    const onPointerLeave = () => {
      isHovered = false;
      targetRotation.set(0, 0);
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    };

    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerleave', onPointerLeave);

    let prevTime = performance.now();

    const animate = () => {
      requestAnimationFrame(animate);

      const currentTime = performance.now();
      const delta = (currentTime - prevTime) / 1000;
      prevTime = currentTime;

      const time = currentTime / 1000;

      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRotation.x + Math.sin(time * 0.3) * 0.2, 0.08);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRotation.y + time * 0.2, 0.08);

      renderer.render(scene, camera);
    };
    animate();

    // GSAP Scroll Animation
    gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: mount,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      resizeObserver.disconnect();      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
