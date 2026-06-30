// ─── Students ────────────────────────────────────────────
export const students = [
  { id: 1, student_number: 'STU-2024-001', first_name: 'Aarav', last_name: 'Sharma', email: 'aarav.sharma@university.edu', phone: '9876543210', dob: '2003-05-14', gender: 'Male', department: 'Computer Science' },
  { id: 2, student_number: 'STU-2024-002', first_name: 'Priya', last_name: 'Patel', email: 'priya.patel@university.edu', phone: '9876543211', dob: '2003-08-22', gender: 'Female', department: 'Computer Science' },
  { id: 3, student_number: 'STU-2024-003', first_name: 'Rohan', last_name: 'Gupta', email: 'rohan.gupta@university.edu', phone: '9876543212', dob: '2002-12-03', gender: 'Male', department: 'Information Technology' },
  { id: 4, student_number: 'STU-2024-004', first_name: 'Ananya', last_name: 'Singh', email: 'ananya.singh@university.edu', phone: '9876543213', dob: '2003-03-17', gender: 'Female', department: 'Computer Science' },
  { id: 5, student_number: 'STU-2024-005', first_name: 'Vikram', last_name: 'Reddy', email: 'vikram.reddy@university.edu', phone: '9876543214', dob: '2002-09-28', gender: 'Male', department: 'Information Technology' },
  { id: 6, student_number: 'STU-2024-006', first_name: 'Neha', last_name: 'Joshi', email: 'neha.joshi@university.edu', phone: '9876543215', dob: '2003-01-09', gender: 'Female', department: 'Computer Science' },
  { id: 7, student_number: 'STU-2024-007', first_name: 'Arjun', last_name: 'Mehta', email: 'arjun.mehta@university.edu', phone: '9876543216', dob: '2002-11-21', gender: 'Male', department: 'Electronics' },
  { id: 8, student_number: 'STU-2024-008', first_name: 'Kavya', last_name: 'Nair', email: 'kavya.nair@university.edu', phone: '9876543217', dob: '2003-07-04', gender: 'Female', department: 'Information Technology' },
  { id: 9, student_number: 'STU-2024-009', first_name: 'Siddharth', last_name: 'Kumar', email: 'sid.kumar@university.edu', phone: '9876543218', dob: '2002-06-30', gender: 'Male', department: 'Computer Science' },
  { id: 10, student_number: 'STU-2024-010', first_name: 'Ishita', last_name: 'Das', email: 'ishita.das@university.edu', phone: '9876543219', dob: '2003-10-11', gender: 'Female', department: 'Electronics' },
];

// ─── Courses ─────────────────────────────────────────────
export const courses = [
  { id: 1, course_code: 'CS301', name: 'Database Management Systems', credit_hours: 4, semester: 'Fall 2024' },
  { id: 2, course_code: 'CS302', name: 'Data Structures & Algorithms', credit_hours: 4, semester: 'Fall 2024' },
  { id: 3, course_code: 'CS303', name: 'Operating Systems', credit_hours: 3, semester: 'Fall 2024' },
  { id: 4, course_code: 'IT201', name: 'Web Technologies', credit_hours: 3, semester: 'Spring 2025' },
  { id: 5, course_code: 'CS401', name: 'Machine Learning', credit_hours: 4, semester: 'Spring 2025' },
  { id: 6, course_code: 'EC301', name: 'Digital Electronics', credit_hours: 3, semester: 'Fall 2024' },
];

// ─── Enrollments (many-to-many: student ↔ course) ───────
export const enrollments = [
  { id: 1, student_id: 1, course_id: 1 },
  { id: 2, student_id: 1, course_id: 2 },
  { id: 3, student_id: 1, course_id: 3 },
  { id: 4, student_id: 2, course_id: 1 },
  { id: 5, student_id: 2, course_id: 2 },
  { id: 6, student_id: 2, course_id: 5 },
  { id: 7, student_id: 3, course_id: 1 },
  { id: 8, student_id: 3, course_id: 4 },
  { id: 9, student_id: 4, course_id: 1 },
  { id: 10, student_id: 4, course_id: 2 },
  { id: 11, student_id: 4, course_id: 5 },
  { id: 12, student_id: 5, course_id: 4 },
  { id: 13, student_id: 5, course_id: 3 },
  { id: 14, student_id: 6, course_id: 1 },
  { id: 15, student_id: 6, course_id: 2 },
  { id: 16, student_id: 6, course_id: 5 },
  { id: 17, student_id: 7, course_id: 6 },
  { id: 18, student_id: 7, course_id: 3 },
  { id: 19, student_id: 8, course_id: 4 },
  { id: 20, student_id: 8, course_id: 1 },
  { id: 21, student_id: 9, course_id: 1 },
  { id: 22, student_id: 9, course_id: 2 },
  { id: 23, student_id: 9, course_id: 3 },
  { id: 24, student_id: 10, course_id: 6 },
  { id: 25, student_id: 10, course_id: 3 },
];

// ─── Assessments ─────────────────────────────────────────
export const assessments = [
  // DBMS (course 1)
  { id: 1, course_id: 1, title: 'DBMS Mid-Term Exam', type: 'exam', max_score: 100, weight_percent: 30 },
  { id: 2, course_id: 1, title: 'DBMS Final Exam', type: 'exam', max_score: 100, weight_percent: 40 },
  { id: 3, course_id: 1, title: 'SQL Quiz 1', type: 'quiz', max_score: 20, weight_percent: 5 },
  { id: 4, course_id: 1, title: 'Normalization Quiz', type: 'quiz', max_score: 20, weight_percent: 5 },
  { id: 5, course_id: 1, title: 'ER Diagram Assignment', type: 'assignment', max_score: 50, weight_percent: 10 },
  { id: 6, course_id: 1, title: 'SQL Project', type: 'assignment', max_score: 50, weight_percent: 10 },
  // DSA (course 2)
  { id: 7, course_id: 2, title: 'DSA Mid-Term Exam', type: 'exam', max_score: 100, weight_percent: 30 },
  { id: 8, course_id: 2, title: 'DSA Final Exam', type: 'exam', max_score: 100, weight_percent: 40 },
  { id: 9, course_id: 2, title: 'Sorting Algorithms Quiz', type: 'quiz', max_score: 25, weight_percent: 10 },
  { id: 10, course_id: 2, title: 'Linked List Assignment', type: 'assignment', max_score: 50, weight_percent: 20 },
  // OS (course 3)
  { id: 11, course_id: 3, title: 'OS Mid-Term Exam', type: 'exam', max_score: 100, weight_percent: 35 },
  { id: 12, course_id: 3, title: 'OS Final Exam', type: 'exam', max_score: 100, weight_percent: 40 },
  { id: 13, course_id: 3, title: 'Process Scheduling Quiz', type: 'quiz', max_score: 20, weight_percent: 10 },
  { id: 14, course_id: 3, title: 'Shell Scripting Assignment', type: 'assignment', max_score: 50, weight_percent: 15 },
  // Web Tech (course 4)
  { id: 15, course_id: 4, title: 'Web Tech Mid-Term', type: 'exam', max_score: 100, weight_percent: 30 },
  { id: 16, course_id: 4, title: 'Web Tech Final', type: 'exam', max_score: 100, weight_percent: 35 },
  { id: 17, course_id: 4, title: 'HTML/CSS Quiz', type: 'quiz', max_score: 20, weight_percent: 10 },
  { id: 18, course_id: 4, title: 'React Project', type: 'assignment', max_score: 100, weight_percent: 25 },
  // ML (course 5)
  { id: 19, course_id: 5, title: 'ML Mid-Term', type: 'exam', max_score: 100, weight_percent: 25 },
  { id: 20, course_id: 5, title: 'ML Final', type: 'exam', max_score: 100, weight_percent: 35 },
  { id: 21, course_id: 5, title: 'Regression Quiz', type: 'quiz', max_score: 25, weight_percent: 10 },
  { id: 22, course_id: 5, title: 'Classification Project', type: 'assignment', max_score: 100, weight_percent: 30 },
  // Digital Electronics (course 6)
  { id: 23, course_id: 6, title: 'DE Mid-Term', type: 'exam', max_score: 100, weight_percent: 30 },
  { id: 24, course_id: 6, title: 'DE Final', type: 'exam', max_score: 100, weight_percent: 40 },
  { id: 25, course_id: 6, title: 'Logic Gates Quiz', type: 'quiz', max_score: 20, weight_percent: 15 },
  { id: 26, course_id: 6, title: 'Circuit Design Assignment', type: 'assignment', max_score: 50, weight_percent: 15 },
];

// ─── Scores ──────────────────────────────────────────────
export const scores = [
  // Student 1 (Aarav) — enrolled in courses 1, 2, 3
  { id: 1, student_id: 1, assessment_id: 1, score: 82 },
  { id: 2, student_id: 1, assessment_id: 2, score: 78 },
  { id: 3, student_id: 1, assessment_id: 3, score: 18 },
  { id: 4, student_id: 1, assessment_id: 4, score: 16 },
  { id: 5, student_id: 1, assessment_id: 5, score: 42 },
  { id: 6, student_id: 1, assessment_id: 6, score: 45 },
  { id: 7, student_id: 1, assessment_id: 7, score: 75 },
  { id: 8, student_id: 1, assessment_id: 8, score: 80 },
  { id: 9, student_id: 1, assessment_id: 9, score: 20 },
  { id: 10, student_id: 1, assessment_id: 10, score: 40 },
  { id: 11, student_id: 1, assessment_id: 11, score: 70 },
  { id: 12, student_id: 1, assessment_id: 12, score: 65 },
  { id: 13, student_id: 1, assessment_id: 13, score: 15 },
  { id: 14, student_id: 1, assessment_id: 14, score: 38 },

  // Student 2 (Priya) — enrolled in courses 1, 2, 5
  { id: 15, student_id: 2, assessment_id: 1, score: 91 },
  { id: 16, student_id: 2, assessment_id: 2, score: 88 },
  { id: 17, student_id: 2, assessment_id: 3, score: 19 },
  { id: 18, student_id: 2, assessment_id: 4, score: 18 },
  { id: 19, student_id: 2, assessment_id: 5, score: 47 },
  { id: 20, student_id: 2, assessment_id: 6, score: 48 },
  { id: 21, student_id: 2, assessment_id: 7, score: 85 },
  { id: 22, student_id: 2, assessment_id: 8, score: 90 },
  { id: 23, student_id: 2, assessment_id: 9, score: 22 },
  { id: 24, student_id: 2, assessment_id: 10, score: 46 },
  { id: 25, student_id: 2, assessment_id: 19, score: 88 },
  { id: 26, student_id: 2, assessment_id: 20, score: 92 },
  { id: 27, student_id: 2, assessment_id: 21, score: 23 },
  { id: 28, student_id: 2, assessment_id: 22, score: 90 },

  // Student 3 (Rohan) — enrolled in courses 1, 4
  { id: 29, student_id: 3, assessment_id: 1, score: 68 },
  { id: 30, student_id: 3, assessment_id: 2, score: 72 },
  { id: 31, student_id: 3, assessment_id: 3, score: 14 },
  { id: 32, student_id: 3, assessment_id: 4, score: 15 },
  { id: 33, student_id: 3, assessment_id: 5, score: 35 },
  { id: 34, student_id: 3, assessment_id: 6, score: 40 },
  { id: 35, student_id: 3, assessment_id: 15, score: 74 },
  { id: 36, student_id: 3, assessment_id: 16, score: 78 },
  { id: 37, student_id: 3, assessment_id: 17, score: 16 },
  { id: 38, student_id: 3, assessment_id: 18, score: 82 },

  // Student 4 (Ananya) — enrolled in courses 1, 2, 5
  { id: 39, student_id: 4, assessment_id: 1, score: 95 },
  { id: 40, student_id: 4, assessment_id: 2, score: 92 },
  { id: 41, student_id: 4, assessment_id: 3, score: 20 },
  { id: 42, student_id: 4, assessment_id: 4, score: 19 },
  { id: 43, student_id: 4, assessment_id: 5, score: 48 },
  { id: 44, student_id: 4, assessment_id: 6, score: 49 },
  { id: 45, student_id: 4, assessment_id: 7, score: 88 },
  { id: 46, student_id: 4, assessment_id: 8, score: 94 },
  { id: 47, student_id: 4, assessment_id: 9, score: 24 },
  { id: 48, student_id: 4, assessment_id: 10, score: 47 },
  { id: 49, student_id: 4, assessment_id: 19, score: 90 },
  { id: 50, student_id: 4, assessment_id: 20, score: 95 },
  { id: 51, student_id: 4, assessment_id: 21, score: 24 },
  { id: 52, student_id: 4, assessment_id: 22, score: 95 },

  // Student 5 (Vikram) — enrolled in courses 4, 3
  { id: 53, student_id: 5, assessment_id: 15, score: 60 },
  { id: 54, student_id: 5, assessment_id: 16, score: 55 },
  { id: 55, student_id: 5, assessment_id: 17, score: 12 },
  { id: 56, student_id: 5, assessment_id: 18, score: 70 },
  { id: 57, student_id: 5, assessment_id: 11, score: 58 },
  { id: 58, student_id: 5, assessment_id: 12, score: 52 },
  { id: 59, student_id: 5, assessment_id: 13, score: 11 },
  { id: 60, student_id: 5, assessment_id: 14, score: 30 },

  // Student 6 (Neha) — enrolled in courses 1, 2, 5
  { id: 61, student_id: 6, assessment_id: 1, score: 77 },
  { id: 62, student_id: 6, assessment_id: 2, score: 81 },
  { id: 63, student_id: 6, assessment_id: 3, score: 17 },
  { id: 64, student_id: 6, assessment_id: 4, score: 16 },
  { id: 65, student_id: 6, assessment_id: 5, score: 40 },
  { id: 66, student_id: 6, assessment_id: 6, score: 43 },
  { id: 67, student_id: 6, assessment_id: 7, score: 72 },
  { id: 68, student_id: 6, assessment_id: 8, score: 76 },
  { id: 69, student_id: 6, assessment_id: 9, score: 19 },
  { id: 70, student_id: 6, assessment_id: 10, score: 38 },
  { id: 71, student_id: 6, assessment_id: 19, score: 75 },
  { id: 72, student_id: 6, assessment_id: 20, score: 80 },
  { id: 73, student_id: 6, assessment_id: 21, score: 20 },
  { id: 74, student_id: 6, assessment_id: 22, score: 78 },

  // Student 7 (Arjun) — enrolled in courses 6, 3
  { id: 75, student_id: 7, assessment_id: 23, score: 85 },
  { id: 76, student_id: 7, assessment_id: 24, score: 80 },
  { id: 77, student_id: 7, assessment_id: 25, score: 18 },
  { id: 78, student_id: 7, assessment_id: 26, score: 44 },
  { id: 79, student_id: 7, assessment_id: 11, score: 78 },
  { id: 80, student_id: 7, assessment_id: 12, score: 82 },
  { id: 81, student_id: 7, assessment_id: 13, score: 17 },
  { id: 82, student_id: 7, assessment_id: 14, score: 42 },

  // Student 8 (Kavya) — enrolled in courses 4, 1
  { id: 83, student_id: 8, assessment_id: 15, score: 88 },
  { id: 84, student_id: 8, assessment_id: 16, score: 85 },
  { id: 85, student_id: 8, assessment_id: 17, score: 19 },
  { id: 86, student_id: 8, assessment_id: 18, score: 92 },
  { id: 87, student_id: 8, assessment_id: 1, score: 84 },
  { id: 88, student_id: 8, assessment_id: 2, score: 79 },
  { id: 89, student_id: 8, assessment_id: 3, score: 17 },
  { id: 90, student_id: 8, assessment_id: 4, score: 18 },
  { id: 91, student_id: 8, assessment_id: 5, score: 44 },
  { id: 92, student_id: 8, assessment_id: 6, score: 46 },

  // Student 9 (Siddharth) — enrolled in courses 1, 2, 3
  { id: 93, student_id: 9, assessment_id: 1, score: 55 },
  { id: 94, student_id: 9, assessment_id: 2, score: 60 },
  { id: 95, student_id: 9, assessment_id: 3, score: 12 },
  { id: 96, student_id: 9, assessment_id: 4, score: 13 },
  { id: 97, student_id: 9, assessment_id: 5, score: 30 },
  { id: 98, student_id: 9, assessment_id: 6, score: 32 },
  { id: 99, student_id: 9, assessment_id: 7, score: 60 },
  { id: 100, student_id: 9, assessment_id: 8, score: 58 },
  { id: 101, student_id: 9, assessment_id: 9, score: 15 },
  { id: 102, student_id: 9, assessment_id: 10, score: 28 },
  { id: 103, student_id: 9, assessment_id: 11, score: 50 },
  { id: 104, student_id: 9, assessment_id: 12, score: 48 },
  { id: 105, student_id: 9, assessment_id: 13, score: 10 },
  { id: 106, student_id: 9, assessment_id: 14, score: 25 },

  // Student 10 (Ishita) — enrolled in courses 6, 3
  { id: 107, student_id: 10, assessment_id: 23, score: 72 },
  { id: 108, student_id: 10, assessment_id: 24, score: 68 },
  { id: 109, student_id: 10, assessment_id: 25, score: 15 },
  { id: 110, student_id: 10, assessment_id: 26, score: 38 },
  { id: 111, student_id: 10, assessment_id: 11, score: 65 },
  { id: 112, student_id: 10, assessment_id: 12, score: 60 },
  { id: 113, student_id: 10, assessment_id: 13, score: 14 },
  { id: 114, student_id: 10, assessment_id: 14, score: 35 },
];

// ─── Helper Functions ─────────────────────────────────────

/** Get all courses a student is enrolled in */
export function getEnrollmentsByStudent(studentId) {
  const courseIds = enrollments.filter(e => e.student_id === studentId).map(e => e.course_id);
  return courses.filter(c => courseIds.includes(c.id));
}

/** Get all students enrolled in a course */
export function getStudentsByCourse(courseId) {
  const studentIds = enrollments.filter(e => e.course_id === courseId).map(e => e.student_id);
  return students.filter(s => studentIds.includes(s.id));
}

/** Get all scores for a student */
export function getStudentScores(studentId) {
  return scores.filter(s => s.student_id === studentId).map(sc => {
    const assessment = assessments.find(a => a.id === sc.assessment_id);
    const course = courses.find(c => c.id === assessment?.course_id);
    return { ...sc, assessment, course };
  });
}

/** Get all assessments for a course */
export function getCourseAssessments(courseId) {
  return assessments.filter(a => a.course_id === courseId);
}

/** Get all scores for a specific assessment */
export function getScoresByAssessment(assessmentId) {
  return scores.filter(s => s.assessment_id === assessmentId).map(sc => {
    const student = students.find(st => st.id === sc.student_id);
    return { ...sc, student };
  });
}

/** Calculate weighted total for a student in a course (returns 0-100 percentage) */
export function calculateWeightedTotal(studentId, courseId) {
  const courseAssessments = getCourseAssessments(courseId);
  let weightedSum = 0;
  let totalWeight = 0;

  for (const assessment of courseAssessments) {
    const scoreEntry = scores.find(s => s.student_id === studentId && s.assessment_id === assessment.id);
    if (scoreEntry) {
      const pct = (scoreEntry.score / assessment.max_score) * assessment.weight_percent;
      weightedSum += pct;
      totalWeight += assessment.weight_percent;
    }
  }

  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 0;
}

/** Determine pass/fail (>= 40% weighted = pass) */
export function getPassStatus(studentId, courseId) {
  const total = calculateWeightedTotal(studentId, courseId);
  return total >= 40 ? 'Pass' : 'Fail';
}

/** Get top N students in a course by weighted total */
export function getTopStudents(courseId, n = 5) {
  const enrolled = getStudentsByCourse(courseId);
  const ranked = enrolled.map(s => ({
    ...s,
    weightedTotal: calculateWeightedTotal(s.id, courseId),
  })).sort((a, b) => b.weightedTotal - a.weightedTotal);
  return ranked.slice(0, n);
}

/** Get average score by assessment type in a course */
export function getAverageByType(courseId) {
  const types = ['exam', 'quiz', 'assignment'];
  return types.map(type => {
    const typeAssessments = assessments.filter(a => a.course_id === courseId && a.type === type);
    if (typeAssessments.length === 0) return { type, average: 0 };

    let total = 0;
    let count = 0;
    for (const assessment of typeAssessments) {
      const assessmentScores = scores.filter(s => s.assessment_id === assessment.id);
      for (const sc of assessmentScores) {
        total += (sc.score / assessment.max_score) * 100;
        count++;
      }
    }
    return { type, average: count > 0 ? Math.round(total / count) : 0 };
  });
}

/** Get overall stats */
export function getOverallStats() {
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const totalAssessments = assessments.length;
  const allPcts = scores.map(s => {
    const a = assessments.find(x => x.id === s.assessment_id);
    return a ? (s.score / a.max_score) * 100 : 0;
  });
  const avgScore = Math.round(allPcts.reduce((a, b) => a + b, 0) / allPcts.length);
  return { totalStudents, totalCourses, totalAssessments, avgScore };
}
