import PageHeader from "../components/common/PageHeader"
import Card from "../components/common/Card"
import Icon from "../components/common/Icon"

const stages = [
  { name: "Generate", icon: "spark", tone: "purple", text: "CRISP generates an initial response from the selected language model." },
  { name: "Evaluate", icon: "analytics", tone: "blue", text: "The response is scored across accuracy, completeness, reasoning, clarity and safety." },
  { name: "Decide", icon: "check", tone: "amber", text: "The quality score is compared with the configured threshold to determine whether refinement is needed." },
  { name: "Critique", icon: "info", tone: "amber", text: "A critic identifies weaknesses and produces actionable feedback for improvement." },
  { name: "Refine", icon: "spark", tone: "purple", text: "The response is regenerated using the critique, subject to the iteration limit." },
  { name: "Compare", icon: "analytics", tone: "blue", text: "CRISP compares the original and refined responses to measure improvement." },
  { name: "Final Response", icon: "check", tone: "emerald", text: "The strongest response is returned as the final result for the user." },
]

const toneClasses = {
  purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
  blue: "border-blue-500/20 bg-blue-500/5 text-blue-400",
  amber: "border-amber-500/20 bg-amber-500/5 text-amber-400",
  emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
}

function HowItWorks() {
  return (
    <div className="space-y-8">
      <PageHeader title="How It Works" subtitle="Follow the CRISP pipeline from the first generated response to the final improved answer." />

      <Card>
        <div className="relative">
          <div className="absolute bottom-6 left-5 top-6 w-px bg-slate-800" />
          <div className="space-y-5">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative flex gap-5">
                <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${toneClasses[stage.tone]}`}>
                  <Icon name={stage.icon} className="h-5 w-5" />
                </div>
                <div className={`flex-1 rounded-xl border p-5 ${toneClasses[stage.tone]}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-600">Stage {String(index + 1).padStart(2, "0")}</span>
                    <h2 className="font-semibold text-white">{stage.name}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{stage.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-5" padding="">
        <div className="flex items-start gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400"><Icon name="info" className="h-5 w-5" /></div>
          <div>
            <h2 className="font-semibold text-white">Why the loop is adaptive</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">CRISP does not refine every response by default. The decision stage uses evaluation results and the configured threshold to balance quality improvement against latency, LLM calls and cost.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HowItWorks
