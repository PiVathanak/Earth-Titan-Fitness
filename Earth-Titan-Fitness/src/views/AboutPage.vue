<script setup>
import AppHeader from '@/components/AppHeader.vue'

// Images: left blank for now
const heroBg = '' // TODO: add hero background image

const heroStats = [
  { value: '05', label: 'Regional Compounds', sub: 'Heavy industrial sectors' },
  { value: '1,400+', label: 'Verified Athletes', sub: 'Zero fluff, 100% committed' },
  { value: '64,000', label: 'SQ FT Footprint', sub: 'Reinforced lifting decks' },
  { value: '24 / 7', label: 'Biometric Gates', sub: 'Instant hardware access' },
]

const pillars = [
  {
    num: '01',
    tag: 'HARDWARE',
    title: 'NO COMPROMISE HARDWARE',
    text: 'Competition-spec calibrated Eleiko steel plates, Texas power bars, custom heavy-gauge racks, and customized selectorized biomechanics. No plastic pulleys or warped commercial steel.',
    metricLabel: 'Plate Calibrations',
    metricValue: '±10g IPF Certified',
    fill: '98%',
  },
  {
    num: '02',
    tag: 'TELEMETRY',
    title: 'DATA-DRIVEN ATHLETIC CULTURE',
    text: 'Biometric telemetry, precision sub-second check-in speeds, and zero front desk bottlenecks. Real-time platform load metrics keep athlete throughput fluid without ever standing in line.',
    metricLabel: 'Avg Gate Transit Latency',
    metricValue: '0.42 Seconds',
    fill: '85%',
  },
  {
    num: '03',
    tag: 'RECOVERY',
    title: 'COMPLETE PERFORMANCE ECOSYSTEM',
    text: 'On-site clean-fuel cafe depots, bio-certified supplement nutrition labs, and dedicated recovery suites engineered to refuel glycogen reserves and optimize central nervous system regeneration.',
    metricLabel: 'Depot Macronutrient Purity',
    metricValue: '100% Bio-Verified',
    fill: '100%',
  },
]

const gallery = [
  {
    src: '', // TODO: add image
    alt: 'Close up of heavily knurled Olympic barbells and stacked calibrated iron weight plates in a dark atmospheric powerlifting gym with industrial neon glow',
    caption: 'HEAVY CALIBRATION IRON',
    icon: 'verified',
  },
  {
    src: '', // TODO: add image
    alt: 'Atmospheric wide shot of an industrial gym floor with chalk powder hanging in dramatic overhead spotlights and athletes training on heavy duty power racks',
    caption: 'REINFORCED CHALK DECKS',
    icon: 'sports_mma',
  },
  {
    src: '', // TODO: add image
    alt: 'Tactical nutrition laboratory counter inside a high-end dark strength facility with stainless steel shaker apparatus and clean performance beverage taps',
    caption: 'CLEAN FUEL NUTRITION DEPOT',
    icon: 'local_cafe',
  },
]

const telemetryStats = [
  {
    label: 'FACILITIES',
    value: '05',
    unit: 'SECTORS',
    text: 'Elite Industrial Compounds built with reinforced monolithic concrete and sound-damped deadlift flooring.',
  },
  {
    label: 'ROSTER ACTIVE',
    value: '1,428+',
    unit: 'MEMBERS',
    text: 'Active Registered Athletes maintaining strict commitment benchmarks and code of honor.',
  },
  {
    label: 'STAFF & CADRE',
    value: '48',
    unit: 'SPECIALISTS',
    text: 'Certified Strength Specialists, national-level lifters, and exercise science researchers.',
  },
  {
    label: 'CALIBRATION STANDARD',
    value: '99.8%',
    unit: 'UPTIME',
    text: 'Equipment Uptime & Maintenance Precision. Instant repairs and barbell knurling upkeep cycles.',
  },
]

const directors = [
  {
    initials: 'MV',
    command: 'COMMAND 01',
    name: 'MARCUS VANCE',
    role: 'Head of Facility Operations & Powerlifting Specialist',
    text: 'Former national record holder with over 15 years directing competitive powerlifting arenas. Oversees industrial equipment lifecycle, rack ergonomics, and platform safety architecture across all compounds.',
    specialization: 'Squat & Deadlift Mechanics',
    accreditation: 'USAPL Senior Level II / CSCS',
    station: 'Sector Alpha (HQ)',
  },
  {
    initials: 'ER',
    command: 'COMMAND 02',
    name: 'ELENA ROSTOVA',
    role: 'Director of Athletic Programming & Olympic Coach',
    text: 'International Olympic weightlifting coach specializing in bar trajectory velocity, explosive triple-extension cadence, and periodized loading protocols for competitive strength contenders.',
    specialization: 'Snatch / Clean & Jerk Physics',
    accreditation: 'USAW National Coach / MS ExSci',
    station: 'Iron Vault Metro',
  },
  {
    initials: 'JR',
    command: 'COMMAND 03',
    name: 'DR. JAXSON REED',
    role: 'Chief Sports Biomechanist & Nutrition Protocol Director',
    text: 'PhD in Kinetic Biomechanics. Formulates all in-house nutrition formulas at the Titan Fuel Lab and directs the recovery protocols that accelerate muscle protein synthesis and prevent connective tissue strain.',
    specialization: 'Cellular Hydration & Bioenergetics',
    accreditation: 'PhD Biomechanics / CISSN Fellow',
    station: 'Apex Compound',
  },
]

const standards = [
  {
    icon: 'group_off',
    title: 'ZERO CROWD RESTRICTIONS',
    text: 'We hard-cap active memberships per sector. Real-time capacity monitoring ensures racks, deadlift platforms, and competition benches are always ready for your set without waiting.',
    badge: 'Guaranteed Rack Availability',
  },
  {
    icon: 'gavel',
    title: 'COMMUNITY CODE OF CONDUCT',
    text: 'Dry chalk encouraged, collars mandatory, reracking iron required. Every lifter respects the heavy iron standard, wipes down competition vinyl, and leaves ego at the security perimeter.',
    badge: 'Zero Tolerance Iron Etiquette',
  },
  {
    icon: 'local_bar',
    title: 'CLEAN FUEL INTEGRATION',
    text: 'Direct biometric billing to our internal Food & Beverage Depot and Nutrition Fuel Lab. Instant intra-workout amino acids, electrolyte replenishments, and post-session whey isolate on demand.',
    badge: 'Seamless Direct Keycard Billing',
  },
]

const branchPhones = [
  { name: 'Sector Alpha', phone: '(555) 019-2831' },
  { name: 'Sector Bravo', phone: '(555) 019-2832' },
  { name: 'Iron Vault Metro', phone: '(555) 019-2833' },
  { name: 'Apex Compound', phone: '(555) 019-2834' },
]

const legalLinks = [
  { label: 'Liability & Facility Protocol', path: 'liability-waiver' },
  { label: 'Privacy Policy', path: 'privacy-policy' },
  { label: 'Terms of Service', path: 'terms-of-service' },
  { label: 'Access Disclaimers', path: 'access-disclaimers' },
]
</script>

<template>
  <div class="bg-surface font-body-base text-body-base text-on-surface min-h-screen">
    <!-- Shared header -->
    <AppHeader active="about" />

    <main class="w-full pt-20 bg-surface">
      <div class="flex flex-col w-full">
        <!-- Hero -->
        <section class="relative w-full -mt-20 overflow-hidden bg-surface-container-lowest">
          <div
            class="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
            :style="heroBg ? { backgroundImage: `url('${heroBg}')` } : {}"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface-container-lowest/80"
          ></div>
          <div
            class="absolute inset-0 bg-radial-at-c from-primary-container/10 via-transparent to-transparent pointer-events-none"
          ></div>

          <div
            class="relative max-w-7xl mx-auto px-margin pt-36 pb-20 lg:pt-44 lg:pb-28 flex flex-col justify-end"
          >
            <div class="flex items-center gap-space-sm mb-space-md">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-highest text-primary-container font-label-caps text-label-caps uppercase tracking-widest rounded-sm"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                FOUNDATIONAL MANIFESTO // EST. 2018
              </span>
              <span
                class="text-secondary font-label-caps text-label-caps tracking-widest uppercase hidden sm:inline-block"
              >
                SEC // 00-ATHLETIC-ORIGIN
              </span>
            </div>

            <h1
              class="font-display-lg text-display-lg uppercase text-on-surface tracking-tight max-w-5xl leading-none mb-space-lg"
            >
              FORGED IN IRON. <br class="hidden sm:block" />
              <span
                class="text-primary-container text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-primary"
              >
                BUILT FOR PEAK
              </span>
              HUMAN PERFORMANCE.
            </h1>

            <p
              class="font-body-lg text-body-lg text-secondary max-w-3xl mb-space-xl leading-relaxed"
            >
              Earth-Titan Fitness is not a commercial fitness club. It is an industrial-strength
              cathedral engineered for raw athletic power, relentless discipline, and uncompromised
              biomechanical precision.
            </p>

            <div
              class="grid grid-cols-2 sm:grid-cols-4 gap-gutter pt-space-lg bg-surface-container-low/75 backdrop-blur-md p-space-lg rounded-sm"
            >
              <div v-for="stat in heroStats" :key="stat.label" class="flex flex-col">
                <span
                  class="font-stat-xl text-stat-xl text-on-surface tracking-tight leading-none"
                  >{{ stat.value }}</span
                >
                <span
                  class="font-label-caps text-label-caps uppercase text-primary-container tracking-wider mt-1"
                  >{{ stat.label }}</span
                >
                <span class="font-label-sm text-label-sm text-secondary mt-0.5">{{
                  stat.sub
                }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Core Pillars -->
        <section class="w-full py-margin bg-surface">
          <div class="max-w-7xl mx-auto px-margin">
            <div
              class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md"
            >
              <div>
                <div class="flex items-center gap-2 mb-space-xs">
                  <span class="material-symbols-outlined text-primary-container text-[20px]"
                    >fitness_center</span
                  >
                  <span
                    class="font-label-caps text-label-caps uppercase text-primary-container tracking-widest"
                    >ARCHITECTURE OF FORCE</span
                  >
                </div>
                <h2
                  class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight"
                >
                  THE TITAN PHILOSOPHY / CORE PILLARS
                </h2>
              </div>
              <p class="font-body-sm text-body-sm text-secondary max-w-md">
                Every bolt, platform, and operational protocol is calibrated to remove friction
                between human resolve and absolute power output.
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              <div
                v-for="pillar in pillars"
                :key="pillar.num"
                class="bg-surface-container p-space-lg rounded-sm flex flex-col justify-between hover:bg-surface-container-high transition-colors group"
              >
                <div>
                  <div class="flex items-center justify-between mb-space-lg">
                    <span
                      class="font-display-lg text-display-lg text-secondary/30 group-hover:text-primary-container transition-colors"
                      >{{ pillar.num }}</span
                    >
                    <span
                      class="px-2.5 py-1 bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase rounded-sm"
                      >{{ pillar.tag }}</span
                    >
                  </div>
                  <h3
                    class="font-headline-md text-headline-md uppercase text-on-surface mb-space-sm group-hover:text-primary-container transition-colors"
                  >
                    {{ pillar.title }}
                  </h3>
                  <p
                    class="font-body-base text-body-base text-secondary mb-space-md leading-relaxed"
                  >
                    {{ pillar.text }}
                  </p>
                </div>
                <div class="pt-space-md bg-surface-container-low p-space-sm rounded-sm">
                  <div
                    class="flex items-center justify-between font-label-sm text-label-sm text-on-surface"
                  >
                    <span>{{ pillar.metricLabel }}</span>
                    <span class="text-primary font-body-sm-bold">{{ pillar.metricValue }}</span>
                  </div>
                  <div
                    class="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden"
                  >
                    <div class="bg-primary-container h-full" :style="{ width: pillar.fill }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Image Mosaic -->
        <section class="w-full py-space-xl bg-surface-container-lowest">
          <div class="max-w-7xl mx-auto px-margin">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div
                v-for="item in gallery"
                :key="item.caption"
                class="relative group overflow-hidden rounded-sm h-64 bg-surface-container"
              >
                <img
                  v-if="item.src"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  :data-alt="item.alt"
                  :src="item.src"
                  :alt="item.alt"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"
                ></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span class="font-headline-sm text-headline-sm uppercase text-on-surface">{{
                    item.caption
                  }}</span>
                  <span class="material-symbols-outlined text-primary-container text-[20px]">{{
                    item.icon
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Operational Telemetry -->
        <section class="w-full py-margin bg-surface">
          <div class="max-w-7xl mx-auto px-margin">
            <div class="bg-surface-container-low p-space-lg lg:p-space-xl rounded-sm">
              <div
                class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-space-xl pb-space-lg bg-surface-container-high/40 p-space-md rounded-sm gap-space-md"
              >
                <div>
                  <span
                    class="font-label-caps text-label-caps uppercase text-primary-container tracking-widest block mb-1"
                  >
                    NETWORK AUDIT // REAL-TIME METRICS
                  </span>
                  <h2
                    class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight"
                  >
                    OPERATIONAL TELEMETRY &amp; SCALE
                  </h2>
                </div>
                <div
                  class="flex items-center gap-space-sm bg-surface-container-lowest px-4 py-2 rounded-sm"
                >
                  <span
                    class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"
                  ></span>
                  <span class="font-label-caps text-label-caps uppercase text-emerald-400"
                    >All Sectors Fully Operational</span
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div
                  v-for="stat in telemetryStats"
                  :key="stat.label"
                  class="bg-surface-container p-space-lg rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <span class="font-label-caps text-label-caps uppercase text-secondary">{{
                      stat.label
                    }}</span>
                    <div class="flex items-baseline gap-1 mt-2">
                      <span class="font-display-lg text-display-lg text-on-surface leading-none">{{
                        stat.value
                      }}</span>
                      <span class="font-label-caps text-label-caps text-primary-container">{{
                        stat.unit
                      }}</span>
                    </div>
                  </div>
                  <p class="font-body-sm text-body-sm text-secondary mt-space-md">
                    {{ stat.text }}
                  </p>
                </div>
              </div>

              <div
                class="mt-space-xl p-space-md bg-surface-container-lowest rounded-sm flex flex-col md:flex-row items-center justify-between gap-space-md"
              >
                <div class="flex items-center gap-space-md">
                  <span class="material-symbols-outlined text-primary-container text-[28px]"
                    >speed</span
                  >
                  <div>
                    <span class="font-label-caps text-label-caps uppercase text-on-surface block"
                      >Dynamic Rack Capacity Index</span
                    >
                    <span class="font-body-sm text-body-sm text-secondary"
                      >Monitored live across Sectors Alpha through Echo</span
                    >
                  </div>
                </div>
                <div class="flex items-center gap-space-lg w-full md:w-auto justify-end">
                  <div class="flex flex-col items-end">
                    <span class="font-label-caps text-label-caps text-secondary">Current Load</span>
                    <span class="font-headline-sm text-headline-sm text-primary-container"
                      >58% Nominal</span
                    >
                  </div>
                  <div class="w-32 bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full w-[58%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Founding Command -->
        <section class="w-full py-margin bg-surface-container-lowest">
          <div class="max-w-7xl mx-auto px-margin">
            <div
              class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md"
            >
              <div>
                <span
                  class="font-label-caps text-label-caps uppercase text-primary-container tracking-widest block mb-1"
                >
                  LEADERSHIP DIVISION // CADRE
                </span>
                <h2
                  class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight"
                >
                  MEET THE FOUNDING COMMAND &amp; COACHING DIRECTORS
                </h2>
              </div>
              <span class="font-body-sm text-body-sm text-secondary max-w-sm">
                No lifestyle influencers. Our operational leads hold national podiums, doctoral
                credentials, and decades under heavy iron.
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div
                v-for="(person, i) in directors"
                :key="person.name"
                class="bg-surface-container p-space-lg rounded-sm flex flex-col justify-between hover:bg-surface-container-high transition-colors"
              >
                <div>
                  <div class="flex items-center justify-between mb-space-md">
                    <div
                      class="w-14 h-14 rounded-sm flex items-center justify-center font-display-lg text-headline-md tracking-wider"
                      :class="
                        i === 0
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-highest text-on-surface'
                      "
                    >
                      {{ person.initials }}
                    </div>
                    <span
                      class="px-2.5 py-1 bg-surface-container-highest font-label-caps text-label-caps uppercase rounded-sm"
                      :class="i === 0 ? 'text-primary-container' : 'text-primary'"
                    >
                      {{ person.command }}
                    </span>
                  </div>
                  <h3
                    class="font-headline-md text-headline-md uppercase text-on-surface tracking-tight mb-1"
                  >
                    {{ person.name }}
                  </h3>
                  <span
                    class="font-label-caps text-label-caps text-primary uppercase block mb-space-md"
                    >{{ person.role }}</span
                  >
                  <p
                    class="font-body-base text-body-base text-secondary mb-space-lg leading-relaxed"
                  >
                    {{ person.text }}
                  </p>
                </div>
                <div
                  class="pt-space-md bg-surface-container-low p-space-md rounded-sm flex flex-col gap-2"
                >
                  <div class="flex items-center justify-between text-body-sm font-label-sm">
                    <span class="text-secondary">Specialization:</span>
                    <span class="text-on-surface font-body-sm-bold uppercase">{{
                      person.specialization
                    }}</span>
                  </div>
                  <div class="flex items-center justify-between text-body-sm font-label-sm">
                    <span class="text-secondary">Accreditation:</span>
                    <span class="text-on-surface font-body-sm-bold uppercase">{{
                      person.accreditation
                    }}</span>
                  </div>
                  <div class="flex items-center justify-between text-body-sm font-label-sm">
                    <span class="text-secondary">Compound Station:</span>
                    <span class="text-primary-container font-body-sm-bold uppercase">{{
                      person.station
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Facility Standards -->
        <section class="w-full py-margin bg-surface">
          <div class="max-w-7xl mx-auto px-margin">
            <div
              class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md"
            >
              <div>
                <span
                  class="font-label-caps text-label-caps uppercase text-primary-container tracking-widest block mb-1"
                >
                  STANDARD OPERATING SYSTEM
                </span>
                <h2
                  class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight"
                >
                  FACILITY STANDARDS &amp; PROTOCOLS
                </h2>
              </div>
              <p class="font-body-sm text-body-sm text-secondary max-w-sm">
                A gym is only as formidable as the discipline of those who occupy its floor. We
                enforce strict conditions to preserve optimal output.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div
                v-for="std in standards"
                :key="std.title"
                class="bg-surface-container-low p-space-lg rounded-sm flex flex-col justify-between"
              >
                <div>
                  <div
                    class="w-12 h-12 rounded-sm bg-surface-container flex items-center justify-center text-primary-container mb-space-md"
                  >
                    <span class="material-symbols-outlined text-[28px]">{{ std.icon }}</span>
                  </div>
                  <h3
                    class="font-headline-sm text-headline-sm uppercase text-on-surface mb-space-xs"
                  >
                    {{ std.title }}
                  </h3>
                  <p class="font-body-sm text-body-sm text-secondary mb-space-md leading-relaxed">
                    {{ std.text }}
                  </p>
                </div>
                <div
                  class="flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase"
                >
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  {{ std.badge }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="w-full py-margin bg-surface-container-lowest">
          <div class="max-w-7xl mx-auto px-margin">
            <div
              class="relative bg-surface-container p-space-xl rounded-sm overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-space-xl"
            >
              <div
                class="absolute -right-20 -bottom-20 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"
              ></div>
              <div class="relative z-10 max-w-2xl flex flex-col">
                <span
                  class="font-label-caps text-label-caps uppercase text-primary-container tracking-widest mb-space-xs"
                >
                  SEC // ACCESS CONTROL POINT
                </span>
                <h2
                  class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight leading-none mb-space-sm"
                >
                  READY TO CLAIM YOUR ACCESS PASS?
                </h2>
                <p class="font-body-base text-body-base text-secondary leading-relaxed">
                  Stop waiting for commercial gym equipment to free up. Step inside an industrial
                  arena engineered exclusively for individuals who demand uncompromising strength
                  performance.
                </p>
              </div>
              <div
                class="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full lg:w-auto"
              >
                <a
                  class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm uppercase px-space-lg py-space-md rounded-sm transition-all text-center flex items-center justify-center gap-2"
                  data-path="our-branches"
                  href="#"
                >
                  <span class="material-symbols-outlined text-[20px]">explore</span>
                  EXPLORE OUR BRANCHES
                </a>
                <a
                  class="bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-headline-sm text-headline-sm uppercase px-space-lg py-space-md rounded-sm transition-all shadow-[0_0_16px_rgba(229,9,20,0.4)] text-center flex items-center justify-center gap-2"
                  data-path="membership"
                  href="#"
                >
                  <span class="material-symbols-outlined text-[20px]">badge</span>
                  VIEW MEMBERSHIP OPTIONS
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full bg-surface-container-lowest py-margin mt-space-xl">
      <div class="max-w-7xl mx-auto px-margin">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-xl">
          <div class="flex flex-col gap-space-sm">
            <span class="font-headline-md text-headline-md uppercase text-on-surface"
              >Earth-Titan</span
            >
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Elite industrial conditioning architecture and high-throughput athletic facilities.
              Engineered for absolute human performance.
            </p>
          </div>
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-caps text-label-caps uppercase text-on-surface"
              >Command &amp; Support</span
            >
            <div class="flex flex-col gap-1">
              <span class="font-headline-sm text-headline-sm text-primary-container tracking-wider"
                >1-800-TITAN-911</span
              >
              <span class="font-label-sm text-label-sm text-on-surface-variant"
                >Operational Hotline (24/7 Rapid Response)</span
              >
            </div>
          </div>
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-caps text-label-caps uppercase text-on-surface"
              >Branch Terminals</span
            >
            <ul class="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <li v-for="b in branchPhones" :key="b.name">{{ b.name }}: {{ b.phone }}</li>
            </ul>
          </div>
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-caps text-label-caps uppercase text-on-surface"
              >Compliance &amp; Governance</span
            >
            <nav class="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <a
                v-for="l in legalLinks"
                :key="l.path"
                class="hover:text-on-surface transition-colors"
                :data-path="l.path"
                href="#"
              >
                {{ l.label }}
              </a>
            </nav>
          </div>
        </div>
        <div
          class="pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-space-sm"
        >
          <p>© 2024 Earth-Titan Athletic Conditioning Corp. All rights reserved.</p>
          <p class="text-right">Engineered for High-Throughput Physicality.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global resets from the original <style> block */
html,
body {
  margin: 0;
  padding: 0;
}

body {
  overscroll-behavior: none;
}

main > :first-child {
  margin-top: 0 !important;
}

main > :last-child {
  margin-bottom: 0 !important;
}

/* Hide scrollbars */
::-webkit-scrollbar {
  display: none;
}
</style>
