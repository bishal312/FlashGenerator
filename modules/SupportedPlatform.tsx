"use client"

export default function SupportedPlatform() {
  const Platforms = [
    {
      title: "Any Web-3 wallet",
      service: [
        { id: 1, name: "Trust wallet" },
        { id: 2, name: "Okx wallet" },
        { id: 3, name: "Meta mask" },
        { id: 4, name: "Zeroing Wallet" },
        { id: 5, name: "Frame Wallet" },
        { id: 6, name: "Taho Wallet" },
        { id: 7, name: "Rainbow wallet" },
      ]
    },
    {
      title: "Crypto Exchange",
      service: [
        { id: 1, name: "Binance" },
        { id: 2, name: "Bybit" },
        { id: 3, name: "BitGET" },
        { id: 4, name: "KUcoin" },
      ]
    },
    {
      title: "Web-2 broker & gambling site withdraw & deposit guideline",
      service: [
        { id: 1, name: "✅ Around 80% of Web2 gambling sites accept Flash USDT — but always double-check before making a transaction." },
        { id: 2, name: "❌ Never deposit more than $500 at once — higher deposits may trigger a verification process, which often leads to account bans." },
        { id: 3, name: "❌ Avoid withdrawing more than the platform’s minimum limit — larger withdrawals may be flagged for verification, putting your account at risk." },
        { id: 4, name: "✅ Deposit and withdraw in smaller amounts, more frequently — this reduces the chance of triggering any verification processes." },
        { id: 5, name: "📌 Always stay cautious and protect your account & funds." },
      ]
    },
    {
      title: "Web-2 any gambling site",
      service: [
        { id: 1, name: "7X Bet" },
        { id: 2, name: "Binolla" },
        { id: 3, name: "web.de" },
        { id: 4, name: "Betting.com" },
        { id: 5, name: "Zyngapoker.com" },
        { id: 6, name: "Stake.com" },
        { id: 7, name: "CK44.com" },
        { id: 8, name: "Melbet" },
        { id: 9, name: "22Bet" },
      ]
    }, {
      title: "Web-2 some broker",
      service: [
        { id: 1, name: "Binolla" },
        { id: 2, name: "Poketoption" },
        { id: 3, name: "Binomo" },
        { id: 4, name: "iQ option" },
        { id: 5, name: "Deriv" },
      ]
    },
  ]


  return (
    <div className="min-h-screen  bg-gradient-to-b from-gray-900 to-black text-white px-6 sm:px-8 mt-19 pb-5">
      <h1 className="text-3xl font-bold text-center mb-10">
        Supported Platforms
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {Platforms.map((platfom, idx) => (
          <div
            key={idx}
            className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-lg hover: shadow-indigo-500/10 transition-all duration-300">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">
              {platfom.title}
            </h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              {platfom.service.map((s) => (
                <li
                  key={s.id}
                  className="flex items-start gap-2 hover:text-white transition-colors"
                >
                  <span className="text-indigo-400">•</span>
                  <span>{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}