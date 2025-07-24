import { Box } from './Box';

export class ExperienceBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.experience = options.experience;
	}

	getInnerComponent() {
		return `<div class="experience">
      <h1>Experience</h1>
			<div>
				${this.experience
					.map(
						(experience, index) => `<div style="${
							index === 0
								? `background-color: rgb(var(--accent-bg-color));
									 color: rgb(var(--accent-fg-color));`
								: `background-color: rgb(var(--default-bg-color));
									 color: rgb(var(--default-fg-color));`
						}">
							<div>
								<span>${experience.time}</span>
								<span style="${index === 0 ? '' : 'display: none;'}">most recent</span>
							</div>
							<div>
								<div>
									<h2>${experience.position}</h2>
									<div>
										<span>${experience.company ?? ''}</span>
										${
											experience.company && experience.schedule
												? `<div class="separator" style="${
														index === 0
															? `background-color: rgb(var(--accent-fg-color));`
															: `background-color: rgb(var(--default-fg-color));`
													}"></div>`
												: ''
										}
										<span>${experience.schedule ?? ''}</span>
									</div>
								</div>
								<div>
									<ul>
										${experience.tasks.map((task) => `<li>${task}</li>`).join('')}
									</ul>
								</div>
							</div>
					</div>`,
					)
					.join('')}	
			</div>
		</div>`;
	}
}
