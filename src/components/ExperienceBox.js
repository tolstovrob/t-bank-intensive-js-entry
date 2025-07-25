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

	getEditableComponent() {
		const exp = this.experience[0] || { time: '', position: '', company: '', schedule: '', tasks: [] };
		return `<div class="editable">
            <h1>Edit Experience (First Entry)</h1>
            <input type="text" name="time" value="${exp.time}" placeholder="Time (e.g., Jul. 2023 - Jul. 2024)" />
            <input type="text" name="position" value="${exp.position}" placeholder="Position" />
            <input type="text" name="company" value="${exp.company ?? ''}" placeholder="Company" />
            <input type="text" name="schedule" value="${exp.schedule ?? ''}" placeholder="Schedule" />
            <textarea name="tasks" placeholder="Tasks (comma-separated)">${exp.tasks.join(', ')}</textarea>
        </div>`;
	}

	applyChanges(inputs) {
		const [time, position, company, schedule, tasks] = inputs;
		if (time.value || position.value) {
			this.experience[0] = {
				time: time.value || this.experience[0]?.time || '',
				position: position.value || this.experience[0]?.position || '',
				company: company.value || this.experience[0]?.company || '',
				schedule: schedule.value || this.experience[0]?.schedule || '',
				tasks: tasks.value
					? tasks.value
							.split(',')
							.map((t) => t.trim())
							.filter((t) => t)
					: this.experience[0]?.tasks || [],
			};
		}
	}
}
