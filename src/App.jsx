import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Assessments from './pages/Assessments';
import Scores from './pages/Scores';
import Reports from './pages/Reports';
import Schema from './pages/Schema';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/schema" element={<Schema />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
