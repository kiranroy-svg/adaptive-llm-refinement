import ChartCard from "./ChartCard"

function BarChart({ data, title, subtitle, valueSuffix = "", maxValue = 100 }) {
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-sm text-slate-400">{item.label}</span>
              <span className="text-sm font-medium text-white">{item.value}{valueSuffix}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-purple-600 transition-all" style={{ width: `${Math.min((item.value / maxValue) * 100, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

export default BarChart
