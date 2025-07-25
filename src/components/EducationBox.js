import { Box } from './Box';

export class EducationBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.schools = options.schools || [];
		this.sortSchoolsByYear();
	}

	sortSchoolsByYear() {
		const currentYear = new Date(Date.now()).getFullYear();
		this.schools.sort((s1, s2) => {
			const toCompareS1 = s1.year ?? Math.max(...(s1.years?.split('-') || [currentYear])) ?? currentYear;
			const toCompareS2 = s2.year ?? Math.max(...(s2.years?.split('-') || [currentYear])) ?? currentYear;
			return toCompareS2 - toCompareS1;
		});
	}

	getInnerComponent() {
		return `<div class="education">
            <h1>Education</h1>
            <div>
                ${this.schools
									.map(
										(school, index) => `<div style="${
											index === 0
												? `background-color: rgb(var(--accent-bg-color));
                                    color: rgb(var(--accent-fg-color));`
												: `background-color: rgb(var(--default-bg-color));
                                    color: rgb(var(--default-fg-color));`
										}">
                        <div class="year">
                            <span>${school.year ?? school.years}</span>
                            <div style="${index === 0 ? '' : 'display: none;'}">
                                <svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                            </div>
                        </div>
                        <h1 class="title">${school.title}</h1>
                        <div class="tags" style="color: ${
													index === 0 ? 'rgb(var(--accent-fg-color));' : 'rgb(var(--accent-bg-color));'
												}">${school.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
                        <p class="school">${school.school}</p>
                    </div>`,
									)
									.join('')}	
            </div>
        </div>`;
	}

	getEditableComponent() {
		return `<div class="editable">
            <h1>Edit Education</h1>
            ${this.schools
							.map(
								(school, index) => `<div class="entry" data-index="${index}">
                        <input type="text" name="title-${index}" value="${school.title}" placeholder="Title" />
                        <input type="text" name="tags-${index}" value="${school.tags.slice(0, 10).join(', ')}" placeholder="Tags (comma-separated, max 10)" />
                        <input type="text" name="school-${index}" value="${school.school}" placeholder="School" />
                        <input type="text" name="year-${index}" value="${school.year || school.years || ''}" placeholder="Year or Years" />
                        <button class="delete-entry" data-index="${index}">Delete</button>
                    </div>`,
							)
							.join('')}
            ${this.schools.length < 3 ? `<button class="add-entry">Add Education</button>` : ''}
        </div>`;
	}

	applyChanges(inputs) {
		const newSchools = [];
		const deleteIndices = new Set();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry') || [];
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const index = parseInt(button.dataset.index);
				deleteIndices.add(index);
				this.editable = true; // Keep editable to re-render form
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.innerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});

		for (let i = 0, index = 0; i < inputs.length; i += 4, index++) {
			if (deleteIndices.has(index)) continue;
			const title = inputs[i]?.value || '';
			const tags = inputs[i + 1]?.value
				? inputs[i + 1].value
						.split(',')
						.map((t) => t.trim())
						.filter((t) => t)
						.slice(0, 10)
				: [];
			const school = inputs[i + 2]?.value || '';
			const year = inputs[i + 3]?.value || '';
			if (title || school || year) {
				newSchools.push({ title, tags, school, year });
			}
		}

		if (this.schools.length < 3) {
			const addButton = this.root.querySelector(`#${this.id} .add-entry`);
			if (addButton) {
				addButton.addEventListener('click', () => {
					newSchools.push({ title: '', tags: [], school: '', year: '' });
					this.schools = newSchools;
					this.sortSchoolsByYear();
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			}
		}

		if (newSchools.length > 0) {
			this.schools = newSchools.slice(0, 3);
			this.sortSchoolsByYear();
		}
	}

	attachEventListeners() {
		super.attachEventListeners();
		const buttons = this.root.querySelector(`#${this.id}`)?.querySelectorAll('.delete-entry, .add-entry') || [];
		buttons.forEach((button) => {
			if (button.classList.contains('delete-entry')) {
				button.addEventListener('click', () => {
					const index = parseInt(button.dataset.index);
					this.schools.splice(index, 1);
					this.editable = true;
					const boxElement = this.root.querySelector(`#${this.id}`);
					if (boxElement) {
						boxElement.innerHTML = this.getComponent();
						this.attachEventListeners();
					}
				});
			} else if (button.classList.contains('add-entry')) {
				button.addEventListener('click', () => {
					if (this.schools.length < 3) {
						this.schools.push({ title: '', tags: [], school: '', year: '' });
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
