export type TaskStatus = "NOT_DONE" | "COMPLETED" | "OVERDUE";

export interface Task {
  id: string;
  name: string;
  note?: string;
  category: string[];
  is_important: boolean;
  is_urgent: boolean;
  deadline: Date;
  status: TaskStatus;
  created_at: Date;
  completed_at?: Date;

  user_id: string;
  user?: User;
  subtasks?: Subtask[];
  reminder?: Reminder | null;
}

export interface CreateTaskData {
  name: string;
  note?: string;
  category: string[];
  is_important: boolean;
  is_urgent: boolean;
  deadline: Date;
  subtasks: Subtask[];
}

export interface Reminder {
  id: string;
  time: Date;
  created_at: Date;

  task_id: string;
  task?: Task;
}

export interface Notification {
  id: string;
  content: string;
  created_at: Date;
  is_checked: boolean;

  user_id?: string | null;
  user?: User | null;
}

export interface Subtask {
  id: string;
  name: string;
  is_completed: boolean;
  created_at?: Date;

  task_id?: string;
  task?: Task;
}

export interface DailyTaskRecord {
  date: Date;
  tasks: Task[];

  user_id: string;
  user?: User;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  level_required: number;

  users?: User[];
}

export interface Level {
  id: string;
  name: string;
  xp_required: number;

  users?: User[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  xp: number;
  streaks: number;
  last_login?: Date | null;

  levelId?: string | null;
  level?: Level | null;

  tasks?: Task[];
  badges?: Badge[];
  notifications?: Notification[];
  daily_task_record?: DailyTaskRecord[];
}
export interface SignInData {
  email: string;
  password: string;
}
export interface SignUpData {
  email: string;
  password: string;
  confirm_password: string;
}
export type FilterType = "all" | "active" | "completed" | "today" | "week";
export type ViewType = "dashboard" | "matrix" | "analytics" | "profile";
