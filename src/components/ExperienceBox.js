import { Box } from './Box';

export class ExperienceBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.experience = options.experience || [
			{
				time: 'Jul. 2023 - Jul. 2024',
				position: 'Senior Graphic Designer',
				company: 'Pinnacle',
				schedule: 'Full-time',
				tasks: [
					'Research and brainstorm various design ideas for content and marketing.',
					'Review the work submitted by Junior Designers and sharing feedback.',
				],
			},
			{
				time: 'Nov. 2021 - Jan. 2023',
				position: 'Graphic / Web designer',
				company: 'Double Square',
				schedule: 'Full-time',
				tasks: [
					'Development of internal projects from scratch, product design of brands',
					'Research and brainstorm various design ideas for content and marketing.',
					'Review the work submitted by Junior Designers and sharing feedback.',
				],
			},
			{
				time: 'Feb. 2021 - Jul. 2021',
				position: 'Graphic Designer',
				company: 'Pinnacle',
				tasks: [
					'Research and brainstorm various design ideas for content and marketing.',
					'Review the work submitted by Junior Designers and sharing feedback.',
				],
			},
		];
		const savedState = this.loadState();
		if (savedState && savedState.experience) {
			this.experience = savedState.experience;
		}
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

	getEditableComponent() {
		return `
            <div class="editable">
                <h1>Edit Experience</h1>
                ${this.experience
									.map(
										(exp, index) => `
                    <div class="entry" data-index="${index}">
                        <input type="text" name="exp-time-${index}" value="${exp.time}" placeholder="Time (e.g., Jul. 2023 - Jul. 2024)" />
                        <input type="text" name="exp-position-${index}" value="${exp.position}" placeholder="Position" />
                        <input type="text" name="exp-company-${index}" value="${exp.company}" placeholder="Company" />
                        <input type="text" name="exp-schedule-${index}" value="${exp.schedule || ''}" placeholder="Schedule (optional)" />
                        <textarea name="exp-tasks-${index}" placeholder="Tasks (one per line)">${exp.tasks.join('\n')}</textarea>
                        <button class="delete-entry" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `,
									)
									.join('')}
                ${
									this.experience.length < 3
										? `
                    <div class="action-buttons">
                        <button class="add-entry">Add Experience</button>
                    </div>
                `
										: ''
								}
            </div>
        `;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ experience: this.experience }));
	}

	loadState() {
		const state = super.loadState();
		return state || { experience: this.experience };
	}

	applyChanges(inputs) {
		const newExperience = [];
		for (let i = 0; i < inputs.length; i += 5) {
			const time = inputs[i].value.trim();
			const position = inputs[i + 1].value.trim();
			const company = inputs[i + 2].value.trim();
			const schedule = inputs[i + 3].value.trim();
			const tasks = inputs[i + 4].value
				.split('\n')
				.map((task) => task.trim())
				.filter((task) => task);
			if (time && position && company) {
				newExperience.push({ time, position, company, schedule: schedule || undefined, tasks });
			}
		}
		this.experience = newExperience.slice(0, 3);
		this.saveState();
	}

	attachEventListeners() {
		super.attachEventListeners();
		const addButton = this.root.querySelector(`#${this.id} .add-entry`);
		if (addButton) {
			addButton.addEventListener('click', () => {
				if (this.experience.length < 3) {
					this.experience.push({ time: '', position: '', company: '', schedule: '', tasks: [] });
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.outerHTML = this.getComponent();
						this.attachEventListeners();
					}
				}
			});
		}
		const deleteButtons = this.root.querySelectorAll(`#${this.id} .delete-entry`);
		deleteButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const index = parseInt(button.getAttribute('data-index'));
				this.experience.splice(index, 1);
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.outerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});
	}
}
