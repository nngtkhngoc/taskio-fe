/* eslint-disable prefer-const */
import type { CreateTaskData } from "@/types";

export function generateTaskFromText(input: string): CreateTaskData {
  const now = new Date();
  let deadline = now;
  let is_urgent = false;
  let is_important = false;

  const lower = input.toLowerCase();

  if (lower.includes("tomorrow")) {
    deadline = new Date(now);
    deadline.setDate(now.getDate() + 1);
  } else if (lower.includes("today")) {
    deadline.setDate(now.getDate() - 1);
    is_urgent = true;
  } else if (lower.includes("next week")) {
    deadline = new Date(now);
    deadline.setDate(now.getDate() + 7);
  }

  if (
    lower.includes("urgent") ||
    lower.includes("asap") ||
    lower.includes("now")
  ) {
    is_urgent = true;
  }

  if (
    lower.includes("important") ||
    lower.includes("must") ||
    lower.includes("need")
  ) {
    is_important = true;
  }

  let name = input
    .replace(
      /\b(tomorrow|today|next week|urgent|asap|important|must|need)\b/gi,
      ""
    )
    .trim();

  return {
    name,
    note: undefined,
    category: ["Other"],
    is_important,
    is_urgent,
    deadline,
    subtasks: [],
  };
}
