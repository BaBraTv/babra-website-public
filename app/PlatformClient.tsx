"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  PRICE_INQUIRY_LABEL,
  PRICE_INQUIRY_NOTE,
  formatRwf,
  products,
  rwandaLocations,
  site,
  whatsappOrderUrl
} from "./commerce-data";

type Mode = "signup" | "login" | "forgot" | "account" | "profile" | "orders" | "cart" | "checkout" | "payment" | "admin";
type CustomerType = "Retail" | "Reseller" | "Wholesale" | "Distributor";
type PaymentMethod = "Cash on Delivery" | "MTN MoMo" | "Airtel Money" | "Bank Transfer";
type OrderStatus =
  | "Quote requested"
  | "Pending payment confirmation"
  | "Payment received"
  | "Packing"
  | "Out for delivery"
  | "Delivered"
  | "Completed"
  | "Rejected";

type CartItem = { slug: string; quantity: number };

type Account = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  preferredLanguage: string;
  customerType: CustomerType;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  landmark: string;
  deliveryNotes: string;
};

type OrderItem = {
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  customer: Omit<Account, "password">;
  subtotal: number;
  deliveryFee: number;
  total: number;
  method: PaymentMethod;
  paymentReference: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  rewardPoints: number;
};

type ApiUser = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  role: "CUSTOMER" | "ADMIN" | "STAFF";
  profile?: Partial<Account> | null;
};

type BackendOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string;
  status: string;
  subtotalCents: number;
  deliveryCents: number;
  totalCents: number;
  province: string | null;
  district: string | null;
  sector: string | null;
  cell: string | null;
  village: string | null;
  landmark: string | null;
  deliveryNotes: string | null;
  createdAt: string;
  updatedAt: string;
  items?: Array<{
    productSlug: string;
    productName: string;
    quantity: number;
    unitPriceCents: number;
  }>;
  payments?: Array<{
    provider: string;
    providerReference: string | null;
    status: string;
  }>;
};

type AdminSummary = {
  counts?: Record<string, number>;
  users?: ApiUser[];
  orders?: BackendOrder[];
  payments?: unknown[];
  contactMessages?: unknown[];
  jobApplications?: unknown[];
  lostFoundReports?: unknown[];
  investorRequests?: unknown[];
};

type AccountSummary = {
  orders?: BackendOrder[];
  jobApplications?: unknown[];
  lostFoundReports?: unknown[];
  investorRequests?: unknown[];
  payments?: unknown[];
};

const defaultAccount: Account = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  preferredLanguage: "English",
  customerType: "Retail",
  province: "Kigali City",
  district: "Gasabo",
  sector: "",
  cell: "",
  village: "",
  landmark: "",
  deliveryNotes: ""
};

const paymentMethods: PaymentMethod[] = ["Cash on Delivery", "MTN MoMo", "Airtel Money", "Bank Transfer"];
const orderStatuses: OrderStatus[] = [
  "Quote requested",
  "Pending payment confirmation",
  "Payment received",
  "Packing",
  "Out for delivery",
  "Delivered",
  "Completed",
  "Rejected"
];
const customerTypes: CustomerType[] = ["Retail", "Reseller", "Wholesale", "Distributor"];
const languages = ["English", "Kinyarwanda", "French", "Swahili"];

const storageKeys = {
  account: "babra-account",
  loggedIn: "babra-logged-in",
  cart: "babra-cart",
  orders: "babra-orders",
  paymentStatus: "babra-payment-status",
  priceOverrides: "babra-price-overrides"
} as const;

const apiStatusToUi: Record<string, OrderStatus> = {
  QUOTE_REQUESTED: "Quote requested",
  PENDING_PAYMENT: "Pending payment confirmation",
  PAYMENT_RECEIVED: "Payment received",
  PROCESSING: "Packing",
  PACKING: "Packing",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
  CANCELLED: "Rejected",
  REFUNDED: "Rejected"
};

const uiStatusToApi: Record<OrderStatus, string> = {
  "Quote requested": "QUOTE_REQUESTED",
  "Pending payment confirmation": "PENDING_PAYMENT",
  "Payment received": "PAYMENT_RECEIVED",
  Packing: "PACKING",
  "Out for delivery": "OUT_FOR_DELIVERY",
  Delivered: "DELIVERED",
  Completed: "COMPLETED",
  Rejected: "REJECTED"
};

const uiPaymentToApi: Record<PaymentMethod, string> = {
  "Cash on Delivery": "CASH_ON_DELIVERY",
  "MTN MoMo": "MTN_MOMO",
  "Airtel Money": "AIRTEL_MONEY",
  "Bank Transfer": "BANK_TRANSFER"
};

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

function normalizeAccount(value: Partial<Account>): Account {
  const province = value.province && rwandaLocations[value.province as keyof typeof rwandaLocations] ? value.province : defaultAccount.province;
  const districts = rwandaLocations[province as keyof typeof rwandaLocations];
  const district = value.district && districts.includes(value.district) ? value.district : districts[0];

  return {
    ...defaultAccount,
    ...value,
    province,
    district,
    customerType: customerTypes.includes(value.customerType as CustomerType) ? (value.customerType as CustomerType) : defaultAccount.customerType,
    preferredLanguage: value.preferredLanguage || defaultAccount.preferredLanguage
  };
}

function nowLabel() {
  return new Date().toLocaleString();
}

function normalizeOrders(saved: Partial<Order>[]): Order[] {
  return saved.map((order, index) => {
    const createdAt = order.createdAt || nowLabel();
    const items = Array.isArray(order.items)
      ? order.items.map((item) => ({
          slug: item.slug || item.name || `item-${index}`,
          name: item.name || "BaBra product",
          quantity: Number(item.quantity) || 1,
          unitPrice: Number(item.unitPrice) || 0
        }))
      : [];
    const subtotal = Number(order.subtotal) || items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const deliveryFee = Number(order.deliveryFee) || (subtotal > 0 ? 1500 : 0);
    const total = Number(order.total) || subtotal + deliveryFee;

    return {
      id: order.id || `BABRA-SAVED-${index + 1}`,
      items,
      customer: normalizeAccount(order.customer || {}),
      subtotal,
      deliveryFee,
      total,
      method: paymentMethods.includes(order.method as PaymentMethod) ? (order.method as PaymentMethod) : "Cash on Delivery",
      paymentReference: order.paymentReference || "",
      status: orderStatuses.includes(order.status as OrderStatus) ? (order.status as OrderStatus) : "Quote requested",
      createdAt,
      updatedAt: order.updatedAt || createdAt,
      rewardPoints: Number(order.rewardPoints) || Math.floor(total / 1000)
    };
  });
}

function orderFromApi(order: BackendOrder): Order {
  const items = (order.items ?? []).map((item) => ({
    slug: item.productSlug,
    name: item.productName,
    quantity: item.quantity,
    unitPrice: Math.round(item.unitPriceCents / 100)
  }));
  const total = Math.round(order.totalCents / 100);
  const payment = order.payments?.[0];
  const method =
    payment?.provider === "MTN_MOMO"
      ? "MTN MoMo"
      : payment?.provider === "AIRTEL_MONEY"
        ? "Airtel Money"
        : payment?.provider === "BANK_TRANSFER"
          ? "Bank Transfer"
          : "Cash on Delivery";

  return {
    id: order.id,
    items,
    customer: normalizeAccount({
      fullName: order.customerName,
      phone: order.customerPhone,
      email: order.customerEmail ?? "",
      province: order.province ?? defaultAccount.province,
      district: order.district ?? defaultAccount.district,
      sector: order.sector ?? "",
      cell: order.cell ?? "",
      village: order.village ?? "",
      landmark: order.landmark ?? "",
      deliveryNotes: order.deliveryNotes ?? ""
    }),
    subtotal: Math.round(order.subtotalCents / 100),
    deliveryFee: Math.round(order.deliveryCents / 100),
    total,
    method,
    paymentReference: payment?.providerReference ?? "",
    status: apiStatusToUi[order.status] ?? "Quote requested",
    createdAt: new Date(order.createdAt).toLocaleString(),
    updatedAt: new Date(order.updatedAt).toLocaleString(),
    rewardPoints: Math.floor(total / 1000)
  };
}

async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  const payload = (await response.json()) as { ok?: boolean; error?: string } & T;
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || "Request failed");
  }
  return payload;
}

export function PlatformClient({ mode }: { mode: Mode }) {
  const [account, setAccount] = useState<Account>(defaultAccount);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [method, setMethod] = useState<PaymentMethod>("Cash on Delivery");
  const [paymentReference, setPaymentReference] = useState("");
  const [manualStatus, setManualStatus] = useState<OrderStatus>("Quote requested");
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({});
  const [trackingCode, setTrackingCode] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(null);
  const [adminSummary, setAdminSummary] = useState<AdminSummary | null>(null);
  const [accountSummary, setAccountSummary] = useState<AccountSummary | null>(null);

  useEffect(() => {
    const savedAccount = normalizeAccount(readJson<Partial<Account>>(storageKeys.account, defaultAccount));
    const savedOrders = normalizeOrders(readJson<Partial<Order>[]>(storageKeys.orders, []));
    setAccount(savedAccount);
    setLoggedIn(readJson(storageKeys.loggedIn, false));
    setCart(readJson(storageKeys.cart, []));
    setOrders(savedOrders);
    setManualStatus(readJson<OrderStatus>(storageKeys.paymentStatus, "Quote requested"));
    setPriceOverrides(readJson(storageKeys.priceOverrides, {}));
    setTrackingCode(savedOrders[0]?.id ?? "");
  }, []);

  useEffect(() => {
    async function loadBackendState() {
      try {
        const me = await apiRequest<{ user: ApiUser | null }>("/api/auth/me");
        if (me.user) {
          setCurrentUser(me.user);
          setLoggedIn(true);
          setAccount((existing) =>
            normalizeAccount({
              ...existing,
              ...me.user?.profile,
              fullName: me.user?.fullName ?? existing.fullName,
              email: me.user?.email ?? existing.email,
              phone: me.user?.phone ?? existing.phone
            })
          );
        }

        if (mode === "account" || mode === "profile" || mode === "orders" || mode === "payment") {
          const summary = await apiRequest<AccountSummary & { orders: BackendOrder[] }>("/api/account/summary");
          setAccountSummary(summary);
          const nextOrders = summary.orders.map(orderFromApi);
          setOrders(nextOrders);
          setTrackingCode(nextOrders[0]?.id ?? "");
        }

        if (mode === "admin") {
          const summary = await apiRequest<AdminSummary>("/api/admin/summary");
          setAdminSummary(summary);
          const nextOrders = (summary.orders ?? []).map(orderFromApi);
          setOrders(nextOrders);
        }
      } catch (error) {
        if (mode === "admin" || mode === "account" || mode === "profile") {
          setStatusMessage(error instanceof Error ? error.message : "Backend is not connected yet");
        }
      }
    }

    void loadBackendState();
  }, [mode]);

  const cartLines = useMemo(
    () =>
      cart.flatMap((item) => {
        const product = products.find((entry) => entry.slug === item.slug);
        return product ? [{ ...item, product }] : [];
      }),
    [cart]
  );

  function priceFor(slug: string, fallback: number) {
    return priceOverrides[slug] || fallback;
  }

  const subtotal = cartLines.reduce((sum, item) => sum + priceFor(item.product.slug, item.product.price) * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;
  const rewardPoints = Math.floor(total / 1000);
  const latestOrder = orders[0];
  const trackedOrder = orders.find((order) => order.id.toLowerCase() === trackingCode.trim().toLowerCase()) ?? latestOrder;
  const completedRewards = orders.filter((order) => order.status === "Completed").reduce((sum, order) => sum + order.rewardPoints, 0);
  const pendingRewards = orders
    .filter((order) => order.status !== "Completed" && order.status !== "Rejected")
    .reduce((sum, order) => sum + order.rewardPoints, 0);

  const quoteMessage = [
    `Hello ${site.name}, I want to request a BaBra order quote.`,
    `Items: ${cartLines.map((item) => `${item.product.shortName} x${item.quantity}`).join(", ") || "Please advise"}.`,
    `Customer type: ${account.customerType}.`,
    `Customer: ${account.fullName || "Not provided"}.`,
    `Phone: ${account.phone || "Not provided"}.`,
    `Location: ${[account.province, account.district, account.sector, account.cell, account.village].filter(Boolean).join(", ") || "Not provided"}.`,
    `Landmark: ${account.landmark || "Not provided"}.`,
    `Payment method: ${method}.`,
    "Please confirm today's price, delivery fee, availability, and next payment step."
  ].join("\n");

  function updateAccount(field: keyof Account, value: string) {
    const next = normalizeAccount({
      ...account,
      [field]: value,
      ...(field === "province" ? { district: rwandaLocations[value as keyof typeof rwandaLocations][0] } : {})
    });
    setAccount(next);
    saveJson(storageKeys.account, next);
  }

  function saveCart(next: CartItem[]) {
    setCart(next);
    saveJson(storageKeys.cart, next);
  }

  async function signUp() {
    setIsBusy(true);
    setStatusMessage("");
    try {
      const result = await apiRequest<{ user: ApiUser }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          fullName: account.fullName,
          email: account.email,
          phone: account.phone,
          password: account.password,
          role: "CUSTOMER"
        })
      });
      setCurrentUser(result.user);
      saveJson(storageKeys.account, account);
      saveJson(storageKeys.loggedIn, true);
      setLoggedIn(true);
      window.location.href = "/account";
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setIsBusy(false);
    }
  }

  async function login() {
    setIsBusy(true);
    setStatusMessage("");
    try {
      const result = await apiRequest<{ user: ApiUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword })
      });
      setCurrentUser(result.user);
      setAccount((existing) =>
        normalizeAccount({
          ...existing,
          ...result.user.profile,
          fullName: result.user.fullName,
          email: result.user.email ?? existing.email,
          phone: result.user.phone ?? existing.phone
        })
      );
      saveJson(storageKeys.loggedIn, true);
      setLoggedIn(true);
      window.location.href = result.user.role === "ADMIN" || result.user.role === "STAFF" ? "/admin" : "/account";
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsBusy(false);
    }
  }

  async function logout() {
    setStatusMessage("");
    try {
      await apiRequest("/api/auth/logout", { method: "POST", body: "{}" });
    } catch {
      // Local logout still clears device state if the server is unavailable.
    }
    setCurrentUser(null);
    saveJson(storageKeys.loggedIn, false);
    setLoggedIn(false);
  }

  function addToCart(slug: string) {
    const existing = cart.find((item) => item.slug === slug);
    const next = existing ? cart.map((item) => (item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)) : [...cart, { slug, quantity: 1 }];
    saveCart(next);
  }

  function updateQuantity(slug: string, quantity: number) {
    const safe = Math.max(0, quantity);
    const next = safe === 0 ? cart.filter((item) => item.slug !== slug) : cart.map((item) => (item.slug === slug ? { ...item, quantity: safe } : item));
    saveCart(next);
  }

  function clearCart() {
    saveCart([]);
  }

  async function submitOrder(status: OrderStatus = "Pending payment confirmation") {
    if (cartLines.length === 0) return;
    setIsBusy(true);
    setStatusMessage("");
    try {
      const result = await apiRequest<{ order: BackendOrder }>("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          customerName: account.fullName,
          customerEmail: account.email,
          customerPhone: account.phone,
          items: cartLines.map((item) => ({ productSlug: item.product.slug, quantity: item.quantity })),
          paymentProvider: uiPaymentToApi[method],
          province: account.province,
          district: account.district,
          sector: account.sector,
          cell: account.cell,
          village: account.village,
          landmark: account.landmark,
          deliveryNotes: account.deliveryNotes
        })
      });
      const savedOrder = orderFromApi(result.order);
      const next = [savedOrder, ...orders];
      setOrders(next);
      saveJson(storageKeys.orders, next);
      setTrackingCode(savedOrder.id);
      clearCart();
      window.location.href = status === "Quote requested" ? "/orders" : "/payment-confirmation";
      return;
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Order could not be saved to the database");
      setIsBusy(false);
      return;
    }
    const order: Order = {
      id: `BABRA-${Date.now().toString().slice(-8)}`,
      items: cartLines.map((item) => ({
        slug: item.product.slug,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: priceFor(item.product.slug, item.product.price)
      })),
      customer: {
        fullName: account.fullName,
        phone: account.phone,
        email: account.email,
        preferredLanguage: account.preferredLanguage,
        customerType: account.customerType,
        province: account.province,
        district: account.district,
        sector: account.sector,
        cell: account.cell,
        village: account.village,
        landmark: account.landmark,
        deliveryNotes: account.deliveryNotes
      },
      subtotal,
      deliveryFee,
      total,
      method,
      paymentReference,
      status,
      createdAt: nowLabel(),
      updatedAt: nowLabel(),
      rewardPoints
    };
    const next = [order, ...orders];
    setOrders(next);
    saveJson(storageKeys.orders, next);
    setTrackingCode(order.id);
    setManualStatus(status);
    saveJson(storageKeys.paymentStatus, status);
    clearCart();
    window.location.href = status === "Quote requested" ? "/orders" : "/payment-confirmation";
  }

  function savePrice(slug: string, value: number) {
    const next = { ...priceOverrides, [slug]: Math.max(0, value) };
    setPriceOverrides(next);
    saveJson(storageKeys.priceOverrides, next);
  }

  async function updateOrderStatus(id: string, status: OrderStatus) {
    setStatusMessage("");
    try {
      await apiRequest("/api/orders", {
        method: "PATCH",
        body: JSON.stringify({ orderId: id, status: uiStatusToApi[status] })
      });
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Order status update failed");
      return;
    }
    const next = orders.map((order) => (order.id === id ? { ...order, status, updatedAt: nowLabel() } : order));
    setOrders(next);
    saveJson(storageKeys.orders, next);
    if (id === latestOrder?.id) {
      setManualStatus(status);
      saveJson(storageKeys.paymentStatus, status);
    }
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPaymentReference(file ? `${paymentReference || "Attachment"} - ${file.name}` : paymentReference);
  }

  async function requestPasswordReset() {
    setIsBusy(true);
    setStatusMessage("");
    try {
      const result = await apiRequest<{ message?: string }>("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ identifier: forgotIdentifier })
      });
      setStatusMessage(result.message || "Reset request received for review.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Reset request failed");
    } finally {
      setIsBusy(false);
    }
  }

  const accountForm = (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Full name" value={account.fullName} onChange={(value) => updateAccount("fullName", value)} />
      <Field label="Phone / WhatsApp" value={account.phone} onChange={(value) => updateAccount("phone", value)} />
      <Field label="Email" value={account.email} onChange={(value) => updateAccount("email", value)} />
      <Field label="Password" value={account.password} type="password" onChange={(value) => updateAccount("password", value)} />
      <SelectField label="Preferred language" value={account.preferredLanguage} options={languages} onChange={(value) => updateAccount("preferredLanguage", value)} />
      <SelectField label="Customer type" value={account.customerType} options={customerTypes} onChange={(value) => updateAccount("customerType", value)} />
      <SelectField label="Province" value={account.province} options={Object.keys(rwandaLocations)} onChange={(value) => updateAccount("province", value)} />
      <SelectField label="District" value={account.district} options={rwandaLocations[account.province as keyof typeof rwandaLocations]} onChange={(value) => updateAccount("district", value)} />
      <Field label="Sector" value={account.sector} onChange={(value) => updateAccount("sector", value)} />
      <Field label="Cell" value={account.cell} onChange={(value) => updateAccount("cell", value)} />
      <Field label="Village" value={account.village} onChange={(value) => updateAccount("village", value)} />
      <Field label="Nearest landmark" value={account.landmark} onChange={(value) => updateAccount("landmark", value)} />
      <label className="grid gap-2 text-sm font-bold text-white/78 md:col-span-2">
        Delivery notes
        <textarea
          className="min-h-28 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          value={account.deliveryNotes}
          onChange={(event) => updateAccount("deliveryNotes", event.target.value)}
        />
      </label>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#080606] px-5 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a className="font-serif text-2xl" href="/">
            {site.domain}
          </a>
          <nav className="flex flex-wrap gap-2 text-sm font-bold text-white/72">
            <a className="rounded-full border border-white/10 px-4 py-2" href="/store">Store</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/cart">Cart</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/checkout">Checkout</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/orders">Orders</a>
            <a className="rounded-full border border-white/10 px-4 py-2" href="/profile">Profile</a>
          </nav>
        </header>
        {statusMessage ? (
          <div className="mt-6 rounded-2xl border border-[#f1d58b]/25 bg-[#f1d58b]/10 p-4 text-sm font-bold text-[#f7df9d]">
            {statusMessage}
          </div>
        ) : null}

        {mode === "signup" && (
          <Panel>
            <h1 className="font-serif text-5xl">Create BaBra account</h1>
            <p className="mt-4 text-white/64">Create a real BaBra customer account connected to the production database.</p>
            <div className="mt-8">{accountForm}</div>
            <button className="mt-6 rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={signUp} type="button" disabled={isBusy}>
              {isBusy ? "Creating..." : "Sign Up"}
            </button>
          </Panel>
        )}

        {mode === "login" && (
          <Panel className="max-w-2xl">
            <h1 className="font-serif text-5xl">Login</h1>
            <p className="mt-4 text-white/64">Login with your BaBra customer or admin account.</p>
            <div className="mt-8 grid gap-4">
              <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Email or phone" value={loginIdentifier} onChange={(event) => setLoginIdentifier(event.target.value)} />
              <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={login} type="button" disabled={isBusy}>
                {isBusy ? "Logging in..." : "Login"}
              </button>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href="/forgot-password">Forgot Password</a>
            </div>
          </Panel>
        )}

        {mode === "forgot" && (
          <Panel className="max-w-2xl">
            <h1 className="font-serif text-5xl">Forgot Password</h1>
            <p className="mt-4 text-white/64">BaBra support receives a reset request; no fake password confirmation is shown.</p>
            <input className="mt-8 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" placeholder="Email or phone" value={forgotIdentifier} onChange={(event) => setForgotIdentifier(event.target.value)} />
            <button className="mt-6 inline-flex rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={requestPasswordReset} type="button" disabled={isBusy}>
              {isBusy ? "Sending..." : "Request reset"}
            </button>
          </Panel>
        )}

        {(mode === "account" || mode === "profile") && (
          <section className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f1d58b]">{loggedIn ? "Logged in" : "Guest mode"}</p>
              <h1 className="mt-3 font-serif text-5xl">Customer Account</h1>
              <p className="mt-4 text-white/64">{account.fullName || "Create or login to save your BaBra profile."}</p>
              <div className="mt-6 grid gap-3 text-sm font-bold text-white/72">
                <span>Orders: {orders.length}</span>
                <span>Confirmed rewards: {completedRewards} points</span>
                <span>Pending rewards: {pendingRewards} points</span>
                <span>Role: {currentUser?.role ?? "Guest"}</span>
              </div>
              <button className="mt-6 rounded-full border border-white/20 px-5 py-3 font-black text-white" onClick={logout} type="button">Logout</button>
            </aside>
            <Panel className="mt-0">
              <h2 className="font-serif text-4xl">Profile and delivery details</h2>
              <div className="mt-8">{accountForm}</div>
            </Panel>
            <section className="grid gap-4 lg:col-span-2 md:grid-cols-2 xl:grid-cols-4">
              <Metric label="My Orders" value={orders.length.toString()} />
              <Metric label="My Applications" value={(accountSummary?.jobApplications?.length ?? 0).toString()} />
              <Metric label="My Lost & Found" value={(accountSummary?.lostFoundReports?.length ?? 0).toString()} />
              <Metric label="Payment History" value={(accountSummary?.payments?.length ?? 0).toString()} />
            </section>
            <section className="grid gap-4 lg:col-span-2 xl:grid-cols-2">
              <Panel className="mt-0">
                <h2 className="font-serif text-4xl">My Orders</h2>
                <div className="mt-5 grid gap-3">
                  {orders.slice(0, 4).map((order) => <OrderCard key={order.id} order={order} onStatusChange={(nextStatus) => updateOrderStatus(order.id, nextStatus)} />)}
                  {orders.length === 0 ? <p className="text-white/62">No database orders yet.</p> : null}
                </div>
              </Panel>
              <Panel className="mt-0">
                <h2 className="font-serif text-4xl">My Applications</h2>
                <p className="mt-4 text-white/62">Job, investor, and division application records appear here after submission.</p>
                <div className="mt-5 grid gap-2 text-sm font-bold text-white/72">
                  <span>Job applications: {accountSummary?.jobApplications?.length ?? 0}</span>
                  <span>Investor access requests: {accountSummary?.investorRequests?.length ?? 0}</span>
                  <span>Lost & Found reports: {accountSummary?.lostFoundReports?.length ?? 0}</span>
                </div>
              </Panel>
            </section>
          </section>
        )}

        {(mode === "cart" || mode === "checkout") && (
          <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <h1 className="font-serif text-5xl">{mode === "cart" ? "Cart" : "Checkout"}</h1>
              <p className="mt-4 max-w-2xl text-white/64">
                Prices remain admin-controlled. Customers can request a quote or submit a manual payment record after BaBra confirms the price.
              </p>
              <div className="mt-8 grid gap-4">
                {products.map((product) => {
                  const item = cart.find((entry) => entry.slug === product.slug);
                  return (
                    <article key={product.slug} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                      <Image className="h-28 rounded-xl bg-white object-contain p-2" src={product.image} alt={product.alt} width={520} height={1024} sizes="112px" />
                      <div>
                        <h2 className="font-serif text-3xl">{product.name}</h2>
                        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#d6ad57]">{product.size}</p>
                        <p className="mt-1 text-white/72">{PRICE_INQUIRY_LABEL} <span className="text-white/42">{PRICE_INQUIRY_NOTE}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-full bg-[#f1d58b] px-4 py-2 font-black text-[#130d08]" onClick={() => addToCart(product.slug)} type="button">Add</button>
                        <input className="w-20 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white" min="0" type="number" value={item?.quantity ?? 0} onChange={(event) => updateQuantity(product.slug, Number(event.target.value))} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <aside className="rounded-[2rem] border border-[#f1d58b]/20 bg-white/[0.05] p-6">
              <h2 className="font-serif text-4xl">Order summary</h2>
              <CartSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} rewardPoints={rewardPoints} />
              {cartLines.length === 0 ? <p className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4 text-white/62">Add products before requesting a quote.</p> : null}
              {mode === "cart" ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/checkout">Go to checkout</a>
                  <button className="rounded-full border border-white/20 px-6 py-3 font-black text-white" onClick={() => submitOrder("Quote requested")} type="button" disabled={cartLines.length === 0 || isBusy}>Save quote request</button>
                </div>
              ) : null}
              {mode === "checkout" ? (
                <div className="mt-6 grid gap-5">
                  <h3 className="font-serif text-3xl">Customer information</h3>
                  {accountForm}
                  <h3 className="mt-2 font-serif text-3xl">Payment method</h3>
                  <SelectField label="Payment method" value={method} options={paymentMethods} onChange={(value) => setMethod(value as PaymentMethod)} />
                  {method !== "Cash on Delivery" ? (
                    <div className="grid gap-3">
                      <Field label={method === "Bank Transfer" ? "Bank / account reference" : "Payer phone number"} value={paymentReference} onChange={setPaymentReference} />
                      <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type="file" onChange={handleFileInput} />
                    </div>
                  ) : (
                    <p className="rounded-xl border border-white/10 bg-black/25 p-4 text-white/64">Cash on Delivery remains pending until BaBra confirms delivery and payment.</p>
                  )}
                  <button className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" onClick={() => submitOrder("Pending payment confirmation")} type="button" disabled={cartLines.length === 0 || isBusy}>
                    {isBusy ? "Saving order..." : "Submit order"}
                  </button>
                  <a className="rounded-full border border-white/20 px-6 py-3 text-center font-black text-white" href={whatsappOrderUrl(quoteMessage)} target="_blank" rel="noopener noreferrer">
                    Send on WhatsApp
                  </a>
                </div>
              ) : null}
            </aside>
          </section>
        )}

        {(mode === "orders" || mode === "payment") && (
          <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Panel className="mt-0">
              <h1 className="font-serif text-5xl">{mode === "payment" ? "Payment confirmation" : "Order tracking"}</h1>
              <p className="mt-4 text-white/64">Track the newest order or enter an order code saved on this device.</p>
              <input className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={trackingCode} onChange={(event) => setTrackingCode(event.target.value)} placeholder="BABRA-00000000" />
              {trackedOrder ? <OrderTimeline order={trackedOrder} /> : <p className="mt-6 text-white/62">No order saved yet.</p>}
            </Panel>
            <div className="grid gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onStatusChange={(status) => updateOrderStatus(order.id, status)} editable={mode === "payment"} />
              ))}
            </div>
          </section>
        )}

        {mode === "admin" && (
          <section className="mt-10">
            <h1 className="font-serif text-5xl">BaBra Admin Dashboard</h1>
            <p className="mt-4 text-white/64">Manual operations center for Phase 1: orders, payments, delivery, rewards, products, and customer intelligence.</p>
            <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Metric label="Users" value={(adminSummary?.counts?.users ?? 0).toString()} />
              <Metric label="Orders" value={(adminSummary?.counts?.orders ?? orders.length).toString()} />
              <Metric label="Payments" value={(adminSummary?.counts?.payments ?? 0).toString()} />
              <Metric label="Forms" value={((adminSummary?.counts?.contactMessages ?? 0) + (adminSummary?.counts?.jobApplications ?? 0)).toString()} />
            </section>
            <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Metric label="Lost & Found" value={(adminSummary?.counts?.lostFoundReports ?? 0).toString()} />
              <Metric label="Investor Requests" value={(adminSummary?.counts?.investorRequests ?? 0).toString()} />
              <Metric label="Out for delivery" value={orders.filter((order) => order.status === "Out for delivery").length.toString()} />
              <Metric label="Revenue reference" value={formatRwf(orders.filter((order) => order.status !== "Rejected").reduce((sum, order) => sum + order.total, 0))} />
            </section>
            <section className="mt-8 rounded-[2rem] border border-[#f1d58b]/20 bg-white/[0.055] p-6">
              <h2 className="font-serif text-4xl">Product price controls</h2>
              <p className="mt-3 text-white/62">Local admin prices are used for checkout estimates until database pricing is connected.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <label key={product.slug} className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white/78">
                    {product.name}
                    <input
                      className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
                      min="0"
                      type="number"
                      value={priceFor(product.slug, product.price)}
                      onChange={(event) => savePrice(product.slug, Number(event.target.value))}
                    />
                  </label>
                ))}
              </div>
            </section>
            <section className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                {orders.length === 0 ? <Panel className="mt-0"><p className="text-white/62">No orders saved yet. Place a checkout order to see admin workflow.</p></Panel> : null}
                {orders.map((order) => <OrderCard key={order.id} order={order} onStatusChange={(status) => updateOrderStatus(order.id, status)} editable />)}
              </div>
              <Panel className="mt-0">
                <h2 className="font-serif text-4xl">Intelligence</h2>
                <div className="mt-6 grid gap-4">
                  <Insight title="Next action" text={orders.some((order) => order.status === "Pending payment confirmation") ? "Verify payment references and move paid orders to Packing." : "Add confirmed orders, then monitor delivery and rewards."} />
                  <Insight title="Fraud guard" text="Rewards stay pending until an order is marked Completed. Rejected orders release no points." />
                  <Insight title="Delivery focus" text={`${account.province} and ${account.district} are currently the active customer location defaults.`} />
                </div>
              </Panel>
            </section>
          </section>
        )}
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/78">
      {label}
      <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white/78">
      {label}
      <select className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mt-10 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-10 ${className}`}>{children}</section>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.055] p-6">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#d6ad57]">{label}</p>
      <strong className="mt-3 block text-3xl text-white">{value}</strong>
    </article>
  );
}

function CartSummary({ subtotal, deliveryFee, total, rewardPoints }: { subtotal: number; deliveryFee: number; total: number; rewardPoints: number }) {
  return (
    <div className="mt-6 grid gap-3 text-white/72">
      <div className="flex justify-between gap-4"><span>Products estimate</span><strong>{formatRwf(subtotal)}</strong></div>
      <div className="flex justify-between gap-4"><span>Delivery estimate</span><strong>{formatRwf(deliveryFee)}</strong></div>
      <div className="flex justify-between gap-4 border-t border-white/10 pt-3 text-white"><span>Total reference</span><strong>{formatRwf(total)}</strong></div>
      <div className="rounded-xl border border-[#f1d58b]/20 bg-black/25 p-4">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f1d58b]">Rewards preview</p>
        <p className="mt-2 text-white/64">{rewardPoints} pending points after BaBra confirms and completes the order.</p>
      </div>
    </div>
  );
}

function OrderTimeline({ order }: { order: Order }) {
  const steps: OrderStatus[] = ["Quote requested", "Pending payment confirmation", "Payment received", "Packing", "Out for delivery", "Delivered", "Completed"];
  const activeIndex = Math.max(0, steps.indexOf(order.status));
  return (
    <div className="mt-8 grid gap-3">
      {steps.map((step, index) => (
        <div key={step} className={`rounded-xl border px-4 py-3 text-sm font-black ${index <= activeIndex ? "border-[#f1d58b] bg-[#f1d58b] text-[#130d08]" : "border-white/10 bg-black/25 text-white/62"}`}>
          <span className="whitespace-nowrap">Step {index + 1}.</span> {step}
        </div>
      ))}
    </div>
  );
}

function OrderCard({ order, editable, onStatusChange }: { order: Order; editable?: boolean; onStatusChange: (status: OrderStatus) => void }) {
  return (
    <article className="rounded-2xl border border-[#f1d58b]/20 bg-white/[0.055] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl">{order.id}</h2>
          <p className="mt-2 text-sm font-bold text-white/48">{order.createdAt} - {order.method}</p>
        </div>
        <span className="rounded-full bg-[#f1d58b] px-4 py-2 text-sm font-black text-[#130d08]">{order.status}</span>
      </div>
      <p className="mt-4 text-white/62">{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
      <div className="mt-4 grid gap-2 text-sm text-white/58 md:grid-cols-2">
        <span>Customer: {order.customer.fullName || "Not provided"}</span>
        <span>Phone: {order.customer.phone || "Not provided"}</span>
        <span>Location: {[order.customer.province, order.customer.district, order.customer.sector, order.customer.cell, order.customer.village].filter(Boolean).join(", ")}</span>
        <span>Total reference: {formatRwf(order.total)}</span>
        <span>Rewards: {order.rewardPoints} points</span>
        <span>Updated: {order.updatedAt}</span>
      </div>
      {editable ? (
        <SelectField label="Update status" value={order.status} options={orderStatuses} onChange={(value) => onStatusChange(value as OrderStatus)} />
      ) : null}
    </article>
  );
}

function Insight({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/25 p-5">
      <h3 className="font-serif text-3xl">{title}</h3>
      <p className="mt-3 leading-7 text-white/62">{text}</p>
    </article>
  );
}
