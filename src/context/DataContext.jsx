import { createContext, useContext, useState, useCallback } from 'react';
import {
  students as initialStudents,
  courses as initialCourses,
  enrollments as initialEnrollments,
  assessments as initialAssessments,
  scores as initialScores,
  getEnrollmentsByStudent,
  getStudentsByCourse,
  getStudentScores,
  getCourseAssessments,
  getScoresByAssessment,
  calculateWeightedTotal,
  getPassStatus,
  getTopStudents,
  getAverageByType,
  getOverallStats,
} from '../data/mockData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [studentsData, setStudents] = useState(initialStudents);
  const [coursesData, setCourses] = useState(initialCourses);
  const [enrollmentsData, setEnrollments] = useState(initialEnrollments);
  const [assessmentsData, setAssessments] = useState(initialAssessments);
  const [scoresData, setScores] = useState(initialScores);

  // ─── CRUD: Students ─────────────────────────
  const addStudent = useCallback((student) => {
    const newId = Math.max(...studentsData.map(s => s.id), 0) + 1;
    setStudents(prev => [...prev, { ...student, id: newId }]);
  }, [studentsData]);

  const updateStudent = useCallback((id, updates) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setEnrollments(prev => prev.filter(e => e.student_id !== id));
    setScores(prev => prev.filter(s => s.student_id !== id));
  }, []);

  // ─── CRUD: Courses ──────────────────────────
  const addCourse = useCallback((course) => {
    const newId = Math.max(...coursesData.map(c => c.id), 0) + 1;
    setCourses(prev => [...prev, { ...course, id: newId }]);
  }, [coursesData]);

  const updateCourse = useCallback((id, updates) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCourse = useCallback((id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setEnrollments(prev => prev.filter(e => e.course_id !== id));
    setAssessments(prev => prev.filter(a => a.course_id !== id));
  }, []);

  // ─── CRUD: Assessments ──────────────────────
  const addAssessment = useCallback((assessment) => {
    const newId = Math.max(...assessmentsData.map(a => a.id), 0) + 1;
    setAssessments(prev => [...prev, { ...assessment, id: newId }]);
  }, [assessmentsData]);

  const updateAssessment = useCallback((id, updates) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const deleteAssessment = useCallback((id) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
    setScores(prev => prev.filter(s => s.assessment_id !== id));
  }, []);

  const value = {
    // Data
    students: studentsData,
    courses: coursesData,
    enrollments: enrollmentsData,
    assessments: assessmentsData,
    scores: scoresData,
    // CRUD
    addStudent, updateStudent, deleteStudent,
    addCourse, updateCourse, deleteCourse,
    addAssessment, updateAssessment, deleteAssessment,
    // Queries (these still read from the initial imported arrays for now)
    getEnrollmentsByStudent,
    getStudentsByCourse,
    getStudentScores,
    getCourseAssessments,
    getScoresByAssessment,
    calculateWeightedTotal,
    getPassStatus,
    getTopStudents,
    getAverageByType,
    getOverallStats,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
}
