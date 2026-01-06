import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';

// Types
interface Node {
    id: string;
    x: number;
    y: number;
    type: 'base' | 'target' | 'parent' | 'new';
}

interface Link {
    source: string;
    target: string;
}

const D3CausalGraph: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // 1. Measure container size
    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // 2. Scroll Progress Hook
    // We need to attach this to the parent section or window depending on layout.
    // For now, assuming the component is inside the sticky intro section.
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end start"] // Adjust based on where this component lives relative to viewport
    });

    // 3. Map Scroll to Animation Phases - ULTRA FAST
    // 0.00 - 0.04: Highlight
    // 0.04 - 0.07: Deletion
    // 0.07 - 0.10: Addition
    const phase1 = useTransform(scrollYProgress, [0, 0.04], [0, 1]); // Highlight
    const phase2 = useTransform(scrollYProgress, [0.04, 0.07], [1, 0]); // Deletion (Opacity)
    const phase3 = useTransform(scrollYProgress, [0.07, 0.10], [0, 1]); // Addition (Count)


    // 4. Generate Initial Static Graph (The "Base" State)
    const { initialNodes, initialLinks, targetNodeId, parentIds } = useMemo(() => {
        if (dimensions.width === 0) return { initialNodes: [], initialLinks: [], targetNodeId: '', parentIds: [] };

        const cols = 5;
        const rows = 4;
        const spacingX = dimensions.width / cols;
        const spacingY = dimensions.height / rows;

        let nodes: Node[] = [];

        // Create grid
        for (let i = 1; i < cols; i++) {
            for (let j = 1; j < rows; j++) {
                // "Base" lattice
                if (Math.random() > 0.3) {
                    nodes.push({
                        id: `${i}-${j}`,
                        x: i * spacingX,
                        y: j * spacingY,
                        type: 'base'
                    });
                }
            }
        }

        // Identify a "Target" node in the middle-ish
        // Identify a "Target" node that HAS connections
        // Filter nodes that have at least one potential connection to ensure it's not independent
        const candidates = nodes.filter(n => {
            // Check if it would have any parents
            const hasParents = nodes.some(other => {
                const dx = n.x - other.x;
                return dx > 0 && Math.hypot(n.x - other.x, n.y - other.y) < spacingX * 1.8;
            });
            return hasParents && n.x > dimensions.width * 0.3 && n.x < dimensions.width * 0.7;
        });

        const target = candidates.length > 0
            ? candidates[Math.floor(Math.random() * candidates.length)]
            : nodes.find(n => n.x > dimensions.width * 0.4);

        const targetId = target ? target.id : (nodes[0]?.id || '');
        const pIds: string[] = [];

        // Assign Types
        nodes = nodes.map(n => {
            if (n.id === targetId) return { ...n, type: 'target' };

            // Simple "Parent" logic: close and to the left
            const dx = target ? target.x - n.x : 0;
            const dy = target ? target.y - n.y : 0;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (target && n.x < target.x && dist < spacingX * 2) {
                pIds.push(n.id);
                return { ...n, type: 'parent' };
            }
            return n;
        });

        // Links
        const links: Link[] = [];
        nodes.forEach(source => {
            nodes.forEach(targetNode => {
                if (source.id === targetNode.id) return;
                // Simple Directed DAG logic: left to right
                const dx = targetNode.x - source.x;
                const dy = targetNode.y - source.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dx > 0 && dist < spacingX * 1.8) {
                    links.push({ source: source.id, target: targetNode.id });
                }
            });
        });

        return { initialNodes: nodes, initialLinks: links, targetNodeId: targetId, parentIds: pIds };
    }, [dimensions]);

    // 5. Generate "New" Nodes (Fixed logic to prevent floating edges)
    // We compute their links HERE, statically, relative to the *initial* graph.
    const { newNodes, newLinks } = useMemo(() => {
        if (dimensions.width === 0) return { newNodes: [], newLinks: [] };
        // Deterministic "random" setup based on dimensions to keep it stable during render
        const count = 15;
        const nodes: Node[] = [];
        const links: Link[] = [];

        for (let k = 0; k < count; k++) {
            const newNode = {
                id: `new-${k}`,
                // Try to place them in the "hole" created by the deleted node, or generally around
                x: Math.random() * dimensions.width * 0.6 + dimensions.width * 0.2,
                y: Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1,
                type: 'new' as const
            };
            nodes.push(newNode);

            // Find a VALID neighbor to connect FROM
            // Must be an existing 'base' or 'parent' node (not target, not another new node to avoid chains for now)
            // And must be to the LEFT (causal direction)
            const validParents = initialNodes.filter(n =>
                n.type !== 'target' &&
                n.x < newNode.x &&
                Math.hypot(n.x - newNode.x, n.y - newNode.y) < dimensions.width / 4
            );

            if (validParents.length > 0) {
                // Pick the closest one
                const nearest = validParents.reduce((prev, curr) => {
                    const dCurr = Math.hypot(curr.x - newNode.x, curr.y - newNode.y);
                    const dPrev = Math.hypot(prev.x - newNode.x, prev.y - newNode.y);
                    return dCurr < dPrev ? curr : prev;
                });
                links.push({ source: nearest.id, target: newNode.id });
            }
        }
        return { newNodes: nodes, newLinks: links };
    }, [dimensions, initialNodes]); // Re-run if initial network changes

    // Animation State Listeners
    const [highlightProgress, setHighlightProgress] = useState(0);
    const [deleteOpacity, setDeleteOpacity] = useState(1);
    const [additionProgress, setAdditionProgress] = useState(0);

    useEffect(() => {
        const unsub1 = phase1.on("change", setHighlightProgress);
        const unsub2 = phase2.on("change", setDeleteOpacity);
        const unsub3 = phase3.on("change", setAdditionProgress);
        return () => { unsub1(); unsub2(); unsub3(); };
    }, [phase1, phase2, phase3]);


    // Helper for color interpolation
    const interpolateColor = (start: string, end: string, progress: number) => {
        return d3.interpolateRgb(start, end)(progress);
    };

    if (!dimensions.width) return <div ref={containerRef} className="w-full h-full" />;

    return (
        <div ref={containerRef} className="w-full h-full relative bg-white overflow-hidden">
            {/* Caption */}
            <div className="absolute top-2 left-2 text-[10px] font-mono bg-white px-1 border border-black z-10">
                FIG 1.1: CAUSAL_UPDATING (t={highlightProgress.toFixed(2)})
            </div>

            <svg className="w-full h-full">
                <defs>
                    <marker id="arrow-head" viewBox="0 -5 10 10" refX="15" refY="0" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M0,-5L10,0L0,5" fill="#000" />
                    </marker>
                    <marker id="arrow-head-purple" viewBox="0 -5 10 10" refX="15" refY="0" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M0,-5L10,0L0,5" fill="#8b5cf6" />
                    </marker>
                </defs>

                {/* LINKS */}
                {initialLinks.map((link, i) => {
                    const isTargetLink = link.target === targetNodeId || link.source === targetNodeId;
                    // If it's connected to target, it fades out with the target
                    const opacity = isTargetLink ? deleteOpacity : 1;

                    // Get coords
                    const s = initialNodes.find(n => n.id === link.source);
                    const t = initialNodes.find(n => n.id === link.target);
                    if (!s || !t) return null;

                    return (
                        <motion.line
                            key={`${s.id}-${t.id}`}
                            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                            stroke="black"
                            strokeWidth="1"
                            markerEnd="url(#arrow-head)"
                            initial={false}
                            animate={{ opacity }}
                            transition={{ duration: 0 }}
                        />
                    )
                })}
                {/* Dynamic New Links (Using pre-calculated valid links) */}
                {newLinks.map((link, i) => {
                    // Only show if the TARGET node (the new one) should be visible
                    // We need to find the index of the target node in newNodes to check animation progress
                    const targetIndex = newNodes.findIndex(n => n.id === link.target);
                    // Use a slightly loose comparison to avoid index -1 issues, though pre-calc should prevent it
                    const isVisible = targetIndex !== -1 && targetIndex < additionProgress * newNodes.length;

                    const s = initialNodes.find(n => n.id === link.source);
                    const t = newNodes.find(n => n.id === link.target);

                    if (!s || !t) return null;

                    return (
                        <motion.line
                            key={`new-link-${i}`}
                            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                            stroke="#8b5cf6" // Purple
                            strokeWidth="1"
                            markerEnd="url(#arrow-head-purple)"
                            // Init opacity 0. If visible, animate to 1.
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: isVisible ? 1 : 0,
                                opacity: isVisible ? 1 : 0
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    )
                })}


                {/* NODES */}
                {initialNodes.map((node) => {
                    let fill = "#ffffff";
                    let stroke = "#000000";
                    let opacity = 1;

                    if (node.type === 'target') {
                        stroke = interpolateColor("black", "red", highlightProgress);
                        opacity = deleteOpacity;
                    } else if (node.type === 'parent') {
                        stroke = interpolateColor("black", "orange", highlightProgress);
                    }

                    return (
                        <motion.circle
                            key={node.id}
                            cx={node.x}
                            cy={node.y}
                            r="4"
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="2"
                            initial={false}
                            animate={{ stroke, opacity }}
                            transition={{ duration: 0 }}
                        />
                    );
                })}

                {/* NEW NODES */}
                {newNodes.map((node, i) => {
                    // Only show if index < progress * total
                    const isVisible = i < additionProgress * newNodes.length;

                    return (
                        <motion.circle
                            key={node.id}
                            cx={node.x}
                            cy={node.y}
                            r={isVisible ? 4 : 0}
                            fill="#ffffff"
                            stroke="#8b5cf6" // Purple
                            strokeWidth="2"
                            initial={{ r: 0 }}
                            animate={{ r: isVisible ? 4 : 0 }}
                            transition={{ duration: 0.3, type: "spring" }}
                        />
                    )
                })}

            </svg>
        </div>
    );
};

export default D3CausalGraph;