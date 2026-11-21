import Link from "next/link";
import { getCommunityAccount } from "../../lib/community";
import { CommunityClient } from "./CommunityClient";
import { isAdminRole } from "../../lib/session";
import styles from "./community.module.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "BaBra Community", robots: { index: false, follow: false } };

export default async function CommunityPage() {
  const account = await getCommunityAccount();

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link href="/">babra.store</Link>
        <Link href="/gallery">Gallery</Link>
      </header>
      <section className={styles.hero}>
        <h1>BaBra Community</h1>
        <p>Sangira amafoto, menya abandi banyamuryango kandi muganire.</p>
      </section>
      {account ? <CommunityClient initialMember={account.member} canModerate={isAdminRole(account.role)} /> : (
        <section className={styles.card}>
          <h2>Injira muri Community</h2>
          <p>Koresha konti yawe ya BaBra kugira ngo ubone ibyo abanyamuryango basangiye kandi ubashe kubandikira.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/login?next=community">Injira</Link>
            <Link className={styles.outline} href="/signup?next=community">Fungura konti</Link>
          </div>
        </section>
      )}
    </main>
  );
}
