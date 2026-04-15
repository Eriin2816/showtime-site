/**
 * areaStrategy.ts — Area-level strategic content engine
 *
 * Derives differentiated page content from existing ServiceArea fields
 * (priority, bestBranch, slug, nearbySlug) — no per-area prose edits needed.
 *
 * Strategic posture is informed by:
 *   - Showtime Pools Market Report (250k LA pools, $230/mo avg, $95k home-value premium)
 *   - SWOT Analysis (full-lifecycle strength, local SEO opportunity, aging-pool demand)
 *   - LA pool density clusters and geographic service routing
 */

import type { ServiceArea } from './serviceAreas';
import { expertisePages, type ExpertisePage } from './expertise';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Strategic role of the area in the Showtime Pools service network */
export type AreaType =
  | 'core-route'        // Dense weekly route; Sherman Oaks / Encino / Woodland Hills tier
  | 'premium-estate'    // Affluent, high-value; inspection-grade, automation, remodel emphasis
  | 'expansion-route'   // Solid secondary coverage; full service available with reliable cadence
  | 'project-selective' // Repair / remodel / inspection emphasis; selective recurring routing
  | 'remote-fringe';    // Project-based or extended coverage; fringe markets

/** Geographic cluster used for linking logic and content tone */
export type Cluster =
  | 'valley-core'       // Sherman Oaks, Encino, Studio City, Tarzana, Valley Village
  | 'valley-west'       // Woodland Hills, Calabasas, West Hills, Hidden Hills
  | 'valley-north'      // Chatsworth, Porter Ranch, Northridge, Granada Hills
  | 'canyon-hills'      // Hollywood Hills, Sherman Oaks Hills, Encino Hills, Beverly Crest
  | 'westside-premium'  // Beverly Hills, Bel Air, Brentwood, Holmby Hills, Pacific Palisades
  | 'westside-mid'      // Westwood, Cheviot Hills, Mar Vista, West LA, Beverlywood
  | 'coastal'           // Santa Monica, Malibu, Zuma, Marina Del Rey, South Bay beaches
  | 'midtown-west'      // West Hollywood, Hollywood, Miracle Mile, Culver City, Baldwin Hills
  | 'ventura-county'    // Thousand Oaks, Moorpark, Simi Valley, Camarillo
  | 'conejo-agoura'     // Agoura, Agoura Hills, Westlake Village
  | 'eastside-pasadena' // Glendale, Burbank, Pasadena, Toluca Lake, La Cañada
  | 'southeast-la';     // Whittier, Hacienda Heights, San Marino, broad Los Angeles

/** Primary content orientation driving local prose and service emphasis */
export type ContentTheme =
  | 'recurring-weekly'  // Route density, consistent chemistry, equipment monitoring
  | 'luxury-estate'     // White-glove, automation, inspections, premium remodels
  | 'aging-pool'        // Resurfacing, equipment replacement, diagnostic assessments
  | 'coastal'           // Salt air protocols, marine corrosion, coastal chemistry
  | 'hillside'          // Elevated access, canyon debris, terraced configurations
  | 'inspection-led'    // Assessment-first, repair/project entry points
  | 'expansion-route';  // Reliable full-service reach in growing coverage areas

export interface WhyPoint { title: string; desc: string }
export interface ServiceCard  { icon: string; title: string; desc: string; slug: string; image?: string }
export interface LocalContent { heading: string; paragraphs: string[] }

export interface AreaStrategy {
  areaType:          AreaType;
  cluster:           Cluster;
  contentTheme:      ContentTheme;
  heroBadge:         string;
  heroBadgeClass:    string;
  relatedExpertise:  ExpertisePage[];
  whyPoints:         WhyPoint[];
  serviceCards:      ServiceCard[];
  localContent:      LocalContent;
  supplementalFAQs:  { q: string; a: string }[];
  ctaHeading:        string;
  ctaSubtext:        string;
}

// ─── Cluster map ──────────────────────────────────────────────────────────────

const clusterMap: Record<string, Cluster> = {
  // Valley Core
  'sherman-oaks':                             'valley-core',
  'encino':                                   'valley-core',
  'studio-city':                              'valley-core',
  'tarzana':                                  'valley-core',
  'valley-village':                           'valley-core',
  'toluca-lake':                              'valley-core',
  'valley-glen-lake-balboa':                  'valley-core',
  'sherman-oaks-east-valleyheart-glen-91423': 'valley-core',
  'sherman-oaks-south-dixie-canyon':          'valley-core',
  // Valley West
  'woodland-hills':                           'valley-west',
  'calabasas':                                'valley-west',
  'west-hills':                               'valley-west',
  'hidden-hills':                             'valley-west',
  'canoga-park-west-single-family-pockets':   'valley-west',
  'reseda-west-reseda-single-family-pockets': 'valley-west',
  'valley-circle-estates':                    'valley-west',
  // Valley North
  'chatsworth':                                          'valley-north',
  'porter-ranch':                                        'valley-north',
  'northridge':                                          'valley-north',
  'granada-hills':                                       'valley-north',
  'lakeview-terrace-sylmar-single-family-pockets':        'valley-north',
  // Canyon Hills
  'hollywood-hills-west':                     'canyon-hills',
  'hollywood-hills-east':                     'canyon-hills',
  'sherman-oaks-hills-mulholland-corridor':   'canyon-hills',
  'encino-hills':                             'canyon-hills',
  'tarzana-hills':                            'canyon-hills',
  'beverly-crest-benedict-canyon':            'canyon-hills',
  // Westside Premium
  'beverly-hills':                'westside-premium',
  'bel-air':                      'westside-premium',
  'brentwood':                    'westside-premium',
  'pacific-palisades':            'westside-premium',
  'holmby-hills':                 'westside-premium',
  'westwood-north-of-wilshire':   'westside-premium',
  // Westside Mid
  'cheviot-hills-rancho-park':            'westside-mid',
  'beverlywood':                          'westside-mid',
  'west-la-south-of-santa-monica-blvd':   'westside-mid',
  'mar-vista-single-family-pockets':      'westside-mid',
  // Coastal
  'santa-monica-north-of-montana':  'coastal',
  'santa-monica-sunset-park':       'coastal',
  'malibu':                         'coastal',
  'zuma-dunes':                     'coastal',
  'marina-del-rey':                 'coastal',
  'hermosa-beach':                  'coastal',
  'manhattan-beach':                'coastal',
  // Midtown West
  'west-hollywood':                                     'midtown-west',
  'west-hollywood-west-norma-triangle':                 'midtown-west',
  'hollywood':                                          'midtown-west',
  'miracle-mile':                                       'midtown-west',
  'hancock-park-windsor-square':                        'midtown-west',
  'carthay-circle-miracle-mile-single-family-pockets':  'midtown-west',
  'los-feliz-hills':                                    'midtown-west',
  'culver-city':                                        'midtown-west',
  'baldwin-hills':                                      'midtown-west',
  // Ventura County
  'thousand-oaks': 'ventura-county',
  'moorpark':      'ventura-county',
  'simi-valley':   'ventura-county',
  'camarillo':     'ventura-county',
  // Conejo / Agoura
  'agoura':                      'conejo-agoura',
  'agoura-hills-la-county-side': 'conejo-agoura',
  'westlake-village-la-county-side': 'conejo-agoura',
  // Eastside / Pasadena
  'glendale-rossmoyne-verdugo-woodlands': 'eastside-pasadena',
  'pasadena-linda-vista-san-rafael':      'eastside-pasadena',
  'burbank-hills-north-of-glenoaks':      'eastside-pasadena',
  'la-canada-flintridge':                 'eastside-pasadena',
  // Southeast LA / Broad
  'san-marino':       'southeast-la',
  'whittier':         'southeast-la',
  'hacienda-heights': 'southeast-la',
  'los-angeles':      'southeast-la',
  // 2026 expansion areas
  'villa-park':       'southeast-la',
  'bixby-knolls':     'southeast-la',
  'lakewood':         'southeast-la',
  'downey':           'southeast-la',
  'chino-hills':      'southeast-la',
  'corona':           'southeast-la',
  'west-los-angeles': 'westside-mid',
  'santa-clarita':    'valley-north',
  'stevenson-ranch':  'valley-north',
  'la-crescenta':     'eastside-pasadena',
  'los-alamitos':     'southeast-la',
  'rowland-heights':  'southeast-la',
};

function getCluster(slug: string): Cluster {
  return clusterMap[slug] ?? 'valley-core';
}

function deriveAreaType(area: ServiceArea, cluster: Cluster): AreaType {
  const { priority } = area;
  if (priority === 5) {
    if (cluster === 'westside-premium' || cluster === 'canyon-hills') return 'premium-estate';
    return 'core-route';
  }
  if (priority === 4) {
    if (cluster === 'westside-premium' || cluster === 'canyon-hills') return 'premium-estate';
    return 'expansion-route';
  }
  if (priority === 3) {
    if (cluster === 'westside-premium' || cluster === 'midtown-west' || cluster === 'westside-mid') return 'premium-estate';
    return 'expansion-route';
  }
  if (priority === 2) return 'project-selective';
  return 'remote-fringe';
}

function deriveContentTheme(area: ServiceArea, cluster: Cluster, areaType: AreaType): ContentTheme {
  if (cluster === 'coastal') return 'coastal';
  if (cluster === 'canyon-hills') return 'hillside';
  if (cluster === 'westside-premium') return 'luxury-estate';
  if (cluster === 'westside-mid') return 'luxury-estate';
  if (cluster === 'valley-core' && areaType === 'core-route') return 'recurring-weekly';
  if (cluster === 'valley-west' && (areaType === 'core-route' || areaType === 'expansion-route')) return 'recurring-weekly';
  if (cluster === 'valley-north') return 'aging-pool';
  if (cluster === 'ventura-county' || cluster === 'conejo-agoura') return 'inspection-led';
  if (cluster === 'southeast-la') return 'inspection-led';
  if (cluster === 'midtown-west') {
    return areaType === 'premium-estate' ? 'luxury-estate' : 'expansion-route';
  }
  if (cluster === 'eastside-pasadena') return 'aging-pool';
  if (areaType === 'project-selective' || areaType === 'remote-fringe') return 'inspection-led';
  return 'expansion-route';
}

// ─── Expertise mapping ────────────────────────────────────────────────────────

const expertiseBySlug = new Map(expertisePages.map(e => [e.slug, e]));
const g = (slug: string) => expertiseBySlug.get(slug)!;

function deriveRelatedExpertise(contentTheme: ContentTheme): ExpertisePage[] {
  const safe = (slug: string) => expertiseBySlug.get(slug);
  switch (contentTheme) {
    case 'recurring-weekly':  return [safe('pool-cleaning'),          safe('pool-repair'),            safe('equipment-installation')].filter(Boolean) as ExpertisePage[];
    case 'luxury-estate':     return [safe('pool-cleaning'),          safe('equipment-installation'), safe('pool-repair')].filter(Boolean) as ExpertisePage[];
    case 'aging-pool':        return [safe('pool-repair'),            safe('equipment-installation'), safe('pool-remodeling')].filter(Boolean) as ExpertisePage[];
    case 'coastal':           return [safe('pool-cleaning'),          safe('pool-repair'),            safe('equipment-installation')].filter(Boolean) as ExpertisePage[];
    case 'hillside':          return [safe('pool-repair'),            safe('pool-cleaning'),          safe('equipment-installation')].filter(Boolean) as ExpertisePage[];
    case 'inspection-led':    return [safe('pool-repair'),            safe('equipment-installation'), safe('pool-inspections')].filter(Boolean) as ExpertisePage[];
    case 'expansion-route':   return [safe('pool-cleaning'),          safe('pool-repair'),            safe('equipment-installation')].filter(Boolean) as ExpertisePage[];
  }
}

// ─── Why Points ───────────────────────────────────────────────────────────────

function deriveWhyPoints(areaType: AreaType, area: ServiceArea): WhyPoint[] {
  const n = area.name;
  const branch = area.bestBranch === 'Either' ? 'Sherman Oaks and Century City' : area.bestBranch;

  switch (areaType) {
    case 'core-route': return [
      { title: `Established Routes Through ${n}`, desc: `We run regular weekly routes through ${n}, so your visits are consistent, punctual, and handled by technicians who know your water chemistry baseline and equipment.` },
      { title: 'Full-Service on One Call', desc: 'Weekly maintenance, emergency repairs, equipment upgrades, and full remodeling — all managed by a single team with no outside contractors to coordinate.' },
      { title: `Fast Response from ${branch}`, desc: `Our ${branch} office provides one of the fastest response times of any full-service pool company serving ${n}. Local coverage, not a distant dispatch center.` },
      { title: 'Every Visit Documented', desc: 'Chemical readings, equipment status, and service notes recorded after every visit. You always have a clear, timestamped record of what was done and when.' },
    ];
    case 'premium-estate': return [
      { title: 'Inspection-Grade Precision', desc: `${n} properties hold high standards — we match them. Every visit is thorough, documented, and executed with the attention a premium pool and its surroundings deserve.` },
      { title: 'Automation & Smart Systems', desc: 'We install and configure Pentair, Hayward, and other leading smart pool systems — remote heating, lighting, filtration scheduling, and automated chemical dosing.' },
      { title: 'Full Project Capability', desc: 'Your service team can move from weekly maintenance into equipment upgrades, remodeling, or a full renovation — no transition to a new contractor, no loss of context.' },
      { title: 'Discreet, Professional Conduct', desc: `We operate with the professionalism and discretion that ${n} homeowners and property managers expect from a high-end service provider.` },
    ];
    case 'expansion-route': return [
      { title: 'Full-Service, Not Just Cleaning', desc: `We bring repair expertise, equipment service, and remodeling capability to ${n} — not just a weekly cleaning route with no technical depth.` },
      { title: 'Two LA Office Coverage', desc: `Our ${branch} office gives us the reach to serve ${n} with reliable scheduling and fast response when issues arise.` },
      { title: 'Upfront, Transparent Pricing', desc: 'Every quote is provided in writing before work begins. No surprise charges, no vague line items — just clear pricing and professional execution.' },
      { title: 'California Compliance Expertise', desc: "We handle California's 2025 variable-speed pump requirements and relevant health code standards, so your pool stays compliant without you tracking the regulations." },
    ];
    case 'project-selective': return [
      { title: 'Inspection as a Starting Point', desc: `Our $159 pool inspection gives ${n} homeowners a thorough written picture of their pool's condition before committing to any service or renovation project.` },
      { title: 'Equipment Upgrade Specialists', desc: "California's 2025 energy efficiency mandates require variable-speed pumps for all replacements. We handle compliant upgrades from assessment through installation and programming." },
      { title: 'Full Remodeling Capability', desc: `From resurfacing and tile replacement to complete pool transformations, we manage remodeling projects in ${n} with written scope and transparent pricing.` },
      { title: 'No-Pressure Assessment Process', desc: "We evaluate your pool honestly, recommend only what it genuinely needs, and let you decide what to prioritize. No upsell pressure, no obligations after the first conversation." },
    ];
    case 'remote-fringe': return [
      { title: 'Project-Based Service Available', desc: `For equipment overhauls, pool renovations, or significant repairs in ${n}, we extend project-based service with full written estimates and professional execution.` },
      { title: 'Professional Pool Inspections', desc: 'Our $159 pool inspection is an ideal low-commitment starting point — a thorough written assessment covering every system, surface, and safety concern.' },
      { title: 'Transparent, Written Estimates', desc: "Every service or project quote is provided in writing before any work begins. We are clear about scope, timing, and pricing from the first conversation." },
      { title: 'Full Technical Capability', desc: `We bring the same repair, equipment, and remodeling expertise to ${n} that we deploy throughout our core Los Angeles service area.` },
    ];
  }
}

// ─── Service Cards ─────────────────────────────────────────────────────────────

const allServiceCards: ServiceCard[] = [
  { slug: 'weekly-pool-cleaning',    icon: '🧹', title: 'Weekly Pool Cleaning',       image: '/images/expertise/cards/pool-cleaning.jpeg',          desc: 'Skimming, brushing, vacuuming, basket emptying, and full chemical testing on a consistent weekly schedule.' },
  { slug: 'chemical-maintenance',    icon: '⚗️', title: 'Chemical Maintenance',        image: '/images/expertise/cards/chemical-maintenance.jpeg',   desc: 'Precise water chemistry management — pH, chlorine, alkalinity, calcium, and stabilizer — keeping water safe, balanced, and clear every week.' },
  { slug: 'repairs-plumbing',        icon: '🔧', title: 'Repairs & Plumbing',          image: '/images/expertise/cards/pool-repair.jpeg',            desc: 'Pump failures, plumbing leaks, heater malfunctions, and equipment issues diagnosed and repaired efficiently with upfront pricing.' },
  { slug: 'equipment-upgrades',      icon: '⚡', title: 'Equipment Upgrades',           image: '/images/expertise/cards/equipment-installation.jpeg', desc: 'Variable-speed pumps, salt systems, LED lighting, and smart automation installed to California 2025 code standards.' },
  { slug: 'remodeling-resurfacing',  icon: '🎨', title: 'Remodeling & Resurfacing',    image: '/images/expertise/cards/pool-remodeling.jpeg',        desc: 'Complete surface and finish renovations — plaster, pebble, tile, coping, and decking — to restore value or transform your pool.' },
  { slug: 'inspections-diagnostics', icon: '🔍', title: 'Inspections & Diagnostics',   image: '/images/expertise/cards/pool-inspections.jpeg',       desc: 'Thorough pool inspections with written reports covering equipment, surfaces, plumbing, chemistry, and safety — ideal for pre-sale, pre-purchase, or peace of mind.' },
  { slug: 'algae-treatment',         icon: '🌿', title: 'Algae Treatment',                                                                            desc: 'Targeted algae remediation — shock treatment, algaecide application, and filtration management — restoring clear water as quickly as possible.' },
  { slug: 'smart-pool-automation',   icon: '🤖', title: 'Smart Pool Automation',        image: '/images/expertise/cards/smart-pool-automation.jpeg', desc: 'App-controlled filtration, heating, lighting, and chemical dosing — giving you remote visibility and control of your entire pool system.' },
];

const serviceOrderByTheme: Record<ContentTheme, string[]> = {
  'recurring-weekly':  ['Weekly Pool Cleaning', 'Chemical Maintenance', 'Repairs & Plumbing', 'Equipment Upgrades', 'Remodeling & Resurfacing', 'Inspections & Diagnostics'],
  'luxury-estate':     ['Chemical Maintenance', 'Smart Pool Automation', 'Equipment Upgrades', 'Remodeling & Resurfacing', 'Inspections & Diagnostics', 'Weekly Pool Cleaning'],
  'aging-pool':        ['Repairs & Plumbing', 'Remodeling & Resurfacing', 'Equipment Upgrades', 'Inspections & Diagnostics', 'Chemical Maintenance', 'Weekly Pool Cleaning'],
  'coastal':           ['Chemical Maintenance', 'Weekly Pool Cleaning', 'Equipment Upgrades', 'Algae Treatment', 'Repairs & Plumbing', 'Inspections & Diagnostics'],
  'hillside':          ['Repairs & Plumbing', 'Weekly Pool Cleaning', 'Chemical Maintenance', 'Equipment Upgrades', 'Inspections & Diagnostics', 'Remodeling & Resurfacing'],
  'inspection-led':    ['Inspections & Diagnostics', 'Repairs & Plumbing', 'Equipment Upgrades', 'Remodeling & Resurfacing', 'Chemical Maintenance', 'Weekly Pool Cleaning'],
  'expansion-route':   ['Weekly Pool Cleaning', 'Repairs & Plumbing', 'Equipment Upgrades', 'Chemical Maintenance', 'Inspections & Diagnostics', 'Remodeling & Resurfacing'],
};

function deriveServiceCards(contentTheme: ContentTheme): ServiceCard[] {
  const order = serviceOrderByTheme[contentTheme];
  return order
    .map(title => allServiceCards.find(c => c.title === title)!)
    .filter(Boolean)
    .slice(0, 6);
}

// ─── Local Content (theme-driven prose) ──────────────────────────────────────

function deriveLocalContent(area: ServiceArea, contentTheme: ContentTheme): LocalContent {
  const n = area.name;
  const branch = area.bestBranch === 'Either' ? 'Sherman Oaks and Century City' : `our ${area.bestBranch} office`;

  switch (contentTheme) {
    case 'recurring-weekly': return {
      heading: `Pool Maintenance in ${n}: What Homeowners Need to Know`,
      paragraphs: [
        `${n} sits within one of Los Angeles County's most pool-dense corridors, and Showtime Pools runs established weekly routes through the neighborhood — which means service visits are consistent, punctual, and handled by technicians who know your local water chemistry baseline and your specific equipment.`,
        `The San Fernando Valley's summer heat accelerates chemical consumption significantly. UV radiation degrades chlorine faster than most homeowners expect, and a single week without proper balancing can allow algae to gain a foothold on pool walls or in filtration systems. Professional weekly service catches these conditions before they escalate into a disruptive and costly remediation event.`,
        `California's 2025 energy efficiency standards now require variable-speed pumps for all new pool pump installations and replacements. Many ${n} homeowners are making the upgrade proactively — variable-speed motors reduce pool energy costs by 50–70% and significantly reduce strain on filtration and heating systems. We handle assessment, equipment selection, installation, and programming from start to finish.`,
        `Pools in ${n} run year-round without the seasonal shutdowns that extend equipment life in colder markets. This continuous operation accelerates wear, makes early fault detection more valuable, and underscores why routine maintenance — not reactive repair — is the right operating model for a Southern California pool.`,
      ],
    };

    case 'luxury-estate': return {
      heading: `Premium Pool Service in ${n}`,
      paragraphs: [
        `${n} homeowners hold their properties to exceptional standards, and the pools on these properties are no different. Showtime Pools provides ${n} with inspection-grade maintenance, technical depth, and the professional accountability that high-value homes and sophisticated pool systems require — not the generic route service that can't tell a variable-speed VFD from a standard timer.`,
        `Many ${n} pools feature smart automation systems, premium water features, high-end finish materials, and equipment configurations that demand real technical capability to maintain correctly. Our team includes specialists in Pentair, Hayward, and other leading automation platforms, and we service, upgrade, and integrate these systems as part of our full-capability offering.`,
        `Smart pool automation is increasingly standard in ${n} and the surrounding neighborhoods. App-controlled filtration scheduling, remote heat management, LED lighting programs, and automated chemical dosing reduce operating costs, eliminate manual pool-side adjustments, and give homeowners full visibility into pool performance from anywhere. We install and configure these systems to work together — not just install hardware and leave the setup to chance.`,
        `When ${n} homeowners invest in pool remodeling, the context is clear: a professionally maintained and modernized pool adds an estimated $95,000+ to property value in the Los Angeles market. We manage remodeling projects as a single, accountable team — surface work, tile and coping, equipment integration, and automation — with written scope and pricing before any work begins.`,
      ],
    };

    case 'aging-pool': return {
      heading: `Aging Pool Infrastructure in ${n}: What to Expect`,
      paragraphs: [
        `${n} has a substantial concentration of pools built between the 1970s and 1990s — many of which are now approaching or past the typical service life for plaster surfaces, tile and coping, and core equipment. Showtime Pools has extensive experience assessing and restoring older pool infrastructure, and we provide honest evaluations of what needs immediate attention versus what can be monitored and planned for later.`,
        `Pool plaster typically lasts 10–15 years before surface deterioration becomes noticeable — rough texture, etching, staining, and eventually structural erosion that holds algae and resists cleaning. When a plaster surface reaches end of life, resurfacing is both a functional necessity and a genuine value opportunity: modern pebble and quartz finishes look dramatically better, last significantly longer, and require less aggressive chemical maintenance than aged plaster.`,
        `Equipment replacement in older ${n} pools frequently reveals significant efficiency gains. California's 2025 energy efficiency mandates now require variable-speed pumps for all new installations and replacements — a change that also reduces pool energy costs by 50–70% compared to aging single-speed motors. When a pump failure triggers a replacement conversation, the efficiency upgrade typically pays for itself within 18–24 months at typical LA electricity rates.`,
        `Our pool inspection service is an ideal starting point for ${n} homeowners with pools that haven't been professionally assessed in several years. A thorough diagnostic covers all systems, surfaces, plumbing, and equipment — and provides a prioritized, written plan for what to address now versus what to monitor over time. Informed decisions are always better than reactive ones when the job scope is measured in thousands of dollars.`,
      ],
    };

    case 'coastal': return {
      heading: `Coastal Pool Maintenance in ${n}`,
      paragraphs: [
        `${n}'s coastal environment creates pool maintenance challenges that standard inland service providers are not always equipped to address correctly. Salt air, ocean spray, and marine-influenced water conditions require specific chemical protocols, more frequent equipment monitoring, and corrosion-aware maintenance practices that generic valley or city pool routes don't typically apply.`,
        `Chlorine chemistry in coastal conditions behaves differently than in inland pools. Salt air can influence pH drift, coastal mineral content affects calcium hardness and scaling potential, and equipment exposed to marine air oxidizes significantly faster than equipment in protected inland locations. Our technicians apply treatment protocols specifically calibrated for ${n}'s coastal environment — not a one-size formula carried over from a valley route.`,
        `Pool equipment in ${n} requires more frequent inspection for corrosion on metal fittings, seal integrity, oxidation on motor housings, and signs of accelerated material breakdown. We document equipment condition on every visit and flag developing issues before salt exposure causes a major failure — which is far more expensive to address than preventive maintenance when corrosion advances undetected over months.`,
        `For ${n} homeowners considering equipment upgrades, we recommend corrosion-resistant components, sealed motor housings rated for marine environments, and material choices appropriate for coastal exposure. Paired with California's 2025 variable-speed pump requirement, an equipment upgrade in ${n} is both a compliance matter and an investment in long-term durability that cheaper inland-grade components cannot provide.`,
      ],
    };

    case 'hillside': return {
      heading: `Hillside Pool Service in ${n}`,
      paragraphs: [
        `Hillside and canyon properties in ${n} present pool maintenance requirements that demand experienced technicians — ones comfortable with elevated access, non-standard equipment positioning, and the higher debris loads that come with proximity to canyon vegetation and natural hillside environments.`,
        `Equipment installations on elevated ${n} lots are often positioned in challenging configurations: tucked against retaining walls, accessed via steep exterior stairs, located in confined pump rooms that require specific maintenance approaches. Our technicians are experienced with the full range of hillside pool configurations common throughout the canyon neighborhoods of greater Los Angeles, and we don't send inexperienced cleaners to properties where the job requires judgment.`,
        `The natural landscape surrounding ${n} properties creates significantly higher debris loads than flatland pools. Leaves, seeds, and organic matter from oak, eucalyptus, and native chaparral vegetation accumulate faster and place heavier strain on filtration systems and skimmer baskets. Weekly basket cleaning and regular filter backwashing are especially important in hillside environments — skipping visits here has faster consequences than it does in a flat suburban yard.`,
        `Many ${n} pools are architectural features as much as recreational ones — infinity edges, vanishing-edge designs, and elevated terraced configurations that require specific chemistry management, structural attention, and operational knowledge to maintain correctly. We service these pools with attention to both their technical requirements and the aesthetic standards of the surrounding property.`,
      ],
    };

    case 'inspection-led': return {
      heading: `Pool Service & Inspections in ${n}`,
      paragraphs: [
        `For many ${n} homeowners, a professional pool inspection is the most strategic starting point — a thorough written assessment of all pool systems, equipment, surfaces, chemistry, and structural condition that provides a clear picture of what your pool actually needs before committing to any service program or renovation project.`,
        `Pool inspections are especially valuable in ${n} for homeowners purchasing a property with a pool, those with pools that haven't been professionally evaluated in several years, and anyone preparing to list a home where pool condition affects the sale price and buyer perception. Our written inspection reports document every finding with photographs and include a prioritized list of recommended actions.`,
        `Equipment upgrades are among the most common outcomes of pool assessments in ${n}. California's 2025 energy efficiency mandates require variable-speed pumps for all new installations and replacements, and many pools in the area are still running older single-speed motors well past their optimal service life. We handle compliant upgrades from initial assessment through installation — with clear, written pricing before any work begins.`,
        `For ${n} properties that need resurfacing, plumbing repairs, or significant structural work, Showtime Pools provides project-based service with full written scope and pricing. We manage the complete renovation as a single, accountable team — no splitting the project across multiple contractors, no coordination burden, no surprises mid-project.`,
      ],
    };

    case 'expansion-route': return {
      heading: `Pool Service in ${n}: Full Coverage, Professional Standards`,
      paragraphs: [
        `${n} is within our active service coverage area, and Showtime Pools provides the full range of pool maintenance, repair, and equipment services to ${n} homeowners with the same professional standards we apply throughout our core Los Angeles routes. Coverage reach doesn't mean lower standards — it means the same documented service, upfront pricing, and responsive communication regardless of which zip code you're in.`,
        `Pool maintenance in Southern California requires consistent, year-round attention. Unlike seasonal pool markets where equipment sits dormant through winter, ${n} pools run continuously — meaning chemistry, filtration performance, and equipment health must be actively managed every week of the year. Our service protocols are designed for this continuous operating environment, not adapted from a seasonal model that doesn't fit LA's climate.`,
        `California's 2025 energy efficiency standards require variable-speed pumps for all new pool pump installations and replacements. ${n} homeowners with aging single-speed motors are increasingly making the proactive upgrade — and we handle the assessment, equipment selection, installation, and programming as a single engagement with one point of contact and one invoice.`,
        `For ${n} homeowners considering a pool inspection, equipment upgrade, or renovation, we provide an initial assessment that gives you a clear picture of your pool's current condition and an honest view of what it would take to bring it to optimal performance. No commitment required to start the conversation — and no vague estimates when you decide to move forward.`,
      ],
    };
  }
}

// ─── Supplemental FAQ Bank ────────────────────────────────────────────────────

const faqBank = {
  'emergency-repair': {
    q: 'Do you handle emergency pool repairs?',
    a: 'Yes. For urgent issues like pump failures, heater malfunctions, or significant water loss, we prioritize fast scheduling. Call (323) 825-2099 directly for the quickest response — same-day assessment is often available for critical issues.',
  },
  'variable-speed-pump': {
    q: "Do you install variable-speed pumps?",
    a: "Yes. California's 2025 energy efficiency standards require variable-speed pumps for all new installations and replacements statewide. We handle the assessment, equipment selection, installation, and programming from start to finish — with upfront pricing before any work begins.",
  },
  'automation': {
    q: 'Can you install smart pool automation?',
    a: 'Yes. We install and configure Pentair, Hayward, and other leading automation systems that allow you to control filtration scheduling, heating, LED lighting, and chemical dosing remotely from any device.',
  },
  'inspection': {
    q: 'Do you offer pool inspections?',
    a: "Yes. Our $159 pool inspection provides a thorough written report covering equipment condition, surface integrity, plumbing, chemistry baseline, and any safety concerns — ideal for pre-purchase, pre-sale, or a general health check on a pool that hasn't been assessed professionally in several years.",
  },
  'inspection-what-covered': {
    q: 'What does a Showtime Pools pool inspection include?',
    a: 'A full written assessment covering: pool surface and finish condition, tile and coping integrity, plumbing and equipment function, water chemistry baseline, structural observations, and a prioritized list of repair or maintenance recommendations — everything a homeowner needs to make informed decisions about their pool.',
  },
  'remodeling': {
    q: 'Do you handle pool remodeling and resurfacing?',
    a: 'Yes. We handle complete pool renovations including plaster and pebble resurfacing, tile and coping replacement, deck work, equipment upgrades, and automation integration — managed as a single project with written scope and pricing before any work starts.',
  },
  'coastal-equipment': {
    q: 'How does salt air affect pool equipment in coastal areas?',
    a: "Coastal salt air significantly accelerates corrosion on metal components, motor housings, and exposed fittings. We use coastal-appropriate equipment specifications and inspect for corrosion indicators at every visit to extend equipment life in marine environments — standard inland-grade parts fail prematurely near the coast.",
  },
  'coastal-chemistry': {
    q: 'Is pool water chemistry different near the coast?',
    a: 'Yes. Coastal conditions affect pH stability, calcium hardness, and chlorine demand differently than inland pools. We apply adjusted treatment protocols calibrated for your specific coastal environment rather than using a standard inland formula that was developed for valley or city pool conditions.',
  },
  'hillside-access': {
    q: 'Do you service elevated or terraced pool properties?',
    a: 'Yes. We are experienced with hillside pool configurations, elevated equipment locations, steep access requirements, and the maintenance demands of canyon-adjacent and terraced properties. We will tell you upfront what access looks like before scheduling service.',
  },
  'aging-pool': {
    q: 'My pool is 20+ years old. What should I expect to repair or replace?',
    a: "Pools this age commonly need plaster resurfacing (typical lifespan 10–15 years), pump replacement (10–15 years for standard motors), filter media replacement, and often plumbing valve or union repairs. We start with a full inspection to prioritize what needs immediate attention, what can wait, and what to plan for — so you're not blindsided by a cascade of failures.",
  },
  'energy-savings': {
    q: 'How much can a variable-speed pump reduce my energy costs?',
    a: 'Variable-speed pumps typically reduce pool energy costs by 50–70% compared to single-speed motors. At typical Los Angeles electricity rates, the upgrade pays for itself within 18–24 months in most cases — and California now requires it for all pump replacements, making it both a financial and compliance decision.',
  },
  'green-pool': {
    q: 'Can you treat a green or algae-affected pool?',
    a: 'Yes. We offer algae remediation as an urgent service. Depending on severity — light haze versus full green-black — most pools can be restored to clear water within one to three service visits using shock treatment, algaecide, and active filtration management.',
  },
  'one-team': {
    q: 'Do I need separate contractors for cleaning, repairs, and remodeling?',
    a: "No — that's exactly what we solve. Showtime Pools handles weekly maintenance, emergency repairs, equipment upgrades, and full remodeling as a single team. One point of contact, no contractor coordination, no blame gaps when something goes wrong.",
  },
  'pricing': {
    q: 'How does Showtime Pools price pool service?',
    a: 'Monthly maintenance pricing depends on pool size, equipment complexity, and service frequency. We provide upfront written quotes after an initial assessment — no vague estimates or invoices with surprise add-ons. Call (323) 825-2099 or book online for a free evaluation.',
  },
  'service-start': {
    q: 'How quickly can service begin?',
    a: 'For most areas, we can schedule an initial assessment and begin service within the same week. Contact us and we will confirm current availability for your address — we will be honest about timing rather than overpromise.',
  },
  'coverage-confirm': {
    q: 'How do I confirm my address is in your service area?',
    a: 'Call us at (323) 825-2099 or submit a booking request. We will confirm your address is within current coverage and discuss what we can schedule — no waiting days for a response.',
  },
};

type FaqKey = keyof typeof faqBank;
const fq = (key: FaqKey) => faqBank[key];

function deriveSupplementalFAQs(contentTheme: ContentTheme): { q: string; a: string }[] {
  switch (contentTheme) {
    case 'recurring-weekly':  return [fq('emergency-repair'), fq('variable-speed-pump'), fq('one-team')];
    case 'luxury-estate':     return [fq('automation'), fq('remodeling'), fq('inspection')];
    case 'aging-pool':        return [fq('aging-pool'), fq('variable-speed-pump'), fq('remodeling')];
    case 'coastal':           return [fq('coastal-equipment'), fq('coastal-chemistry'), fq('variable-speed-pump')];
    case 'hillside':          return [fq('hillside-access'), fq('emergency-repair'), fq('inspection')];
    case 'inspection-led':    return [fq('inspection-what-covered'), fq('remodeling'), fq('coverage-confirm')];
    case 'expansion-route':   return [fq('service-start'), fq('green-pool'), fq('variable-speed-pump')];
  }
}

// ─── CTA Content ──────────────────────────────────────────────────────────────

function deriveCtaContent(areaType: AreaType, area: ServiceArea): { heading: string; subtext: string } {
  const n = area.name;
  switch (areaType) {
    case 'core-route': return {
      heading: `Start Weekly Service in ${n}`,
      subtext: `Book a free estimate. We will visit your pool, assess its current condition, and build a service plan with upfront pricing — no pressure, no surprises, no vague estimates.`,
    };
    case 'premium-estate': return {
      heading: `Premium Pool Care in ${n}`,
      subtext: `Schedule a complimentary assessment. We will evaluate your pool, discuss your goals for service, upgrades, or remodeling, and provide a detailed written proposal with clear pricing.`,
    };
    case 'expansion-route': return {
      heading: `Professional Pool Service in ${n}`,
      subtext: `Get a free estimate from a full-service pool company with the technical range to handle everything from weekly maintenance to complete renovations — all under one accountable team.`,
    };
    case 'project-selective': return {
      heading: `Pool Inspections & Projects in ${n}`,
      subtext: `Start with our $159 pool inspection — a complete written assessment of your pool's condition with no obligation to proceed. From there, we build a plan around what your pool actually needs.`,
    };
    case 'remote-fringe': return {
      heading: `Pool Service & Projects in ${n}`,
      subtext: `Contact us to discuss your pool's needs. We will confirm service availability for your address and provide honest, written pricing for any inspection, repair, or renovation you are considering.`,
    };
  }
}

// ─── Hero badge ───────────────────────────────────────────────────────────────

function deriveHeroBadge(areaType: AreaType): { label: string; className: string } {
  switch (areaType) {
    case 'core-route':        return { label: 'Core Service Area',       className: 'bg-pool-azure/20 text-pool-azure border-pool-azure/30' };
    case 'premium-estate':    return { label: 'Premium Estate Service',  className: 'bg-pool-gold/20 text-pool-gold border-pool-gold/30' };
    case 'expansion-route':   return { label: 'Full Service Available',  className: 'bg-white/15 text-white border-white/25' };
    case 'project-selective': return { label: 'Inspections & Projects',  className: 'bg-white/10 text-white/80 border-white/20' };
    case 'remote-fringe':     return { label: 'Extended Coverage',       className: 'bg-white/10 text-white/70 border-white/15' };
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getAreaStrategy(area: ServiceArea): AreaStrategy {
  const cluster      = getCluster(area.slug);
  const areaType     = deriveAreaType(area, cluster);
  const contentTheme = deriveContentTheme(area, cluster, areaType);
  const badge        = deriveHeroBadge(areaType);

  return {
    areaType,
    cluster,
    contentTheme,
    heroBadge:        badge.label,
    heroBadgeClass:   badge.className,
    relatedExpertise: deriveRelatedExpertise(contentTheme),
    whyPoints:        deriveWhyPoints(areaType, area),
    serviceCards:     deriveServiceCards(contentTheme),
    localContent:     deriveLocalContent(area, contentTheme),
    supplementalFAQs: deriveSupplementalFAQs(contentTheme),
    ctaHeading:       deriveCtaContent(areaType, area).heading,
    ctaSubtext:       deriveCtaContent(areaType, area).subtext,
  };
}
