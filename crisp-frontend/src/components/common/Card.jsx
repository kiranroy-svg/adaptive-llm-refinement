function Card({ children, className = "", padding = "p-6" }) {
  return (
    <section className={`rounded-2xl border border-slate-800 bg-slate-900 ${padding} ${className}`}>
      {children}
    </section>
  )
}

export default Card
