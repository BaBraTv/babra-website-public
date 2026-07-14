import { getPrisma } from "./db";

export async function listShippingOptions(country = "RW", region?: string) {
  const zones = await getPrisma().shippingZone.findMany({
    where: { isActive: true },
    include: { methods: { where: { isActive: true }, orderBy: { baseFeeCents: "asc" } } },
    orderBy: { name: "asc" }
  });

  return zones
    .filter((zone) => {
      const countries = Array.isArray(zone.countries) ? zone.countries : [];
      const regions = Array.isArray(zone.regions) ? zone.regions : [];
      return countries.includes(country) || (region ? regions.includes(region) : false);
    })
    .flatMap((zone) =>
      zone.methods.map((method) => ({
        zoneCode: zone.code,
        methodCode: method.code,
        name: method.name,
        description: method.description,
        baseFeeCents: method.baseFeeCents,
        currency: method.currency,
        estimateMinDays: method.estimateMinDays,
        estimateMaxDays: method.estimateMaxDays,
        supportsCOD: method.supportsCOD,
        requiresQuote: method.requiresQuote
      }))
    );
}
