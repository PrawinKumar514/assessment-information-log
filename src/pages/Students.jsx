import { useState, useMemo } from 'react';
import { Search, Plus, UserCircle, Mail, Phone, X, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { useData } from '../context/DataContext';

const emptyStudent = {
  student_number: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'Male',
  department: 'Computer Science',
};

export default function Students() {
  const {
    students, addStudent, updateStudent, deleteStudent,
    getEnrollmentsByStudent, calculateWeightedTotal,
  } = useData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyStudent);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(s =>
      s.first_name.toLowerCase().includes(q) ||
      s.last_name.toLowerCase().includes(q) ||
      s.student_number.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
    );
  }, [students, search]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyStudent);
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditing(s.id);
    setForm({ ...s });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.first_name || !form.last_name) return;
    if (editing) {
      updateStudent(editing, form);
    } else {
      addStudent({
        ...form,
        student_number: `STU-2024-${String(students.length + 1).padStart(3, '0')}`,
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this student? Their enrollments and scores will also be removed.')) {
      deleteStudent(id);
    }
  };

  return (
    <div>
      <div className="page-title-section">
        <h2>Students</h2>
        <div className="actions">
          <div className="search-bar">
            <Search />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <UserCircle />
          <h3>No students found</h3>
          <p>{search ? 'Try a different search term.' : 'Add your first student to get started.'}</p>
        </div>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Gender</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} onClick={() => setDetailModal(s)}>
                  <td style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                    {s.student_number}
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {s.first_name} {s.last_name}
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Mail size={14} style={{ opacity: 0.5 }} /> {s.email}
                    </span>
                  </td>
                  <td>{s.department}</td>
                  <td>{s.gender}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      <button
                        className="btn-icon"
                        title="Edit"
                        onClick={e => { e.stopPropagation(); openEdit(s); }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="btn-icon"
                        title="Delete"
                        onClick={e => { e.stopPropagation(); handleDelete(s.id); }}
                        style={{ color: 'var(--accent-red)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Student' : 'Add Student'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>
              {editing ? 'Save Changes' : 'Add Student'}
            </button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input value={form.last_name} onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))} />
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" value={form.dob} onChange={e => setForm(p => ({ ...p, dob: e.target.value }))} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))}>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        open={!!detailModal}
        onClose={() => setDetailModal(null)}
        title={detailModal ? `${detailModal.first_name} ${detailModal.last_name}` : ''}
      >
        {detailModal && (
          <div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Student No.</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{detailModal.student_number}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Email</span>
                <span>{detailModal.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Department</span>
                <span>{detailModal.department}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Phone</span>
                <span>{detailModal.phone}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12 }}>Enrolled Courses</h3>
            {(() => {
              const enrolled = getEnrollmentsByStudent(detailModal.id);
              if (enrolled.length === 0) {
                return <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Not enrolled in any courses.</p>;
              }
              return (
                <div style={{ display: 'grid', gap: 8 }}>
                  {enrolled.map(c => {
                    const wt = calculateWeightedTotal(detailModal.id, c.id);
                    return (
                      <div key={c.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 14px', background: 'var(--bg-input)', borderRadius: '8px',
                        border: '1px solid var(--border)', fontSize: '0.85rem',
                      }}>
                        <div>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.course_code}</span>
                          <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{c.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontWeight: 700 }}>{wt}%</span>
                          <span className={`badge ${wt >= 40 ? 'badge-pass' : 'badge-fail'}`}>
                            {wt >= 40 ? 'Pass' : 'Fail'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </Modal>
    </div>
  );
}
