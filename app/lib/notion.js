import 'server-only';

import { Client } from '@notionhq/client';
import React from 'react';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
});

export const fetchPageBySlug = React.cache((slug) => {
  return notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0]);
});

export const fetchPageBlocks = React.cache((pageId) => {
  return notion.blocks.children
    .list({ block_id: pageId })
    .then((res) => res.results);
});
