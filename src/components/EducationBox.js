import { Box } from './Box';

export class EducationBox extends Box {
	constructor(root, options) {
		super(root, options);
		this.schools = options.schools;
		this.sortSchoolsByYear();
	}

	sortSchoolsByYear() {
		const currentYear = new Date(Date.now()).getFullYear();
		this.schools.sort((s1, s2) => {
			const toCompareS1 = s1.year ?? Math.max(...s1.years.split('-')) ?? currentYear,
				toCompareS2 = s2.year ?? s2.years.split('-').at(-1) ?? currentYear;
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
}
