"use client";

import ProfileCard from "@/components/profile-card/ProfileCard";
import { site } from "@/lib/content";

const INNER = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)" as const;
const ICON_PATTERN = "/team/profile-card-pattern.svg";

const contact = () => {
  window.location.href = `mailto:${site.email}`;
};

export default function AboutTeam() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 sm:flex-row sm:justify-center sm:gap-14 lg:gap-24">
      <ProfileCard
        name="Affan Syed"
        title="Creative Director"
        handle="affansyed"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/team/affan.png"
        iconUrl={ICON_PATTERN}
        showUserInfo={false}
        onContactClick={contact}
        behindGlowEnabled
        behindGlowColor="rgba(125, 190, 255, 0.67)"
        innerGradient={INNER}
        className="w-full max-w-[250px] [&_.pc-card]:!aspect-[0.56] [&_.pc-details_h3]:!text-[1.75rem] [&_.pc-card]:!h-auto [&_.pc-card]:!max-h-none"
      />
      <ProfileCard
        name="Ashal Syed"
        title="Design Director"
        handle="ashalsyed"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/team/ashal.png"
        iconUrl={ICON_PATTERN}
        showUserInfo={false}
        onContactClick={contact}
        behindGlowEnabled
        behindGlowColor="rgba(125, 190, 255, 0.67)"
        innerGradient={INNER}
        className="w-full max-w-[250px] [&_.pc-card]:!aspect-[0.56] [&_.pc-details_h3]:!text-[1.75rem] [&_.pc-card]:!h-auto [&_.pc-card]:!max-h-none"
      />
      <ProfileCard
        name="Asher Sadiq"
        title="Marketing Director"
        handle="ashersadiq"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/team/asher.png"
        iconUrl={ICON_PATTERN}
        showUserInfo={false}
        onContactClick={contact}
        behindGlowEnabled
        behindGlowColor="rgba(125, 190, 255, 0.67)"
        innerGradient={INNER}
        className="w-full max-w-[250px] [&_.pc-card]:!aspect-[0.56] [&_.pc-details_h3]:!text-[1.75rem] [&_.pc-card]:!h-auto [&_.pc-card]:!max-h-none"
      />
    </div>
  );
}
