import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import StatCard from '../components/StatCard';
import { useData } from '../context/DataContext';

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#06b6d4'];

export default function Dashboard() {
  const { getOverallStats, courses, getTopStudents, getAverageByType, assessments } = useData();
  const stats = getOverallStats();

  // Assessment type breakdown for pie chart
  const typeBreakdown = [
    { name: 'Exams', value: assessments.filter(a => a.type === 'exam').length },
    { name: 'Quizzes', value: assessments.filter(a => a.type === 'quiz').length },
    { name: 'Assignments', value: assessments.filter(a => a.type === 'assignment').length },
  ];

  // Top 5 students in first course (DBMS)
  const topStudents = getTopStudents(1, 5);
  const topStudentsData = topStudents.map(s => ({
    name: `${s.first_name} ${s.last_name.charAt(0)}.`,
    score: s.weightedTotal,
  }));

  // Average by type for DBMS
  const avgByType = getAverageByType(1);
  const avgData = avgByType.map(d => ({
    name: d.type.charAt(0).toUpperCase() + d.type.slice(1),
    average: d.average,
  }));

  return (
    <div>
      <div className="page-title-section">
        <h2>Overview</h2>
      </div>

      <div className="stat-cards">
        <StatCard icon={Users} value={stats.totalStudents} label="Total Students" color="blue" delay={0} />
        <StatCard icon={BookOpen} value={stats.totalCourses} label="Total Courses" color="green" delay={50} />
        <StatCard icon={ClipboardList} value={stats.totalAssessments} label="Assessments" color="amber" delay={100} />
        <StatCard icon={TrendingUp} value={stats.avgScore} label="Avg Score %" color="pink" delay={150} />
      </div>

      <div className="charts-grid">
        <div className="chart-card animate-in animate-in-delay-2">
          <div className="chart-title">Top 5 Students — DBMS (CS301)</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topStudentsData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip
                contentStyle={{
                  background: '#161921',
                  border: '1px solid #2a2d3e',
                  borderRadius: '8px',
                }}
                formatter={(v) => [`${v}%`, 'Weighted Score']}
              />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={24}>
                {topStudentsData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card animate-in animate-in-delay-3">
          <div className="chart-title">Assessment Type Breakdown</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={typeBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {typeBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#161921',
                  border: '1px solid #2a2d3e',
                  borderRadius: '8px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card animate-in animate-in-delay-4" style={{ gridColumn: '1 / -1' }}>
          <div className="chart-title">Average Score by Assessment Type — DBMS (CS301)</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgData} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: '#161921',
                  border: '1px solid #2a2d3e',
                  borderRadius: '8px',
                }}
                formatter={(v) => [`${v}%`, 'Average']}
              />
              <Bar dataKey="average" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {avgData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
