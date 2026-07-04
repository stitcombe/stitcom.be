import memoji from "@/assets/memoji.png";

export function Hero() {
	return (
		<section
			id="top"
			className="flex min-h-screen flex-col justify-center bg-ink px-6 pt-24 text-paper md:px-12"
		>
			<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 md:flex-row md:gap-6 lg:gap-8">
				<div className="w-fit">
					<h1
						data-reveal
						className="w-fit text-[clamp(4rem,12vw,9.5rem)] font-bold leading-[1.1]"
					>
						Hi, I&apos;m
						<br />
						Stephen.
					</h1>
					<p
						data-reveal
						className="mt-8 w-fit max-w-2xl text-xl leading-relaxed text-paper/80"
					>
						I work in Product. I build things worth using — and occasionally
						things worth playing.
					</p>
				</div>
				<img
					src={memoji}
					alt="Stephen Titcombe memoji"
					data-reveal
					className="order-first h-40 w-auto shrink-0 md:order-last md:h-56 lg:h-72 xl:h-80"
				/>
			</div>
		</section>
	);
}
