import { NavLink, useNavigate } from "react-router-dom"
import Icon from "./common/Icon"

const navigation = [
  { label: "Home", to: "/", icon: "home" },
  { label: "Assistant", to: "/assistant", icon: "assistant" },
  { label: "Analytics", to: "/analytics", icon: "analytics" },
  { label: "Experiments", to: "/experiments", icon: "experiments" },
  { label: "Settings", to: "/settings", icon: "settings" },
  { label: "How It Works", to: "/how-it-works", icon: "info" },
]

function Sidebar() {
  const navigate = useNavigate()

  const navItemClass = ({ isActive }) =>
    `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
      isActive
        ? "bg-purple-600 text-white"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6">
      <div className="mb-8 px-3">
        <button onClick={() => navigate("/assistant")} className="text-left">
          <h1 className="text-2xl font-bold text-white">CRISP</h1>
          <p className="mt-1 text-xs text-slate-500">Response Improvement System</p>
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} className={navItemClass}>
            <Icon name={item.icon} className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-slate-300">CRISP System Online</span>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600">Response improvement pipeline is ready.</p>
      </div>

      <div className="border-t border-slate-800 pt-4">
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Icon name="home" className="h-4 w-4" />
          Exit to Home
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
