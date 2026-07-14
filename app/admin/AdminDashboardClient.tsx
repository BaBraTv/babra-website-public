"use client";

import { useEffect, useMemo, useState } from "react";

type AdminTab = "overview" | "products" | "categories" | "brands" | "inventory" | "orders" | "customers" | "messages" | "media" | "settings";

type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  sku: string | null;
  barcode: string | null;
  description: string | null;
  category: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  priceCents: number | null;
  stockQuantity: number;
  lowStockThreshold: number | null;
  imageUrl: string | null;
  isFeatured: boolean;
  updatedAt: string;
};

type AdminSummary = {
  ok: boolean;
  counts?: Record<string, number>;
  users?: Array<{ id: string; fullName: string; email: string | null; phone: string | null; role: string; status: string }>;
  orders?: Array<{ id: string; orderNumber: string; customerName: string; customerPhone: string; status: string; totalCents: number; items?: Array<{ productName: string; quantity: number }> }>;
  contactMessages?: Array<{ id: string; fullName: string; phone: string | null; email: string | null; subject: string | null; status: string }>;
  products?: AdminProduct[];
  categories?: Array<{ id: string; name: string; slug: string; isActive: boolean }>;
  brands?: Array<{ id: string; name: string; slug: string; isActive: boolean }>;
  stockAlerts?: AdminProduct[];
};

const tabs: Array<[AdminTab, string]> = [
  ["overview", "Overview"],
  ["products", "Products"],
  ["categories", "Categories"],
  ["brands", "Brands"],
  ["inventory", "Inventory"],
  ["orders", "Orders"],
  ["customers", "Customers"],
  ["messages", "Messages"],
  ["media", "Media Library"],
  ["settings", "Settings"]
];

const emptyProduct = {
  slug: "",
  name: "",
  sku: "",
  barcode: "",
  description: "",
  category: "Cosmetics",
  priceCents: "",
  stockQuantity: "0",
  imageUrl: "",
  isFeatured: false,
  status: "DRAFT"
};

function formatMoney(value: number | null | undefined) {
  if (!value) return "On request";
  return `${new Intl.NumberFormat("en-US").format(value / 100)} RWF`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-white/72">{label}{children}</label>;
}

export function AdminDashboardClient() {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("Loading admin dashboard...");

  async function loadAdmin() {
    setStatus("Loading admin data...");
    const [summaryResponse, productsResponse] = await Promise.all([fetch("/api/admin/summary"), fetch("/api/admin/products")]);
    if (summaryResponse.status === 401 || summaryResponse.status === 403) {
      window.location.href = "/login";
      return;
    }
    const summaryJson = (await summaryResponse.json()) as AdminSummary;
    const productsJson = (await productsResponse.json()) as { products?: AdminProduct[] };
    setSummary(summaryJson);
    setProducts(productsJson.products ?? summaryJson.products ?? []);
    setStatus("Admin dashboard ready");
  }

  useEffect(() => {
    void loadAdmin().catch((error) => setStatus(error instanceof Error ? error.message : "Admin dashboard could not load"));
  }, []);

  const activeProducts = useMemo(() => products.filter((product) => product.status !== "ARCHIVED"), [products]);
  const lowStockProducts = useMemo(() => activeProducts.filter((product) => product.lowStockThreshold !== null ? product.stockQuantity <= product.lowStockThreshold : product.stockQuantity <= 10), [activeProducts]);

  function editProduct(product: AdminProduct) {
    setEditingId(product.id);
    setForm({
      slug: product.slug,
      name: product.name,
      sku: product.sku ?? "",
      barcode: product.barcode ?? "",
      description: product.description ?? "",
      category: product.category,
      priceCents: product.priceCents ? String(product.priceCents) : "",
      stockQuantity: String(product.stockQuantity),
      imageUrl: product.imageUrl ?? "",
      isFeatured: product.isFeatured,
      status: product.status
    });
    setTab("products");
  }

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      slug: form.slug,
      name: form.name,
      sku: form.sku || null,
      barcode: form.barcode || null,
      description: form.description || null,
      category: form.category,
      priceCents: form.priceCents ? Number(form.priceCents) : null,
      stockQuantity: Number(form.stockQuantity || 0),
      imageUrl: form.imageUrl || null,
      isFeatured: form.isFeatured,
      status: form.status as "DRAFT" | "ACTIVE" | "ARCHIVED"
    };
    const response = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const json = await response.json();
    if (!response.ok || !json.ok) throw new Error(json.error ?? "Product could not be saved");
    setForm(emptyProduct);
    setEditingId(null);
    await loadAdmin();
  }

  async function archiveProduct(id: string) {
    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    const json = await response.json();
    if (!response.ok || !json.ok) throw new Error(json.error ?? "Product could not be archived");
    await loadAdmin();
  }

  return (
    <main className="min-h-screen bg-[#080606] text-white">
      <header className="border-b border-white/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/">BaBra Admin</a>
            <h1 className="mt-4 font-serif text-5xl leading-none md:text-7xl">Enterprise control dashboard.</h1>
            <p className="mt-4 text-white/62">{status}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button className="rounded-full border border-white/15 px-5 py-3 font-black text-white hover:bg-white/10" type="submit">Logout</button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:px-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-lg border border-white/10 bg-[#14100f] p-3 lg:sticky lg:top-4 lg:self-start">
          {tabs.map(([key, label]) => (
            <button key={key} type="button" onClick={() => setTab(key)} className={`mb-1 w-full rounded-lg px-4 py-3 text-left text-sm font-black transition ${tab === key ? "bg-[#f1d58b] text-[#080606]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>{label}</button>
          ))}
        </aside>

        <section className="min-w-0">
          {tab === "overview" ? <Overview summary={summary} lowStock={lowStockProducts} /> : null}
          {tab === "products" ? <ProductsPanel products={activeProducts} form={form} setForm={setForm} editingId={editingId} setEditingId={setEditingId} saveProduct={saveProduct} editProduct={editProduct} archiveProduct={archiveProduct} /> : null}
          {tab === "categories" ? <SimpleList title="Categories" description="Category CRUD API is prepared. Use this area for cosmetics categories and future product families." items={summary?.categories?.map((item) => `${item.name} (${item.slug})`) ?? []} /> : null}
          {tab === "brands" ? <SimpleList title="Brands" description="Brand API is prepared for official brand records." items={summary?.brands?.map((item) => `${item.name} (${item.slug})`) ?? []} /> : null}
          {tab === "inventory" ? <InventoryPanel products={activeProducts} lowStock={lowStockProducts} /> : null}
          {tab === "orders" ? <OrdersPanel orders={summary?.orders ?? []} /> : null}
          {tab === "customers" ? <SimpleList title="Customers" description="Customer list from authenticated users." items={summary?.users?.map((user) => `${user.fullName} - ${user.role} - ${user.status}`) ?? []} /> : null}
          {tab === "messages" ? <SimpleList title="Messages" description="Contact and form messages routed to admin review." items={summary?.contactMessages?.map((message) => `${message.fullName} - ${message.status} - ${message.subject ?? "No subject"}`) ?? []} /> : null}
          {tab === "media" ? <MediaPanel /> : null}
          {tab === "settings" ? <SettingsPanel /> : null}
        </section>
      </div>
    </main>
  );
}

function Overview({ summary, lowStock }: { summary: AdminSummary | null; lowStock: AdminProduct[] }) {
  const counts = summary?.counts ?? {};
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{["products", "orders", "users", "contactMessages", "payments", "stockAlerts"].map((key) => <article key={key} className="rounded-lg border border-white/10 bg-[#14100f] p-6"><p className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]">{key}</p><p className="mt-4 font-serif text-5xl">{counts[key] ?? (key === "stockAlerts" ? lowStock.length : 0)}</p></article>)}</div>;
}

function ProductsPanel({ products, form, setForm, editingId, setEditingId, saveProduct, editProduct, archiveProduct }: { products: AdminProduct[]; form: typeof emptyProduct; setForm: (value: typeof emptyProduct) => void; editingId: string | null; setEditingId: (value: string | null) => void; saveProduct: (event: React.FormEvent) => Promise<void>; editProduct: (product: AdminProduct) => void; archiveProduct: (id: string) => Promise<void> }) {
  return <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]"><form onSubmit={(event) => void saveProduct(event)} className="rounded-lg border border-white/10 bg-[#14100f] p-6"><h2 className="font-serif text-4xl">{editingId ? "Edit product" : "Create product"}</h2><div className="mt-6 grid gap-4"><Field label="Name"><input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field><Field label="Slug"><input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required disabled={Boolean(editingId)} /></Field><Field label="SKU"><input className="admin-input" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></Field><Field label="Barcode"><input className="admin-input" value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} /></Field><Field label="Description"><textarea className="admin-input min-h-24" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field><div className="grid gap-4 md:grid-cols-2"><Field label="Price cents"><input className="admin-input" type="number" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: e.target.value })} /></Field><Field label="Stock"><input className="admin-input" type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} /></Field></div><Field label="Image URL"><input className="admin-input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></Field><label className="flex items-center gap-3 text-sm font-bold text-white/72"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label><div className="flex gap-3"><button className="rounded-full bg-[#f1d58b] px-5 py-3 font-black text-[#080606]" type="submit">Save</button><button className="rounded-full border border-white/15 px-5 py-3 font-black" type="button" onClick={() => { setEditingId(null); setForm(emptyProduct); }}>Reset</button></div></div></form><div className="grid gap-4">{products.map((product) => <article key={product.id} className="rounded-lg border border-white/10 bg-[#14100f] p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h3 className="font-serif text-3xl">{product.name}</h3><p className="text-sm text-white/52">{product.sku ?? "No SKU"} - {product.status} - {formatMoney(product.priceCents)}</p><p className="mt-1 text-sm text-white/52">Stock: {product.stockQuantity}</p></div><div className="flex gap-2"><button className="rounded-full border border-white/15 px-4 py-2 font-black" onClick={() => editProduct(product)} type="button">Edit</button><button className="rounded-full border border-red-400/40 px-4 py-2 font-black text-red-200" onClick={() => void archiveProduct(product.id)} type="button">Archive</button></div></div></article>)}</div></div>;
}

function InventoryPanel({ products, lowStock }: { products: AdminProduct[]; lowStock: AdminProduct[] }) {
  return <div className="grid gap-5"><SimpleList title="Low-stock alerts" description="Products at or below threshold appear here." items={lowStock.map((product) => `${product.name}: ${product.stockQuantity} current stock`)} /><SimpleList title="Inventory history placeholder" description="Inventory movement records are prepared in Prisma and can be connected to stock adjustment UI next." items={products.map((product) => `${product.name}: ${product.stockQuantity} current stock`)} /></div>;
}

function OrdersPanel({ orders }: { orders: NonNullable<AdminSummary["orders"]> }) {
  return <div className="grid gap-4">{orders.length === 0 ? <SimpleList title="Orders" description="No orders found yet." items={[]} /> : orders.map((order) => <article key={order.id} className="rounded-lg border border-white/10 bg-[#14100f] p-5"><h3 className="font-serif text-3xl">{order.orderNumber}</h3><p className="mt-2 text-white/62">{order.customerName} - {order.customerPhone}</p><p className="mt-2 font-black text-[#f1d58b]">{order.status} - {formatMoney(order.totalCents)}</p><p className="mt-3 text-sm text-white/52">Export placeholder ready for CSV/PDF implementation.</p></article>)}</div>;
}

function MediaPanel() {
  return <SimpleList title="Media Library" description="Upload, replace, delete, and folder organization are prepared as admin modules. Storage provider is not configured yet." items={["products", "homepage", "company", "documents"]} />;
}

function SettingsPanel() {
  return <SimpleList title="Settings" description="Company information, contact details, social links, SEO defaults, and homepage settings are prepared for editable configuration." items={["Company information", "Contact details", "Social links", "SEO defaults", "Homepage settings"]} />;
}

function SimpleList({ title, description, items }: { title: string; description: string; items: string[] }) {
  return <section className="rounded-lg border border-white/10 bg-[#14100f] p-6"><h2 className="font-serif text-5xl leading-none">{title}</h2><p className="mt-4 text-white/62">{description}</p><div className="mt-6 grid gap-3">{items.length ? items.map((item) => <div key={item} className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 font-bold text-white/76">{item}</div>) : <p className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white/52">No records yet.</p>}</div></section>;
}