import {
  Bell,
  Check,
  ChevronRight,
  MessageSquare,
  MoveRight,
  Phone,
} from "lucide-react";
import { features, roles } from "@/lib/content";
import { cn } from "@/lib/utils";

const chipBase =
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[0.625rem] font-semibold leading-none";

function StateChip({
  state,
}: {
  state: "Priority" | "Next" | "Waiting" | "Live" | "Paused";
}) {
  const tone = {
    Priority: "border-amber/30 bg-amber/10 text-amber",
    Next: "border-brand-400/30 bg-brand-400/10 text-brand-200",
    Waiting: "border-mist-50/10 bg-mist-50/5 text-mist-400",
    Live: "border-brand-400/30 bg-brand-400/10 text-brand-200",
    Paused: "border-mist-50/10 bg-mist-50/5 text-mist-400",
  } as const;

  return (
    <span className={cn(chipBase, tone[state])}>
      <span
        aria-hidden="true"
        className={cn(
          "h-1 w-1 rounded-full",
          state === "Priority" && "bg-amber",
          (state === "Next" || state === "Live") && "bg-brand-400",
          (state === "Waiting" || state === "Paused") && "bg-mist-500"
        )}
      />
      {state}
    </span>
  );
}

export function RegistrationMini() {
  const data = features.mock.registration;
  return (
    <div
      role="img"
      aria-label="Sample outpatient registration form with reused patient details and an issue-token action."
      className="rounded-xl border border-mist-50/10 bg-ink p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.6875rem] font-semibold text-mist-300">{data.label}</p>
        <span className="rounded border border-brand-400/25 bg-brand-400/8 px-2 py-1 text-[0.625rem] font-semibold text-brand-200">
          {data.recordChip}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="col-span-2 rounded-md border border-mist-50/10 bg-mist-50/[0.025] px-3 py-2">
          <p className="text-[0.5625rem] text-mist-500">{data.nameLabel}</p>
          <p className="mt-0.5 text-[0.75rem] font-medium text-mist-200">{data.nameValue}</p>
        </div>
        <div className="rounded-md border border-mist-50/10 bg-mist-50/[0.025] px-3 py-2">
          <p className="text-[0.5625rem] text-mist-500">{data.phoneLabel}</p>
          <p className="mt-0.5 text-[0.75rem] font-medium text-mist-200">{data.phoneValue}</p>
        </div>
        <div className="rounded-md border border-mist-50/10 bg-mist-50/[0.025] px-3 py-2">
          <p className="text-[0.5625rem] text-mist-500">{data.departmentLabel}</p>
          <p className="mt-0.5 text-[0.75rem] font-medium text-mist-200">{data.departmentValue}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-mist-50/8 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[0.625rem] text-mist-400">
          <Check size={11} aria-hidden="true" className="text-brand-400" />
          {data.reuse}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-brand-400 px-3 py-1.5 text-[0.625rem] font-semibold text-ink">
          {data.action}
          <ChevronRight size={11} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export function QueueBoardMini() {
  const data = features.mock.board;
  return (
    <div
      role="img"
      aria-label="Sample waiting-hall display showing A-104 now serving in Room 04, with three patients up next."
      className="rounded-xl border border-mist-50/10 bg-ink p-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-[0.625rem] font-medium text-mist-500">{data.nowLabel}</p>
        <span className="inline-flex items-center gap-1.5 text-[0.625rem] font-medium text-brand-200">
          <span className="live-dot" aria-hidden="true" />
          {data.live}
        </span>
      </div>
      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="font-display text-[3.2rem] font-medium leading-none tracking-[-0.06em] text-brand-300 tabular">
          {data.nowValue}
        </p>
        <span className="rounded-md border border-brand-400/25 bg-brand-400/8 px-2.5 py-1.5 text-[0.6875rem] font-semibold text-brand-200">
          {data.room}
        </span>
      </div>
      <ul className="mt-4 space-y-1.5 border-t border-mist-50/8 pt-3">
        {data.next.map((row) => (
          <li key={row.token} className="flex items-center gap-2.5">
            <span className="font-display text-[0.875rem] font-semibold tabular text-mist-100">
              {row.token}
            </span>
            <span className="ml-auto">
              <StateChip state={row.state as "Next" | "Waiting"} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NotificationMini() {
  return (
    <div
      role="img"
      aria-label="Two sample patient SMS updates: you are next, and a room change."
      className="space-y-2"
    >
      {features.mock.notifications.items.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "flex items-start gap-2.5 rounded-xl border px-3 py-3",
            index === 0
              ? "border-brand-400/20 bg-brand-400/[0.055]"
              : "border-mist-50/10 bg-mist-50/[0.025]"
          )}
        >
          <span
            className={cn(
              "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md",
              index === 0 ? "bg-brand-400/12 text-brand-300" : "bg-mist-50/6 text-mist-300"
            )}
          >
            <MessageSquare size={13} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[0.5625rem] font-semibold text-mist-400">
                {item.label}
              </p>
              <p className="text-[0.5625rem] text-mist-500">{item.time}</p>
            </div>
            <p className="mt-0.5 text-[0.75rem] font-semibold text-mist-100">
              {item.title}
            </p>
            <p className="text-[0.6875rem] leading-snug text-mist-400">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TokenMini() {
  const data = features.mock.token;
  return (
    <div
      role="img"
      aria-label="Sample priority token A-105 for General OPD, directed to Room 04."
      className="relative overflow-hidden rounded-xl border border-mist-50/10 bg-ink p-4"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full glow-amber"
      />
      <div className="flex items-center justify-between">
        <p className="text-[0.625rem] text-mist-500">{data.department}</p>
        <StateChip state="Priority" />
      </div>
      <p className="mt-3 font-display text-[2.9rem] font-medium leading-none tracking-[-0.06em] text-mist-50 tabular">
        {data.id}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-dashed border-mist-50/15 pt-3">
        <span className="text-[0.6875rem] text-mist-400">{data.assigned}</span>
        <span className="text-[0.75rem] font-semibold text-brand-200">{data.room}</span>
      </div>
      <div aria-hidden="true" className="mt-3 flex h-5 items-end gap-[3px] opacity-50">
        {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2].map((w, i) => (
          <span
            key={i}
            className="h-full bg-mist-300"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export function RoutingMini() {
  const data = features.mock.routing;
  return (
    <div
      role="img"
      aria-label="Sample routing path from General OPD to Room 04 to follow-up."
      className="rounded-xl border border-mist-50/10 bg-ink p-4"
    >
      <ol className="space-y-0">
        {data.steps.map((step, index) => (
          <li key={step} className="relative flex gap-3 pb-4 last:pb-0">
            {index < data.steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[0.4375rem] top-4 h-full w-px bg-mist-50/15"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border",
                index === 0
                  ? "border-brand-400 bg-brand-400"
                  : "border-mist-50/25 bg-ink"
              )}
            />
            <div className="flex w-full items-center justify-between gap-2">
              <span
                className={cn(
                  "text-[0.75rem]",
                  index === 0 ? "font-semibold text-mist-100" : "text-mist-300"
                )}
              >
                {step}
              </span>
              {index < data.steps.length - 1 ? (
                <MoveRight size={12} aria-hidden="true" className="text-mist-500" />
              ) : (
                <Check size={12} aria-hidden="true" className="text-brand-400" />
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-2 border-t border-mist-50/8 pt-3 text-[0.625rem] leading-relaxed text-mist-500">
        {data.note}
      </p>
    </div>
  );
}

export function PriorityMini() {
  const data = features.mock.priority;
  return (
    <div
      role="img"
      aria-label="Sample queue showing an urgent patient moved ahead while other tokens remain waiting."
      className="rounded-xl border border-mist-50/10 bg-ink p-3.5"
    >
      <ul className="space-y-1.5">
        {data.rows.map((row) => (
          <li
            key={row.token}
            className="flex items-center gap-2.5 rounded-md border border-mist-50/8 bg-mist-50/[0.025] px-2.5 py-2"
          >
            <span className="font-display text-[0.8125rem] font-semibold tabular text-mist-100">
              {row.token}
            </span>
            <span className="text-[0.625rem] text-mist-500">{row.label}</span>
            <span className="ml-auto">
              <StateChip state={row.state as "Priority" | "Next" | "Waiting"} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[0.625rem] leading-relaxed text-mist-500">{data.note}</p>
    </div>
  );
}

export function AnalyticsMini() {
  const bars = [34, 52, 42, 68, 58, 82, 64, 48, 70, 44];
  const data = features.analytics;
  return (
    <div
      role="img"
      aria-label="Sample daily outpatient flow summary with tokens issued, patients served and waiting counts."
      className="rounded-xl border border-mist-50/10 bg-ink p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[0.75rem] font-semibold text-mist-200">{data.title}</p>
        <span className="rounded border border-mist-50/10 px-2 py-1 text-[0.5625rem] font-semibold text-mist-500">
          {data.sample}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {data.stats.map((stat) => (
          <div key={stat.label} className="rounded-md border border-mist-50/8 bg-mist-50/[0.025] px-3 py-2.5">
            <dt className="text-[0.625rem] text-mist-500">{stat.label}</dt>
            <dd className="mt-1 font-display text-[1.35rem] font-medium leading-none tracking-[-0.04em] text-mist-50 tabular">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-4">
        <div aria-hidden="true" className="flex h-24 items-end gap-2">
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 rounded-t-sm",
                index === 5 ? "bg-brand-400" : "bg-mist-50/12"
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[0.5625rem] text-mist-500">
          {data.hours.map((hour) => (
            <span key={hour}>{hour}</span>
          ))}
        </div>
      </div>
      <p className="mt-3 border-t border-mist-50/8 pt-2.5 text-[0.625rem] text-mist-500">
        {data.note}
      </p>
    </div>
  );
}

export function AdminPanel() {
  const data = roles.tabs[0];
  return (
    <div
      role="img"
      aria-label={data.visualLabel}
      className="overflow-hidden rounded-2xl border border-mist-50/12 bg-ink-900 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-mist-50/10 px-4 py-3 sm:px-5">
        <div>
          <p className="text-[0.5625rem] text-mist-500">{data.headerLabel}</p>
          <p className="text-[0.8125rem] font-semibold text-mist-100">{data.headerTitle}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-400/25 bg-brand-400/8 px-2 py-1.5 text-[0.625rem] font-semibold text-brand-200">
          <span className="live-dot" aria-hidden="true" />
          {data.statusLabel}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {data.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-mist-50/8 bg-mist-50/[0.025] p-3">
              <dt className="text-[0.625rem] text-mist-500">{stat.label}</dt>
              <dd className="mt-1 font-display text-[1.5rem] font-medium leading-none tracking-[-0.04em] text-mist-50 tabular">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 overflow-hidden rounded-lg border border-mist-50/8">
          {data.rows.map((row, index) => (
            <div
              key={row.name}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5",
                index !== data.rows.length - 1 && "border-b border-mist-50/8"
              )}
            >
              <span className="text-[0.75rem] font-medium text-mist-200">{row.name}</span>
              <span className="ml-auto text-[0.625rem] text-mist-500">{row.count}</span>
              <StateChip state={row.state as "Live" | "Paused"} />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-mist-50/8 bg-mist-50/[0.025] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.625rem] text-mist-500">{data.chartLabel}</p>
            <p className="text-[0.5625rem] text-mist-500">{data.chartSample}</p>
          </div>
          <div aria-hidden="true" className="mt-2 flex h-12 items-end gap-1.5">
            {[34, 52, 44, 68, 58, 82, 62, 48, 70, 44].map((height, index) => (
              <span
                key={index}
                className={cn(
                  "flex-1 rounded-t-sm",
                  index === 5 ? "bg-brand-400" : "bg-mist-50/12"
                )}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FrontDeskPanel() {
  const data = roles.tabs[1];
  return (
    <div
      role="img"
      aria-label={data.visualLabel}
      className="overflow-hidden rounded-2xl border border-mist-50/12 bg-ink-900 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-mist-50/10 px-4 py-3 sm:px-5">
        <div>
          <p className="text-[0.5625rem] text-mist-500">{data.deskLabel}</p>
          <p className="text-[0.8125rem] font-semibold text-mist-100">{data.titleLabel}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.625rem] font-semibold text-brand-200">
          <span className="live-dot" aria-hidden="true" />
          {data.statusLabel}
        </span>
      </div>
      <ul className="divide-y divide-mist-50/8">
        {data.queue.map((row) => (
          <li key={row.token} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="font-display text-[1.05rem] font-semibold tabular tracking-[-0.03em] text-mist-50">
              {row.token}
            </span>
            <span className="min-w-0 truncate text-[0.625rem] text-mist-500">{row.meta}</span>
            <span className="ml-auto">
              <StateChip state={row.state as "Priority" | "Next" | "Waiting"} />
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-3 border-t border-mist-50/10 bg-mist-50/[0.025] px-4 py-3.5 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[0.625rem] text-mist-400">
          <Bell size={12} aria-hidden="true" className="text-brand-400" />
          {data.footerNote}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-400 px-3 py-2 text-[0.6875rem] font-semibold text-ink">
          {data.action}
          <ChevronRight size={12} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export function PatientPhone() {
  const data = roles.tabs[2];
  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full glow-brand-soft"
      />
      <div
        role="img"
        aria-label={data.visualLabel}
        className="overflow-hidden rounded-[2.25rem] border border-mist-50/15 bg-ink-800 p-2.5 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-mist-50/8 bg-ink-950">
          <div className="flex items-center justify-between px-5 pt-4">
            <span className="text-[0.5625rem] text-mist-500">{data.statusTime}</span>
            <span aria-hidden="true" className="h-4 w-16 rounded-full bg-ink-700" />
            <span className="text-[0.5625rem] text-mist-500">{data.statusNetwork}</span>
          </div>
          <div className="px-4 pb-5 pt-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[0.625rem] font-semibold text-mist-300">
                <Phone size={11} aria-hidden="true" className="text-brand-400" />
                {data.appName}
              </span>
              <span className="rounded border border-mist-50/10 px-1.5 py-0.5 text-[0.5rem] text-mist-500">
                {data.language}
              </span>
            </div>

            <div className="mt-5 text-center">
              <p className="text-[0.625rem] text-mist-500">{data.yourToken}</p>
              <p className="mt-1 font-display text-[4rem] font-medium leading-none tracking-[-0.065em] text-brand-300 tabular">
                {data.token}
              </p>
              <div className="mt-3 flex justify-center gap-2">
                <span className="rounded-md border border-brand-400/25 bg-brand-400/10 px-2.5 py-1.5 text-[0.625rem] font-semibold text-brand-200">
                  {data.ahead}
                </span>
                <span className="rounded-md border border-mist-50/10 bg-mist-50/5 px-2.5 py-1.5 text-[0.625rem] font-semibold text-mist-300">
                  {data.wait}
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-mist-50/10 bg-mist-50/[0.025] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.5625rem] text-mist-500">{data.nextLabel}</span>
                <span className="text-[0.5625rem] text-mist-500">{data.languageNote}</span>
              </div>
              <p className="mt-1 text-[0.8125rem] font-semibold text-mist-100">{data.room}</p>
              <p className="text-[0.625rem] text-mist-400">{data.doctor}</p>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg border border-brand-400/20 bg-brand-400/[0.055] p-3">
              <MessageSquare size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-300" />
              <p className="text-[0.6875rem] leading-snug text-mist-200">{data.update}</p>
            </div>
            <p className="mt-3 text-center text-[0.5625rem] text-mist-500">
              {data.sampleNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
