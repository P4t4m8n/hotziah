import {
  ArticleSvg,
  ForumSvg,
  QuestionnaireSvg,
  TherapistSvg,
} from "@/ui/Icons/Svgs";
import { INavLinksProps } from "../models/app.model";

export const APP_LINKS: INavLinksProps[] = [
  {
    text: "ARTICLES",
    link: "/article",
    svg: <ArticleSvg />,
    linkStyle:
      "items-center flex flex-col w-26  h-12 text-xs font-semibold after-border-grow",
  },
  {
    text: "FORUMS",
    link: "/forum",
    svg: <ForumSvg />,
    linkStyle:
      "items-center flex flex-col w-26  h-12 text-xs font-semibold after-border-grow",
  },
  {
    text: "QUESTIONNAIRES",
    link: "/questionnaire",
    svg: <QuestionnaireSvg />,
    linkStyle:
      "items-center flex flex-col w-26  h-12 text-xs font-semibold after-border-grow",
  },
  {
    text: "THERAPISTS",
    link: "/therapist",
    svg: <TherapistSvg />,
    linkStyle:
      "items-center flex flex-col w-26  h-12 text-xs font-semibold after-border-grow",
  },
];

export const ADMIN_DASHBOARD_LINKS = [
  {
    link: "/admin/user",
    text: "Users Dashboard",
    linkStyle: "after-border-grow font-semibold text-font-size-sm",
  },
  {
    link: "/admin/therapist",
    text: "Therapists Dashboard",
    linkStyle: "after-border-grow font-semibold text-font-size-sm",
  },
  {
    link: "/admin/article",
    text: "Articles Dashboard",
    linkStyle: "after-border-grow font-semibold text-font-size-sm",
  },
  {
    link: "/admin/forum",
    text: "Forum Dashboard",
    linkStyle: "after-border-grow font-semibold text-font-size-sm",
  },
  {
    link: "/admin/questionnaire",
    text: "Questionnaires Dashboard",
    linkStyle: "after-border-grow font-semibold text-font-size-sm",
  },
];
