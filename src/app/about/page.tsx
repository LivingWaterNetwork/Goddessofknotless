import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { WhatsNext } from "@/components/sections/WhatsNext";
import { business } from "@/content/business";
import { founderImageAbout } from "@/content/placeholder-images";
import { metadataForRoute } from "@/lib/page-metadata";

export const metadata: Metadata = metadataForRoute("/about");

export default function AboutPage() {
  return (
    <>
      <PageHeader
        overline="About"
        title="Born from a search for better. Built by trust."
        lede={`${business.founder} taught herself to braid in ${business.foundedYear}. Almost every client since has arrived because another client sent them.`}
      />

      <Section tone="ivory">
        <div className="container-page about-inner">
          <div className="about-copy prose-body t-body t-muted measure">
            <p className="about-lede">
              Esther started out as the client, not the stylist — and the reason she learned to
              braid is the reason the studio works the way it does now.
            </p>
            <p className="about-drop-cap">
              In {business.foundedYear} she went looking for someone who could do her hair the same
              way twice. She did not find one. The parts moved between appointments. Stylists ran
              late, or broke off mid-braid. The finish was different every time. None of it was
              catastrophic; all of it was the kind of small unreliability that makes you dread an
              appointment you are paying real money for.
            </p>
            <p>
              So she taught herself, practising first on her sister. Someone asked who had done it.
              Then someone else. Within months it had stopped being a hobby — not because she
              planned a business, but because people kept asking. She has been braiding ever since.
            </p>
            <p>
              That origin still sets the standard. Everything clients told Esther they were missing
              elsewhere is what the studio now guarantees: parts that sit in the same place every
              visit, an appointment that runs the length it was quoted, a hand that stays gentle
              through hour six, and a room where nothing said in it goes anywhere else.
            </p>
            <p>
              She braids knotless styles only. Nine sizes, classic or boho, and nothing else on the
              menu. Doing one thing is what makes it consistent — and consistency is what makes a
              client comfortable enough to put her own name behind a referral.
            </p>
          </div>

          <aside className="about-media">
            <ImageFrame
              src={founderImageAbout.src}
              alt={`Stock placeholder photograph, not Esther's work — ${founderImageAbout.alt}`}
              width={founderImageAbout.width}
              height={founderImageAbout.height}
              status="placeholder"
              frame="gold"
              sizes="(min-width: 64rem) 34vw, 100vw"
            />
            <div className="about-facts">
              <dl>
                <div>
                  <dt className="t-label">Founded</dt>
                  <dd>{business.foundedYear}, self-taught</dd>
                </div>
                <div>
                  <dt className="t-label">Studio</dt>
                  <dd>
                    {business.neighborhood.value}, {business.city.value}
                  </dd>
                </div>
                <div>
                  <dt className="t-label">Focus</dt>
                  <dd>Knotless braids only</dd>
                </div>
                <div>
                  <dt className="t-label">Grown by</dt>
                  <dd>Client referral</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="emerald" className="standard-section">
        <div className="container-page standard-inner">
          <SectionHeading
            overline="The Standard"
            title={
              <>
                The first name a client gives
                <br />
                when a friend asks who to trust with her hair.
              </>
            }
            lede="That is the whole ambition. Not the biggest studio, not the loudest one — the one that gets recommended by name."
            align="center"
          />
          <div className="rule-foil rule-foil-center standard-rule" />
        </div>
      </Section>

      <WhatsNext />

      <ClosingCta />
    </>
  );
}
