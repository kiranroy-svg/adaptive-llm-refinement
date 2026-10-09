function Badge({ children, tone = "purple" }) {
  const classes = {
    purple: "bg-purple-500/10 text-purple-400",
    blue: "bg-blue-500/10 text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    amber: "bg-amber-500/10 text-amber-400",
    slate: "bg-slate-800 text-slate-400",
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${classes[tone]}`}>
      {children}
    </span>
  )
}

export default Badge
