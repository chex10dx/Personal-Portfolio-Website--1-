import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { advanceNetwork, createNetwork } from './physics';
import type { Network, Pin, Point } from './physics';
import { paintNetwork, prepareViews, readPalette } from './rendering';
import type { Camera, NodeView } from './rendering';
import type { GraphData, SkillNode } from './networkData';
import type { StackCopy } from './SkillDetails';
import type { Locale } from '../../../i18n/routing';

type Controls = {
  zoom: (factor: number) => void;
  reset: () => void;
  setGraph: (graph: GraphData, activeId?: SkillNode['id']) => void;
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
  stageRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  onSelect: (node: SkillNode | null) => void,
  locale: Locale,
  copy: StackCopy,
  graph: GraphData,
  activeId?: SkillNode['id'],
) {
  const controls = useRef<Controls | null>(null);
  const strings = useRef({ locale, copy });
  const initialGraph = useRef(graph);
  const refreshLabels = useRef<(() => void) | null>(null);

  useEffect(() => {
    strings.current = { locale, copy };
    refreshLabels.current?.();
  }, [locale, copy]);

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
    let currentGraph = initialGraph.current;
    let selectedId: SkillNode['id'] | undefined;
    let network: Network | null = null;
    let views: NodeView[] = [];
    let ratio = 1;
    let frame = 0;
    let last = 0;
    let clock = 0;
    let settlingUntil = 1.9;
    let motionUntil = 1.9;
    let inView = false;
    let hovered = -1;
    let active = -1;
    let pin: Pin | null = null;
    let gesture: Gesture | null = null;
    let disposed = false;
    let labelRevision = 0;

    function measureLabels(keepStyles: boolean) {
      if (!network) return;
      views = prepareViews(ctx, network, strings.current.copy, strings.current.locale, keepStyles ? views : undefined);
    }

    function redrawLabels() {
      const revision = ++labelRevision;
      measureLabels(true);
      draw(1);
      if (strings.current.locale !== 'ar') return;
      void Promise.all([500, 700].map((weight) => document.fonts.load(`${weight} 12px "IBM Plex Sans Arabic"`, 'العربية')))
        .then(() => {
          if (disposed || revision !== labelRevision) return;
          measureLabels(true);
          draw(1);
        })
        .catch(() => {
          // The system Arabic font remains available if the webfont fails to load.
        });
    }

    function draw(ease: number) {
      if (!network) return;
      paintNetwork(ctx, network, views, camera, palette, ratio, clock, active, hovered, ease, !reduced);
      if (coarse.matches) {
        targets.forEach((target, index) => {
          const view = views[index];
          target.hidden = !view;
          if (!view) return;
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
      const shouldRun = inView && !document.hidden && !reduced && (pin !== null || clock < motionUntil);
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
      rebuild(width, height);
    }

    function rebuild(width: number, height: number) {
      if (gesture) endGesture(gesture.id);
      resetCamera();
      clock = 0;
      last = 0;
      network = createNetwork(width, height, currentGraph, !reduced);
      active = currentGraph.nodes.findIndex(({ id }) => id === selectedId);
      hovered = -1;
      settlingUntil = motionUntil = 1.9;
      measureLabels(false);
      draw(1);
      updateLoop();
    }

    function setGraph(next: GraphData, nextId?: SkillNode['id']) {
      const changed = next !== currentGraph;
      currentGraph = next;
      selectedId = nextId;
      if (!network) return;
      if (changed) {
        rebuild(network.width, network.height);
        return;
      }
      active = currentGraph.nodes.findIndex(({ id }) => id === selectedId);
      hovered = -1;
      draw(1);
    }

    function reset() {
      onSelect(null);
      if (network) rebuild(network.width, network.height);
    }

    function updateHover(index: number) {
      if (hovered === index) return;
      hovered = index;
      if (reduced) draw(1);
      else {
        motionUntil = Math.max(motionUntil, clock + 0.22);
        updateLoop();
      }
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
        if (view.showLabel && Math.abs(x - view.labelX) <= view.labelWidth / 2 + 3 && y >= view.labelTop - 2
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
      if (!touch || target !== undefined || stage.dataset.touchPan === 'true') stage.setPointerCapture(event.pointerId);
    }

    function pointerMove(event: PointerEvent) {
      if (!network) return;
      const point = localPoint(event);
      if (!gesture) {
        if (event.pointerType !== 'touch') updateHover(hit(point));
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
        settlingUntil = motionUntil = clock + 1.8;
        if (reduced) {
          advanceNetwork(network, 1 / 30, pin);
          draw(1);
        } else updateLoop();
      } else if (!gesture.touch || stage.dataset.touchPan === 'true') {
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
      const { moved, index } = gesture;
      endGesture(event.pointerId);
      if (!moved) onSelect(currentGraph.nodes[index] ?? null);
      updateHover(event.pointerType === 'touch' ? -1 : hit(localPoint(event)));
    }

    function pointerCancel(event: PointerEvent) {
      if (gesture?.id !== event.pointerId) return;
      endGesture(event.pointerId);
      updateHover(-1);
    }

    function pointerLeave() {
      if (gesture) return;
      updateHover(-1);
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
      if (network) rebuild(network.width, network.height);
    }

    controls.current = { setGraph, reset, zoom };
    refreshLabels.current = redrawLabels;
    resize();
    if (strings.current.locale === 'ar') redrawLabels();
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
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (gesture) endGesture(gesture.id);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      listeners.abort();
      controls.current = null;
      refreshLabels.current = null;
    };
  }, [stageRef, canvasRef, onSelect]);

  useEffect(() => {
    controls.current?.setGraph(graph, activeId);
  }, [graph, activeId]);

  return controls;
}
