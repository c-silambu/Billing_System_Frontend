import { useCallback, useEffect, useMemo, useState } from "react";
import { Package, Plus, Search, Pencil, Trash2, X, LoaderCircle, Boxes } from "lucide-react";
import API from "../../services/axios";

const emptyForm = { pname: "", price: "", category: "", stock: "" };
const categories = ["Bakery", "Fast Food", "Milkshake & Ice Creams", "Snacks Items"];
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

export default function ProductPage() {
  const [products, setProducts] = useState([]); const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null); const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchProducts = useCallback(async () => { try { setLoading(true); const {data}=await API.get("/product/all"); setProducts(Array.isArray(data)?data:[]); } catch(e){ setNotice({type:"error",text:e.response?.data?.message||"Could not load products"}); } finally {setLoading(false);} },[]);
  useEffect(()=>{fetchProducts();},[fetchProducts]);
  const filtered=useMemo(()=>products.filter(p=>`${p.pname} ${p.category}`.toLowerCase().includes(search.toLowerCase())),[products,search]);
  const change=e=>setForm(v=>({...v,[e.target.name]:e.target.value}));
  const reset=()=>{setForm(emptyForm);setEditId(null);};
  const submit=async e=>{e.preventDefault();setSaving(true);setNotice(null);try{const payload={...form,price:Number(form.price),stock:Number(form.stock)}; if(editId) await API.put(`/product/update/${editId}`,payload); else await API.post("/product/add",payload); setNotice({type:"success",text:`Product ${editId?"updated":"added"} successfully`});reset();await fetchProducts();}catch(err){setNotice({type:"error",text:err.response?.data?.message||(err.response?.status===403?"Only an admin can manage products":"Unable to save product")});}finally{setSaving(false);}};
  const edit=p=>{setEditId(p._id);setForm({pname:p.pname,price:String(p.price),category:p.category,stock:String(p.stock)});window.scrollTo({top:0,behavior:"smooth"});};
  const remove=async p=>{if(!window.confirm(`Delete ${p.pname}?`))return;try{await API.delete(`/product/delete/${p._id}`);setNotice({type:"success",text:"Product deleted"});await fetchProducts();}catch(err){setNotice({type:"error",text:err.response?.data?.message||"Unable to delete product"});}};

  return <div className="page-shell">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h1 className="page-heading">Product catalogue</h1><p className="page-copy">Add items, update pricing and keep your stock accurate.</p></div><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500"><Boxes size={17}/><b className="text-slate-800">{products.length}</b> products</div></div>
    {notice&&<div className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${notice.type==="success"?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-red-200 bg-red-50 text-red-700"}`}><span>{notice.text}</span><button onClick={()=>setNotice(null)}><X size={17}/></button></div>}
    <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
      <section className="panel h-fit p-5 sm:p-6"><div className="mb-5 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><Package size={20}/></span><div><h2 className="font-bold text-slate-900">{editId?"Edit product":"Add new product"}</h2><p className="text-xs text-slate-500">Fill in the item details below</p></div></div>
        <form onSubmit={submit} className="space-y-4">{[["Product name","pname","text","e.g. Chocolate cake"],["Selling price","price","number","0.00"],["Available stock","stock","number","0"]].map(([label,name,type,placeholder])=><label key={name} className="block text-xs font-semibold text-slate-600">{label}<input className="field mt-1.5" name={name} type={type} min={type==="number"?"0":undefined} step={name==="price"?"0.01":undefined} placeholder={placeholder} value={form[name]} onChange={change} required/></label>)}
          <label className="block text-xs font-semibold text-slate-600">Category<select className="field mt-1.5" name="category" value={form.category} onChange={change} required><option value="">Choose a category</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
          <div className="flex gap-2 pt-2"><button disabled={saving} className="primary-btn flex-1">{saving?<LoaderCircle className="animate-spin" size={18}/>:<Plus size={18}/>} {editId?"Save changes":"Add product"}</button>{editId&&<button type="button" onClick={reset} className="secondary-btn"><X size={17}/></button>}</div>
        </form>
      </section>
      <section className="panel overflow-hidden"><div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-slate-900">All products</h2><p className="text-xs text-slate-500">Manage the items available for billing</p></div><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input className="field sm:w-64 pl-9" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th className="text-right">Action</th></tr></thead><tbody>{loading?<tr><td colSpan="5" className="text-center"><LoaderCircle className="mx-auto animate-spin text-brand-600"/></td></tr>:filtered.length===0?<tr><td colSpan="5" className="py-12 text-center text-slate-400">No products found</td></tr>:filtered.map(p=><tr key={p._id}><td><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-slate-100 font-bold text-slate-500">{p.pname?.[0]?.toUpperCase()}</span><span className="font-semibold text-slate-900">{p.pname}</span></div></td><td><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">{p.category}</span></td><td className="font-semibold">{money.format(p.price)}</td><td><span className={`font-semibold ${p.stock<5?"text-red-600":"text-slate-700"}`}>{p.stock}</span></td><td><div className="flex justify-end gap-1"><button onClick={()=>edit(p)} className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-brand-50 hover:text-brand-700"><Pencil size={16}/></button><button onClick={()=>remove(p)} className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
      </section>
    </div>
  </div>;
}
