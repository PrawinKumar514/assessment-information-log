import { Database, ArrowRight, Key, Link2 } from 'lucide-react';

const schema = [
  {
    name: 'students',
    columns: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'student_number', type: 'VARCHAR(20)', key: null },
      { name: 'first_name', type: 'VARCHAR(50)', key: null },
      { name: 'last_name', type: 'VARCHAR(50)', key: null },
      { name: 'email', type: 'VARCHAR(100)', key: null },
      { name: 'phone', type: 'VARCHAR(15)', key: null },
      { name: 'dob', type: 'DATE', key: null },
      { name: 'gender', type: 'ENUM', key: null },
      { name: 'department', type: 'VARCHAR(50)', key: null },
    ],
  },
  {
    name: 'courses',
    columns: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'course_code', type: 'VARCHAR(10)', key: null },
      { name: 'name', type: 'VARCHAR(100)', key: null },
      { name: 'credit_hours', type: 'INT', key: null },
      { name: 'semester', type: 'VARCHAR(20)', key: null },
    ],
  },
  {
    name: 'enrollments',
    columns: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'student_id', type: 'INT', key: 'FK' },
      { name: 'course_id', type: 'INT', key: 'FK' },
    ],
  },
  {
    name: 'assessments',
    columns: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'course_id', type: 'INT', key: 'FK' },
      { name: 'title', type: 'VARCHAR(100)', key: null },
      { name: 'type', type: 'ENUM(exam,quiz,assignment)', key: null },
      { name: 'max_score', type: 'INT', key: null },
      { name: 'weight_percent', type: 'INT', key: null },
    ],
  },
  {
    name: 'scores',
    columns: [
      { name: 'id', type: 'INT', key: 'PK' },
      { name: 'student_id', type: 'INT', key: 'FK' },
      { name: 'assessment_id', type: 'INT', key: 'FK' },
      { name: 'score', type: 'DECIMAL(5,2)', key: null },
    ],
  },
];

const relationships = [
  {
    from: 'students',
    to: 'enrollments',
    description: 'One student can have many enrollments (1 → N)',
  },
  {
    from: 'courses',
    to: 'enrollments',
    description: 'One course can have many enrollments (1 → N)',
  },
  {
    from: 'students ↔ courses',
    to: 'enrollments',
    description: 'Many-to-many relationship resolved through the enrollments junction table',
  },
  {
    from: 'courses',
    to: 'assessments',
    description: 'One course has many assessments (1 → N)',
  },
  {
    from: 'students',
    to: 'scores',
    description: 'One student has many scores (1 → N)',
  },
  {
    from: 'assessments',
    to: 'scores',
    description: 'One assessment has many scores (1 → N)',
  },
];

export default function Schema() {
  return (
    <div>
      <div className="page-title-section">
        <h2>Database Schema</h2>
      </div>

      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginBottom: 32,
        lineHeight: 1.7,
        maxWidth: 700,
      }}>
        This project follows <strong>Third Normal Form (3NF)</strong> normalization.
        Each table has a single-column primary key, no partial or transitive dependencies,
        and the many-to-many relationship between students and courses is resolved through
        the <strong style={{ color: 'var(--accent-cyan)' }}>enrollments</strong> junction table.
      </p>

      {/* ─── Tables ──────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 20,
        marginBottom: 40,
      }}>
        {schema.map((table, i) => (
          <div key={table.name} className={`card animate-in animate-in-delay-${Math.min(i, 4)}`}>
            <div className="schema-table">
              <h3>
                <Database size={16} style={{ color: 'var(--accent-blue)' }} />
                {table.name}
                <span className="table-badge">{table.columns.length} cols</span>
              </h3>
              <div className="column-list">
                {table.columns.map(col => (
                  <div key={col.name} className="column-item">
                    <span className="col-name">{col.name}</span>
                    <span className="col-type">{col.type}</span>
                    {col.key && (
                      <span className={`col-key ${col.key.toLowerCase()}`}>
                        {col.key === 'PK' ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Key size={10} /> PK
                          </span>
                        ) : (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Link2 size={10} /> FK
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Relationships ────────────────── */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>
        Relationships
      </h3>

      <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
        {relationships.map((rel, i) => (
          <div key={i} className="relationship-card animate-in">
            <div className="rel-icon">
              <ArrowRight size={18} />
            </div>
            <div className="rel-text">
              <strong>{rel.from}</strong> → <strong>{rel.to}</strong>
              <br />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{rel.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Notes ────────────────────────── */}
      <div className="card" style={{ maxWidth: 700 }}>
        <h3 className="card-title" style={{ marginBottom: 12 }}>Design Decisions</h3>
        <ul style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Junction table (enrollments)</strong> eliminates the many-to-many relationship between students and courses.</li>
          <li><strong>weight_percent</strong> on assessments enables weighted grade calculation without storing redundant data.</li>
          <li><strong>Scores reference both student_id and assessment_id</strong>, representing the intersection of "who took what."</li>
          <li>No calculated columns are stored — weighted totals are computed at query time to maintain data consistency.</li>
          <li>In production, this would use <strong>Supabase</strong> with Row Level Security and real-time subscriptions.</li>
        </ul>
      </div>
    </div>
  );
}
