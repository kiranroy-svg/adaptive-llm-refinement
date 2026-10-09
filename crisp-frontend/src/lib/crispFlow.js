const KEY = "crisp-flow-state";
export const API = "http://127.0.0.1:8000";
export function readFlow() {
  try { return JSON.parse(sessionStorage.getItem(KEY) || "null"); }
  catch { return null; }
}
export function writeFlow(value) {
  sessionStorage.setItem(KEY, JSON.stringify(value));
}
export function clearFlow() {
  sessionStorage.removeItem(KEY);
}
export async function post(path, body) {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || `Request failed (${response.status})`);
  return data;
}
export function score100(evaluation) {
  return evaluation?.overall_score == null ? "—" : (Number(evaluation.overall_score) * 10).toFixed(1);
}
