function PageHeader({ title, subtitle, badge, badgeTone = "purple" }) {
  const badgeClasses = {
    purple: "bg-purple-500/10 text-purple-400",
    blue: "bg-blue-500/10 text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    amber: "bg-amber-500/10 text-amber-400",
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {badge ? (
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClasses[badgeTone]}`}>
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-slate-400">{subtitle}</p>
    </div>
  )
}

export default PageHeader
