"use client";

import { useEffect, useMemo, useState } from "react";
import { formatRwf, products, rwandaLocations } from "./commerce-data";

type Mode = "signup" | "login" | "forgot" | "account" | "cart" | "checkout" | "payment" | "admin";
type CartItem = { slug: string; quantity: number };
type Account = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  landmark: string;
};
type Order = { id: string; total: number; method: string; status: string; createdAt: string };

const defaultAccount: Account = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  province: "Kigali City",
  district: "Gasabo",
  sector: "",
  cell: "",
  village: "",
  landmark: ""
};

const paymentStatuses = ["Pending payment confirmation", "Payment received", "Order confirmed", "Out for delivery", "Completed"];
const adminSections = [
  "Orders",
  "Payments",
  "Customers",
  "Job applications",
  "Lost & Found reports",
  "Farm applications",
  "School applications",
  "LifeTalk TV applications",
  "Foundation requests"
];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function PlatformClient({ mode }: { mode: Mode }) {
  const [account, setAccount] = useState<Account>(defaultAccount);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [method, setMethod] = useState("Cash on Delivery");
  const [manualStatus, setManualStatus] = useState(paymentStatuses[0]);

  useEffect(() => {
    setAccount(readJson("babra-account", defaultAccount));
    setLoggedIn(readJson("babra-logged-in", false));
    setCart(readJson("babra-cart", []));
    setOrders(readJson("babra-orders", []));
  }, []);

  const cartLines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.slug === item.slug);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [cart]
  );
  const subtotal = cartLines.reduce((sum, item) => sum + item!.product.price * item!.quantity, 0);
  const deliveryFee = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  function updateAccount(field: keyof Account, value: string) {
    const next = { ...account, [field]: value };
    if (field === "province") next.district = rwandaLocations[value as keyof typeof rwandaLocations][0];
    setAccount(next);
    saveJson("babra-account", next);
  }

  function signUp() {
    saveJson("babra-account", account);
    saveJson("babra-logged-in", true);
    setLoggedIn(true);
    window.location.href = "/account";
  }

  function login() {
    saveJson("babra-logged-in", true);
    setLoggedIn(true);
    window.location.href = "/account";
  }

  function logout() {
    saveJson("babra-logged-in", false);
    setLoggedIn(false);
  }

  function addToCart(slug: string) {
    const existing = cart.find((item) => item.slug === slug);
    const next = existing ? cart.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)) : [...cart, { slug, quantity: 1 }];
    setCart(next);
    saveJson("babra-cart", next);
  }

  function updateQuantity(slug: string, quantity: number) {
    const safe = Math.max(0, quantity);
    const next = safe === 0 ? cart.filter((item) => item.slug !== slug) : cart.map((item) => (item.slug === slug ? { ...item, quantity: safe } : item));
    setCart(next);
    saveJson("babra-cart", next);
  }

  function submitManualPayment() {
    const order: Order = {
      id: `BABRA-${Date.now().toString().slice(-8)}`,
      total,
      method,
      status: "Pending payment confirmation",
      createdAt: new Date().toLocaleString()
    };
    const next = [order, ...orders];
    setOrders(next);
    saveJson("babra-orders", next);
    setManualStatus("Pending payment confirmation");
    window.location.href = "/payment-confirmation";
  }

  const accountForm = (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        ["fullName", "Full name"],
        ["phone", "Phone / WhatsApp"],
        ["email", "Email"],
        ["password", "Password"]
      ].map(([field, label]) => (
        <label key={field} className="grid gap-2 text-sm font-bold text-white/78">
          {label}
          <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type={field === "password" ? "password" : "text"} value={account[field as keyof Account]} onChange={(event) => updateAccount(field as keyof Account, event.target.value)} />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-bold text-white/78">
        Province
        <select className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={account.province} onChange={(event) => updateAccount("province", event.target.value)}>
          {Object.keys(rwandaLocations).map((province) => <option key={province}>{province}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold text-white/78">
        District
        <select className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={account.district} onChange={(event) => updateAccount("district", event.target.value)}>
          {rwandaLocations[account.province as keyof typeof rwandaLocations].map((district) => <option key={district}>{district}</option>)}
        </select>
      </label>
      {(["sector", "cell", "village", "landmark"] as (keyof Account)[]).map((field) => (
        <label key={field} className="grid gap-2 text-sm font-bold text-white/78">
          {field[0].toUpperCase() + field.slice(1)}
          <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={account[field]} onChange={(event) => updateAccount(field, event.target.value)} />
        </label>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#080606] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a className="font-serif text-2xl" href="/">EI BaBra Holding Ltd</a>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-white/72">
            <a className="rounded-full border border-white/10 px-4 py-2" href="/signup">Sign Up</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/login">Login</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/account">My Account</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/cart">Cart</a>
          </nav>
        </header>

        {mode === "signup" && (
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
            <h1 className="font-serif text-5xl">Create BaBra account</h1>
            <p className="mt-4 text-white/64">Create a local account profile for orders, applications, lost reports, and payment history. Backend authentication can be connected later.</p>
            <div className="mt-8">{accountForm}</div>
            <button className="mt-6 rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={signUp} type="button">Sign Up</button>
          </section>
        )}

        {mode === "login" && (
          <section className="mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
            <h1 className="font-serif text-5xl">Login</h1>
            <div className="mt-8 grid gap-4">
              <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Email or phone" />
              <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Password" type="password" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={login} type="button">Login</button>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/forgot-password">Forgot Password</a>
            </div>
          </section>
        )}

        {mode === "forgot" && (
          <section className="mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
            <h1 className="font-serif text-5xl">Forgot Password</h1>
            <p className="mt-4 text-white/64">Manual reset mode: submit your email or phone and BaBra support will verify you before resetting access.</p>
            <input className="mt-8 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Email or phone" />
            <a className="mt-6 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="mailto:support@babra.store?subject=BaBra%20password%20reset">Request reset</a>
          </section>
        )}

        {mode === "account" && (
          <section className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]">{loggedIn ? "Logged in" : "Guest mode"}</p>
              <h1 className="mt-3 font-serif text-5xl">My Account</h1>
              <p className="mt-4 text-white/64">{account.fullName || "Create or login to save your BaBra profile."}</p>
              <button className="mt-6 rounded-full border border-white/20 px-5 py-3 font-black text-white" onClick={logout} type="button">Logout</button>
            </aside>
            <div className="grid gap-4 md:grid-cols-2">
              {["My Orders", "My Applications", "My Lost & Found Reports", "My Payment History", "My Profile"].map((item) => (
                <article key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
                  <h2 className="font-serif text-3xl">{item}</h2>
                  <p className="mt-3 text-white/62">{item === "My Orders" ? `${orders.length} saved order(s)` : "Manual-mode records appear here after backend connection."}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {(mode === "cart" || mode === "checkout") && (
          <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h1 className="font-serif text-5xl">{mode === "cart" ? "Cart" : "Checkout"}</h1>
              <div className="mt-8 grid gap-4">
                {products.map((product) => {
                  const item = cart.find((entry) => entry.slug === product.slug);
                  return (
                    <article key={product.slug} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                      <img className="h-28 rounded-xl bg-white object-contain p-2" src={product.image} alt={product.alt} />
                      <div>
                        <h2 className="font-serif text-3xl">{product.name}</h2>
                        <p className="text-white/62">{formatRwf(product.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-full bg-[#f1d58b] px-4 py-2 font-black text-[#130d08]" onClick={() => addToCart(product.slug)} type="button">Add to Cart</button>
                        <input className="w-20 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white" min="0" type="number" value={item?.quantity ?? 0} onChange={(event) => updateQuantity(product.slug, Number(event.target.value))} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <aside className="rounded-[2rem] border border-[#f1d58b]/20 bg-white/[0.05] p-6">
              <h2 className="font-serif text-4xl">Order summary</h2>
              <p className="mt-4 text-white/64">Subtotal: {formatRwf(subtotal)}</p>
              <p className="mt-2 text-white/64">Delivery fee placeholder: {formatRwf(deliveryFee)}</p>
              <p className="mt-4 text-3xl font-black text-[#f1d58b]">{formatRwf(total)}</p>
              {mode === "cart" ? <a className="mt-6 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/checkout">Checkout</a> : null}
              {mode === "checkout" ? (
                <div className="mt-6 grid gap-4">
                  <h3 className="font-serif text-3xl">Customer information</h3>
                  {accountForm}
                  <h3 className="mt-4 font-serif text-3xl">Payment method</h3>
                  <select className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={method} onChange={(event) => setMethod(event.target.value)}>
                    {["Cash on Delivery", "MTN MoMo", "Airtel Money", "Bank Transfer"].map((option) => <option key={option}>{option}</option>)}
                  </select>
                  {method !== "Cash on Delivery" ? (
                    <div className="grid gap-3">
                      <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder={method === "Bank Transfer" ? "Bank name" : "Payer phone number"} />
                      <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder={method === "Bank Transfer" ? "Account name / transaction reference" : "Transaction ID"} />
                      <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Amount paid" />
                      <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type="file" />
                    </div>
                  ) : <p className="rounded-xl border border-white/10 bg-black/25 p-4 text-white/64">Cash on Delivery order will stay pending until BaBra confirms delivery and payment.</p>}
                  <button className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={submitManualPayment} type="button">Submit manual payment / order</button>
                  <p className="text-sm text-white/56">No fake payment success: status remains Pending payment confirmation until BaBra verifies it.</p>
                </div>
              ) : null}
            </aside>
          </section>
        )}

        {mode === "payment" && (
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10">
            <h1 className="font-serif text-5xl">Payment confirmation</h1>
            <p className="mt-4 text-white/64">Manual payment mode only. API payment confirmation is not connected yet.</p>
            <div className="mt-8 grid gap-3 md:grid-cols-5">
              {paymentStatuses.map((status) => (
                <button key={status} className={`rounded-2xl border px-4 py-4 text-sm font-black ${manualStatus === status ? "border-[#f1d58b] bg-[#f1d58b] text-[#130d08]" : "border-white/10 bg-black/25 text-white/70"}`} onClick={() => setManualStatus(status)} type="button">{status}</button>
              ))}
            </div>
          </section>
        )}

        {mode === "admin" && (
          <section className="mt-10">
            <h1 className="font-serif text-5xl">BaBra Admin Dashboard</h1>
            <p className="mt-4 text-white/64">Manual-mode admin view for tracking requests until backend database integration.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {adminSections.map((section) => (
                <article key={section} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
                  <h2 className="font-serif text-3xl">{section}</h2>
                  <select className="mt-5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white">
                    {["Pending", "Approved", "Rejected", "Paid", "Confirmed", "Completed"].map((status) => <option key={status}>{status}</option>)}
                  </select>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
