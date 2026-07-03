export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center bg-ink px-6 pt-24 text-paper md:px-12"
    >
      <h1
        data-reveal
        className="max-w-[12ch] text-[clamp(4rem,12vw,9.5rem)] font-bold leading-[1.1]"
      >
        hi, i&apos;m stephen.
      </h1>
      <p
        data-reveal
        className="mt-8 max-w-2xl text-xl leading-relaxed text-paper/80"
      >
        product manager. i build things worth using — and occasionally things
        worth playing.
      </p>
    </section>
  );
}
