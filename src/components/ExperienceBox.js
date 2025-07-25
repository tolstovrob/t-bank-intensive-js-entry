import { Box } from './Box';

export class ExperienceBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.experience = options.experience || [];
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
		return `<div class="editable">
            <h1>Edit Experience</h1>
            ${this.experience
							.map(
								(exp, index) => `<div class="entry" data-index="${index}">
                        <input type="text" name="time-${index}" value="${exp.time}" placeholder="Time (e.g., Jul. 2023 - Jul. 2024)" />
                        <input type="text" name="position-${index}" value="${exp.position}" placeholder="Position" />
                        <input type="text" name="company-${index}" value="${exp.company ?? ''}" placeholder="Company" />
                        <input type="text" name="schedule-${index}" value="${exp.schedule ?? ''}" placeholder="Schedule" />
                        <textarea name="tasks-${index}" placeholder="Tasks (comma-separated)">${exp.tasks.join(', ')}</textarea>
                        <button class="delete-entry" data-index="${index}">Delete</button>
                    </div>`,
							)
							.join('')}
            ${this.experience.length < 3 ? `<button class="add-entry">Add Experience</button>` : ''}
        </div>`;
	}

	applyChanges(inputs) {
		const newExperience = [];
		const deleteIndices = new Set();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry') || [];
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const index = parseInt(button.dataset.index);
				deleteIndices.add(index);
				this.editable = true;
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.innerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});

		for (let i = 0, index = 0; i < inputs.length; i += 5, index++) {
			if (deleteIndices.has(index)) continue;
			const time = inputs[i]?.value || '';
			const position = inputs[i + 1]?.value || '';
			const company = inputs[i + 2]?.value || '';
			const schedule = inputs[i + 3]?.value || '';
			const tasks = inputs[i + 4]?.value
				? inputs[i + 4].value
						.split(',')
						.map((t) => t.trim())
						.filter((t) => t)
				: [];
			if (time || position) {
				newExperience.push({ time, position, company, schedule, tasks });
			}
		}

		if (this.experience.length < 3) {
			const addButton = this.root.querySelector(`#${this.id} .add-entry`);
			if (addButton) {
				addButton.addEventListener('click', () => {
					newExperience.push({ time: '', position: '', company: '', schedule: '', tasks: [] });
					this.experience = newExperience;
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			}
		}

		if (newExperience.length > 0) {
			this.experience = newExperience.slice(0, 3);
		}
	}

	attachEventListeners() {
		super.attachEventListeners();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry, .add-entry') || [];
		buttons.forEach((button) => {
			if (button.classList.contains('delete-entry')) {
				button.addEventListener('click', () => {
					const index = parseInt(button.dataset.index);
					this.experience.splice(index, 1);
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			} else if (button.classList.contains('add-entry')) {
				button.addEventListener('click', () => {
					if (this.experience.length < 3) {
						this.experience.push({ time: '', position: '', company: '', schedule: '', tasks: [] });
						this.editable = true;
						const boxElement = this.root.querySelector(`#${this.id}`);
						if (boxElement) {
							boxElement.innerHTML = this.getComponent();
							this.attachEventListeners();
						}
					}
				});
			}
		});
	}
}
