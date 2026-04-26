"use client";

import {
  MessageCircle,
  Rocket,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FeatureLink } from "@/components/custom/feature-link";
import {
  Timeline as TimelineLayout,
  TimelineStep,
} from "@/components/custom/timeline";

const STEPS = [
  {
    key: "joinCommunity",
    icon: Users,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    },
  },
  {
    key: "registerBitget",
    icon: UserPlus,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    },
    reverse: true,
  },
  {
    key: "kycDeposit",
    icon: ShieldCheck,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    },
  },
  {
    key: "contactAdmin",
    icon: MessageCircle,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    },
    reverse: true,
  },
];

const Timeline = () => {
  const t = useTranslations("HomePage.timeline");

  return (
    <TimelineLayout
      badge={{ icon: Rocket, label: t("badge") }}
      title={t("title")}
      subtitle={t("subtitle")}
    >
      {STEPS.map((item) => (
        <TimelineStep
          key={item.key}
          icon={item.icon}
          image={item.image}
          title={t(`steps.${item.key}.title`)}
          description={t(`steps.${item.key}.description`)}
          reverse={item.reverse}
        >
          {item.key === "joinCommunity" && (
            <FeatureLink
              href="https://t.me/kaiyncapital"
              label={t("steps.joinCommunity.cta.label")}
              url={t("steps.joinCommunity.cta.url")}
              color="#2AABEE"
            />
          )}
        </TimelineStep>
      ))}
    </TimelineLayout>
  );
};

export { Timeline };
