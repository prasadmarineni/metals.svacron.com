export const metadata = {
  title: 'Resources - Svacron Metals',
  description: 'Guides and articles on investing in precious metals, how purity affects pricing, and practical buying tips.'
};

export default function Resources() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Resources</h1>
      <p className="text-sm text-gray-700 mb-6">Authoritative guides and practical advice for investors and buyers of gold, silver and platinum. We provide actionable examples and explain how purity, GST and making charges affect retail prices.</p>

      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Understanding purity and pricing</h2>
        <p className="text-sm text-gray-700">Purity labels like 24K (999) for gold and 999 for silver denote metal content. Learn how jewelers price items and why market per-gram rates differ from retail prices.</p>
      </article>

      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How to read metal rate charts</h2>
        <p className="text-sm text-gray-700">We explain chart patterns, support/resistance, and a buyer’s checklist for purchasing physical metal versus ETFs.</p>
      </article>

      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Buying tips and tax considerations</h2>
        <p className="text-sm text-gray-700">Guidance on making charges, invoice checks, and tax treatment for physical purchases and investments.</p>
      </article>
    </main>
  );
}
