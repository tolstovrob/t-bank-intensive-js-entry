import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from '@/components/Grid';
import { Box } from '@/components/Box';
import { AvatarBox } from './components/AvatarBox';
import { InfoBox } from './components/InfoBox';
import { LanguagesBox } from './components/LanguagesBox';
import { EducationBox } from './components/EducationBox';

const boxesOptions = [
	{
		id: 'avatar',
		type: 'avatar',
		row: 1,
		col: 1,
		rows: 1,
		cols: 1,
		src: '/default.png',
	},
	{
		id: 'info',
		type: 'info',
		row: 1,
		col: 2,
		rows: 1,
		cols: 1,
		name: 'Karthik SR',
		position: 'UI/UX Designer',
	},
	{
		id: 'languages',
		type: 'languages',
		row: 1,
		col: 3,
		rows: 1,
		cols: 2,
		languages: {
			English: 100,
			Spanish: 90,
			French: 80,
		},
	},
	{
		id: 'education',
		type: 'education',
		row: 2,
		col: 1,
		rows: 2,
		cols: 2,
		schools: [
			{
				title: 'UI/UX',
				tags: ['#UX', '#UI', '#research', '#DesignSystem', '#Agile', '#wireframing', '#figma', '#IA'],
				school: 'Neoland',
				year: '2024',
			},
			{
				title: 'Product Designer',
				tags: ['#analytics', '#research', '#prototype', '#wireframes'],
				school: 'Coursera',
				year: '2022',
			},
			{
				title: 'Graphic Design',
				tags: ['#web', '#branding', '#illustration', '#adobe'],
				school: 'Cali Institute of the Arts',
				years: '2017-2021',
			},
		],
	},
	{ id: 'interests', type: 'interests', row: 2, col: 3, rows: 2, cols: 2 },
	{ id: 'contacts', type: 'contacts', row: 4, col: 3, rows: 1, cols: 2 },
	{ id: 'tools', type: 'tools', row: 5, col: 1, rows: 3, cols: 1 },
	{ id: 'experience', type: 'experience', row: 5, col: 2, rows: 3, cols: 3 },
];

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

	const grid = new Grid(root);
	grid.render();

	const boxes = createBoxes(grid.getSelfSelector());
	boxes.forEach((box) => box.render());
}

function createBoxes(root) {
	return boxesOptions.map((opts) => {
		const props = [root, opts];

		switch (opts.type) {
			case 'avatar':
				return new AvatarBox(...props);
			case 'info':
				return new InfoBox(...props);
			case 'languages':
				return new LanguagesBox(...props);
			case 'education':
				return new EducationBox(...props);
			default:
				return new Box(...props);
		}
	});
}

renderApp(document.querySelector('#app'));
