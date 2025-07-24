import { Box } from './Box';

export class ToolsBox extends Box {
	constructor(root, options) {
		super(root, options);
	}

	getInnerComponent() {
		return `<div class="tools">
      <h1>Tools</h1>
      <div>
        <div>
          <h2>design</h2>
        </div>
        <img src="/logoFigma.svg" alt="Figma logo" />
        <img src="/logoCreativeCloud.svg" alt="CreativeCloud logo" />
        <img src="/logoMiro 1.svg" alt="Miro logo" />
        <img src="/logoNotion.svg" alt="Notion logo" />
        <img src="/logoMeet.svg" alt="Meet logo" />
        <img src="/logoanalytics.svg" alt="Analytics logo" />
      </div>
      <div>
        <div>
          <h2>no-code</h2>
        </div>
        <img src="/logoZapier 1.svg" alt="Zapier logo" />
        <img src="/logoWebflow.svg" alt="Webflow logo" />
        <img src="/logoFramer.svg" alt="Framer logo" />
        <img src="/logoWordpress.svg" alt="Wordpress logo" />
      </div>
      <div>
        <div>
          <h2>artificial intelligence</h2>
        </div>
        <img src="/logoChatGPT 1.svg" alt="ChatGPT logo" />
        <img src="/logoCopilot 1.svg" alt="Copilot logo" />
        <img src="/logoMidjourney 1.svg" alt="Midjourney logo" />
      </div>
    </div>`;
	}
}
