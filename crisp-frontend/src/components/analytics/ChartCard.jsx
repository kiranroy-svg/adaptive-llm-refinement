import Card from "../common/Card"

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <Card className={className} padding="p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="mt-6">{children}</div>
    </Card>
  )
}

export default ChartCard
