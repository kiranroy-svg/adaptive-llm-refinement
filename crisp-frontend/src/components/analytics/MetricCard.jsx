import Card from "../common/Card"

function MetricCard({ label, value, detail }) {
  return (
    <Card className="p-5" padding="">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-600">{detail}</p>
    </Card>
  )
}

export default MetricCard
