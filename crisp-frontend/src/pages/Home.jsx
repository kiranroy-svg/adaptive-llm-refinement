import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">

        <div>
          <h1 className="text-2xl font-bold">
            CRISP
          </h1>

          <p className="text-xs text-slate-500">
            Response Improvement System
          </p>
        </div>


        <button
          onClick={() => navigate("/login")}
          className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          Login
        </button>

      </nav>


      {/* Hero */}
      <main className="mx-auto max-w-6xl px-8 py-20">

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400">
            Intelligent Response Improvement
          </span>


          <h2 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Generate.
            <span className="text-purple-500"> Evaluate.</span>
            <br />
            Refine.
          </h2>


          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            CRISP evaluates AI-generated responses, identifies weaknesses,
            and intelligently refines them to produce higher-quality
            responses.
          </p>


          {/* Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={() => navigate("/assistant")}
              className="rounded-lg bg-purple-600 px-7 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Start a New Query →
            </button>


            <button
              onClick={() => navigate("/login")}
              className="rounded-lg border border-slate-700 px-7 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Login
            </button>

          </div>

        </div>


        {/* Pipeline Preview */}
        <div className="mt-24">

          <div className="mb-8 text-center">

            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              CRISP Pipeline
            </p>

            <h3 className="mt-2 text-2xl font-semibold text-white">
              From initial response to refined output
            </h3>

          </div>


          <div className="grid gap-4 md:grid-cols-5">

            {/* Generate */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-semibold text-purple-400">
                01
              </div>

              <h4 className="mt-5 font-semibold">
                Generate
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Generate an initial AI response for the user's query.
              </p>

            </div>


            {/* Evaluate */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
                02
              </div>

              <h4 className="mt-5 font-semibold">
                Evaluate
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Evaluate the response across multiple quality dimensions.
              </p>

            </div>


            {/* Critique */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-sm font-semibold text-amber-400">
                03
              </div>

              <h4 className="mt-5 font-semibold">
                Critique
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Identify strengths, weaknesses, and improvement areas.
              </p>

            </div>


            {/* Refine */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                04
              </div>

              <h4 className="mt-5 font-semibold">
                Refine
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Improve the response using the generated critique.
              </p>

            </div>


            {/* Deliver */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-sm font-semibold text-pink-400">
                05
              </div>

              <h4 className="mt-5 font-semibold">
                Deliver
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Deliver the final improved response to the user.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Home