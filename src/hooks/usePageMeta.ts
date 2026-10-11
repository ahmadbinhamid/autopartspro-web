// src/hooks/usePageMeta.ts
// Per-page title, description and canonical for non-home routes.
import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/constants/seo";

function setHeadContent(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector(selector);
  if (!el) return () => {};
  const previous = el.getAttribute(attr) ?? "";
  el.setAttribute(attr, value);
  return () => el.setAttribute(attr, previous);
}

export function usePageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${SITE_NAME}`;
    // index.html's canonical points at "/"; leaving it would deindex this page.
    const restores = [
      setHeadContent('meta[name="description"]', "content", description),
      setHeadContent('link[rel="canonical"]', "href", `${SITE_URL}${path}`),
      setHeadContent('meta[property="og:url"]', "content", `${SITE_URL}${path}`),
    ];
    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
    };
  }, [title, description, path]);
}
