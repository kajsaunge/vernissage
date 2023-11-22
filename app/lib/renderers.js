import { NotionRenderer, createBlockRenderer } from '@notion-render/client';

// wip
const paragraphRenderer = createBlockRenderer('paragraph', (data, renderer) => {
  return `<p>${renderer.render(...data.paragraph.rich_text)}</p>`;
});

export const renderers = new NotionRenderer({
  renderers: [paragraphRenderer],
});
