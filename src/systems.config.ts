/**
 * NEURIX PORTAL: CONTENT SOURCE OF TRUTH
 * Every page, the SEO layer and the structured data read from this file.
 */

export type IconName =
  | 'eye' | 'bot' | 'server' | 'layers' | 'chart' | 'shield' | 'bolt' | 'arrow' | 'arrow-up' | 'mail'
  | 'pin' | 'clock' | 'check' | 'sun' | 'chip' | 'lock' | 'database' | 'cube' | 'search' | 'rocket'
  | 'code' | 'copy' | 'external' | 'nodes' | 'linkedin' | 'x' | 'menu' | 'file' | 'target' | 'brain'
  | 'phone' | 'cart' | 'truck' | 'bed' | 'bag' | 'cap' | 'pulse' | 'film' | 'users' | 'link' | 'globe' | 'sync';

export interface NavLink { path: string; label: string; exact: boolean; }

export const SITE = {
  legalName: 'Neurix (Pvt) Ltd.',
  brand: 'NEURIX',
  tagline: 'Intelligence. Engineered.',
  /** Canonical origin used for canonical URLs, Open Graph and JSON-LD. */
  url: 'https://neurixpvtltd.com',
  email: 'corporate@neurixpvtltd.com',
  location: 'Lahore, Punjab, Pakistan',
  locality: 'Lahore',
  region: 'Punjab',
  country: 'PK',
  support: '24/7 Deployment Support',
  ogImage: '/og-image.png',
  founder: 'Wasiq Ali'
} as const;

export const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Home', exact: true },
  { path: '/services', label: 'Services', exact: false },
  { path: '/case-studies', label: 'Case Studies', exact: false },
  { path: '/about', label: 'About', exact: false },
  { path: '/contact', label: 'Contact', exact: false }
];

/* ------------------------------------------------------------------ HOME */

export const HERO = {
  badge: 'NEURIX (PVT) LTD. — SYSTEMS & AI ARCHITECTURE',
  headlineLead: 'Engineering High-Throughput',
  headlineAccent: 'AI Systems',
  headlineTail: '& Enterprise Software Infrastructure',
  sub: 'Neurix(Pvt)Ltd. builds fault-tolerant web platforms, distributed applications, custom computer vision models, and POS infrastructure for logistics, hospitality, retail, edtech, and healthcare operators, backed by direct founder-to-founder execution from scoping to production operations.',
  primaryCta: 'Explore Enterprise Services',
  secondaryCta: 'Schedule Technical Call'
};

export const PIPELINE_ROWS: { icon: IconName; label: string; value: string }[] = [
  { icon: 'nodes', label: 'Telemetry Ingest', value: 'Streaming' },
  { icon: 'eye', label: 'YOLOv8 Engine', value: 'Active' },
  { icon: 'bolt', label: 'Sub-50ms Inference', value: '' },
  { icon: 'lock', label: 'AES-256 Layer', value: 'Encrypted' }
];

export const METRICS: { value: string; label: string }[] = [
  { value: '99.9%', label: 'SLA uptime target' },
  { value: '<50ms', label: 'API response, p95 target' },
  { value: 'AES-256', label: 'Encryption standard' },
  { value: '100+', label: 'Custom ML models trained' }
];

export const TARGETS: { value: string; label: string }[] = [
  { value: '99.9%', label: 'SLA uptime' },
  { value: '<50ms', label: 'API response, p95' },
  { value: 'AES-256', label: 'Encryption, rest and transit' },
  { value: '0 min', label: 'Planned downtime per release' }
];

export interface Industry { id: string; icon: IconName; name: string; systems: string; }

export const INDUSTRIES: Industry[] = [
  { id: 'logistics', icon: 'truck', name: 'Logistics', systems: 'Fleet inspection AI, telemetry ingestion, dispatch consoles, and audit-grade telemetry records.' },
  { id: 'hospitality', icon: 'bed', name: 'Hospitality', systems: 'Multi-branch POS, centralized inventory, and per-shift revenue reconciliation across regional venues.' },
  { id: 'retail', icon: 'bag', name: 'Retail', systems: 'Custom commerce engines, omnichannel inventory, and payment gateway integrations under promotional load.' },
  { id: 'edtech', icon: 'cap', name: 'Edtech', systems: 'Student lifecycle management, performance analytics, parent portals, and document retrieval pipelines.' },
  { id: 'healthcare', icon: 'pulse', name: 'Healthcare', systems: 'Encrypted data tiers, role-scoped portals, automated audit logging, and structured document extraction.' },
  { id: 'media', icon: 'film', name: 'Media & SaaS', systems: 'Protected video delivery over HTTP 206 with chunked encryption and tenant-level revenue controls.' }
];

export interface Phase { id: string; icon: IconName; title: string; summary: string; outputs: string[]; }

export const PROCESS: Phase[] = [
  {
    id: 'Phase 01', icon: 'search', title: 'Audit',
    summary: 'Founder-led architectural discovery maps workflows, data topologies, infrastructure bottlenecks, and revenue leakage vectors before development begins.',
    outputs: ['Workflow, data, and infrastructure audit', 'Throughput, latency, and SLA targets', 'System architecture blueprint and roadmap']
  },
  {
    id: 'Phase 02', icon: 'chip', title: 'Build & Train',
    summary: 'Services, distributed applications, and neural models are constructed in modular increments under strict cryptographic and performance gates.',
    outputs: ['Typed, test-covered modular microservices', 'Fine-tuned vision and LLM models behind evaluation gates', 'Security hardening: AES-256, JWT, bcrypt']
  },
  {
    id: 'Phase 03', icon: 'rocket', title: 'Deployment',
    summary: 'Containerized, health-gated deployments into high-availability production environments, followed by continuous observability and SLA error budgeting.',
    outputs: ['Zero-downtime automated release pipeline', 'SLO monitoring dashboards and alert triggers', '24/7 dedicated engineering support']
  }
];

/* -------------------------------------------------------------- SERVICES */

export interface Service {
  id: string; scope: string; index: string; icon: IconName; title: string; tagline: string; summary: string;
  breakdown: { title: string; detail: string }[];
  targets: string[];
  industries: { name: string; use: string }[];
  stack: string[];
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'web-platforms', scope: 'web', index: '01', icon: 'layers',
    title: 'Web & Enterprise Platforms',
    tagline: 'Low-latency backend services and type-safe reactive interfaces.',
    summary: 'Mission-critical web platforms engineered for heavy operational loads: stateless microservices behind high-performance gateways, strict TypeScript frontends, and multi-tenant architectures built around rigorous compliance and reporting requirements.',
    breakdown: [
      { title: 'High-throughput microservices', detail: 'Stateless Node.js, Go, and Python services with bounded queues, connection pooling, and idempotent endpoints targeting sub-50ms p95 latency.' },
      { title: 'Type-safe frontends', detail: 'Angular and React built in strict TypeScript, utilizing reactive state primitives, lazy-loaded chunks, and server-side hydration for optimal performance.' },
      { title: 'Identity and access control', detail: 'JWT with sliding refresh rotation, granular role- and tenant-scoped authorization, bcrypt hashing, and immutable audit logs.' },
      { title: 'Strict API contracts', detail: 'Versioned REST and GraphQL schemas, generated client SDKs, automated contract tests, and backward-compatible data migrations.' },
      { title: 'Multi-tenant isolation', detail: 'Query-level tenant isolation, AES-256 encryption on sensitive attributes, and structured reporting views reconciling directly to source ledgers.' },
      { title: 'Enterprise observability', detail: 'Structured logs, request-rate metrics, distributed tracing per service, and threshold alerting tied to the 99.9% SLA error budget.' }
    ],
    targets: ['p95 API < 50ms', '99.9% SLA', 'AES-256'],
    industries: [
      { name: 'Logistics', use: 'Real-time dispatch consoles and fleet telemetry tracking dashboards.' },
      { name: 'Healthcare', use: 'Role-scoped patient records portals with immutable audit trails.' },
      { name: 'Retail', use: 'Merchandising, inventory, and automated supply-chain back offices.' }
    ],
    stack: ['TypeScript', 'Angular', 'React', 'Node.js', 'Go', 'MongoDB'],
    deliverables: ['Architecture Decision Records (ADRs)', 'Typed API schemas and SDKs', 'CI/CD pipelines with staging previews', 'Operational runbooks and SLO dashboards']
  },
  {
    id: 'mobile-apps', scope: 'mobile', index: '02', icon: 'phone',
    title: 'Mobile & App Development',
    tagline: 'Offline-first field applications engineered for unstable connectivity.',
    summary: 'Native and cross-platform applications built for operators, field agents, and customers navigating intermittent network conditions: local-first persistence, deterministic conflict resolution, and automated deployment pipelines.',
    breakdown: [
      { title: 'Offline-first persistence', detail: 'Local embedded databases serve as the absolute UI source of truth, buffering local writes into transactional operation logs for background sync.' },
      { title: 'Deterministic conflict resolution', detail: 'Entity-level versioning, server-authoritative merge strategies, and explicit exception workflows for edge-case resolutions.' },
      { title: 'Hybrid and native execution', detail: 'Optimized shared codebases for standard screens, combined with native modules for high-speed camera capture, Bluetooth peripherals, and background sync.' },
      { title: 'Hardware peripheral integration', detail: 'Direct interfacing with barcode scanners, payment terminals, mobile receipt printers, and industrial BLE sensors.' },
      { title: 'Client-side hardening', detail: 'Certificate pinning, secure platform keychain token storage, encrypted local data layers, and remote session revocation capabilities.' },
      { title: 'Automated release engineering', detail: 'Automated code signing and packaging, phased rollout distribution, and crash telemetry aggregation.' }
    ],
    targets: ['Full-shift offline operation', 'Encrypted local store', 'Staged rollouts'],
    industries: [
      { name: 'Logistics', use: 'Inspector and driver field apps capturing offline proofs and checklists.' },
      { name: 'Hospitality', use: 'Floor-staff handheld ordering and rapid stock auditing.' },
      { name: 'Healthcare', use: 'Encrypted home-visit data collection with remote wipe capability.' }
    ],
    stack: ['Cross-platform', 'Native iOS / Android', 'REST / GraphQL', 'Background Sync', 'Push'],
    deliverables: ['Offline synchronization specification', 'Automated build and signing pipeline', 'Crash telemetry integration', 'Device compatibility matrix']
  },
  {
    id: 'custom-systems', scope: 'systems', index: '03', icon: 'server',
    title: 'Custom Systems & Architecture',
    tagline: 'Zero-downtime distributed infrastructure and hardened data environments.',
    summary: 'End-to-end infrastructure design and cloud migration for systems requiring uncompromising availability: containerized microservice orchestrations, automated zero-downtime pipelines, and rigorously tested database recovery.',
    breakdown: [
      { title: 'Zero-downtime deployment topologies', detail: 'Rolling and blue-green release strategies with automated health checks and instant fallback upon error budget exhaustion.' },
      { title: 'Container orchestration', detail: 'Deterministic Docker containers managed on Kubernetes clusters with horizontal pod autoscaling tuned via load testing.' },
      { title: 'Automated CI/CD pipelines', detail: 'Continuous integration running unit, contract, and security vulnerability scans, promoting immutable artifacts across environments.' },
      { title: 'Data tier security', detail: 'AES-256 encryption at rest, TLS 1.3 in transit, strict least-privilege networking, and secrets managed via dedicated vaults.' },
      { title: 'Disaster recovery mechanics', detail: 'Automated point-in-time snapshots, scheduled restore drills, and validated Recovery Point/Time Objectives (RPO/RTO).' },
      { title: 'Capacity planning and cost optimization', detail: 'Traffic profile modeling, predictive resource autoscaling, and granular infrastructure cost attribution per tenant.' }
    ],
    targets: ['99.9% SLA', 'Zero-downtime deploys', 'AES-256 at rest'],
    industries: [
      { name: 'Retail', use: 'Elastic checkout clusters capable of absorbing sudden promotional traffic spikes.' },
      { name: 'Healthcare', use: 'Air-gapped or network-isolated data tiers enforcing strict compliance.' },
      { name: 'Logistics', use: 'High-ingestion message brokers absorbing massive fleet telemetry bursts.' }
    ],
    stack: ['Docker', 'Kubernetes', 'Go', 'Python', 'MongoDB'],
    deliverables: ['Infrastructure as Code (IaC) scripts', 'Zero-downtime deployment runbooks', 'Disaster recovery validation reports', 'Capacity and cost models']
  },
  {
    id: 'ai-rag', scope: 'ai', index: '04', icon: 'brain',
    title: 'Personalized AI Models & RAG Pipelines',
    tagline: 'Proprietary AI models trained on your data and served at scale.',
    summary: 'Custom computer vision architectures, fine-tuned large language models, and advanced retrieval pipelines hosted on dedicated GPU infrastructure behind rigorous evaluation gates.',
    breakdown: [
      { title: 'Computer vision object detection', detail: 'Fine-tuned YOLOv8 and Detectron2 frameworks optimized for real-time defect and anomaly identification under 100ms inference targets.' },
      { title: 'Domain-adapted LLMs', detail: 'Custom instruction tuning of foundational models on proprietary corpora, backed by regression test suites to monitor drift.' },
      { title: 'Advanced RAG pipelines', detail: 'Specialized document parsing via PyMuPDF, semantic chunking algorithms, hybrid vector retrieval, and strict source citation generation.' },
      { title: 'Autonomous agent workflows', detail: 'Deterministic tool-using agents built for operational routing and decision automation, constrained by hard security guardrails.' },
      { title: 'Intelligent document extraction', detail: 'Automated extraction from unstructured PDFs, scans, and web forms into typed JSON schemas with human review queues.' },
      { title: 'Model operations (MLOps)', detail: 'Versioned model registries, shadow deployments, performance telemetry, and instant fallback routing via FastAPI gateways.' }
    ],
    targets: ['< 100ms vision inference', 'Eval-gated releases', 'Source-attributed answers'],
    industries: [
      { name: 'Logistics', use: 'Automated vehicle structural damage assessment and scoring.' },
      { name: 'Edtech', use: 'Semantic retrieval engines over proprietary examination archives.' },
      { name: 'Healthcare', use: 'Automated clinical record extraction and diagnostic coding.' }
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'YOLOv8', 'Detectron2', 'PyMuPDF'],
    deliverables: ['Curated training and evaluation datasets', 'Versioned model artifact registry', 'Optimized inference microservices', 'Drift monitoring telemetry']
  },
  {
    id: 'commerce-pos', scope: 'commerce', index: '05', icon: 'cart',
    title: 'E-commerce Systems & POS Integration',
    tagline: 'Custom commerce engines and real-time multi-location POS synchronization.',
    summary: 'Engineered commerce platforms built from first principles: high-performance catalogs, idempotent checkouts, and event-sourced point-of-sale synchronization maintaining inventory parity across physical and digital storefronts.',
    breakdown: [
      { title: 'Idempotent checkout engines', detail: 'Deterministic transaction processing featuring atomic inventory reservation locks and robust payment state machines handling webhook retries.' },
      { title: 'Payment gateway integrations', detail: 'Secure tokenized card processing, 3-D Secure authentication, automated refunds, and granular financial reconciliation.' },
      { title: 'Real-time multi-location POS sync', detail: 'Event-sourced ledger architecture allowing distributed terminals to operate offline and reconcile state seamlessly upon reconnection.' },
      { title: 'Granular inventory accounting', detail: 'Per-location variant tracking, inter-branch stock transfers, automated low-stock triggers, and physical-to-digital variance auditing.' },
      { title: 'Complex pricing and promotion engines', detail: 'Rule-based matrix pricing, time-boxed promotional campaigns, and automated tax calculation per geographic jurisdiction.' },
      { title: 'Revenue leakage prevention', detail: 'Automated anomaly detection flagging unauthorized voids, unbilled items, and inventory variance across shifts.' }
    ],
    targets: ['Thousands of concurrent checkouts', 'Zero-downtime releases', 'Per-location ledger'],
    industries: [
      { name: 'Retail', use: 'Unified omnichannel catalogs and lightning-fast checkout experiences.' },
      { name: 'Hospitality', use: 'Synchronized table service, bar orders, and kitchen display routing.' },
      { name: 'Edtech', use: 'High-volume course enrollment, subscription billing, and installment processing.' }
    ],
    stack: ['Node.js', 'Go', 'Angular', 'MongoDB', 'Docker'],
    deliverables: ['Payment state-machine specifications', 'Offline-capable POS sync protocols', 'Automated leakage audit reports', 'Gateway integration test suites']
  }
];

export interface Tech {
  id: string; name: string; group: string; mono: string; role: string; deployedFor: string[]; pairsWith: string;
}

export const TECH_STACK: Tech[] = [
  {
    id: 'typescript-angular', name: 'TypeScript / Angular', group: 'Frontend', mono: 'TS',
    role: 'Enterprise-grade, type-safe reactive frontend architecture.',
    deployedFor: ['Operator dashboards and multi-tenant admin consoles', 'POS back-office and inventory management interfaces', 'High-performance customer and student portals', 'Server-side rendering (SSR) with hydration for instant paint'],
    pairsWith: 'Node.js / Express APIs, generated typed client SDKs'
  },
  {
    id: 'python', name: 'Python / FastAPI / PyTorch', group: 'AI & Data', mono: 'Py',
    role: 'High-throughput data extraction, computer vision, and AI model orchestration.',
    deployedFor: ['Training and fine-tuning computer vision models and LLMs', 'FastAPI inference microservices for YOLOv8 and Detectron2', 'Automated web scraping and document parsing pipelines', 'RAG ingestion, embedding generation, and evaluation harnesses'],
    pairsWith: 'Docker container clusters on GPU hosts, Go and Node.js gateways'
  },
  {
    id: 'node', name: 'Node.js / Express', group: 'Backend', mono: 'Js',
    role: 'Scalable asynchronous microservices and event-driven backends.',
    deployedFor: ['High-performance REST and GraphQL APIs with JWT security', 'HTTP 206 partial-content range streaming for protected media', 'Robust payment gateway and webhook integrations', 'Real-time inventory and POS event synchronization streams'],
    pairsWith: 'MongoDB clusters, Angular and React frontends'
  },
  {
    id: 'go', name: 'Go (Golang)', group: 'Systems', mono: 'Go',
    role: 'Ultra-low-latency concurrent network daemons and high-performance services.',
    deployedFor: ['Sync daemons reconciling offline POS terminals and central servers', 'High fan-out telemetry ingestion and stream processing', 'Lightweight background workers and queue consumers', 'Latency-critical API gateways and routing proxies'],
    pairsWith: 'Kubernetes orchestration, Node.js services, distributed message queues'
  },
  {
    id: 'docker-k8s', name: 'Docker / Kubernetes', group: 'Infrastructure', mono: 'K8',
    role: 'Isolated containerization and autonomous cluster scaling.',
    deployedFor: ['Reproducible image builds from developer laptops to GPU nodes', 'Horizontal pod autoscaling driven by real-time load profiles', 'Health-gated rolling zero-downtime releases', 'Strict tenant and service isolation boundaries'],
    pairsWith: 'CI/CD automation pipelines, secure secret stores, monitoring stacks'
  },
  {
    id: 'react', name: 'React', group: 'Frontend', mono: 'Re',
    role: 'Component-driven UI engineering where ecosystem libraries fit specific workloads.',
    deployedFor: ['Interactive specialized product interfaces', 'Embeddable payment widgets and client portals', 'Rapid prototyping against live service APIs'],
    pairsWith: 'TypeScript, Node.js microservices'
  },
  {
    id: 'mongodb', name: 'MongoDB', group: 'Database', mono: 'Mg',
    role: 'Document storage optimized for flexible multi-tenant and event-sourced schemas.',
    deployedFor: ['Tenant-isolated document collections with strict schema validation', 'Append-only inspection logs and POS event ledgers', 'Telemetry storage and content management metadata'],
    pairsWith: 'Node.js and Go services, AES-256 field-level encryption'
  },
  {
    id: 'vision', name: 'YOLOv8 / Detectron2', group: 'Computer Vision', mono: 'CV',
    role: 'Real-time object detection and spatial segmentation fine-tuned on client data.',
    deployedFor: ['Structural damage identification and vehicle inspection scoring', 'High-speed frame perception at sub-100ms latency', 'Automated visual compliance verification'],
    pairsWith: 'PyTorch, FastAPI inference containers, GPU hosts'
  }
];

/* ---------------------------------------------------------- CASE STUDIES */

export type CaseCategory = 'ai' | 'platform' | 'commerce';

export const CASE_FILTERS: { id: 'all' | CaseCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Vision' },
  { id: 'platform', label: 'Platforms' },
  { id: 'commerce', label: 'Commerce & POS' }
];

export interface CaseStudy {
  id: string; index: string; category: CaseCategory; industry: string; title: string; summary: string;
  challenge: string; architecture: string[]; outcome: string[];
  metrics: { value: string; label: string }[]; stack: string[]; featured: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fleet-logistics-audit-ai', index: 'CS-01', category: 'ai', industry: 'Logistics', featured: true,
    title: 'Autonomous Fleet & Logistics Audit AI',
    summary: 'Computer vision inspection pipeline replacing manual vehicle assessments with automated, auditable condition scoring.',
    challenge: 'Manual inspections suffered from human variance, slow turnaround times, and fragmented record-keeping, delaying billing cycles and masking chronic vehicle damage.',
    architecture: [
      'YOLOv8 and Detectron2 models fine-tuned on proprietary fleet imagery for automated damage segmentation.',
      'Real-time frame ingestion feeding a GPU-accelerated FastAPI inference cluster.',
      'Audit telemetry written to an immutable inspection ledger and exposed via authenticated APIs to operator consoles.',
      'Automated historical diffing comparing current inspection states against baseline vehicle records.'
    ],
    outcome: [
      'Inspection telemetry generated and logged in under three seconds.',
      'Audit processing efficiency improved by 45% with a 60ms latency reduction over legacy pipelines.',
      'Uniform, objective damage scoring across all regional inspection sites.'
    ],
    metrics: [{ value: '+45%', label: 'Audit efficiency' }, { value: '-60ms', label: 'Latency reduction' }, { value: '<3s', label: 'Telemetry generation' }],
    stack: ['YOLOv8', 'Detectron2', 'PyTorch', 'FastAPI', 'Docker']
  },
  {
    id: 'hospitality-pos-ecosystem', index: 'CS-02', category: 'commerce', industry: 'Hospitality', featured: true,
    title: 'Multi-Branch Hospitality & POS Ecosystem',
    summary: 'Centralized inventory and point-of-sale synchronization architecture across 5+ regional hotel and restaurant venues.',
    challenge: 'Siloed location software created inventory discrepancies, while manual shift reconciliation of voids and discounts obscured revenue leakage and prevented accurate group reporting.',
    architecture: [
      'Edge POS terminals operating offline against local embedded stores, syncing asynchronously via ordered event streams.',
      'Centralized inventory ledger handling multi-branch transfers and automated variance tracking.',
      'Rule-based verification engine flagging unauthorized voids, discounts, and stock discrepancies per shift.',
      'Unified enterprise dashboard reading from the exact transactional ledger as frontline terminals.',
      'Granular role-based access control, AES-256 field encryption, and tamper-evident audit logs.'
    ],
    outcome: [
      'Unified single source of truth established across 5+ distinct regional locations.',
      'Revenue leakage eradicated through automated shift-level ledger reconciliation.',
      'Zero downtime during network partitions with automatic background synchronization upon reconnection.'
    ],
    metrics: [{ value: '5+', label: 'Locations synchronized' }, { value: 'Real-time', label: 'Stock and sales sync' }, { value: 'Per-shift', label: 'Leakage prevention' }],
    stack: ['Node.js', 'Go', 'Angular', 'MongoDB', 'Docker']
  },
  {
    id: 'custom-ecommerce-engine', index: 'CS-03', category: 'commerce', industry: 'Retail', featured: true,
    title: 'Custom E-commerce Engine from Scratch',
    summary: 'High-load retail platform engineered from first principles to process thousands of concurrent checkouts without degradation.',
    challenge: 'Off-the-shelf e-commerce platforms created rigid bottlenecks in pricing logic, inventory locking, and checkout throughput under promotional peak loads.',
    architecture: [
      'Stateless checkout microservices deployed behind load balancers on Kubernetes with predictive horizontal autoscaling.',
      'Idempotent order creation workflows featuring time-boxed inventory reservation locks preventing race conditions.',
      'Tokenized payment gateway integration with automated financial settlement reconciliation.',
      'Health-gated rolling deployment pipelines enabling code promotion during active trading hours.',
      'High-performance Angular storefront utilizing server-side rendering for indexable, lightning-fast catalog navigation.'
    ],
    outcome: [
      'Successfully processed thousands of concurrent checkouts during peak sales events without service interruption.',
      'Achieved zero downtime across all production software releases.',
      'Restored full business ownership over complex matrix pricing and promotional rules.'
    ],
    metrics: [{ value: 'Thousands', label: 'Concurrent checkouts' }, { value: '0', label: 'Downtime during releases' }, { value: '99.9%', label: 'SLA target' }],
    stack: ['Node.js', 'Go', 'Angular', 'Kubernetes', 'MongoDB']
  },
  {
    id: 'edtech-preparation-saas', index: 'CS-04', category: 'platform', industry: 'Edtech', featured: false,
    title: 'Edtech Preparation SaaS Platform',
    summary: 'Multi-tenant student management and performance analytics platform consolidating fragmented administrative workflows.',
    challenge: 'Educational institutes relied on disconnected legacy tools for admissions, attendance tracking, and grading, preventing a coherent view of student progression.',
    architecture: [
      'Multi-tenant Angular and Node.js platform enforcing strict per-institute data isolation.',
      'Granular role-scoped access profiles for administrators, faculty, students, and parents.',
      'Performance analytics engine aggregating continuous assessment data into cohort and individual trends.',
      'Secure parent portal delivering real-time attendance and milestone tracking notifications.',
      'Robust JWT authentication, bcrypt credential hashing, and AES-256 encryption for sensitive student records.'
    ],
    outcome: [
      'Replaced a fragmented toolchain with a unified enterprise system of record.',
      'Enabled automated parent communication and reporting without administrative overhead.',
      'Provided executive management with real-time institutional performance analytics.'
    ],
    metrics: [{ value: 'Multi-tenant', label: 'Per-institute isolation' }, { value: 'Role-scoped', label: 'Staff, student, parent' }],
    stack: ['Angular', 'Node.js', 'MongoDB', 'Docker']
  },
  {
    id: 'streaming-saas', index: 'CS-05', category: 'platform', industry: 'Media & SaaS', featured: false,
    title: 'High-Concurrency Streaming & SaaS',
    summary: 'Optimized HTTP 206 video delivery architecture featuring chunked encryption and tenant-level revenue controls.',
    challenge: 'Delivering protected media content to massive concurrent audiences required efficient partial-content streaming, robust digital rights protection, and precise tenant accounting.',
    architecture: [
      'HTTP 206 partial-content range delivery enabling seamless media seeking and buffering without full file downloads.',
      'Segment-level AES-256 chunk encryption safeguarding video assets both at rest and in transit.',
      'Multi-tenant financial logic isolating customer billing, content entitlements, and analytics reporting.'
    ],
    outcome: [
      'Achieved instant playback start times and smooth seeking under heavy concurrent viewer loads.',
      'Secured proprietary media assets end-to-end without degrading client-side playback performance.',
      'Established clean multi-tenant data boundaries for accurate billing attribution.'
    ],
    metrics: [{ value: '206', label: 'Range-request delivery' }, { value: 'AES-256', label: 'Chunk encryption' }],
    stack: ['Node.js', 'Express', 'MongoDB', 'Angular', 'AES-256']
  },
  {
    id: 'llm-chunking-pipeline', index: 'CS-06', category: 'ai', industry: 'Edtech', featured: false,
    title: 'Past Paper Scraping & LLM Chunking Pipeline',
    summary: 'High-speed web scraper and PDF processing pipeline engineered to ingest and structure data for LLM retrieval systems.',
    challenge: 'Critical examination archives were locked across protected websites in unstructured PDF formats, rendering them unusable for retrieval-augmented generation (RAG).',
    architecture: [
      'Cloudscraper-based collection engine optimized for resilience against bot mitigation systems.',
      'PyMuPDF extraction pipeline preserving document hierarchical structure across headings, equations, and metadata.',
      'Semantic chunking algorithms formatting raw content into clean, retrieval-ready vector database records.'
    ],
    outcome: [
      'Replaced manual data collection with a fully automated, repeatable ingestion pipeline.',
      'Delivered clean, uniformly structured corpora primed for downstream vector indexing.',
      'Provided the foundational data layer for AI-driven search and automated tutoring tools.'
    ],
    metrics: [{ value: 'LLM-ready', label: 'Chunked datasets' }, { value: '2', label: 'Core extraction libraries' }],
    stack: ['Python', 'Cloudscraper', 'PyMuPDF', 'MongoDB']
  }
];

/* ----------------------------------------------------------------- ABOUT */

export const MISSION = {
  headline: 'Engineered for Autonomy. Built for Scale.',
  body: 'Neurix(Pvt)Ltd. is an elite technology partner for enterprises that run on software. We engineer the core platforms, mobile applications, distributed infrastructure, and AI models powering logistics, hospitality, retail, edtech, and healthcare operators, maintaining direct operational accountability after launch.'
};

export const PARTNERSHIP = {
  statement: 'We do not operate as transient outsourced contractors who vanish after code handover.',
  body: 'Neurix(Pvt)Ltd. embeds as a long-term strategic technology partner. All scoping, architecture design, and strategic priorities are established in direct founder-to-founder dialogue, adapting dynamically to evolving operational constraints.',
  rows: [
    { label: 'Engagement horizon', typical: 'Scope delivered, repository transferred, relationship terminates at final invoice.', neurix: 'Long-term partnership. We maintain permanent accountability for production uptime.' },
    { label: 'Communication channel', typical: 'Buffered through account managers and tiered support ticketing queues.', neurix: 'Direct founder-to-founder dialogue with Wasiq Ali and engineering leadership.' },
    { label: 'Success metric', typical: 'Completed Jira tickets and billable engineering hours logged.', neurix: 'Measurable revenue impact, operational efficiency gains, and strict SLA compliance.' },
    { label: 'Scope adaptability', typical: 'Rigid fixed templates where every architectural pivot triggers change-order friction.', neurix: 'Architecture evolves fluidly alongside shifting business constraints and goals.' },
    { label: 'Post-launch ownership', typical: 'Institutional knowledge departs entirely with the third-party agency.', neurix: 'Comprehensive runbooks, active monitoring, and original engineers remaining on the system.' },
    { label: 'Risk allocation', typical: 'Client absorbs 100% of delivery failure and operational downtime risk.', neurix: 'Shared accountability enforced against strict SLA and performance commitments.' }
  ],
  pillars: [
    { icon: 'chart' as IconName, title: 'Revenue impact priority', body: 'Every engineering decision is rigorously traced to a quantifiable bottom-line revenue, cost, or risk metric.' },
    { icon: 'shield' as IconName, title: 'Operational excellence', body: 'Uptime targets, automated runbooks, monitoring, and incident response are specified at design phase.' },
    { icon: 'sync' as IconName, title: 'Systemic efficiency', body: 'We eliminate manual data reconciliation, redundant software tooling, and latency from critical workflows.' },
    { icon: 'users' as IconName, title: 'Founder-led execution', body: 'Decisions happen directly in conversation. There are no translation layers between your objectives and the engineers.' }
  ]
};

export const PRINCIPLES: { index: string; icon: IconName; title: string; body: string }[] = [
  { index: '01', icon: 'target', title: 'First-Principles 0-to-1 Execution', body: 'We isolate the primary operational constraint and build the simplest, most robust system to eliminate it.' },
  { index: '02', icon: 'cube', title: 'Modular Architecture', body: 'Loosely coupled services and explicit interface contracts permit individual components to scale or evolve independently.' },
  { index: '03', icon: 'shield', title: 'Uncompromising Cryptographic Security', body: 'AES-256 encryption at rest, bcrypt credential hashing, and JWT authorization are baseline defaults on every system.' }
];

export interface Leader {
  name: string; initials: string; role: string; summary: string; credentials: string[]; disciplines: string[];
  bio: string; photo: string; linkedin: string;
}

export const LEADERS: { primary: Leader; secondary: Leader } = {
  primary: {
    name: 'Wasiq Ali',
    initials: 'WA',
    role: 'Founder & CEO, Neurix (Pvt) Ltd.',
    summary: 'Founder & CEO @ Neurix Pvt Ltd · Founder & CEO @ Grapes Creative · Director IT, Megatronics Engineering',
    credentials: [
      'Founder & CEO, Neurix (Pvt) Ltd.',
      'Founder & CEO, Grapes Creative',
      'Director IT, Megatronics Engineering'
    ],
    disciplines: ['Growth Strategist', 'Full Stack Software Engineer & Consultant', 'Visual Communication Designer'],
    bio: 'Wasiq Ali founded Neurix(Pvt)Ltd. and directs its overall technical and commercial roadmap. Operating across distributed engineering, growth strategy, and visual communication, he ensures that system architecture, economic impact, and interface design cohere seamlessly. Clients engage with him directly from initial scoping through production operations.',
    photo: '/Lead.jpg',
    linkedin: 'https://linkedin.com/in/wasiq-ali-321b36312'
  },
  secondary: {
    name: 'Muhammad Bilal Majid',
    initials: 'MB',
    role: 'Co-Founder & Chief Operating Officer / Lead AI Architect',
    summary: 'Deep-tech systems architecture, computer vision pipelines, distributed infrastructure and operational scaling.',
    credentials: [
      'Co-Founder & COO, Neurix (Pvt) Ltd.',
      'Co-Founder & COO, Grapes Creative',
      'Customer Service Associate (Amazon), Ibex Global',
      'BSEDS, Information Technology University (ITU)'
    ],
    disciplines: ['Deep-Tech Systems Architecture', 'Computer Vision Pipelines', 'Distributed Infrastructure', 'Operational Scaling'],
    bio: 'Bilal oversees technical architecture and operational execution at Neurix(Pvt)Ltd. He engineers the computer vision pipelines, distributed infrastructure, and high-performance deployment environments that transition complex AI research into reliable enterprise systems.',
    photo: '/Co-Lead.jpeg',
    linkedin: 'https://www.linkedin.com/in/muhammad-bilal-majid'
  }
};

export const INFRA: { icon: IconName; title: string; body: string }[] = [
  { icon: 'sun', title: 'Solar-Backed Power Studio', body: 'An independent solar-backed power infrastructure ensures continuous engineering, staging, and model training operations during grid instability.' },
  { icon: 'chip', title: 'Local GPU Training Servers', body: 'Dedicated in-house GPU hardware clusters for model training and fine-tuning keep sensitive client datasets secure and fully controlled.' },
  { icon: 'server', title: 'High-Availability Deployment', body: 'Redundant, health-gated production environments engineered for maximum uptime, automated failover, and rapid disaster recovery.' }
];

/* --------------------------------------------------------------- CONTACT */

export const SCOPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'web', label: 'Web & Enterprise Platform' },
  { value: 'mobile', label: 'Mobile & App Development' },
  { value: 'systems', label: 'Custom Systems & Architecture' },
  { value: 'ai', label: 'Custom AI Model / RAG Pipeline' },
  { value: 'commerce', label: 'E-commerce / POS Integration' },
  { value: 'call', label: 'Technical Call / Architecture Review' },
  { value: 'other', label: 'Something else' }
];

export const BUDGET_OPTIONS: string[] = [
  'Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000 – $150,000', '$150,000+', 'Not sure yet'
];

export const CONTACT_STEPS: { title: string; body: string }[] = [
  { title: 'Founder review', body: 'Your brief is evaluated directly by engineering leadership, not a sales queue.' },
  { title: 'Technical call', body: 'We analyze operational constraints, data topologies, and success targets.' },
  { title: 'Scoped proposal', body: 'You receive a rigorous architecture blueprint, delivery schedule, and SLO metrics.' }
];