import '@/main.css';
import { Navbar } from '@/components/Navbar';
import { Grid } from '@/components/Grid';
import { Box } from '@/components/Box';
import { AvatarBox } from '@/components/AvatarBox';
import { InfoBox } from '@/components/InfoBox';
import { LanguagesBox } from '@/components/LanguagesBox';
import { EducationBox } from '@/components/EducationBox';
import { InterestsBox } from '@/components/InterestsBox';
import { ContactsBox } from '@/components/ContactsBox';
import { ToolsBox } from '@/components/ToolsBox';
import { ExperienceBox } from '@/components/ExperienceBox';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
		],
	},
	{
		id: 'interests',
		type: 'interests',
		row: 2,
		col: 3,
		rows: 1,
		cols: 2,
		tags: [
			'branding',
			'design',
			'photography',
			'artificial intelligence',
			'illustration',
			'typography',
			'social networks',
			'research',
			'drone pilot',
			'games',
		],
	},
	{
		id: 'contacts',
		type: 'contacts',
		row: 3,
		col: 3,
		rows: 1,
		cols: 2,
		email: 'srkarthik.designscape@gmail.com',
		phone: '+7-000-000-00-00',
	},
	{
		id: 'tools',
		type: 'tools',
		row: 4,
		col: 1,
		rows: 3,
		cols: 1,
		tools: [
			{ name: 'Figma', icon: '/logoFigma.svg' },
			{ name: 'CreativeCloud', icon: '/logoCreativeCloud.svg' },
			{ name: 'Miro', icon: '/logoMiro 1.svg' },
			{ name: 'Notion', icon: '/logoNotion.svg' },
			{ name: 'Meet', icon: '/logoMeet.svg' },
			{ name: 'Analytics', icon: '/logoanalytics.svg' },
			{ name: 'Zapier', icon: '/logoZapier 1.svg' },
			{ name: 'Webflow', icon: '/logoWebflow.svg' },
			{ name: 'Framer', icon: '/logoFramer.svg' },
			{ name: 'Wordpress', icon: '/logoWordpress.svg' },
			{ name: 'ChatGPT', icon: '/logoChatGPT 1.svg' },
			{ name: 'Copilot', icon: '/logoCopilot 1.svg' },
			{ name: 'Midjourney', icon: '/logoMidjourney 1.svg' },
		],
	},
	{
		id: 'experience',
		type: 'experience',
		row: 4,
		col: 2,
		rows: 3,
		cols: 3,
		experience: [
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
		],
	},
];

function renderApp(root) {
	const navbar = new Navbar(root);
	navbar.render();

	const grid = new Grid(root);
	grid.render();

	const boxes = createBoxes(grid.getSelfSelector());
	boxes.forEach((box) => box.render());

	document.getElementById('export-pdf').addEventListener('click', () => exportToPDF(boxes, grid.getSelfSelector()));
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
			case 'interests':
				return new InterestsBox(...props);
			case 'contacts':
				return new ContactsBox(...props);
			case 'tools':
				return new ToolsBox(...props);
			case 'experience':
				return new ExperienceBox(...props);
			default:
				return new Box(...props);
		}
	});
}

async function exportToPDF(boxes, gridSelector) {
	try {
		const doc = new jsPDF({
			orientation: 'portrait',
			unit: 'px',
			format: 'a4',
		});

		boxes.forEach((box) => box.disableEditing());

		const mainElement = gridSelector;
		if (!mainElement) throw new Error('Grid element not found');

		// Preserve original styles
		const originalStyles = {
			display: mainElement.style.display,
			width: mainElement.style.width,
			height: mainElement.style.height,
			padding: mainElement.style.padding,
			margin: mainElement.style.margin,
		};

		// Get original dimensions
		const originalWidth = mainElement.offsetWidth;
		const originalHeight = mainElement.offsetHeight;
		console.log('Original dimensions:', { width: originalWidth, height: originalHeight });

		// Calculate scale to fit both width and height within A4
		const pageWidth = 595; // A4 width
		const pageHeight = 842; // A4 height
		const margin = 10;
		const availableWidth = pageWidth - 2 * margin; // 575px
		const availableHeight = pageHeight - 2 * margin; // 822px

		const scale = Math.min(availableWidth / originalWidth, availableHeight / originalHeight);
		const scaledWidth = originalWidth * scale;
		const scaledHeight = originalHeight * scale;
		console.log('Scaled dimensions:', { scale, scaledWidth, scaledHeight });

		// Ensure styles are applied for canvas
		mainElement.style.position = 'relative';
		mainElement.style.backgroundColor = '#fff';

		// Force reflow
		await new Promise((resolve) => setTimeout(resolve, 0));

		const canvas = await html2canvas(mainElement, {
			scale: 1, // Preserve original look
			useCORS: true,
			logging: true,
			backgroundColor: '#fff',
			width: originalWidth,
			height: originalHeight,
		});

		console.log('Canvas dimensions:', { width: canvas.width, height: canvas.height });

		const imgData = canvas.toDataURL('image/png');
		const xOffset = (pageWidth - scaledWidth) / 2; // Center horizontally
		const yOffset = (pageHeight - scaledHeight) / 2; // Center vertically

		// Add image with scaled dimensions to fit fully
		doc.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);
		doc.save('resume.pdf');

		// Restore original styles
		Object.assign(mainElement.style, originalStyles);
	} catch (error) {
		console.error('Error exporting to PDF:', error);
		alert('Failed to export PDF. Check console for details.');
	}
}

renderApp(document.querySelector('#app'));
