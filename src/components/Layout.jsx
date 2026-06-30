import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const pageTitles = {
  '/': 'Dashboard',
  '/students': 'Students',
  '/courses': 'Courses',
  '/assessments': 'Assessments',
  '/scores': 'Scores',
  '/reports': 'Reports',
  '/schema': 'Database Schema',
};

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const title = pageTitles[location.pathname] || 'AssessLog';

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className={`main-area${collapsed ? ' collapsed' : ''}`}>
        <header className="page-header">
          <div>
            <div className="breadcrumb">
              AssessLog <span>/</span> {title}
            </div>
            <h1>{title}</h1>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
