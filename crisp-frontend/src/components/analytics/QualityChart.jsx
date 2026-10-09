import ChartCard from "./ChartCard"

function QualityChart({ data }) {
  const width = 640
  const height = 250
  const pad = { top: 15, right: 18, bottom: 32, left: 38 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const x = (index) => pad.left + (index / (data.length - 1)) * plotW
  const y = (value) => pad.top + ((100 - value) / 25) * plotH
  const pathFor = (key) => data.map((point, index) => `${index ? "L" : "M"} ${x(index)} ${y(point[key])}`).join(" ")

  return (
    <ChartCard title="Initial vs Final Quality" subtitle="Average response quality before and after refinement.">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[560px] w-full" role="img" aria-label="Initial versus final quality chart">
          {[80, 85, 90, 95, 100].map((tick) => (
            <g key={tick}>
              <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke="rgb(30 41 59)" />
              <text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" fill="rgb(100 116 139)" fontSize="11">{tick}</text>
            </g>
          ))}
          <path d={pathFor("initial")} fill="none" stroke="rgb(100 116 139)" strokeWidth="2.5" />
          <path d={pathFor("final")} fill="none" stroke="rgb(147 51 234)" strokeWidth="2.5" />
          {data.map((point, index) => (
            <g key={point.label}>
              <circle cx={x(index)} cy={y(point.initial)} r="3" fill="rgb(100 116 139)" />
              <circle cx={x(index)} cy={y(point.final)} r="3" fill="rgb(147 51 234)" />
              <text x={x(index)} y={height - 8} textAnchor="middle" fill="rgb(100 116 139)" fontSize="11">{point.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-3 flex gap-5 text-xs text-slate-500">
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-500" />Initial</span>
        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-600" />Final</span>
      </div>
    </ChartCard>
  )
}

export default QualityChart
