import { employers } from "@/data/employers";

export function Ticker() {
	return (
		<section className="overflow-hidden bg-neutral-900 py-30 text-paper">
			<h2
				data-reveal
				className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight px-6 md:px-12"
			>
				my experience.
			</h2>
			<div className="overflow-hidden whitespace-nowrap mt-12">
				<div className="ticker-track flex items-center">
					{[0, 1].map((copy) => (
						<div
							key={copy}
							className="inline-flex items-center"
							aria-hidden={copy === 1}
						>
							{employers.map((employer) => (
								<span
									key={employer.name}
									className="inline-flex items-center gap-40 pl-40"
								>
									{employer.logo ? (
										<img
											src={employer.logo}
											alt={employer.name}
											className="h-40 brightness-0 invert"
										/>
									) : (
										<span className="text-2xl font-bold">
											{employer.name.toLowerCase()}
										</span>
									)}
									<span aria-hidden="true" className="text-paper/40" />
								</span>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
