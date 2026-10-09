export const analyticsSummary = [
  { label: "Total Queries", value: "1,284", detail: "+12.4% vs. previous period" },
  { label: "Average Quality", value: "91.8", detail: "out of 100" },
  { label: "Average Latency", value: "4.2s", detail: "per completed query" },
  { label: "Refinement Rate", value: "63.5%", detail: "queries refined at least once" },
  { label: "Average LLM Calls", value: "2.7", detail: "calls per query" },
  { label: "Quality Improvement", value: "+8.6", detail: "points after refinement" },
  { label: "Cost", value: "$18.42", detail: "estimated total" },
]

export const qualityTrend = [
  { label: "Mon", initial: 82, final: 90 },
  { label: "Tue", initial: 84, final: 91 },
  { label: "Wed", initial: 83, final: 92 },
  { label: "Thu", initial: 87, final: 94 },
  { label: "Fri", initial: 86, final: 93 },
  { label: "Sat", initial: 89, final: 95 },
  { label: "Sun", initial: 88, final: 94 },
]

export const dimensionQuality = [
  { label: "Accuracy", value: 94 },
  { label: "Completeness", value: 91 },
  { label: "Reasoning", value: 89 },
  { label: "Clarity", value: 93 },
  { label: "Safety", value: 96 },
]

export const refinementTrend = [
  { label: "Mon", value: 58 },
  { label: "Tue", value: 61 },
  { label: "Wed", value: 64 },
  { label: "Thu", value: 67 },
  { label: "Fri", value: 63 },
  { label: "Sat", value: 65 },
  { label: "Sun", value: 64 },
]

export const latencyTrend = [
  { label: "Mon", value: 4.7 },
  { label: "Tue", value: 4.4 },
  { label: "Wed", value: 4.1 },
  { label: "Thu", value: 4.5 },
  { label: "Fri", value: 3.9 },
  { label: "Sat", value: 3.8 },
  { label: "Sun", value: 4.2 },
]

export const tokenTrend = [
  { label: "Mon", input: 820, output: 540 },
  { label: "Tue", input: 900, output: 570 },
  { label: "Wed", input: 860, output: 610 },
  { label: "Thu", input: 980, output: 640 },
  { label: "Fri", input: 940, output: 600 },
  { label: "Sat", input: 1020, output: 670 },
  { label: "Sun", input: 990, output: 650 },
]

export const experimentResults = [
  { name: "Standard", quality: 84.2, latency: "2.1s", refinementRate: "0%", calls: "1.0", cost: "$4.80" },
  { name: "Always-Refine", quality: 94.1, latency: "6.8s", refinementRate: "100%", calls: "3.8", cost: "$26.40" },
  { name: "Adaptive", quality: 91.8, latency: "4.2s", refinementRate: "63.5%", calls: "2.7", cost: "$18.42" },
]

export const modelOptions = ["GPT-4.1", "GPT-4.1 mini", "Claude Sonnet", "Gemini Flash"]
export const experimentOptions = ["All experiments", "Baseline Quality", "Adaptive Refinement", "Latency Study"]
