export default function Stats({ stats }) {
  return (
    <section aria-label="إحصائيات" className="container-x defer">
      <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
        {(stats || []).map((s, i) => (
          <div key={`${s.label}-${i}`} className="card p-5 text-center">
            <dt className="order-2 mt-1 text-xs text-white/60">{s.label}</dt>
            <dd className="text-3xl font-black text-brand">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
