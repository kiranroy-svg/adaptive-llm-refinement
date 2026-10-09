function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white",
    ghost: "text-slate-400 hover:bg-slate-800 hover:text-white",
  }

  return (
    <button
      type={type}
      className={`rounded-lg px-5 py-3 font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
