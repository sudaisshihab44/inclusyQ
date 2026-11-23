import type { ReactNode } from "react";
import {
  BarChart3,
  ClipboardCheck,
  Flag,
  MessageSquare,
  Monitor,
  Route,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  AnalyticsMini,
  NotificationMini,
  PriorityMini,
  QueueBoardMini,
  RegistrationMini,
  RoutingMini,
  TokenMini,
} from "@/components/ui/ProductMockups";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/lib/content";

const icons: Record<(typeof features.items)[number]["icon"], LucideIcon> = {
  clipboard: ClipboardCheck,
  monitor: Monitor,
  message: MessageSquare,
  ticket: Ticket,
  route: Route,
  flag: Flag,
  chart: BarChart3,
};

function FeatureTag({
  icon,
  children,
}: {
  icon: (typeof features.items)[number]["icon"];
  children: ReactNode;
}) {
  const Icon = icons[icon];
  return (
    <p className="flex items-center gap-2 text-[0.75rem] font-semibold text-mist-400">
      <Icon size={14} aria-hidden="true" className="text-brand-400" />
      {children}
    </p>
  );
}

const registration = features.items[0];
const board = features.items[1];
const notifications = features.items[2];
const tokens = features.items[3];
const routing = features.items[4];
const priority = features.items[5];
const analytics = features.items[6];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative bg-ink"
    >
      <div className="container-page section-pad">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              id="features-heading"
              eyebrow="Capabilities"
              title={features.title}
              intro={features.intro}
            />
            <p className="max-w-[16rem] text-[0.8125rem] leading-relaxed text-mist-500 lg:text-right">
              {features.note}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <Reveal className="h-full sm:col-span-2 lg:col-span-7">
            <SpotlightCard className="flex h-full flex-col p-6 sm:p-7 lg:p-8">
              <FeatureTag icon={registration.icon}>{registration.tag}</FeatureTag>
              <h3 className="type-subsection mt-3 text-mist-50">{registration.title}</h3>
              <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-mist-300">
                {registration.body}
              </p>
              <div className="mt-auto pt-7">
                <RegistrationMini />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="h-full sm:col-span-1 lg:col-span-5" delay={0.04}>
            <SpotlightCard className="flex h-full flex-col p-5 sm:p-6">
              <FeatureTag icon={board.icon}>{board.tag}</FeatureTag>
              <h3 className="type-card mt-3 text-mist-50">{board.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-400">
                {board.body}
              </p>
              <div className="mt-auto pt-5">
                <QueueBoardMini />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="h-full lg:col-span-4" delay={0.03}>
            <SpotlightCard className="flex h-full flex-col p-5 sm:p-6">
              <FeatureTag icon={notifications.icon}>{notifications.tag}</FeatureTag>
              <h3 className="type-card mt-3 text-mist-50">{notifications.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-400">
                {notifications.body}
              </p>
              <div className="mt-auto pt-5">
                <NotificationMini />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="h-full lg:col-span-4" delay={0.06}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <FeatureTag icon={tokens.icon}>{tokens.tag}</FeatureTag>
              <h3 className="type-card mt-3 text-mist-50">{tokens.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-400">
                {tokens.body}
              </p>
              <div className="mt-auto pt-5">
                <TokenMini />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="h-full sm:col-span-2 lg:col-span-4" delay={0.09}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <FeatureTag icon={routing.icon}>{routing.tag}</FeatureTag>
              <h3 className="type-card mt-3 text-mist-50">{routing.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-400">
                {routing.body}
              </p>
              <div className="mt-auto pt-5">
                <RoutingMini />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="h-full sm:col-span-2 lg:col-span-4" delay={0.03}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <FeatureTag icon={priority.icon}>{priority.tag}</FeatureTag>
              <h3 className="type-card mt-3 text-mist-50">{priority.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-400">
                {priority.body}
              </p>
              <div className="mt-auto pt-5">
                <PriorityMini />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="sm:col-span-2 lg:col-span-8" delay={0.06}>
            <SpotlightCard className="grid h-full gap-6 p-6 sm:p-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8 lg:p-8">
              <div>
                <FeatureTag icon={analytics.icon}>{analytics.tag}</FeatureTag>
                <h3 className="type-subsection mt-3 text-mist-50">{analytics.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist-300">
                  {analytics.body}
                </p>
                <ButtonLink
                  href="/#roles"
                  variant="text"
                  className="mt-4 px-0"
                  icon
                >
                  {features.rolesLink}
                </ButtonLink>
              </div>
              <AnalyticsMini />
            </SpotlightCard>
          </Reveal>
        </div>

        <p className="mt-8 text-[0.75rem] leading-relaxed text-mist-500">
          {features.screenNote}
        </p>
      </div>
    </section>
  );
}
