import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/session";
import { getPrisma } from "../../../lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "WhatsApp inbox | BaBra", robots: { index: false, follow: false } };

function readMessage(value: string) {
  try {
    const parsed = JSON.parse(value);
    return { incoming: typeof parsed.incoming === "string" ? parsed.incoming : value, reply: typeof parsed.reply === "string" ? parsed.reply : "", sent: parsed.sent === true };
  } catch { return { incoming: value, reply: "", sent: false }; }
}

export default async function WhatsAppInbox() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN" && user.role !== "STAFF") redirect("/account");
  const messages = await getPrisma().contactMessage.findMany({ where: { sourcePage: "whatsapp" }, orderBy: { createdAt: "desc" }, take: 100 });
  return <main className="min-h-screen bg-[#090706] p-6 text-white md:p-12">
    <a href="/admin" className="text-[#f1d58b]">← Admin dashboard</a>
    <h1 className="mt-6 font-serif text-4xl">WhatsApp customer requests</h1>
    <p className="mt-3 text-white/70">Latest 100 received messages. Review customer questions and handoff requests here. Reply through an authorized WhatsApp inbox or contact the customer directly; this page does not send messages.</p>
    <a className="mt-4 inline-block text-[#f1d58b]" href="/admin/whatsapp">Refresh inbox</a>
    {messages.length === 0 ? <p className="mt-8">No WhatsApp requests received yet.</p> : messages.map(message => {
      const text = readMessage(message.message);
      return <article key={message.id} className="mt-5 rounded-xl border border-white/20 p-5">
        <h2 className="text-xl font-bold">{message.subject} · {message.fullName}</h2>
        <p className="mt-2 text-white/70">{message.phone} · {message.createdAt.toISOString()} · {message.status}</p>
        {message.phone && /^\+\d{6,15}$/.test(message.phone) ? <a className="mt-2 inline-block text-[#f1d58b]" href={`tel:${message.phone}`}>Call customer</a> : null}
        <h3 className="mt-4 font-bold">Customer message</h3>
        <p className="mt-2 whitespace-pre-wrap break-words">{text.incoming}</p>
        <h3 className="mt-4 font-bold">Automated reply · {text.sent ? "sent" : "delivery pending"}</h3>
        <p className="mt-2 whitespace-pre-wrap break-words text-white/70">{text.reply}</p>
      </article>;
    })}
  </main>;
}
