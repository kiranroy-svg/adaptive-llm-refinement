import { useState } from "react"
import PageHeader from "../components/common/PageHeader"
import Card from "../components/common/Card"
import Button from "../components/common/Button"
import Badge from "../components/common/Badge"
import { modelOptions } from "../data/mockAnalytics"

const initialWeights = { Accuracy: 25, Completeness: 20, Reasoning: 20, Clarity: 20, Safety: 15 }

function Settings() {
  const [model, setModel] = useState(modelOptions[0])
  const [threshold, setThreshold] = useState(85)
  const [iterations, setIterations] = useState(3)
  const [weights, setWeights] = useState(initialWeights)
  const [saved, setSaved] = useState(false)

  const updateWeight = (name, value) => {
    setSaved(false)
    setWeights((current) => ({ ...current, [name]: Number(value) }))
  }

  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0)

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" subtitle="Configure the models, quality thresholds and evaluation behavior used by CRISP." />

      <Card>
        <div>
          <h2 className="text-xl font-semibold text-white">Model</h2>
          <p className="mt-1 text-sm text-slate-500">Choose the default model used for response generation.</p>
        </div>
        <div className="mt-5 max-w-xl">
          <label className="text-sm font-medium text-slate-300">Model selection</label>
          <select value={model} onChange={(e) => { setModel(e.target.value); setSaved(false) }} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-purple-500">
            {modelOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div>
            <h2 className="text-xl font-semibold text-white">Quality Threshold</h2>
            <p className="mt-1 text-sm text-slate-500">Responses below this score can enter the refinement loop.</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between"><label htmlFor="threshold" className="text-sm text-slate-400">Threshold</label><span className="text-lg font-semibold text-white">{threshold}</span></div>
            <input id="threshold" type="range" min="50" max="100" value={threshold} onChange={(e) => { setThreshold(Number(e.target.value)); setSaved(false) }} className="mt-5 w-full accent-purple-600" />
            <div className="mt-2 flex justify-between text-xs text-slate-600"><span>50</span><span>100</span></div>
          </div>
        </Card>

        <Card>
          <div>
            <h2 className="text-xl font-semibold text-white">Maximum Refinement Iterations</h2>
            <p className="mt-1 text-sm text-slate-500">Limit how many improvement cycles CRISP can perform.</p>
          </div>
          <div className="mt-6 max-w-xs">
            <label htmlFor="iterations" className="text-sm font-medium text-slate-300">Iterations</label>
            <input id="iterations" type="number" min="1" max="10" value={iterations} onChange={(e) => { setIterations(Number(e.target.value)); setSaved(false) }} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-purple-500" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Evaluation Weights</h2>
            <p className="mt-1 text-sm text-slate-500">Set the relative contribution of each quality dimension.</p>
          </div>
          <Badge tone={totalWeight === 100 ? "emerald" : "amber"}>{totalWeight}% total</Badge>
        </div>

        <div className="mt-6 space-y-5">
          {Object.entries(weights).map(([name, value]) => (
            <div key={name}>
              <div className="mb-2 flex items-center justify-between"><label htmlFor={`weight-${name}`} className="text-sm text-slate-400">{name}</label><span className="text-sm font-medium text-white">{value}%</span></div>
              <input id={`weight-${name}`} type="range" min="0" max="50" value={value} onChange={(e) => updateWeight(name, e.target.value)} className="w-full accent-purple-600" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">Mock settings only. Backend persistence is not connected yet.</p>
          <div className="flex items-center gap-3">
            {saved ? <Badge tone="emerald">Saved</Badge> : null}
            <Button onClick={() => setSaved(true)}>Save Settings</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Settings
