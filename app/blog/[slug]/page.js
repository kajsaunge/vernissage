import { fetchPageBlocks, fetchPageBySlug, notion } from "@/app/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function Page({ params }) {
  const post = await fetchPageBySlug(params?.slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin());
  renderer.use(bookmarkPlugin());

  const html = await renderer.render(...blocks);
  console.log("html:", html);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
}
