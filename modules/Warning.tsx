"use client";

export default function FlashGenWarning() {
  const flashWarnings = [
    {
      id: 1,
      title: "Not the Real USDT",
      description:
        "Flash USDT is not issued by Tether Limited. It may look or sound like USDT, but it’s just a custom token. Users may mistakenly think it’s the real USDT if not clearly labeled.",
      solution:
        "Make it very clear in your app, website, and documentation that Flash USDT is a custom utility token, not real USDT.",
    },
    {
      id: 2,
      title: "Trust & Credibility Issues",
      description:
        "New tokens often face skepticism unless backed by a strong brand or proof. If you’re saying it’s '1:1 backed by USDT,' you must actually hold and manage that reserve.",
      solution:
        "Be transparent. If you claim backing, show proof (like a public vault address). Use secure, open-source code.",
    },
    {
      id: 3,
      title: "Legal Risks",
      description:
        "If Flash USDT is used for payments, investments, or promises of stable value, it might be considered a security or e-money in many countries. This could bring regulatory issues.",
      solution:
        "Clearly state it is a utility token, not a security or financial instrument. Avoid making any profit or return guarantees unless you’re legally licensed.",
    },
    {
      id: 4,
      title: "Smart Contract Exploits",
      description:
        "Poorly written or unaudited smart contracts can be hacked or exploited. Loss of user funds can ruin your project and reputation.",
      solution:
        "Use trusted libraries like OpenZeppelin. Test thoroughly on testnet. Consider getting a security audit or at least peer review.",
    },
    {
      id: 5,
      title: "Liquidity Risks",
      description:
        "If users can’t sell or swap Flash USDT, they may lose trust. A token with no market or exchange access becomes useless.",
      solution:
        "Create a swap function (USDT ↔ Flash USDT), add it to a DEX (like PancakeSwap), and ensure there’s liquidity if you promise convertibility.",
    },
    {
      id: 6,
      title: "Confusing Branding",
      description:
        "Using a name like 'Flash USDT' can confuse users. It may lead to accusations of being a scam or impersonating USDT.",
      solution:
        "Use a distinct symbol like fUSDT or FUSDX. Include disclaimers like 'Not affiliated with Tether/USDT' in all materials, and educate users through your website and app.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 sm:px-8 py-5 pb-5 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">Important Notice</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {flashWarnings.map((warning, idx) => (
          <div
            key={idx}
            className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-lg hover: shadow-indigo-500/10 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-red-400 mb-4">
              {idx + 1}.{" " + warning.title}
            </h2>
            <p className="text-gray-300 mt-2 text-sm">{warning.description}</p>
            <div className="text-gray-300 mt-2 text-sm">
              <p className="text-green-400 text-sm font-medium">Solution:</p>
              <p className="text-gray-200 text-sm mt-1">{warning.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
