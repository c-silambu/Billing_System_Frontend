import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ReceiptText, Package, ChartNoAxesCombined, LogOut, X, WalletCards } from "lucide-react";

const links = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/invoice", label: "New invoice", icon: ReceiptText },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/summary", label: "Reports", icon: ChartNoAxesCombined },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("token"); navigate("/login"); };

  return <>
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm lg:hidden" onClick={onClose} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-[#101915] text-white transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/20"><WalletCards size={21}/></span><div><p className="text-base font-bold tracking-tight">BillFlow</p><p className="text-[11px] text-slate-400">Smart billing</p></div></div>
        <button className="text-slate-400 lg:hidden" onClick={onClose}><X size={20}/></button>
      </div>
      <div className="px-4 pt-5"><p className="px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Workspace</p>
        <nav className="mt-3 space-y-1">{links.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} onClick={onClose} className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-brand-500 text-white shadow-lg shadow-brand-500/10" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon size={19}/>{label}</NavLink>)}</nav>
      </div>
      <div className="mt-auto p-4"><div className="mb-3 rounded-2xl border border-white/8 bg-white/[.04] p-4"><p className="text-xs font-semibold text-white">Need a quick bill?</p><p className="mt-1 text-[11px] leading-5 text-slate-400">Create and save an invoice in seconds.</p><button onClick={() => navigate('/admin/invoice')} className="mt-3 w-full rounded-lg bg-white/10 py-2 text-xs font-semibold hover:bg-white/15">Create invoice</button></div>
      <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-300"><LogOut size={18}/>Sign out</button></div>
    </aside>
  </>;
}
