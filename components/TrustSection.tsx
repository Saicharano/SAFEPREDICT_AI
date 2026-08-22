import Image from 'next/image';

export default function TrustSection() {
  const partners = ['Tata Steel', 'Reliance', 'Adani', 'Vedanta', 'JSW', 'NTPC'];

  return (
    <section className="w-full py-12 bg-navy/90 text-center">
      <hr className="border-gray-700 mb-6" />
      <p className="text-gray-400 mb-4">Trusted by forward‑thinking industrial teams</p>
      <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
        {partners.map((p) => (
          <span key={p} className="text-gray-300 opacity-70 text-sm">{p}</span>
        ))}
      </div>
      <p className="text-xs text-gray-500">Illustrative logos</p>
      <div className="mt-4 flex items-center justify-center space-x-2 text-gray-300">
        <span className="text-lg">★★★★★ 4.8/5</span>
        <span className="text-sm">Based on 350+ platform reviews</span>
      </div>
    </section>
  );
}
