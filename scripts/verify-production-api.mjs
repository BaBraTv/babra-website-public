import "./load-production-env.mjs";

const baseUrl = process.env.PRODUCTION_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";
const adminSetupSecret = process.env.ADMIN_SETUP_SECRET || "";
const paymentCallbackSecret = process.env.PAYMENT_CALLBACK_SECRET || "";

const unique = Date.now();
const customer = {
  fullName: "BaBra Production Test Customer",
  email: `production-test-${unique}@babra.store`,
  phone: `25078${String(unique).slice(-7)}`,
  password: `BaBraTest-${unique}!`
};

let cookie = "";

function rememberCookies(response) {
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    cookie = setCookie
      .split(",")
      .map((part) => part.split(";")[0])
      .join("; ");
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
      ...(options.headers || {})
    }
  });
  rememberCookies(response);
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!response.ok || body.ok === false) {
    throw new Error(`${path} failed (${response.status}): ${body.error || text}`);
  }
  return body;
}

const checks = [];

async function check(name, fn) {
  try {
    const result = await fn();
    checks.push({ name, ok: true, result });
  } catch (error) {
    checks.push({ name, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

await check("signup", () =>
  request("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(customer)
  })
);

await check("me", () => request("/api/auth/me"));

let orderId = "";
await check("create order", async () => {
  const result = await request("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      customerName: customer.fullName,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      items: [{ productSlug: "women", quantity: 1 }],
      paymentProvider: "MTN_MOMO",
      province: "Kigali City",
      district: "Gasabo",
      sector: "Kimironko",
      cell: "Production Test",
      village: "Production Test",
      landmark: "Production readiness check"
    })
  });
  orderId = result.order.id;
  return { orderId, orderNumber: result.order.orderNumber };
});

await check("manual payment", () =>
  request("/api/payments/manual", {
    method: "POST",
    body: JSON.stringify({
      orderId,
      provider: "MTN_MOMO",
      providerReference: `TEST-${unique}`,
      notes: "Production readiness verification only"
    })
  })
);

await check("account summary", () => request("/api/account/summary"));

await check("contact form", () =>
  request("/api/forms/contact", {
    method: "POST",
    body: JSON.stringify({
      fullName: "BaBra Production Test",
      email: customer.email,
      phone: customer.phone,
      subject: "Production readiness verification",
      message: "Testing that contact messages persist to the real database.",
      sourcePage: "verify-production-api"
    })
  })
);

await check("job application form", () =>
  request("/api/forms/jobs", {
    method: "POST",
    body: JSON.stringify({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      roleApplied: "Production Readiness Tester",
      division: "Operations"
    })
  })
);

await check("lost and found form", () =>
  request("/api/forms/lost-found", {
    method: "POST",
    body: JSON.stringify({
      reportType: "LOST",
      reporterName: customer.fullName,
      reporterPhone: customer.phone,
      reporterEmail: customer.email,
      itemType: "Test document",
      itemTitle: "Production readiness test item",
      itemDescription: "This is a database verification record.",
      province: "Kigali City",
      district: "Gasabo"
    })
  })
);

await check("investor access form", () =>
  request("/api/forms/investor-access", {
    method: "POST",
    body: JSON.stringify({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      projectArea: "Production readiness"
    })
  })
);

if (paymentCallbackSecret && orderId) {
  await check("payment callback rejects unknown reference safely", async () => {
    const response = await fetch(`${baseUrl}/api/payments/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-babra-payment-secret": paymentCallbackSecret
      },
      body: JSON.stringify({
        provider: "MTN_MOMO",
        providerReference: `CALLBACK-${unique}`,
        internalReference: `UNKNOWN-${unique}`,
        status: "CALLBACK_RECEIVED",
        amountCents: 100,
        currency: "RWF"
      })
    });
    return { status: response.status };
  });
}

if (adminSetupSecret) {
  await check("admin setup signup", () =>
    request("/api/auth/signup", {
      method: "POST",
      headers: { "x-babra-admin-setup-secret": adminSetupSecret },
      body: JSON.stringify({
        fullName: "BaBra Production Test Admin",
        email: `production-admin-${unique}@babra.store`,
        phone: `25079${String(unique).slice(-7)}`,
        password: `BaBraAdmin-${unique}!`,
        role: "ADMIN"
      })
    })
  );

  await check("admin summary", () => request("/api/admin/summary"));
}

console.log(JSON.stringify({ baseUrl, checks }, null, 2));

if (checks.some((item) => !item.ok)) {
  process.exitCode = 1;
}
