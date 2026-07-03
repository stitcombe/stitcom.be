import { employers } from "@/data/employers";

export function Ticker() {
	return (
		<section className="overflow-hidden bg-neutral-900 py-8 text-paper">
			{/* <p className="px-6 text-sm text-paper/60 md:px-12">Experience @</p> */}
			<div className="overflow-hidden whitespace-nowrap">
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
									className="inline-flex items-center gap-16 pl-16"
								>
									{employer.logo ? (
										<img
											src={employer.logo}
											alt={employer.name}
											className="h-12 brightness-0 invert"
										/>
									) : (
										<span className="text-2xl font-bold">
											{employer.name.toLowerCase()}
										</span>
									)}
									<span aria-hidden="true" className="text-paper/40">
										✦
									</span>
								</span>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
