/**
 * InclusyQ — single source of truth for all user-facing copy.
 *
 * Edit this file to change the page without touching components.
 * Product truth rules are documented in docs/DESIGN.md.
 */

export const site = {
  name: "InclusyQ",
  url: "https://inclusyq.online",
  email: "info@inclusyq.online",
  linkedin: "https://www.linkedin.com/company/inclusyq",
  location: "India",
  title: "InclusyQ — Healthcare queues, without the chaos",
  description:
    "InclusyQ brings outpatient registration, smart tokens, live queues and patient updates into one calm system for hospitals.",
  ogAlt: "InclusyQ — Healthcare queues, without the chaos.",
} as const;

export const nav = {
  skip: "Skip to content",
  links: [
    { label: "Problem", href: "/#problem", section: "problem" },
    { label: "How it works", href: "/#how-it-works", section: "how-it-works" },
    { label: "Features", href: "/#features", section: "features" },
    { label: "Impact", href: "/#impact", section: "impact" },
    { label: "FAQ", href: "/#faq", section: "faq" },
  ],
  cta: { label: "Book a demo", href: "/#demo" },
  menu: { open: "Open menu", close: "Close menu", label: "Main menu", mobileLabel: "Mobile" },
  externalNote: "opens in a new tab",
  home: "InclusyQ home",
} as const;

export const hero = {
  status: "Outpatient flow, under control",
  headline: ["Healthcare", "queues, without the chaos."],
  headlineWide: ["Healthcare queues,", "without the chaos."],
  intro:
    "One system for outpatient registration, smart tokens, live queues and patient updates. So your front desk, doctors and patients all see the same calm picture.",
  primaryCta: { label: "Book a demo", href: "/#demo" },
  secondaryCta: { label: "See how it works", href: "/#how-it-works" },
  meta: ["Registration to consultation", "Designed for every patient", "One shared queue"],
  board: {
    kicker: "Waiting hall display",
    title: "General OPD",
    subtitle: "Block A · Counter 2",
    live: "Interactive demo",
    static: "Static preview",
    paused: "Paused",
    pause: "Pause demo",
    play: "Play demo",
    nowServing: "Now serving",
    upNext: "Up next",
    waiting: "waiting",
    minutes: "min",
    sampleNote: "Sample queue. No patient data.",
    accessibleSummary:
      "Animated sample queue for General OPD. Tokens move from waiting to now serving, and a patient update appears. Use the pause button to stop the animation.",
    notificationLabel: "Patient update",
    notificationType: "SMS · sent now",
    stateLabels: { next: "Next", waiting: "Waiting", priority: "Priority" },
    frames: [
      {
        clock: "09:38",
        now: "A-101",
        doctor: "Dr. Nair",
        room: "Room 02",
        queue: "3 waiting · ~14 min",
        progress: 26,
        next: [
          { token: "A-102", meta: "General OPD", state: "next" },
          { token: "A-103", meta: "General OPD", state: "waiting" },
          { token: "A-104", meta: "Priority", state: "priority" },
        ],
        notification: "A-102, you are next. Please wait near Room 02.",
      },
      {
        clock: "09:41",
        now: "A-102",
        doctor: "Dr. Nair",
        room: "Room 03",
        queue: "3 waiting · ~12 min",
        progress: 44,
        next: [
          { token: "A-103", meta: "General OPD", state: "next" },
          { token: "A-104", meta: "Priority", state: "priority" },
          { token: "A-105", meta: "General OPD", state: "waiting" },
        ],
        notification: "A-103, you are next. Please wait near Room 03.",
      },
      {
        clock: "09:44",
        now: "A-104",
        doctor: "Dr. Rao",
        room: "Room 04",
        queue: "2 waiting · ~8 min",
        progress: 62,
        next: [
          { token: "A-105", meta: "General OPD", state: "next" },
          { token: "A-106", meta: "General OPD", state: "waiting" },
          { token: "A-107", meta: "General OPD", state: "waiting" },
        ],
        notification: "A-104, please proceed to Room 04.",
      },
      {
        clock: "09:47",
        now: "A-105",
        doctor: "Dr. Rao",
        room: "Room 04",
        queue: "2 waiting · ~6 min",
        progress: 78,
        next: [
          { token: "A-106", meta: "General OPD", state: "next" },
          { token: "A-107", meta: "General OPD", state: "waiting" },
          { token: "A-108", meta: "General OPD", state: "waiting" },
        ],
        notification: "A-105, you are next. Please wait near Room 04.",
      },
    ],
  },
} as const;

export const trust = {
  lead: "One system for the whole visit",
  note: "Built around the way outpatient teams actually work.",
  items: [
    {
      icon: "clipboard",
      title: "Registration to consultation",
      copy: "One patient record follows the visit instead of restarting at every counter.",
    },
    {
      icon: "monitor",
      title: "A board everyone can read",
      copy: "The waiting hall, front desk and doctors see the same live queue.",
    },
    {
      icon: "message",
      title: "Updates without the counter queue",
      copy: "Plain-language patient updates, with the hall display for everyone else.",
    },
    {
      icon: "shield",
      title: "Access that matches the role",
      copy: "Reception, doctors and admins get the view they need, and actions are logged.",
    },
  ],
  pilot: {
    label: "Pilot programme opening",
    copy: "We are selecting a small group of outpatient teams. Partner names and measured results will appear here once approved.",
    cta: { label: "Talk about a pilot", href: "/#demo" },
  },
} as const;

export const problem = {
  title: "Waiting is hard. Not knowing is harder.",
  intro:
    "The line at the counter is only the visible part. Paper tokens, repeated questions and a queue held in someone's memory make the whole day feel uncertain.",
  sceneLabel: "Waiting hall, 09:40",
  sceneNote: "The same four questions, all morning.",
  questions: [
    {
      quote: "Is my token next?",
      detail: "Asked again, because the board has not moved.",
      time: "09:12",
    },
    {
      quote: "Which room am I meant to go to?",
      detail: "The number was called, but nobody heard where.",
      time: "09:18",
    },
    {
      quote: "Did they already call A-103?",
      detail: "Three people are keeping watch on the counter.",
      time: "09:26",
    },
    {
      quote: "Can my father sit closer?",
      detail: "There are no free seats near the display.",
      time: "09:34",
    },
  ],
  artifact: {
    heading: "The old token",
    serial: "OPD / 097",
    handWritten: "Hand-written · 09:06",
    token: "A-097",
    status: "Please wait",
    lines: ["No position", "No estimate", "No room"],
  },
  closing: "Every unanswered question becomes another visit to the counter.",
} as const;

export const how = {
  title: "From the front desk to the right room.",
  intro:
    "Four steps. One shared source of truth. The queue stops living in someone's head.",
  tokenLabel: "Sample token",
  tokenId: "A-105",
  sampleDepartment: "General OPD",
  sampleDoctorRoom: "Dr. Rao · Room 04",
  liveState: "Live state",
  currentState: "Current state",
  stepPrefix: "Step",
  tokenNote: "One token follows the patient through the visit.",
  steps: [
    {
      n: "01",
      title: "Register",
      copy: "Capture the patient's details once. No repeat forms at every counter.",
      detail: "Existing records are reused across visits, so the queue starts with the person, not the paperwork.",
      state: "Registered",
      meta: "New visit · 09:36",
      icon: "clipboard",
    },
    {
      n: "02",
      title: "Get a token",
      copy: "InclusyQ places the patient in the right department queue and issues a clear token.",
      detail: "Priority rules are applied when the token is issued, not remembered later.",
      state: "Token issued",
      meta: "General OPD · 2 ahead",
      icon: "ticket",
    },
    {
      n: "03",
      title: "Track live",
      copy: "Patients, families and waiting-hall screens see the same position and estimate.",
      detail: "No one has to hover around the counter to hear their number.",
      state: "2 ahead",
      meta: "~12 min · updated 09:40",
      icon: "activity",
    },
    {
      n: "04",
      title: "Get called",
      copy: "The board and patient update point to the right room. Staff close the visit cleanly.",
      detail: "Every move is logged, so the day ends with a clear record.",
      state: "Room 04",
      meta: "Now serving · Dr. Rao",
      icon: "megaphone",
    },
  ],
  stages: ["Registered", "Token issued", "Waiting", "Called"],
} as const;

export const features = {
  title: "One quiet system for the whole visit.",
  intro:
    "Registration, tokens, routing, displays and updates share the same source of truth, so nobody has to guess.",
  note: "Built for the desk, the waiting hall and the room. One system underneath.",
  screenNote: "Product screens on this page use sample data. No patient information is shown.",
  rolesLink: "See the role views",
  sampleNote: "Sample view",
  items: [
    {
      id: "registration",
      icon: "clipboard",
      tag: "Outpatient registration",
      title: "Register once. Reuse all visit.",
      body: "Capture patient details at the desk and reuse them through the visit. Fewer forms, fewer repeated questions.",
    },
    {
      id: "board",
      icon: "monitor",
      tag: "Real-time queue board",
      title: "A waiting hall that answers itself.",
      body: "The display shows the current token, who is next and where to go, before the question reaches the counter.",
    },
    {
      id: "notifications",
      icon: "message",
      tag: "Patient notifications",
      title: "Updates where patients already are.",
      body: "Plain-language SMS and WhatsApp updates where supported, with the hall display for patients who do not carry a phone.",
    },
    {
      id: "tokens",
      icon: "ticket",
      tag: "Smart tokens",
      title: "The right patient, the right queue.",
      body: "Department-aware tokens with priority built in, so urgent cases move visibly instead of by memory.",
    },
    {
      id: "routing",
      icon: "route",
      tag: "Multi-department routing",
      title: "Move the token, keep the context.",
      body: "Send a patient from one department queue to another without losing the visit or the audit trail.",
    },
    {
      id: "priority",
      icon: "flag",
      tag: "Priority handling",
      title: "Urgent does not mean unclear.",
      body: "Flag urgent cases so they move ahead without hiding the change from the rest of the queue.",
    },
    {
      id: "analytics",
      icon: "chart",
      tag: "Analytics",
      title: "See where the day slowed down.",
      body: "Daily flow summaries show tokens issued, patients served and the moments that backed up.",
    },
  ],
  analytics: {
    title: "Today's flow",
    sample: "Sample data",
    stats: [
      { value: "142", label: "Tokens issued" },
      { value: "118", label: "Patients served" },
      { value: "24", label: "Still waiting" },
    ],
    hours: ["9 am", "11 am", "1 pm", "3 pm", "5 pm"],
    note: "Department-level summaries are available to admin roles.",
  },
  mock: {
    registration: {
      label: "New visit",
      nameLabel: "Patient",
      nameValue: "Sample patient",
      phoneLabel: "Phone",
      phoneValue: "+91 •••• 4210",
      departmentLabel: "Department",
      departmentValue: "General OPD",
      recordChip: "Existing record found",
      reuse: "Details reused",
      action: "Issue token",
    },
    board: {
      nowLabel: "Now serving",
      nowValue: "A-104",
      room: "Room 04",
      live: "Live",
      next: [
        { token: "A-105", state: "Next" },
        { token: "A-106", state: "Waiting" },
        { token: "A-107", state: "Waiting" },
      ],
    },
    notifications: {
      items: [
        {
          label: "Patient update",
          title: "You are next.",
          body: "Please wait near Room 04.",
          time: "now",
        },
        {
          label: "Patient update",
          title: "Room change.",
          body: "Please move to Room 06.",
          time: "2 min",
        },
      ],
    },
    token: {
      id: "A-105",
      department: "General OPD",
      state: "Priority",
      room: "Room 04",
      assigned: "Assigned",
    },
    routing: {
      steps: ["General OPD", "Room 04", "Follow-up"],
      note: "Scope and audit trail follow the token.",
    },
    priority: {
      rows: [
        { token: "A-103", label: "Urgent", state: "Priority" },
        { token: "A-104", label: "General OPD", state: "Next" },
        { token: "A-105", label: "General OPD", state: "Waiting" },
      ],
      note: "Changes stay visible and logged.",
    },
  },
} as const;

export const impact = {
  title: "Impact, measured honestly.",
  intro:
    "We will not publish invented numbers. Here is the scorecard we will fill with pilot results, plus the product facts that will not change.",
  asideNote: "Bring your baseline. We will use it.",
  measureCopy:
    "A pilot should answer a business question, not just produce a dashboard. These are the four numbers we will agree before starting.",
  facts: [
    {
      value: 1,
      pad: 0,
      unit: "",
      label: "shared queue",
      copy: "Reception, doctors, screens and admins work from the same source of truth.",
    },
    {
      value: 4,
      pad: 2,
      unit: "",
      label: "steps, arrival to room",
      copy: "Register, get a token, track live, get called.",
    },
    {
      value: 3,
      pad: 2,
      unit: "",
      label: "role views",
      copy: "Admin, front desk and patient, each with the context they need.",
    },
  ],
  metrics: [
    {
      placeholder: "[X]%",
      label: "Reduction in average wait time",
      note: "Baseline vs pilot period, by department.",
    },
    {
      placeholder: "[Y]%",
      label: "Fewer questions at the counter",
      note: "Measured from front-desk interruption logs.",
    },
    {
      placeholder: "[Z] hrs",
      label: "Reception time returned each week",
      note: "Staff time saved on manual coordination.",
    },
  ],
  disclaimer:
    "Placeholders only. Replace these with measured pilot results before publishing. We do not claim reductions we have not seen.",
  awaiting: "Awaiting pilot data",
  measureTitle: "How we will measure it",
  measure: [
    "Average wait time per department",
    "Tokens served per OPD session",
    "Counter interruptions per 100 patients",
    "Patient confidence before and after",
  ],
  cta: { label: "Discuss a pilot", href: "/#demo" },
} as const;

export const roles = {
  title: "One queue. Three clear views.",
  intro: "Everyone sees the part of the day they need, and nothing they do not.",
  tablistLabel: "Role views",
  sample: "Sample view",
  visualLabelPrefix: "Sample interface for",
  tabs: [
    {
      id: "admin",
      label: "Admin",
      title: "See the whole day, not just one counter.",
      body: "Live counts, department load and wait patterns in one view. Spot the bottleneck before it becomes a complaint.",
      points: [
        "Department-level queue status",
        "Staff, rooms and role access",
        "Daily flow summaries",
      ],
      visualLabel:
        "Sample admin dashboard showing outpatient totals, live departments and wait times.",
      headerLabel: "Today",
      headerTitle: "General OPD",
      statusLabel: "All queues live",
      chartLabel: "Hourly load",
      chartSample: "Sample",
      stats: [
        { value: "142", label: "Registered" },
        { value: "118", label: "Served" },
        { value: "24", label: "Waiting" },
        { value: "14m", label: "Avg. wait" },
      ],
      rows: [
        { name: "General OPD", state: "Live", count: "12 waiting" },
        { name: "Cardiology", state: "Live", count: "6 waiting" },
        { name: "Orthopaedics", state: "Paused", count: "9 waiting" },
      ],
    },
    {
      id: "front-desk",
      label: "Front desk",
      title: "Move the queue without leaving one screen.",
      body: "Issue tokens, call the next patient, mark a priority and reassign a room from the same place.",
      points: [
        "Issue and recall tokens",
        "Call next with room context",
        "Priority and room changes logged",
      ],
      visualLabel:
        "Sample front-desk console showing a live token queue with call-next and priority controls.",
      titleLabel: "Live token queue",
      statusLabel: "Connected",
      footerNote: "A-105 called to Room 04",
      queue: [
        { token: "A-105", meta: "General OPD · 2 ahead", state: "Next" },
        { token: "A-106", meta: "General OPD · 3 ahead", state: "Waiting" },
        { token: "A-107", meta: "Priority · Cardio", state: "Priority" },
        { token: "A-108", meta: "General OPD · 5 ahead", state: "Waiting" },
      ],
      action: "Call next",
      deskLabel: "Counter 2 · Reception",
    },
    {
      id: "patient",
      label: "Patient",
      title: "Know where you stand, without asking.",
      body: "A clear token, position and room. The waiting-hall board shows the same thing, so families do not have to take turns at the counter.",
      points: [
        "Token, position and estimate",
        "Room and doctor when called",
        "Updates on phone or hall display",
      ],
      visualLabel:
        "Sample patient phone view showing token A-105, two patients ahead and room guidance.",
      appName: "InclusyQ",
      yourToken: "Your token",
      nextLabel: "Next",
      sampleNote: "Sample patient view",
      statusTime: "9:41",
      statusNetwork: "5G",
      token: "A-105",
      ahead: "2 ahead",
      wait: "~12 min",
      room: "Room 04",
      doctor: "Dr. Rao · General OPD",
      update: "A-105, you are next. Please wait near Room 04.",
      language: "English · हिन्दी",
      languageNote: "Language preview",
    },
  ],
} as const;

export const pilot = {
  title: "Pilot with us. Then we will publish what changed.",
  intro:
    "We are opening a small pilot with outpatient teams. Real names, quotes and measured outcomes will appear here with permission, not before.",
  status: "Pilot intake open",
  slotLabel: "Pilot story 01 · reserved",
  quotePlaceholder: "[Pilot quote]",
  attribution: "[Hospital name] · [Role] · [City]",
  slotNote:
    "This space is intentionally empty until a partner approves publication.",
  permissionNote: "Published only with written permission.",
  measuresTitle: "What we will test together",
  measures: [
    {
      icon: "eye",
      title: "Wait visibility",
      copy: "Can patients and families see where they stand without asking the counter?",
    },
    {
      icon: "users",
      title: "Front-desk load",
      copy: "How many coordination questions disappear from the busiest hours?",
    },
    {
      icon: "heart",
      title: "Patient confidence",
      copy: "Do people leave the waiting hall feeling informed rather than forgotten?",
    },
  ],
  cta: { label: "Discuss a pilot", href: "/#demo" },
} as const;

export const faq = {
  title: "Questions, answered.",
  intro:
    "The things hospital teams ask before a demo. If yours is not here, write to us.",
  items: [
    {
      id: "his",
      q: "Does InclusyQ replace our HIS or EMR?",
      a: "No. InclusyQ handles outpatient registration, tokens and queues. It can run alongside your existing hospital systems; the integration scope depends on your setup. We will map it with your IT team during the demo.",
    },
    {
      id: "setup",
      q: "How long does setup take?",
      a: "A single-department pilot is the usual starting point. Timing depends on your registration flow, staff availability and data requirements. After the demo we will give you a written plan with clear steps, owners and dates.",
    },
    {
      id: "data",
      q: "Where does patient data live, and who can see it?",
      a: "Access is role-based and every queue action is logged. Deployment, data residency and security documentation are agreed during procurement. We do not claim certifications we do not hold; we will share the current security position in writing.",
    },
    {
      id: "smartphone",
      q: "Does it work for patients without smartphones?",
      a: "Yes. Waiting-hall displays and the front desk are first-class ways to use InclusyQ, not fallbacks. SMS and WhatsApp updates are available where supported by the deployment.",
    },
    {
      id: "priority",
      q: "Can we handle urgent and priority patients?",
      a: "Yes. Urgent cases can be moved ahead without hiding the change from the queue. Every move stays visible to staff and is recorded in the audit trail.",
    },
    {
      id: "pricing",
      q: "How is pricing structured?",
      a: "Pricing depends on departments, users and deployment. We will send a clear proposal after the demo. There is no public price list yet, and no obligation to proceed.",
    },
  ],
  contactTitle: "Still deciding?",
  contactCopy: "Tell us how your outpatient day runs. We will tell you honestly whether InclusyQ fits.",
  contactCta: "Book a demo",
  emailPrefix: "Or email",
} as const;

export const demo = {
  title: "Let's make your waiting hall feel calmer.",
  eyebrow: "Book a demo",
  intro:
    "A 30-minute walkthrough. We will map your current outpatient flow and show where InclusyQ fits.",
  responseNote: "We reply within two working days.",
  emailPrompt: "Prefer email?",
  points: [
    { icon: "clock", label: "30-minute walkthrough" },
    { icon: "map", label: "Mapped to your outpatient flow" },
    { icon: "shield", label: "No obligation to proceed" },
  ],
  formTitle: "Book a demo",
  formNote: "Fields marked * are required. Phone is optional.",
  fields: {
    name: {
      label: "Full name",
      placeholder: "Your name",
      autoComplete: "name",
    },
    hospital: {
      label: "Hospital or clinic",
      placeholder: "Hospital name",
      autoComplete: "organization",
    },
    role: {
      label: "Your role",
      placeholder: "Select a role",
      options: [
        "Hospital administrator",
        "Operations lead",
        "Front-desk manager",
        "Doctor",
        "Other",
      ],
    },
    email: {
      label: "Work email",
      placeholder: "you@hospital.com",
      autoComplete: "email",
    },
    phone: {
      label: "Phone (optional)",
      placeholder: "+91 98765 43210",
      autoComplete: "tel",
    },
  },
  submit: "Book a demo",
  submitting: "Sending request",
  privacy: "We use these details to respond to your demo request. Phone is optional.",
  errors: {
    name: "Enter your full name.",
    hospital: "Enter your hospital or clinic name.",
    role: "Select your role.",
    emailRequired: "Enter your work email.",
    emailInvalid: "Enter a valid email address.",
    phoneInvalid: "Enter a valid phone number.",
    checkFields: "Check the highlighted fields and try again.",
    server:
      "Something went wrong while sending. Please email info@inclusyq.online instead.",
    network:
      "We could not reach the server. Check your connection, or email info@inclusyq.online.",
  },
  success: {
    title: "Request received.",
    body: "Thank you. We will reply to {email} within two working days.",
    note: "Need to add something? Email {contactEmail}.",
  },
  preview: {
    title: "Your request is ready to send.",
    body: "This build has no mail service connected yet, so nothing was sent. Open the prepared email in your mail app, or write to {contactEmail}.",
    cta: "Open email app",
    secondary: "Back to form",
  },
  mailSubject: "InclusyQ demo request",
  mailIntro: "Demo request from the InclusyQ website.",
} as const;

export const footer = {
  blurb: "Outpatient registration, smart tokens, live queues and patient updates. One calm system.",
  statusLabel: "Pilot intake open",
  columns: [
    {
      title: "Product",
      links: [
        { label: "The problem", href: "/#problem" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "Role views", href: "/#roles" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Impact", href: "/#impact" },
        { label: "Pilot programme", href: "/#pilot" },
        { label: "FAQ", href: "/#faq" },
        { label: "Book a demo", href: "/#demo" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Email", href: "mailto:info@inclusyq.online", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/inclusyq", external: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  copyright: "© 2026 InclusyQ. All rights reserved.",
  made: "Made for calmer outpatient care.",
  backToTop: "Back to top",
} as const;

export const legal = {
  backToHome: "Back to home",
  privacy: {
    title: "Privacy notice",
    updated: "Last updated: November 2026",
    contactPrompt: "Questions about this notice?",
    intro:
      "This notice explains what happens to the information you share through the InclusyQ website.",
    sections: [
      {
        title: "What we collect",
        body: "If you request a demo, we ask for your name, hospital or clinic, role and work email. A phone number is optional. We use these details to respond to your request and prepare for the walkthrough. Your request is shared with the InclusyQ team and, depending on configuration, an email or CRM provider used to receive it. This website does not maintain a demo-request database. We do not sell your details or add you to an unrelated marketing list. Please check with us about how a configured provider handles retention and deletion.",
      },
      {
        title: "What we do not collect",
        body: "This marketing site does not ask for patient data. Please do not send patient information through the demo form. The product queue shown on this page is sample data.",
      },
      {
        title: "How it is used",
        body: "Demo requests are shared with the InclusyQ team and, depending on configuration, an email or CRM provider used to receive them. This website does not maintain a demo-request database. We do not sell your details or add you to an unrelated marketing list. Please check with us about how a configured provider handles retention and deletion.",
      },
      {
        title: "Cookies and analytics",
        body: "This site does not currently use analytics or advertising cookies. The live queue preview runs in your browser and does not require cookies. Hosting infrastructure may process basic request data needed to serve and protect the site. If analytics or advertising tools are added, this notice will be updated and any required consent will be provided before they go live.",
      },
      {
        title: "Your choices",
        body: "You can ask us to correct or delete the details you submitted by emailing info@inclusyq.online. We will respond within a reasonable period and confirm what was done.",
      },
      {
        title: "Contact",
        body: "For any privacy question, email info@inclusyq.online. This notice is a plain-language summary, not a substitute for the data processing terms agreed during procurement.",
      },
    ],
  },
  terms: {
    title: "Website terms",
    updated: "Last updated: November 2026",
    contactPrompt: "Questions about these terms?",
    intro:
      "These terms apply to the InclusyQ marketing website. They are not the terms of a hospital deployment.",
    sections: [
      {
        title: "What this site is",
        body: "This site describes InclusyQ's outpatient queue management product and lets you request a demo. Product screens, queue states and numbers shown on this page are sample views for illustration.",
      },
      {
        title: "No medical advice",
        body: "Nothing on this site is medical advice or a promise of clinical outcomes. Hospital operations and patient care remain the responsibility of the hospital and its clinical teams.",
      },
      {
        title: "Demo requests",
        body: "Submitting a demo request does not create a contract or guarantee a deployment date. Any pilot or deployment is governed by a separate written agreement.",
      },
      {
        title: "Content and trademarks",
        body: "The InclusyQ name, logo and site content belong to InclusyQ. You may share links to this site. Do not copy or reuse the content as your own without permission.",
      },
      {
        title: "Contact",
        body: "Questions about these terms can be sent to info@inclusyq.online.",
      },
    ],
  },
} as const;

export const structuredData = {
  faq: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
} as const;
