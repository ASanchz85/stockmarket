export default function Panel({ title, tag, accent = 'var(--accent)', className = '', children }) {
  return (
    <section className={`panel ${className}`} style={{ '--panel-accent': accent }}>
      {title && (
        <header className="panel__head">
          <span className="panel__dot" />
          <h2>{title}</h2>
          {tag && <span className="panel__tag">{tag}</span>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </section>
  );
}
