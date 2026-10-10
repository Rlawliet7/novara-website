import {
  Globe, Database, Bot, PenTool, Contact, Briefcase, ClipboardList,
  CalendarCheck, Workflow, Rocket, Target, Puzzle, ListChecks,
  TrendingUp, Handshake, Circle, type LucideProps,
} from "lucide-react";

const icons = {
  Globe, Database, Bot, PenTool, IdCard: Contact, Briefcase, ClipboardList,
  CalendarCheck, Workflow, Rocket, Target, Puzzle, ListChecks, TrendingUp, Handshake,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as IconName] ?? Circle;
  return <Cmp aria-hidden="true" {...props} />;
}