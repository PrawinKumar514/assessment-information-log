import { useState, useMemo } from 'react';
import { Plus, BookOpen, Pencil, Trash2, Users, Clock } from 'lucide-react';
import Modal from '../components/Modal';
import { useData } from '../context/DataContext';

const emptyCourse = {
  course_code: '',
  name: '',
  credit_hours: 3,
  semester: 'Fall 2024',
};

export default function Courses() {
  const {
    courses, addCourse, updateCourse, deleteCourse,
    getStudentsByCourse, getCourseAssessments,
  } = useData();

  const [semFilter, setSemFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCourse);

  const semesters = useMemo(() => ['All', ...new Set(courses.map(c => c.semester))], [courses]);

  const filtered = useMemo(() =>
    semFilter === 'All' ? courses : courses.filter(c => c.semester === semFilter),
    [courses, semFilter]
  );

  const openAdd = () => { setEditing(null); setForm(emptyCourse); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c.id); setForm({ ...c }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.course_code || !form.name) return;
    if (editing) {
      updateCourse(editing, form);
    } else {
      addCourse(form);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this course? Related enrollments and assessments will also be removed.')) {
      deleteCourse(id);
    }
  };

  return (
    <div>
      <div className="page-title-section">
        <h2>Courses</h2>
        <div className="actions">
          <select
            className="filter-select"
            value={semFilter}
            onChange={e => setSemFilter(e.target.value)}
          >
            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <BookOpen />
          <h3>No courses found</h3>
          <p>{semFilter !== 'All' ? 'No courses in this semester.' : 'Add your first course to get started.'}</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((c, i) => {
            const enrolled = getStudentsByCourse(c.id).length;
            const numAssessments = getCourseAssessments(c.id).length;
            return (
              <div key={c.id} className={`card animate-in animate-in-delay-${Math.min(i, 4)}`}>
                <div className="card-header">
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        color: 'var(--accent-blue)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {c.course_code}
                    </span>
                    <h3 className="card-title">{c.name}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon" onClick={() => openEdit(c)} title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => handleDelete(c.id)}
                      title="Delete"
                      style={{ color: 'var(--accent-red)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 12,
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 4 }}>
                      <Users size={12} /> Students
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{enrolled}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 4 }}>
                      <Clock size={12} /> Credits
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{c.credit_hours}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: 4 }}>
                      Semester
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--accent-amber)' }}>
                      {c.semester.replace(' 20', ' \u2019')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Course' : 'Add Course'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Course'}
            </button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group">
            <label>Course Code</label>
            <input value={form.course_code} onChange={e => setForm(p => ({ ...p, course_code: e.target.value }))} placeholder="e.g. CS301" />
          </div>
          <div className="form-group">
            <label>Credit Hours</label>
            <input type="number" min={1} max={6} value={form.credit_hours} onChange={e => setForm(p => ({ ...p, credit_hours: parseInt(e.target.value) || 3 }))} />
          </div>
        </div>
        <div className="form-group">
          <label>Course Name</label>
          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Database Management Systems" />
        </div>
        <div className="form-group">
          <label>Semester</label>
          <select value={form.semester} onChange={e => setForm(p => ({ ...p, semester: e.target.value }))}>
            <option>Fall 2024</option>
            <option>Spring 2025</option>
            <option>Fall 2025</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}
