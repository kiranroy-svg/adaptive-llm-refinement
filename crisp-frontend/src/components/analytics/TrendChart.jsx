import ChartCard from "./ChartCard"

function TrendChart({ data, title, subtitle, series, maxValue, suffix = "" }) {
  const width = 640
  const height = 250
  const pad = { top: 15, right: 18, bottom: 32, left: 44 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const minValue = 0
  const x = (index) => pad.left + (index / (data.length - 1)) * plotW
  const y = (value) => pad.top + ((maxValue - value) / (maxValue - minValue)) * plotH
  const pathFor = (key) => data.map((point, index) => `${index ? "L" : "M"} ${x(index)} ${y(point[key])}`).join(" ")
  const ticks = 5

  return (
    <ChartCard title={title} subtitle={subtitle}>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[560px] w-full" role="img" aria-label={title}>
          {Array.from({ length: ticks }, (_, index) => {
            const tick = (maxValue / (ticks - 1)) * index
            return (
              <g key={tick}>
                <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke="rgb(30 41 59)" />
                <text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" fill="rgb(100 116 139)" fontSize="11">{tick.toFixed(maxValue < 10 ? 1 : 0)}{suffix}</text>
              </g>
            )
          })}
          {series.map((line) => (
            <path key={line.key} d={pathFor(line.key)} fill="none" stroke={line.stroke} strokeWidth="2.5" />
          ))}
          {data.map((point, index) => (
            <text key={point.label} x={x(index)} y={height - 8} textAnchor="middle" fill="rgb(100 116 139)" fontSize="11">{point.label}</text>
          ))}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-500">
        {series.map((line) => (
          <span key={line.key} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: line.stroke }} />{line.label}</span>
        ))}
      </div>
    </ChartCard>
  )
}

export default TrendChart
