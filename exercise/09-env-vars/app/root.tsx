import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { getEnv } from "../../../final/10-admin-user/app/env.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "FEM Remix Workshop",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
    // 🐨 add ENV to this object and assign it to getEnv() from './env.server'
    ENV: getEnv(),
  });
}

export default function App() {
  // 🐨 get data from the loader with useLoaderData
  const { ENV } = useLoaderData();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {/* 🐨 add a script with dangerouslySetInnerHTML so the client will have a global ENV via window.ENV */}
        {/* 💰 use JSON.stringify */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)};`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}
