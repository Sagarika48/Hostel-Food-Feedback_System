
export interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
  name: string;
}

export interface Student extends User {
  role: 'student';
}

export interface Admin extends User {
  role: 'admin';
}

export interface MenuItem {
  id: string;
  name: string;
}

export interface DailyMenu {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type WeeklyMenu = Record<DayOfWeek, DailyMenu>;

export interface FeedbackItem {
  menuItemId: string;
  rating: number; // 1-5
}

export interface Feedback {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  meal: 'breakfast' | 'lunch' | 'dinner';
  items: FeedbackItem[];
  comment: string;
}

export interface BadFoodReport {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  message: string;
}
