"use client";

import React, { useEffect, useRef } from "react";

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Pause animation when off-screen to conserve CPU/GPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          draw();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Node count scaled by viewport width (fewer on mobile)
    const isMobile = width < 768;
    const nodeCount = isMobile ? 18 : 36;

    interface DepthNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      depth: number; // Parallax depth layer factor (0.3 to 1.5)
      pulse: number;
      pulseDirection: number;
    }

    const nodes: DepthNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const depth = Math.random() * 1.2 + 0.3; // depth range [0.3, 1.5]
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3 * depth,
        vy: (Math.random() - 0.5) * 0.3 * depth,
        radius: (Math.random() * 1.2 + 1) * depth,
        depth: depth,
        pulse: Math.random(),
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible || isTouchDevice) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
      if (!isVisible) return;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid overlay
      ctx.strokeStyle = "rgba(142, 142, 147, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 64;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active connections & nodes with depth field offset
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          node.pulse += 0.008 * node.pulseDirection;
          if (node.pulse > 1 || node.pulse < 0) node.pulseDirection *= -1;
        }

        // Parallax cursor displacement scaled by node depth
        let renderX = node.x;
        let renderY = node.y;

        if (mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
          const offsetX = (mouse.x - width / 2) * 0.03 * node.depth;
          const offsetY = (mouse.y - height / 2) * 0.03 * node.depth;
          renderX += offsetX;
          renderY += offsetY;
        }

        // Render node dot
        const alpha = 0.12 + node.pulse * 0.25 * (node.depth / 1.5);
        ctx.fillStyle = `rgba(200, 255, 68, ${alpha})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, node.radius + node.pulse * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Mouse proximity connection
        if (!prefersReducedMotion && mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
          const dx = mouse.x - renderX;
          const dy = mouse.y - renderY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxCursorDist = 180;

          if (dist < maxCursorDist) {
            const lineAlpha = (1 - dist / maxCursorDist) * 0.22 * node.depth;
            ctx.strokeStyle = `rgba(200, 255, 68, ${lineAlpha})`;
            ctx.lineWidth = 0.7 * node.depth;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Mesh interconnect between adjacent nodes
        for (let j = 0; j < nodes.length; j++) {
          const other = nodes[j];
          if (node === other) continue;

          let otherRenderX = other.x;
          let otherRenderY = other.y;
          if (mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
            otherRenderX += (mouse.x - width / 2) * 0.03 * other.depth;
            otherRenderY += (mouse.y - height / 2) * 0.03 * other.depth;
          }

          const odx = otherRenderX - renderX;
          const ody = otherRenderY - renderY;
          const odist = Math.sqrt(odx * odx + ody * ody);
          const maxMeshDist = 100;

          if (odist < maxMeshDist) {
            const meshAlpha = (1 - odist / maxMeshDist) * 0.07;
            ctx.strokeStyle = `rgba(243, 243, 245, ${meshAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(otherRenderX, otherRenderY);
            ctx.stroke();
          }
        }
      });

      if (!prefersReducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove);
        if (canvas) canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (!prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-75" />;
}
