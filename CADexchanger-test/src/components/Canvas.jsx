import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const Canvas = () => {
  const ref = useRef(null)
  const coordinates = useSelector((state) => state.coordinates);
  const indices = useSelector((state) => state.indices);
  const radius = useSelector((state) => state.radius);
  const sections = useSelector((state) => state.sections);
  const height = useSelector((state) => state.height);
  const wireframeState = useSelector((state) => state.wireframe)

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = ref.current

    const geometry = new THREE.BufferGeometry();

    const points = new Float32Array(coordinates);

    const pointsBuffer = new THREE.BufferAttribute(points, 3);
    geometry.setAttribute('position', pointsBuffer);
    geometry.setIndex(indices);

    const circleGeometry = new THREE.CircleGeometry(radius, sections);

    const material = new THREE.MeshBasicMaterial({
      color: "gray",
      wireframe: wireframeState,
    });

    const circle = new THREE.Mesh(circleGeometry, material);
    circle.position.z = -height;
    scene.add(circle)

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const cursor = {
      width: 0,
      height: 0
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 100;

    const controls = new OrbitControls(camera, canvas)

    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    window.addEventListener('mousemove', (event) => {
      cursor.x = -(event.clientX / sizes.width - 0.5);
      cursor.y = event.clientY / sizes.width - 0.5;
    })

    const tick = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick)
    }

    tick()

  }, [coordinates, wireframeState]);

  return (
    <canvas ref={ref} />
  )
}