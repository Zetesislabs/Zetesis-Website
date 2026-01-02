import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3CausalGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    // Visual Philosophy: "Instruction-Based"
    // Create a regular grid of potential nodes
    const cols = 6;
    const rows = 4;
    const spacingX = width / cols;
    const spacingY = height / rows;

    const nodes = [];
    for(let i=1; i<cols; i++) {
        for(let j=1; j<rows; j++) {
            // Randomly decide if a node exists here (Construction logic)
            if(Math.random() > 0.4) {
                nodes.push({
                    id: `${i}-${j}`,
                    x: i * spacingX,
                    y: j * spacingY,
                    active: Math.random() > 0.5
                });
            }
        }
    }

    // Links based on proximity
    const links = [];
    nodes.forEach((node, i) => {
        nodes.forEach((target, j) => {
            if(i !== j) {
                const dx = node.x - target.x;
                const dy = node.y - target.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                // Connect if close and "downstream" (x increases)
                if(dist < spacingX * 1.5 && target.x > node.x) {
                    links.push({ source: node, target: target });
                }
            }
        });
    });

    // Draw grid "Paper" background lines
    const gridGroup = svg.append("g").attr("stroke", "#e5e5e5").attr("stroke-width", 1);
    for(let i=0; i<=cols; i++) {
        gridGroup.append("line").attr("x1", i*spacingX).attr("y1", 0).attr("x2", i*spacingX).attr("y2", height);
    }
    for(let i=0; i<=rows; i++) {
        gridGroup.append("line").attr("x1", 0).attr("y1", i*spacingY).attr("x2", width).attr("y2", i*spacingY);
    }

    // Draw Links
    svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("x1", (d:any) => d.source.x)
        .attr("y1", (d:any) => d.source.y)
        .attr("x2", (d:any) => d.target.x)
        .attr("y2", (d:any) => d.target.y)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#arrow-head)");

    // Draw Nodes
    svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 4)
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5);

    // Arrow def
    svg.append("defs").append("marker")
        .attr("id", "arrow-head")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#000");

  }, []);

  return (
    <div className="w-full h-full relative bg-white">
      <div className="absolute top-2 left-2 text-[10px] font-mono bg-white px-1 border border-black z-10">
          FIG 1.1: LATTICE_GENERATION
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default D3CausalGraph;