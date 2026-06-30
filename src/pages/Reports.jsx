import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { useData } from '../context/DataContext';

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#06b6d4'];

export default function Reports() {
  const {
    students, courses,
    getEnrollmentsByStudent, getTopStudents, getAverageByType,
    calculateWeightedTotal, getStudentsByCourse,
  } = useData();

  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || 1);
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || 1);

  const courseName = courses.find(c => c.id === selectedCourse);

  // Top 5 students
  const topStudents = useMemo(() => getTopStudents(selectedCourse, 5), [selectedCourse]);
  const topData = topStudents.map(s => ({
    name: `${s.first_name} ${s.last_name.charAt(0)}.`,
    score: s.weightedTotal,
  }));

  // Average by type
  const avgByType = useMemo(() => getAverageByType(selectedCourse), [selectedCourse]);
  const avgData = avgByType.map(d => ({
    name: d.type.charAt(0).toUpperCase() + d.type.slice(1),
    average: d.average,
  }));

  // Student radar — performance across enrolled courses
  const studentCourses = useMemo(() => getEnrollmentsByStudent(selectedStudent), [selectedStudent]);
  const radarData = studentCourses.map(c => ({
    course: c.course_code,
    score: calculateWeightedTotal(selectedStudent, c.id),
  }));

  // Score distribution for selected course
  const courseStudents = useMemo(() => getStudentsByCourse(selectedCourse), [selectedCourse]);
  const distribution = useMemo(() => {
    const bins = [
      { range: '0-20', count: 0 },
      { range: '21-40', count: 0 },
      { range: '41-60', count: 0 },
      { range: '61-80', count: 0 },
      { range: '81-100', count: 0 },
    ];
    for (const s of courseStudents) {
      const wt = calculateWeightedTotal(s.id, selectedCourse);
      if (wt <= 20) bins[0].count++;
      else if (wt <= 40) bins[1].count++;
      else if (wt <= 60) bins[2].count++;
      else if (wt <= 80) bins[3].count++;
      else bins[4].count++;
    }
    return bins;
  }, [selectedCourse, courseStudents]);

  const tooltipStyle = {
    background: '#161921',
    border: '1px solid #2a2d3e',
    borderRadius: '8px',
  };

  return (
    <div>
      <div className="page-title-section">
        <h2>Reports & Analytics</h2>
      </div>

      {/* ─── Course selector ─────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
          Select Course for Analysis
        </label>
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

      <div className="charts-grid">
        {/* Top Performers */}
        <div className="chart-card animate-in">
          <div className="chart-title">Top 5 Performers — {courseName?.course_code}</div>
          {topData.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: 20, textAlign: 'center' }}>
              No students enrolled in this course.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Weighted Total']} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={24}>
                  {topData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Average by Type */}
        <div className="chart-card animate-in animate-in-delay-1">
          <div className="chart-title">Average Score by Assessment Type — {courseName?.course_code}</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={avgData} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Average']} />
              <Bar dataKey="average" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {avgData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Distribution */}
        <div className="chart-card animate-in animate-in-delay-2">
          <div className="chart-title">Score Distribution — {courseName?.course_code}</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={distribution} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="range" />
              <YAxis allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50} fill="#3b82f6">
                {distribution.map((entry, i) => (
                  <Cell key={i} fill={
                    entry.range === '81-100' ? '#10b981' :
                    entry.range === '61-80' ? '#3b82f6' :
                    entry.range === '41-60' ? '#f59e0b' :
                    entry.range === '21-40' ? '#ec4899' : '#ef4444'
                  } />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Radar */}
        <div className="chart-card animate-in animate-in-delay-3">
          <div className="chart-title">Student Performance Across Courses</div>
          <div style={{ marginBottom: 14 }}>
            <select
              className="filter-select"
              value={selectedStudent}
              onChange={e => setSelectedStudent(parseInt(e.target.value))}
              style={{ width: '100%' }}
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
              ))}
            </select>
          </div>
          {radarData.length < 3 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={radarData} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="course" />
                <YAxis domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Score']} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={50}>
                  {radarData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="course" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
