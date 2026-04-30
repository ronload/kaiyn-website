"use client";

import { AvatarCircles } from "@/components/ui/avatar-circles";

const avatars = [
  { imageUrl: "/img/avatars/avatar-1.jpg", profileUrl: "#" },
  { imageUrl: "/img/avatars/avatar-2.jpg", profileUrl: "#" },
  { imageUrl: "/img/avatars/avatar-3.jpg", profileUrl: "#" },
  { imageUrl: "/img/avatars/avatar-4.jpg", profileUrl: "#" },
  { imageUrl: "/img/avatars/avatar-5.jpg", profileUrl: "#" },
];

export function CommunityAvatars() {
  return (
    <div className="light">
      <AvatarCircles
        avatarUrls={avatars}
        numPeople={99}
        className="[&_img]:border-0 [&>a:last-child]:border-0 [&>a:last-child]:bg-white/20 [&>a:last-child]:backdrop-blur-md [&>a:last-child]:hover:bg-white/30"
      />
    </div>
  );
}
