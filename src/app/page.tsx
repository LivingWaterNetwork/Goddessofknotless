import { Hero } from "@/components/sections/Hero";
import { HairTimePrivacy } from "@/components/sections/HairTimePrivacy";
import { SignatureSizes } from "@/components/sections/SignatureSizes";
import { WhatToExpect } from "@/components/sections/WhatToExpect";
import { ProofTeaser } from "@/components/sections/ProofTeaser";
import { FounderStory } from "@/components/sections/FounderStory";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ReferralBar } from "@/components/sections/ReferralBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ReferralBar />
      <HairTimePrivacy />
      <SignatureSizes />
      <WhatToExpect />
      <ProofTeaser />
      <FounderStory />
      <FaqTeaser />
      <ClosingCta />
    </>
  );
}
