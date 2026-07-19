# RC25 Rwanda Schools Localization

Date: 2026-07-19

Branch: `codex/production-readiness`

Status: complete and ready for preview review. No deployment or merge was performed.

## Scope Completed

- Rebuilt `/schools` as BaBra Schools Rwanda: a future integrated education, health, innovation, and community-development vision for Rwanda and the wider East African region.
- Rebuilt `/schools/masterplan` around the same Rwanda-focused project presentation and preliminary campus concept.
- Added the requested public sections:
  - Hero
  - Our Vision
  - Why Rwanda
  - Education Journey
  - Proposed Campus Master Plan
  - Academic and Innovation Facilities
  - Teaching Hospital Vision
  - Student Life
  - Community Impact
  - Sustainability
  - Development Phases
  - Partnership and Investment
  - Gallery
  - Contact CTA
- Added Rwanda-focused metadata, canonical URLs, Open Graph metadata, Twitter metadata, and `EducationalOrganization` structured data without unverified address, accreditation, enrolment, opening-date, or approval claims.

## Foreign Reference Removal

- Audited public application code, metadata, captions, alt text, filenames, and public media paths for every prohibited foreign term listed in the RC25 brief.
- No prohibited terms remain in public-facing Schools content or filenames.
- The source PDF is not linked or embedded publicly and is never characterized publicly by its original foreign programme context.
- Foreign funding models, procurement agents, government approval processes, institutional standards, project locations, cost tables, furniture schedules, and implementation procedures were excluded.

## Rwanda-focused Content Added

- Positioned the project around Rwanda's learners, families, teachers, culture, values, workforce, community health, agriculture, sustainability, and national and East African development.
- Presented Nursery, Primary School, Secondary School, Technical and Vocational Education, University, Innovation and Research Centre, Teacher Development Centre, Student Accommodation, Sports and Creative Arts, and Agriculture and Environmental Learning as planned or future phases.
- Added a proposed campus zoning system covering education, research, technical learning, health, administration, digital learning, science, culture, sport, accommodation, staff housing, dining, agriculture, landscape, transport, security, water, sanitation, and waste management.
- Added the future BaBra Teaching and Community Hospital vision for community healthcare, student and staff health, nursing and medical education, maternal and child health, preventive healthcare, research, and practical training.
- Clearly states that the hospital is not presented as operating, licensed, funded, or under construction.
- Clearly distinguishes preliminary concepts, planned components, potential phases, and long-term development from operating facilities.

## PDF Pages and Assets Used

The official source document was used only as an architectural and planning reference. Six drawing sheets were selected because visual review confirmed that their public crops contain useful building concepts without unrelated foreign headings or explanatory programme text.

The source PDF was moved to `docs/internal/sources/babra-schools-architectural-reference.pdf` so the full document and its unrelated background material are not served from the public website.

| Source PDF page | Public asset | Public use |
| --- | --- | --- |
| 2 | `babra-schools-rwanda-four-classroom-concept.webp` | Proposed 4-classroom block reference |
| 3 | `babra-schools-rwanda-eight-classroom-concept.webp` | Proposed 8-classroom block reference |
| 4 | `babra-schools-rwanda-administration-library-concept.webp` | Proposed administration and library reference |
| 5 | `babra-schools-rwanda-laboratory-concept.webp` | Proposed laboratory block reference |
| 6 | `babra-schools-rwanda-multipurpose-hall-concept.webp` | Proposed multi-purpose and cultural hall reference, hero, and social metadata |
| 9 | `babra-schools-rwanda-student-hostel-concept.webp` | Proposed student accommodation reference |

The selected sheets were rendered at high resolution, rotated for correct reading orientation, cropped to remove excess page margins, and exported as optimized WebP assets. Technical dimensions inside the drawings were not edited or relabelled.

## Drawings and Pages Excluded

- PDF page 1 was excluded because it is an index rather than a useful visual presentation sheet.
- PDF pages 7, 8, and 10-12 were not needed for the initial public gallery. Their proposed kitchen/store, toilet, larger hostel, and residential concepts remain possible reference material for a later approved expansion.
- PDF pages 13-44 were excluded from public use because they contain unrelated furniture schedules, foreign project locations, foreign standards, funding comparisons, procurement arrangements, government processes, implementation structures, schedules, cost material, maintenance context, or evaluation narrative.
- No lengthy furniture schedules, procurement tables, technical cost tables, foreign funding comparisons, or unrelated implementation procedures are exposed publicly.

## Regulatory Disclaimer

Both Schools routes display this disclaimer:

> The BaBra Schools campus materials shown on this website represent a development vision and preliminary architectural concepts. Final designs, site adaptation, construction, education, healthcare and environmental implementation will be subject to review and approval by the relevant authorities and qualified professionals in Rwanda.

The gallery also states that the selected drawings are not an approved Rwanda master plan.

## Remaining Rwanda-specific Media Required

The public presentation intentionally remains text-led beyond the approved concept drawings. Future improvement would benefit from verified, approved BaBra-owned media such as:

- Confirmed Rwanda project site photography, after land and publication rights are verified.
- Rwanda-based community consultation and education programme photography with documented consent.
- Approved locally adapted campus site plan after professional and regulatory review.
- Approved BaBra Schools Rwanda logo or visual identity assets if different from the main BaBra brand.
- Verified project leadership, educator, learner, laboratory, agriculture, sport, and community-health media with appropriate image permissions.

No stock photography, unrelated foreign school imagery, or AI-generated campus media was added as a substitute.

## Public Route Verification

- `/schools` - compiled and statically generated successfully.
- `/schools/masterplan` - compiled and statically generated successfully.
- `/forms/schools` - present and statically generated successfully.
- `/investor-sponsor-access` - present and statically generated successfully.
- `/contact` - present and statically generated successfully.
- Internal Schools navigation and CTA targets were checked against these existing routes.

## QA Results

Passed on 2026-07-19:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm prisma validate`
- `pnpm build`

The production build compiled successfully and generated all 74 static/dynamic route entries without error.
