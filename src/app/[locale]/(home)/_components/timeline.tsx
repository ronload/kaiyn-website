"use client";

import {
  MessageCircle,
  Rocket,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { FeatureLink } from "@/components/custom/feature-link";
import {
  Timeline as TimelineLayout,
  TimelineStep,
} from "@/components/custom/timeline";

import { TelegramPreviewCard } from "./telegram-preview-card";

const STEPS = [
  {
    key: "joinCommunity",
    icon: Users,
    media: <TelegramPreviewCard />,
  },
  {
    key: "registerBitget",
    icon: UserPlus,
    media: (
      <Image
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
        width={400}
        height={500}
        alt=""
        className="object-contain dark:invert"
      />
    ),
    reverse: true,
  },
  {
    key: "kycDeposit",
    icon: ShieldCheck,
    media: (
      <Image
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
        width={400}
        height={500}
        alt=""
        className="object-contain dark:invert"
      />
    ),
  },
  {
    key: "contactAdmin",
    icon: MessageCircle,
    media: (
      <Image
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
        width={400}
        height={500}
        alt=""
        className="object-contain dark:invert"
      />
    ),
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
          media={item.media}
          title={t(`steps.${item.key}.title`)}
          description={t(`steps.${item.key}.description`)}
          reverse={item.reverse}
        >
          {item.key === "joinCommunity" && (
            <FeatureLink
              href="https://t.me/kaiyncapital"
              label={t("steps.joinCommunity.cta.label")}
              color="#2AABEE"
            />
          )}
        </TimelineStep>
      ))}
    </TimelineLayout>
  );
};

export { Timeline };
