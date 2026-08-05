import { Menu, Search, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles = { dashboard: "Overview", invoice: "Create invoice", products: "Products", summary: "Sales reports" };
export default function Topbar({ onMenu }) {
  const page = useLocation().pathname.split("/").pop();
  return <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
    <div className="flex items-center gap-3"><button onClick={onMenu} className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"><Menu size={20}/></button><div><p className="text-xs font-medium text-slate-400">BillFlow / Workspace</p><h2 className="text-lg font-bold text-slate-900">{titles[page] || "Dashboard"}</h2></div></div>
    <div className="flex items-center gap-2 sm:gap-3"><div className="relative hidden md:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input className="h-10 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-brand-500" placeholder="Search anything..."/></div><button className="relative grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-500"><Bell size={18}/><span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand-500"/></button><div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-3"><span className="grid size-9 place-items-center rounded-xl bg-[#dff7ed] text-sm font-bold text-brand-700">A</span><div className="hidden sm:block"><p className="text-xs font-semibold text-slate-800">Admin</p><p className="text-[10px] text-slate-400">Administrator</p></div></div></div>
  </header>;
}
