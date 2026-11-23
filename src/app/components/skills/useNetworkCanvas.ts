import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { advanceNetwork, createNetwork } from './physics';
import type { Network, Pin, Point } from './physics';
import { paintNetwork, prepareViews, readPalette } from './rendering';
import type { Camera, NodeView } from './rendering';

type Controls = {
  zoom: (factor: number) => void;
  reset: () => void;
  select: (index: number) => void;
};

type Gesture = {
  id: number;
  index: number;
  start: Point;
  offset: Point;
  camera: Point;
  touch: boolean;
  moved: boolean;
};

export function useNetworkCanvas(
  stageRef: RefObject<HTMLDivElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
  onSelect: (index: number) => void,
) {
  const controls = useRef<Controls | null>(null);

  useEffect(() => {
    const stageElement = stageRef.current;
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext('2d');
    if (!stageElement || !canvasElement || !context) return;

    const stage = stageElement;
    const canvas = canvasElement;
    const ctx = context;
    const targets = Array.from(stage.querySelectorAll<HTMLElement>('[data-network-node]'));
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = matchMedia('(any-pointer: coarse)');
    const camera: Camera = { x: 0, y: 0, scale: 1 };
    let palette = readPalette(stage);
    let reduced = motion.matches;
    let network: Network | null = null;
    let views: NodeView[] = [];
    let ratio = 1;
    let frame = 0;
    let last = 0;
    let clock = 0;
    let settlingUntil = 2.7;
    let inView = false;
    let hovered = -1;
    let active = -1;
    let pin: Pin | null = null;
    let gesture: Gesture | null = null;

    function draw(ease: number) {
      if (!network) return;
      paintNetwork(ctx, network, views, camera, palette, ratio, clock, active, hovered, ease, !reduced);
      if (coarse.matches) {
        targets.forEach((target, index) => {
          const view = views[index];
          const x = view.x * camera.scale + camera.x;
          const y = view.y * camera.scale + camera.y;
          const radius = Math.max(12, view.size * camera.scale + 3);
          target.style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0) scale(${radius / 12})`;
        });
      }
    }

    function animate(now: number) {
      frame = 0;
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      clock += dt;
      if (network && (pin || clock < settlingUntil)) advanceNetwork(network, dt, pin);
      draw(Math.min(1, dt * 12));
      updateLoop();
    }

    function updateLoop() {
      const shouldRun = inView && !document.hidden && !reduced;
      if (shouldRun && !frame) frame = requestAnimationFrame(animate);
      if (!shouldRun) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      }
    }

    function resetCamera() {
      camera.x = camera.y = 0;
      camera.scale = 1;
    }

    function resize() {
      const { width, height } = stage.getBoundingClientRect();
      const nextRatio = Math.min(devicePixelRatio || 1, width < 470 ? 1.6 : 2);
      if (!width || !height) return;
      if (network?.width === width && network.height === height && ratio === nextRatio) return;

      ratio = nextRatio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      network = createNetwork(width, height, !reduced && clock < 0.5);
      views = prepareViews(ctx, network);
      pin = null;
      if (gesture) endGesture(gesture.id);
      hovered = -1;
      resetCamera();
      settlingUntil = clock + 2.7;
      draw(1);
    }

    function select(index: number) {
      active = index;
      hovered = -1;
      onSelect(index);
      draw(1);
    }

    function reset() {
      if (network) network = createNetwork(network.width, network.height, false);
      pin = null;
      hovered = -1;
      resetCamera();
      select(-1);
    }

    function zoom(factor: number, point?: Point) {
      if (!network) return false;
      const old = camera.scale;
      const next = Math.max(0.65, Math.min(2.8, old * factor));
      if (next === old) return false;
      const x = point?.x ?? network.width / 2;
      const y = point?.y ?? network.height / 2;
      camera.x = x - (x - camera.x) * next / old;
      camera.y = y - (y - camera.y) * next / old;
      camera.scale = next;
      draw(1);
      return true;
    }

    function localPoint(event: MouseEvent): Point {
      const bounds = stage.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    }

    function worldPoint(point: Point): Point {
      return { x: (point.x - camera.x) / camera.scale, y: (point.y - camera.y) / camera.scale };
    }

    function hit(point: Point) {
      const { x, y } = worldPoint(point);
      let nearest = -1;
      let best = Infinity;
      let label = -1;
      for (let index = 0; index < views.length; index++) {
        const view = views[index];
        const dx = x - view.x;
        const dy = y - view.y;
        const distance = dx * dx + dy * dy;
        if (distance < (view.size + 7) ** 2 && distance < best) {
          best = distance;
          nearest = index;
        }
        if (Math.abs(x - view.labelX) <= view.labelWidth / 2 + 3 && y >= view.labelTop - 2
          && y <= view.labelTop + view.lines.length * view.lineHeight + 2) label = index;
      }
      return nearest >= 0 ? nearest : label;
    }

    function pointerDown(event: PointerEvent) {
      if (!network || gesture || event.button !== 0) return;
      const start = localPoint(event);
      const target = event.target instanceof HTMLElement ? event.target.dataset.networkNode : undefined;
      const index = target === undefined ? hit(start) : Number(target);
      const world = worldPoint(start);
      const node = network.bodies[index];
      const touch = event.pointerType === 'touch';
      gesture = {
        id: event.pointerId, index, start, touch, moved: false,
        offset: node ? { x: node.x - world.x, y: node.y - world.y } : { x: 0, y: 0 },
        camera: { x: camera.x, y: camera.y },
      };
      if (!touch || target !== undefined) stage.setPointerCapture(event.pointerId);
    }

    function pointerMove(event: PointerEvent) {
      if (!network) return;
      const point = localPoint(event);
      if (!gesture) {
        if (event.pointerType !== 'touch') {
          const next = hit(point);
          if (next !== hovered) {
            hovered = next;
            if (reduced) draw(1);
          }
        }
        return;
      }
      if (event.pointerId !== gesture.id) return;
      const dx = point.x - gesture.start.x;
      const dy = point.y - gesture.start.y;
      gesture.moved ||= dx * dx + dy * dy > 25;
      if (!gesture.moved) return;

      if (gesture.index >= 0) {
        const world = worldPoint(point);
        pin = { index: gesture.index, x: world.x + gesture.offset.x, y: world.y + gesture.offset.y };
        hovered = gesture.index;
        settlingUntil = clock + 2.7;
        if (reduced) {
          advanceNetwork(network, 1 / 30, pin);
          draw(1);
        }
      } else if (!gesture.touch) {
        camera.x = gesture.camera.x + dx;
        camera.y = gesture.camera.y + dy;
        hovered = -1;
        draw(1);
      }
      stage.style.cursor = 'grabbing';
    }

    function endGesture(id: number) {
      gesture = null;
      pin = null;
      stage.style.cursor = '';
      if (stage.hasPointerCapture(id)) stage.releasePointerCapture(id);
    }

    function pointerUp(event: PointerEvent) {
      if (gesture?.id !== event.pointerId) return;
      if (!gesture.moved) select(gesture.index);
      endGesture(event.pointerId);
      hovered = event.pointerType === 'touch' ? -1 : hit(localPoint(event));
      if (reduced) draw(1);
    }

    function pointerCancel(event: PointerEvent) {
      if (gesture?.id !== event.pointerId) return;
      endGesture(event.pointerId);
      hovered = -1;
      if (reduced) draw(1);
    }

    function pointerLeave() {
      if (gesture) return;
      hovered = -1;
      if (reduced) draw(1);
    }

    function wheel(event: WheelEvent) {
      if (gesture || event.ctrlKey || event.metaKey) return;
      const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 120 : 1;
      if (zoom(Math.exp(Math.max(-0.3, Math.min(0.3, -event.deltaY * units * 0.0018))), localPoint(event))) event.preventDefault();
    }

    function doubleClick(event: MouseEvent) {
      if (hit(localPoint(event)) < 0) reset();
    }

    function updateMotion() {
      reduced = motion.matches;
      if (network && reduced) network = createNetwork(network.width, network.height, false);
      updateLoop();
      draw(1);
    }

    controls.current = { select, reset, zoom };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateLoop();
    });
    const themeObserver = new MutationObserver(() => {
      palette = readPalette(stage);
      draw(1);
    });
    resizeObserver.observe(stage);
    intersectionObserver.observe(stage);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const listeners = new AbortController();
    const { signal } = listeners;
    stage.addEventListener('pointerdown', pointerDown, { signal });
    stage.addEventListener('pointermove', pointerMove, { signal });
    stage.addEventListener('pointerup', pointerUp, { signal });
    stage.addEventListener('pointercancel', pointerCancel, { signal });
    stage.addEventListener('lostpointercapture', pointerCancel, { signal });
    stage.addEventListener('pointerleave', pointerLeave, { signal });
    stage.addEventListener('wheel', wheel, { passive: false, signal });
    stage.addEventListener('dblclick', doubleClick, { signal });
    window.addEventListener('resize', resize, { signal });
    document.addEventListener('visibilitychange', updateLoop, { signal });
    motion.addEventListener('change', updateMotion, { signal });
    coarse.addEventListener('change', () => draw(1), { signal });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (gesture) endGesture(gesture.id);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      listeners.abort();
      controls.current = null;
    };
  }, [stageRef, canvasRef, onSelect]);

  return controls;
}
