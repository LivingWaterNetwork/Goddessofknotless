import type { VerificationStatus } from "./types";
import { business } from "./business";

/**
 * The team.
 *
 * One real person, and reserved seats for the braiders Esther intends to bring
 * in. The reserved seats are **deliberately anonymous**: a "Meet the team" page
 * carrying invented names, invented bios, or stock portraits presented as staff
 * would be a fabrication about who touches a client's hair, on a site whose
 * entire proposition is that the same pair of hands does the work every time.
 *
 * The content gate enforces it: a member that is not `verified` must have a
 * null name, a null bio and a null portrait. There is no way to ship a
 * plausible-looking colleague who does not exist.
 */
export interface TeamMember {
  id: string;
  /** Null for a seat that is reserved but unfilled. Never a placeholder name. */
  name: string | null;
  role: string;
  /** Null until a real person writes one. */
  bio: string | null;
  /** Null until a real portrait with permission exists. */
  portraitSrc: string | null;
  /** What this person is trained and cleared to do. */
  focus: string[];
  status: VerificationStatus;
  sourceNote: string;
}

const SEAT_SRC =
  "Reserved seat, not a person. Esther intends to bring other braiders into the studio; nobody has been hired, named, or confirmed. Relayed by the reviewer, 2026-08-23.";

export const team: TeamMember[] = [
  {
    id: "esther-parkman",
    name: business.founder,
    role: "Founder and braider",
    bio:
      "Self-taught in 2020 after going from stylist to stylist and finding that nobody did it the same way twice. Every appointment at the studio is currently hers, start to finish.",
    portraitSrc: null,
    focus: ["All nine braid-count sizes", "Classic and boho finishes", "Every appointment, today"],
    status: "verified",
    sourceNote: "Esther, 2026-08-20 strategy call.",
  },
  {
    id: "seat-braider-2",
    name: null,
    role: "Braider",
    bio: null,
    portraitSrc: null,
    focus: ["Trained to the studio's parting standard", "Knotless sizes only"],
    status: "placeholder",
    sourceNote: SEAT_SRC,
  },
  {
    id: "seat-braider-3",
    name: null,
    role: "Braider",
    bio: null,
    portraitSrc: null,
    focus: ["Trained to the studio's parting standard", "Knotless sizes only"],
    status: "placeholder",
    sourceNote: SEAT_SRC,
  },
];

/** Only real, confirmed people. */
export const publishableTeam = team.filter(
  (m) => m.status === "verified" && m.name !== null,
);

/** Seats that exist as structure, not as staff. */
export const reservedSeats = team.filter((m) => m.name === null);

/**
 * The standard any future braider has to meet before appearing above. Written
 * as the client's guarantee rather than as an internal hiring note, because it
 * is the answer to the only question that matters when a studio grows: "will
 * it still be the same?"
 */
export const teamStandard = {
  headline: "A second pair of hands has to produce the first pair's result.",
  body:
    "Everything that makes the work repeatable is written down — the nine sizes, the price by length, the appointment window, the parting discipline, the tension. That is what makes it teachable, and it is the only basis on which anyone else braids here.",
  status: "needs-confirmation" as VerificationStatus,
  sourceNote:
    "Growth intent relayed by the reviewer, 2026-08-23. Esther must confirm the standard she wants stated publicly.",
};
