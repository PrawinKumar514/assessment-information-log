import { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Scores() {
  const {
    students, courses, assessments, scores,
    getEnrollmentsByStudent, getStudentsByCourse,
    getCourseAssessments, calculateWeightedTotal, getPassStatus,
  } = useData();

  const [view, setView] = useState('by-student');
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || 1);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || 1);

  // ─── By Student View ──────────────────────
  const studentCourses = useMemo(() =>
    getEnrollmentsByStudent(selectedStudent),
    [selectedStudent]
  );

  const studentScoreRows = useMemo(() => {
    const rows = [];
    for (const course of studentCourses) {
      const cAssessments = getCourseAssessments(course.id);
      for (const a of cAssessments) {
        const sc = scores.find(s => s.student_id === selectedStudent && s.assessment_id === a.id);
        rows.push({
          courseCode: course.course_code,
          courseName: course.name,
          title: a.title,
          type: a.type,
          maxScore: a.max_score,
          weight: a.weight_percent,
          score: sc ? sc.score : null,
          percentage: sc ? Math.round((sc.score / a.max_score) * 100) : null,
        });
      }
    }
    return rows;
  }, [selectedStudent, studentCourses, scores]);

  // ─── By Course View ───────────────────────
  const courseStudents = useMemo(() =>
    getStudentsByCourse(selectedCourse),
    [selectedCourse]
  );

  const courseScoreRows = useMemo(() =>
    courseStudents.map(s => ({
      studentNumber: s.student_number,
      name: `${s.first_name} ${s.last_name}`,
      weightedTotal: calculateWeightedTotal(s.id, selectedCourse),
      status: getPassStatus(s.id, selectedCourse),
    })).sort((a, b) => b.weightedTotal - a.weightedTotal),
    [selectedCourse, courseStudents]
  );

  return (
    <div>
      <div className="page-title-section">
        <h2>Scores</h2>
      </div>

      <div className="tab-bar">
        <button className={view === 'by-student' ? 'active' : ''} onClick={() => setView('by-student')}>By Student</button>
        <button className={view === 'by-course' ? 'active' : ''} onClick={() => setView('by-course')}>By Course</button>
      </div>

      {view === 'by-student' ? (
        <div className="animate-in">
          <div style={{ marginBottom: 20 }}>
            <select
              className="filter-select"
              value={selectedStudent}
              onChange={e => setSelectedStudent(parseInt(e.target.value))}
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.student_number} — {s.first_name} {s.last_name}</option>
              ))}
            </select>
          </div>

          {/* Summary cards per course */}
          {studentCourses.length > 0 && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              {studentCourses.map(c => {
                const wt = calculateWeightedTotal(selectedStudent, c.id);
                const pass = wt >= 40;
                return (
                  <div key={c.id} style={{
                    padding: '12px 18px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    minWidth: 200,
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 2 }}>{c.course_code}</div>
                      <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>{wt}%</div>
                    </div>
                    <span className={`badge ${pass ? 'badge-pass' : 'badge-fail'}`}>{pass ? 'Pass' : 'Fail'}</span>
                  </div>
                );
              })}
            </div>
          )}

          {studentScoreRows.length === 0 ? (
            <div className="empty-state">
              <BarChart3 />
              <h3>No scores available</h3>
              <p>This student has no assessment scores yet.</p>
            </div>
          ) : (
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Assessment</th>
                    <th>Type</th>
                    <th>Score</th>
                    <th>Max</th>
                    <th>%</th>
                    <th>Weight</th>
                    <th style={{ width: 120 }}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {studentScoreRows.map((r, i) => (
                    <tr key={i} style={{ cursor: 'default' }}>
                      <td style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{r.courseCode}</td>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{r.title}</td>
                      <td><span className={`badge badge-${r.type}`}>{r.type}</span></td>
                      <td style={{ fontWeight: 600 }}>{r.score ?? '—'}</td>
                      <td>{r.maxScore}</td>
                      <td style={{
                        fontWeight: 700,
                        color: r.percentage === null ? 'var(--text-muted)' :
                          r.percentage >= 70 ? 'var(--accent-green)' :
                          r.percentage >= 40 ? 'var(--accent-amber)' : 'var(--accent-red)',
                      }}>
                        {r.percentage !== null ? `${r.percentage}%` : '—'}
                      </td>
                      <td>{r.weight}%</td>
                      <td>
                        {r.percentage !== null ? (
                          <div className="score-bar">
                            <div
                              className={`fill ${r.percentage >= 70 ? 'high' : r.percentage >= 40 ? 'mid' : 'low'}`}
                              style={{ width: `${r.percentage}%` }}
                            />
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in">
          <div style={{ marginBottom: 20 }}>
            <select
              className="filter-select"
              value={selectedCourse}
              onChange={e => setSelectedCourse(parseInt(e.target.value))}
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.course_code} — {c.name}</option>
              ))}
            </select>
          </div>

          {courseScoreRows.length === 0 ? (
            <div className="empty-state">
              <BarChart3 />
              <h3>No students enrolled</h3>
              <p>No students are enrolled in this course yet.</p>
            </div>
          ) : (
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student No.</th>
                    <th>Student Name</th>
                    <th>Weighted Total</th>
                    <th style={{ width: 180 }}>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseScoreRows.map((r, i) => (
                    <tr key={i} style={{ cursor: 'default' }}>
                      <td style={{ fontWeight: 700, color: i < 3 ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                        #{i + 1}
                      </td>
                      <td style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{r.studentNumber}</td>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{r.name}</td>
                      <td style={{ fontWeight: 700 }}>{r.weightedTotal}%</td>
                      <td>
                        <div className="score-bar">
                          <div
                            className={`fill ${r.weightedTotal >= 70 ? 'high' : r.weightedTotal >= 40 ? 'mid' : 'low'}`}
                            style={{ width: `${r.weightedTotal}%` }}
                          />
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${r.status === 'Pass' ? 'badge-pass' : 'badge-fail'}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
