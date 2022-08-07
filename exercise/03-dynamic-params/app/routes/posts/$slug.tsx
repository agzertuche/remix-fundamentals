import { getPost } from "~/models/post.server";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";

export async function loader({ params }: LoaderArgs) {
  if (!params.slug) {
    throw new Error("Missing params");
  }
  const post = await getPost(params.slug);
  if (!post) {
    throw new Error("No post found");
  }
  const html = marked(post.markdown);
  return json({ title: post.title, html });
}

export default function SlugRoute() {
  const { title, html } = useLoaderData<typeof loader>();
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="my-6 text-3xl text-center border-b-2">{title}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }}></article>
    </main>
  );
}
