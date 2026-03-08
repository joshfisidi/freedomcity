import type { LucideIcon } from "lucide-react";
import {
  BanknoteArrowDown,
  ClipboardList,
  FileCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const orgProfile = {
  name: "Freedom City Outreach",
  location: "Baltimore, Maryland",
  mission: "Coordinate donations, volunteers, and neighborhood services from one operational hub.",
};

export const landingHighlights = [
  "Internal dashboards for program, finance, and volunteer teams",
  "Supabase-backed authentication for staff accounts created by the organization",
  "Mobile-first navigation for field staff and coordinators",
];

export const overviewCards: Array<{
  title: string;
  value: string;
  change: string;
  detail: string;
  trend: number[];
  icon: LucideIcon;
}> = [
  {
    title: "Monthly giving",
    value: "$84.2k",
    change: "+14%",
    detail: "Recurring gifts now cover 61% of April operating needs.",
    trend: [10, 18, 13, 26, 22, 31, 29],
    icon: BanknoteArrowDown,
  },
  {
    title: "Families served",
    value: "412",
    change: "+9%",
    detail: "Pantry and housing support combined across all active programs.",
    trend: [8, 12, 14, 18, 24, 28, 33],
    icon: HeartHandshake,
  },
  {
    title: "Volunteer coverage",
    value: "87%",
    change: "6 gaps",
    detail: "Weekend food distribution still needs two drivers and four greeters.",
    trend: [18, 16, 19, 21, 20, 26, 29],
    icon: Users,
  },
  {
    title: "Compliance queue",
    value: "11",
    change: "3 urgent",
    detail: "Pending approvals across grant uploads, receipts, and partner contracts.",
    trend: [28, 20, 18, 16, 14, 12, 11],
    icon: ShieldCheck,
  },
];

export const checklist = [
  { title: "Verify donation receipt wording", done: true },
  { title: "Assign pantry captains for Saturday shift", done: false },
  { title: "Review March grant reimbursement packet", done: false },
  { title: "Confirm April board meeting agenda", done: true },
  { title: "Approve three new volunteer accounts", done: false },
];

export const boardColumns = [
  {
    title: "Intake",
    count: 4,
    accent: "from-amber-300/80 to-orange-400/70",
    items: [
      {
        title: "School supply drive intake",
        meta: "Operations",
        detail: "Needs pickup routing and sponsor confirmation.",
      },
      {
        title: "New staff account requests",
        meta: "Admin",
        detail: "Three coordinators added by HQ this morning.",
      },
    ],
  },
  {
    title: "In review",
    count: 5,
    accent: "from-sky-300/80 to-cyan-400/70",
    items: [
      {
        title: "Quarterly grant narrative",
        meta: "Development",
        detail: "Waiting on program numbers from housing services.",
      },
      {
        title: "Vehicle insurance renewal",
        meta: "Finance",
        detail: "Risk review scheduled with broker at 2:30 PM.",
      },
    ],
  },
  {
    title: "Scheduled",
    count: 6,
    accent: "from-emerald-300/80 to-teal-400/70",
    items: [
      {
        title: "Community kitchen volunteer call",
        meta: "Volunteer",
        detail: "Thursday 7:00 PM reminder text queued.",
      },
      {
        title: "Shelter partner reconciliation",
        meta: "Programs",
        detail: "Automated exports prepared for Friday review.",
      },
    ],
  },
  {
    title: "Completed",
    count: 9,
    accent: "from-violet-300/80 to-fuchsia-400/70",
    items: [
      {
        title: "Board packet uploaded",
        meta: "Executive",
        detail: "Shared with trustees and archived to donor folder.",
      },
      {
        title: "Weekend pantry receipts reconciled",
        meta: "Finance",
        detail: "All 17 cash expenses marked and attached.",
      },
    ],
  },
];

export const recentActivity = [
  {
    title: "Tanya Brooks completed housing intake review",
    time: "12 minutes ago",
    tag: "Programs",
  },
  {
    title: "Recurring donor import synced 14 updated payment methods",
    time: "36 minutes ago",
    tag: "Development",
  },
  {
    title: "Board chair approved emergency grant response language",
    time: "1 hour ago",
    tag: "Executive",
  },
  {
    title: "Four volunteer badges issued for Saturday distribution",
    time: "2 hours ago",
    tag: "Volunteer",
  },
];

export const upcomingMoments = [
  {
    title: "Pantry shift check-in",
    time: "8:00 AM",
    summary: "28 volunteers, 3 route vans, 480 food boxes.",
  },
  {
    title: "Grant reimbursement review",
    time: "11:30 AM",
    summary: "Finance plus program leads in the admin office.",
  },
  {
    title: "Partner church intake",
    time: "4:15 PM",
    summary: "Review referrals, housing capacity, and case notes.",
  },
];

export const teamRoster = [
  { name: "Maya Daniels", role: "Executive Director", status: "In office" },
  { name: "Jordan Price", role: "Volunteer Lead", status: "On site" },
  { name: "Naomi Clark", role: "Development Manager", status: "Reviewing grants" },
  { name: "Elias Green", role: "Programs Coordinator", status: "Field visit" },
];

export const programCards = [
  {
    title: "Food Access",
    figure: "480 boxes",
    summary: "This week's pantry prep is on target, but van capacity remains tight.",
  },
  {
    title: "Housing Stabilization",
    figure: "63 active cases",
    summary: "Five renewals need landlord signatures before Wednesday morning.",
  },
  {
    title: "Youth Support",
    figure: "92 students",
    summary: "Tutoring attendance rose after the new SMS reminder sequence.",
  },
];

export const appSections = [
  {
    title: "Operations board",
    description: "A lightweight kanban for mission-critical work across finance, volunteer, and program teams.",
    icon: ClipboardList,
  },
  {
    title: "Compliance lane",
    description: "Keep approvals, receipts, and grant packets visible instead of buried in email.",
    icon: FileCheck,
  },
  {
    title: "Onboarding rhythm",
    description: "Borrow Houdini's checklist-first dashboard pattern to help new staff get productive quickly.",
    icon: Sparkles,
  },
];

