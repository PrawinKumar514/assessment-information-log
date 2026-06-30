import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, ClipboardList } from 'lucide-react';
import Modal from '../components/Modal';
import { useData } from '../context/DataContext';

const emptyAssessment = {
  course_id: 1,
  title: '',
  type: 'exam',
  max_score: 100,
  weight_percent: 20,
};

export default function Assessments() {
  const {
    courses, assessments, addAssessment, updateAssessment, deleteAssessment,
    getScoresByAssessment,
  } = useData();

  const [courseFilter, setCourseFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyAssessment);

  const filtered = useMemo(() =>
    courseFilter === 'All'
      ? assessments
      : assessments.filter(a => a.course_id === parseInt(courseFilter)),
    [assessments, courseFilter]
  );

  // Group by course, then by type
  const grouped = useMemo(() => {
    const map = {};
    for (const a of filtered) {
      const course = courses.find(c => c.id === a.course_id);
      const key = course ? `${course.course_code} — ${course.name}` : `Course #${a.course_id}`;
      if (!map[key]) map[key] = { exams: [], quizzes: [], assignments: [] };
      if (a.type === 'exam') map[key].exams.push(a);
      else if (a.type === 'quiz') map[key].quizzes.push(a);
      else map[key].assignments.push(a);
    }
    return map;
  }, [filtered, courses]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyAssessment);
    setModalOpen(true);
  };

  const openEdit = (a) => {
    setEditing(a.id);
    setForm({ ...a });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title) return;
    if (editing) {
      updateAssessment(editing, form);
    } else {
      addAssessment(form);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this assessment? Associated scores will also be removed.')) {
      deleteAssessment(id);
    }
  };

  const renderRow = (a) => {
    const scoreCount = getScoresByAssessment(a.id).length;
    return (
      <tr key={a.id}>
        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{a.title}</td>
        <td><span className={`badge badge-${a.type}`}>{a.type}</span></td>
        <td>{a.max_score}</td>
        <td>{a.weight_percent}%</td>
        <td>{scoreCount} submitted</td>
        <td style={{ textAlign: 'right' }}>
          <span style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
            <button className="btn-icon" onClick={() => openEdit(a)} title="Edit"><Pencil size={14} /></button>
            <button className="btn-icon" onClick={() => handleDelete(a.id)} title="Delete" style={{ color: 'var(--accent-red)' }}>
              <Trash2 size={14} />
            </button>
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="page-title-section">
        <h2>Assessments</h2>
        <div className="actions">
          <select
            className="filter-select"
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.course_code} — {c.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} /> Add Assessment
          </button>
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="empty-state">
          <ClipboardList />
          <h3>No assessments found</h3>
          <p>Add an assessment for a course to get started.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([courseLabel, types]) => (
          <div key={courseLabel} style={{ marginBottom: 32 }} className="animate-in">
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: 14,
              paddingBottom: 10,
              borderBottom: '1px solid var(--border)',
            }}>
              {courseLabel}
            </h3>

            {['Exams', 'Quizzes', 'Assignments'].map((typeLabel) => {
              const key = typeLabel.toLowerCase();
              const items = types[key];
              if (!items || items.length === 0) return null;
              return (
                <div key={typeLabel} style={{ marginBottom: 20 }}>
                  <h4 style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 10,
                  }}>
                    {typeLabel}
                  </h4>
                  <div className="data-table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Max Score</th>
                          <th>Weight</th>
                          <th>Scores</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(renderRow)}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Assessment' : 'Add Assessment'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Assessment'}
            </button>
          </>
        }
      >
        <div className="form-group">
          <label>Course</label>
          <select value={form.course_id} onChange={e => setForm(p => ({ ...p, course_id: parseInt(e.target.value) }))}>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.course_code} — {c.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Mid-Term Exam" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
              <option value="exam">Exam</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>
          <div className="form-group">
            <label>Max Score</label>
            <input type="number" min={1} value={form.max_score} onChange={e => setForm(p => ({ ...p, max_score: parseInt(e.target.value) || 100 }))} />
          </div>
        </div>
        <div className="form-group">
          <label>Weight (%)</label>
          <input type="number" min={1} max={100} value={form.weight_percent} onChange={e => setForm(p => ({ ...p, weight_percent: parseInt(e.target.value) || 10 }))} />
        </div>
      </Modal>
    </div>
  );
}
