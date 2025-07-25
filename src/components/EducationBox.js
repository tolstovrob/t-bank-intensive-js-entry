import { Box } from './Box';

export class EducationBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.schools = options.schools || [
			{
				title: 'UI/UX',
				tags: ['UX', 'UI', 'research', 'DesignSystem', 'Agile', 'wireframing', 'figma', 'IA'],
				school: 'Neoland',
				year: '2024',
			},
			{
				title: 'Product Designer',
				tags: ['analytics', 'research', 'prototype', 'wireframes'],
				school: 'Coursera',
				year: '2022',
			},
			{
				title: 'Graphic Design',
				tags: ['web', 'branding', 'illustration', 'adobe'],
				school: 'Cali Institute of the Arts',
				year: '2017-2021',
			},
		];
		const savedState = this.loadState();
		if (savedState && savedState.schools) {
			this.schools = savedState.schools;
		}
	}

	getInnerComponent() {
		return `
            <div class="education">
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
		</div>
        `;
	}

	getEditableComponent() {
		return `
            <div class="editable">
                <h1>Edit Education</h1>
                ${this.schools
									.map(
										(school, index) => `
                    <div class="entry" data-index="${index}">
                        <input type="text" name="school-title-${index}" value="${school.title}" placeholder="Title" />
                        <input type="text" name="school-school-${index}" value="${school.school}" placeholder="School" />
                        <input type="text" name="school-year-${index}" value="${school.year}" placeholder="Year" />
                        <input type="text" name="school-tags-${index}" value="${school.tags.join(', ')}" placeholder="Tags (comma-separated)" />
                        <button class="delete-entry" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </button>
                    </div>
                `,
									)
									.join('')}
                ${
									this.schools.length < 3
										? `
                    <div class="action-buttons">
                        <button class="add-entry">Add School</button>
                    </div>
                `
										: ''
								}
            </div>
        `;
	}

	saveState() {
		localStorage.setItem(`box-${this.id}`, JSON.stringify({ schools: this.schools }));
	}

	loadState() {
		const state = super.loadState();
		return state || { schools: this.schools };
	}

	applyChanges(inputs) {
		const newSchools = [];
		for (let i = 0; i < inputs.length; i += 4) {
			const title = inputs[i].value.trim();
			const school = inputs[i + 1].value.trim();
			const year = inputs[i + 2].value.trim();
			const tags = inputs[i + 3].value
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag)
				.slice(0, 10);
			if (title && school && year) {
				newSchools.push({ title, school, year, tags });
			}
		}
		this.schools = newSchools.slice(0, 3);
		this.saveState();
	}

	attachEventListeners() {
		super.attachEventListeners();
		const addButton = this.root.querySelector(`#${this.id} .add-entry`);
		if (addButton) {
			addButton.addEventListener('click', () => {
				if (this.schools.length < 3) {
					this.schools.push({ title: '', school: '', year: '', tags: [] });
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
				this.schools.splice(index, 1);
				const boxElement = this.root.querySelector(`#${this.id}`);
				if (boxElement) {
					boxElement.outerHTML = this.getComponent();
					this.attachEventListeners();
				}
			});
		});
	}
}
