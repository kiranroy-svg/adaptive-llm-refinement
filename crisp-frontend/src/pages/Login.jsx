import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Top Navigation */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">

        <button
          onClick={() => navigate("/")}
          className="text-left"
        >
          <h1 className="text-2xl font-bold">
            CRISP
          </h1>

          <p className="text-xs text-slate-500">
            Response Improvement System
          </p>
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Home
        </button>

      </nav>


      {/* Login Section */}
      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden border-r border-slate-800 bg-gradient-to-br from-purple-950/40 to-slate-950 p-10 lg:block">

            <div className="flex h-full flex-col justify-between">

              <div>

                <span className="inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                  Intelligent Response Improvement
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight">
                  Better responses
                  <br />
                  through intelligent
                  <br />
                  refinement.
                </h2>

                <p className="mt-6 max-w-md leading-7 text-slate-400">
                  CRISP evaluates AI-generated responses, identifies
                  weaknesses, and improves them through an adaptive
                  refinement process.
                </p>

              </div>


              {/* Process */}
              <div className="mt-12 space-y-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-semibold text-purple-400">
                    01
                  </div>

                  <div>
                    <h3 className="font-medium text-white">
                      Generate
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Generate an initial response.
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
                    02
                  </div>

                  <div>
                    <h3 className="font-medium text-white">
                      Evaluate
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Measure response quality.
                    </p>
                  </div>

                </div>


                <div className="flex items-start gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                    03
                  </div>

                  <div>
                    <h3 className="font-medium text-white">
                      Critique & Refine
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Improve the response when necessary.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Right Side */}
          <div className="p-8 sm:p-10">

            <div className="mx-auto max-w-md">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Sign in to CRISP
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your credentials to access the response
                  improvement system.
                </p>

              </div>


              {/* Form */}
              <div className="mt-8 space-y-5">

                <div>

                  <label className="text-sm font-medium text-slate-300">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-purple-500"
                  />

                </div>


                <div>

                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-purple-500"
                  />

                </div>


                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm text-slate-500">

                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950"
                    />

                    Remember me

                  </label>


                  <button
                    type="button"
                    className="text-sm text-purple-400 transition hover:text-purple-300"
                  >
                    Forgot password?
                  </button>

                </div>


                <button
                  onClick={() => navigate("/assistant")}
                  className="w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                >
                  Sign In →
                </button>

              </div>


              {/* Demo Notice */}
              <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">

                <p className="text-xs leading-5 text-slate-500">
                  Demo mode: authentication will be connected to the
                  FastAPI backend in a later stage.
                </p>

              </div>


              {/* Back */}
              <div className="mt-6 text-center">

                <button
                  onClick={() => navigate("/")}
                  className="text-sm text-slate-500 transition hover:text-slate-300"
                >
                  ← Return to homepage
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Login