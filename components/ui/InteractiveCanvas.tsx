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

    // Dynamic Nodes representing AI agent pathways
    const nodeCount = 38;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseDirection: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1,
        pulse: Math.random(),
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid overlay
      ctx.strokeStyle = "rgba(142, 142, 147, 0.04)";
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

      // Draw active connections & nodes
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          node.pulse += 0.008 * node.pulseDirection;
          if (node.pulse > 1 || node.pulse < 0) node.pulseDirection *= -1;
        }

        ctx.fillStyle = `rgba(200, 255, 68, ${0.1 + node.pulse * 0.25})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + node.pulse * 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (!prefersReducedMotion) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxCursorDist = 220;

          if (dist < maxCursorDist) {
            const alpha = (1 - dist / maxCursorDist) * 0.28;
            ctx.strokeStyle = `rgba(200, 255, 68, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        for (let j = 0; j < nodes.length; j++) {
          const other = nodes[j];
          if (node === other) continue;

          const odx = other.x - node.x;
          const ody = other.y - node.y;
          const odist = Math.sqrt(odx * odx + ody * ody);
          const maxMeshDist = 120;

          if (odist < maxMeshDist) {
            const alpha = (1 - odist / maxMeshDist) * 0.08;
            ctx.strokeStyle = `rgba(243, 243, 245, ${alpha})`;
            ctx.lineWidth = 0.45;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
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
      if (!prefersReducedMotion) {
        window.removeEventListener("mousemove", handleMouseMove);
        if (canvas) canvas.removeEventListener("mouseleave", handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-70" />;
}
