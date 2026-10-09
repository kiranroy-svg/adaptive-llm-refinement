import { useLocation } from "react-router-dom"

const pageNames = {
  "/assistant": "CRISP Assistant",
  "/initial-response": "Response Flow",
  "/evaluation": "Response Evaluation",
  "/decision": "Decision",
  "/critique": "Critique",
  "/refinement": "Response Refinement",
  "/comparison": "Response Comparison",
  "/final-response": "Final Response",
  "/analytics": "Analytics",
  "/experiments": "Experiments",
  "/settings": "Settings",
  "/how-it-works": "How It Works",
}

function Navbar() {
  const { pathname } = useLocation()
  const pageName = pageNames[pathname] || "CRISP Assistant"

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h2 className="text-lg font-semibold text-white">{pageName}</h2>
        <p className="text-xs text-slate-500">Intelligent Response Improvement</p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-sm text-slate-400">System Online</span>
      </div>
    </header>
  )
}

export default Navbar
