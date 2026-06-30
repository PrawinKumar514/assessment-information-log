import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
  FileBarChart,
  Database,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', section: true },
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { label: 'Management', section: true },
  { to: '/students', icon: Users, label: 'Students' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/assessments', icon: ClipboardList, label: 'Assessments' },
  { label: 'Analytics', section: true },
  { to: '/scores', icon: BarChart3, label: 'Scores' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
  { label: 'Reference', section: true },
  { to: '/schema', icon: Database, label: 'Schema' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-icon">
          <GraduationCap />
        </div>
        <span className="brand-text">AssessLog</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div key={i} className="nav-section-label">
                {item.label}
              </div>
            );
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              end={item.to === '/'}
            >
              <Icon />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-toggle">
        <button onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
