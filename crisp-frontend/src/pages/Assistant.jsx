import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { post, writeFlow } from "../lib/crispFlow"

function Assistant() {
  const navigate = useNavigate()
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function generateResponse() {
    if (!question.trim() || loading) return
    setLoading(true)
    setError("")
    try {
      const data = await post("/api/generate", { question: question.trim() })
      writeFlow({ question: question.trim(), initialResponse: data.initial_response, generatedAt: data.generated_at, timings: { generate: data.duration_seconds }, stage: 1 })
      navigate("/initial-response")
    } catch (err) {
      setError(`${err.message}. Check that the Python API is running.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">

          <h1 className="text-3xl font-bold text-white">
            CRISP Assistant
          </h1>

        </div>

        <p className="mt-2 text-slate-400">
          Enter your query and let CRISP improve the generated response.
        </p>
      </div>


      {/* Query Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-semibold text-white">
              Enter Your Query
            </h2>

            <p className="mt-2 text-slate-500">
              Ask CRISP anything that requires a high-quality response.
            </p>

          </div>


          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
            Ready
          </span>

        </div>


        {/* Textarea */}
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="mt-6 h-64 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-5 text-slate-300 outline-none placeholder:text-slate-600 focus:border-purple-500"
          placeholder="Example: Explain how artificial intelligence can be used in healthcare..."
        />


        {/* Generate Button */}
        <div className="mt-6 flex justify-end">

          <button
            onClick={generateResponse}
            disabled={!question.trim() || loading}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Response →"}
          </button>

        </div>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      </div>


      {/* What Happens Next */}
      <div>

        <h2 className="text-xl font-semibold text-white">
          What happens next?
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">


          {/* Generate */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-semibold text-purple-400">
              1
            </div>

            <h3 className="mt-4 font-semibold text-white">
              Generate
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              CRISP generates an initial AI response to your query.
            </p>

          </div>


          {/* Evaluate */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
              2
            </div>

            <h3 className="mt-4 font-semibold text-white">
              Evaluate
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The response is evaluated across multiple quality dimensions.
            </p>

          </div>


          {/* Critique */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-sm font-semibold text-amber-400">
              3
            </div>

            <h3 className="mt-4 font-semibold text-white">
              Critique
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              CRISP identifies strengths, weaknesses, and areas for improvement.
            </p>

          </div>


          {/* Refine */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-semibold text-emerald-400">
              4
            </div>

            <h3 className="mt-4 font-semibold text-white">
              Refine
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The response is improved when refinement is required.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Assistant