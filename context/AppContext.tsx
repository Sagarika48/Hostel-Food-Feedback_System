import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { User, Student, WeeklyMenu, Feedback, BadFoodReport, DayOfWeek } from '../types';
import { ADMIN_EMAIL, FIXED_PASSWORD } from '../constants';

// Data Generation
const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Saanvi', 'Aanya', 'Aadhya', 'Aaradhya', 'Ananya', 'Pari', 'Anika', 'Navya', 'Diya', 'Myra', 'Advik', 'Kabir', 'Ansh', 'Ryan', 'Zoya', 'Siya', 'Riya', 'Ishita', 'Prisha', 'Kiara'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Patel', 'Reddy', 'Mehta', 'Shah', 'Jain', 'Chopra', 'Malhotra', 'Kapoor', 'Das', 'Roy'];

const generateStudents = (count: number): Student[] => {
  const students: Student[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    students.push({
      id: `stud${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}${i + 1}@student.com`,
      role: 'student',
    });
  }
  return students;
};

// Initial Data
const initialStudents: Student[] = generateStudents(90);

const initialMenu: WeeklyMenu = {
  Sunday: {
    breakfast: [{ id: 'sun-b1', name: 'Aloo Paratha with curd and pickle' }],
    lunch: [
      { id: 'sun-l1', name: 'Malai Kofta (or Paneer Butter Masala)' },
      { id: 'sun-l2', name: 'Rice' },
      { id: 'sun-l3', name: 'Roti' },
      { id: 'sun-l4', name: 'Salad' },
      { id: 'sun-l5', name: 'Raita' },
    ],
    dinner: [
      { id: 'sun-d1', name: 'Vegetable Pulao' },
      { id: 'sun-d2', name: 'Raita' },
      { id: 'sun-d3', name: 'light dessert (e.g., kheer or fruit)' },
    ],
  },
  Monday: {
    breakfast: [
        { id: 'mon-b1', name: 'Poha with peanuts' }, 
        { id: 'mon-b2', name: 'boiled eggs' }, 
        { id: 'mon-b3', name: 'milk' }],
    lunch: [
        { id: 'mon-l1', name: 'Rajma Chawal' }, 
        { id: 'mon-l2', name: 'Mixed Vegetable Sabzi' }, 
        { id: 'mon-l3', name: 'Roti' }, 
        { id: 'mon-l4', name: 'Salad' }],
    dinner: [
        { id: 'mon-d1', name: 'Dal Makhani' }, 
        { id: 'mon-d2', name: 'Seasonal Vegetable Curry' }, 
        { id: 'mon-d3', name: 'Roti' }]
  },
  Tuesday: {
    breakfast: [
        { id: 'tue-b1', name: 'Upma with coconut chutney' }, 
        { id: 'tue-b2', name: 'banana' }],
    lunch: [
        { id: 'tue-l1', name: 'Dal Fry' }, 
        { id: 'tue-l2', name: 'Rice' }, 
        { id: 'tue-l3', name: 'Vegetable Sabzi' }, 
        { id: 'tue-l4', name: 'Roti' }, 
        { id: 'tue-l5', name: 'Cucumber Raita' }],
    dinner: [
        { id: 'tue-d1', name: 'Paneer Curry (or Fish for non-veg option)' }, 
        { id: 'tue-d2', name: 'Rice' }, 
        { id: 'tue-d3', name: 'Roti' }]
  },
  Wednesday: {
    breakfast: [{ id: 'wed-b1', name: 'Stuffed Paratha with curd and pickle' }],
    lunch: [
        { id: 'wed-l1', name: 'Chole' }, 
        { id: 'wed-l2', name: 'Rice' }, 
        { id: 'wed-l3', name: 'Roti' }, 
        { id: 'wed-l4', name: 'Salad' }],
    dinner: [
        { id: 'wed-d1', name: 'Egg Curry (or Mixed Vegetable Curry)' }, 
        { id: 'wed-d2', name: 'Roti' }, 
        { id: 'wed-d3', name: 'Rice' }, 
        { id: 'wed-d4', name: 'Boondi Raita' }]
  },
  Thursday: {
    breakfast: [
        { id: 'thu-b1', name: 'Idli with Sambar and coconut chutney' }, 
        { id: 'thu-b2', name: 'fresh juice' }],
    lunch: [
        { id: 'thu-l1', name: 'Dal Tadka' }, 
        { id: 'thu-l2', name: 'Rice' }, 
        { id: 'thu-l3', name: 'Bhindi Masala (or other sabzi)' }, 
        { id: 'thu-l4', name: 'Roti' }, 
        { id: 'thu-l5', name: 'Salad' }],
    dinner: [
        { id: 'thu-d1', name: 'Paneer Butter Masala (or Mutton curry)' }, 
        { id: 'thu-d2', name: 'Jeera Rice' }, 
        { id: 'thu-d3', name: 'Roti' }]
  },
  Friday: {
    breakfast: [
        { id: 'fri-b1', name: 'Dosa (with potato filling)' }, 
        { id: 'fri-b2', name: 'Sambar' }, 
        { id: 'fri-b3', name: 'chutney' }],
    lunch: [
        { id: 'fri-l1', name: 'Kadhi Pakora' }, 
        { id: 'fri-l2', name: 'Rice' }, 
        { id: 'fri-l3', name: 'Roti' }, 
        { id: 'fri-l4', name: 'Salad' }],
    dinner: [
        { id: 'fri-d1', name: 'Vegetable Biryani (or Chicken Biryani)' }, 
        { id: 'fri-d2', name: 'Raita' }, 
        { id: 'fri-d3', name: 'Salad' }]
  },
  Saturday: {
    breakfast: [
        { id: 'sat-b1', name: 'Upma with curd' }, 
        { id: 'sat-b2', name: 'banana' }],
    lunch: [
        { id: 'sat-l1', name: 'Vegetable Pulao' }, 
        { id: 'sat-l2', name: 'Dal Makhani' }, 
        { id: 'sat-l3', name: 'Roti' }, 
        { id: 'sat-l4', name: 'Salad' }],
    dinner: [
        { id: 'sat-d1', name: 'Palak Paneer (or Prawn Curry)' }, 
        { id: 'sat-d2', name: 'Rice' }, 
        { id: 'sat-d3', name: 'Roti' }, 
        { id: 'sat-d4', name: 'Carrot Raita' }]
  },
} as WeeklyMenu;


interface AppContextType {
  user: User | null;
  students: Student[];
  menu: WeeklyMenu;
  feedback: Feedback[];
  badFoodReports: BadFoodReport[];
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  addStudent: (name: string, email: string) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
  updateMenu: (newMenu: WeeklyMenu) => void;
  submitFeedback: (feedback: Omit<Feedback, 'id'>) => void;
  submitBadFoodReport: (report: Omit<BadFoodReport, 'id'>) => void;
  setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [students, setStudents] = useLocalStorage<Student[]>('students', initialStudents);
  const [menu, setMenu] = useLocalStorage<WeeklyMenu>('menu', initialMenu);
  const [feedback, setFeedback] = useLocalStorage<Feedback[]>('feedback', []);
  const [badFoodReports, setBadFoodReports] = useLocalStorage<BadFoodReport[]>('badFoodReports', []);

  const login = (email: string, pass: string): boolean => {
    if (pass !== FIXED_PASSWORD) return false;
    
    if (email.toLowerCase() === ADMIN_EMAIL) {
      const adminUser: User = { id: 'admin01', email: ADMIN_EMAIL, name: 'Admin', role: 'admin' };
      setUser(adminUser);
      return true;
    }
    
    const foundStudent = students.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (foundStudent) {
      setUser(foundStudent);
      return true;
    }
    
    return false;
  };

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const addStudent = (name: string, email: string) => {
    const newStudent: Student = {
      id: `stud${Date.now()}`,
      name,
      email,
      role: 'student'
    };
    setStudents([...students, newStudent]);
  };
  
  const updateStudent = (updatedStudent: Student) => {
      setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };
  
  const deleteStudent = (studentId: string) => {
      setStudents(students.filter(s => s.id !== studentId));
  };

  const updateMenu = (newMenu: WeeklyMenu) => {
    setMenu(newMenu);
  };
  
  const submitFeedback = (newFeedback: Omit<Feedback, 'id'>) => {
      // Remove any existing feedback for the same student, date, and meal
      setFeedback((prevFeedback: Feedback[]) => {
        const filtered = prevFeedback.filter((f: Feedback) =>
          !(f.studentId === newFeedback.studentId && f.date === newFeedback.date && f.meal === newFeedback.meal)
        );
        const fullFeedback: Feedback = { ...newFeedback, id: `fb${Date.now()}` };
        return [...filtered, fullFeedback];
      });
  };
  
  const submitBadFoodReport = (newReport: Omit<BadFoodReport, 'id'>) => {
      const fullReport: BadFoodReport = { ...newReport, id: `report${Date.now()}` };
      setBadFoodReports([...badFoodReports, fullReport]);
  };

  return (
    <AppContext.Provider value={{ user, students, menu, feedback, badFoodReports, login, logout, addStudent, updateStudent, deleteStudent, updateMenu, submitFeedback, submitBadFoodReport, setFeedback }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};