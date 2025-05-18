export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#f6f8fb] to-white py-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-[#0b1c2c] leading-tight">
          Smarter Shipping. Faster Fulfillment.
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          ShipTornado helps you unify order processing and streamline shipping with blazing-fast performance and a powerful dashboard.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 text-base font-semibold rounded-full bg-[#00b8ff] text-white hover:bg-[#00a7e6] transition"
          >
            Get Started Free
          </a>
          <a
            href="/login"
            className="px-6 py-3 text-base font-semibold rounded-full border border-[#00b8ff] text-[#00b8ff] hover:bg-[#e6faff] transition"
          >
            Demo Login
          </a>
        </div>
      </div>
    </section>
  );
}
