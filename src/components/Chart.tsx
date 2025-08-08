import { useEffect, useRef } from "react";
import type { JSX } from "react";
import * as d3 from "d3";
import type ChartDef from "../types/chart";

export default function Chart({
  chartDef,
}: {
  chartDef: ChartDef;
}): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const width = Math.max(600, container.clientWidth || 600);
    const height = 260;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const rows = chartDef.data || [];
    const isMulti = rows.some((r) => Array.isArray(r[1]));

    if (!isMulti) {
      const pts = rows.map(([t, v]) => ({ t: +t, v: v == null ? null : +v }));
      const x = d3
        .scaleLinear()
        .domain(d3.extent(pts, (d) => d.t) as [number, number])
        .range([0, innerW]);
      const yExtent = d3.extent(
        pts.filter((d) => d.v != null),
        (d) => d.v!
      );

      const yDomain: [number, number] =
        yExtent[0] !== undefined && yExtent[1] !== undefined
          ? [yExtent[0], yExtent[1]]
          : [0, 1];

      const y = d3.scaleLinear().domain(yDomain).nice().range([innerH, 0]);

      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(6));
      g.append("g").call(d3.axisLeft(y).ticks(5));

      const line = d3
        .line<{ t: number; v: number | null }>()
        .defined((d) => d.v != null)
        .x((d) => x(d.t))
        .y((d) => y(d.v!));

      g.append("path")
        .datum(pts)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
      g.selectAll("circle")
        .data(pts.filter((d) => d.v != null))
        .join("circle")
        .attr("cx", (d) => x(d.t))
        .attr("cy", (d) => y(d.v!))
        .attr("r", 2.6);
    } else {
      const maxLen =
        d3.max(rows, (r) => (Array.isArray(r[1]) ? r[1].length : 1)) || 1;
      const series = d3
        .range(maxLen)
        .map((idx) => ({
          key: idx,
          values: [] as { t: number; v: number | null }[],
        }));

      rows.forEach(([t, arrOrVal]) => {
        const tnum = +t;
        if (!Array.isArray(arrOrVal)) {
          series[0].values.push({
            t: tnum,
            v: arrOrVal == null ? null : +arrOrVal,
          });
          series.slice(1).forEach((s) => s.values.push({ t: tnum, v: null }));
        } else {
          arrOrVal.map((val, i) => {
            const v = val == null ? null : +val;
            series[i]?.values.push({ t: tnum, v });
          });
          if (arrOrVal.length < maxLen) {
            series
              .slice(arrOrVal.length)
              .forEach((s) => s.values.push({ t: tnum, v: null }));
          }
        }
      });

      const x = d3
        .scaleLinear()
        .domain(d3.extent(rows.map((r) => +r[0])) as [number, number])
        .range([0, innerW]);
      const allVals = series
        .flatMap((s) => s.values.map((d) => d.v))
        .filter((v) => v != null) as number[];
      const y = d3
        .scaleLinear()
        .domain(
          allVals.length ? (d3.extent(allVals) as [number, number]) : [0, 1]
        )
        .nice()
        .range([innerH, 0]);

      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(6));
      g.append("g").call(d3.axisLeft(y).ticks(5));

      const colors = ["blue", "green", "red"];
      const line = d3
        .line<{ t: number; v: number | null }>()
        .defined((d) => d.v != null)
        .x((d) => x(d.t))
        .y((d) => y(d.v!));

      series.forEach((s, i) => {
        g.append("path")
          .datum(s.values)
          .attr("fill", "none")
          .attr("stroke", colors[i % colors.length])
          .attr("stroke-width", 2)
          .attr("d", line);

        g.selectAll(`.pt-${i}`)
          .data(s.values.filter((d) => d.v != null))
          .join("circle")
          .attr("class", `pt-${i}`)
          .attr("cx", (d) => x(d.t))
          .attr("cy", (d) => y(d.v!))
          .attr("r", 2.2);
      });
    }
  }, [chartDef]);

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: 900 }}>
      <svg
        ref={svgRef}
        style={{ width: "100%", height: 260, display: "block" }}
      />
    </div>
  );
}
