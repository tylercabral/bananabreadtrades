import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites links like /css/site.css so they work when the site lives in a subfolder (GitHub Pages)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Copy images and CSS straight through to the built site
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");

  // Journal entries: every .md file in src/journal, newest first
  // Published entries (not drafts, not "coming soon"), newest first
  eleventyConfig.addCollection("journal", (api) =>
    api.getFilteredByGlob("src/journal/*.md").filter((p) => !p.data.draft && !p.data.comingSoon).sort((a, b) => b.date - a.date)
  );
  // Everything for the writing lists: published entries first, then "coming soon" titles in their `order`
  eleventyConfig.addCollection("writing", (api) => {
    const all = api.getFilteredByGlob("src/journal/*.md").filter((p) => !p.data.draft);
    const live = all.filter((p) => !p.data.comingSoon).sort((a, b) => b.date - a.date);
    const soon = all.filter((p) => p.data.comingSoon).sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
    return [...live, ...soon];
  });
  // Plays: every .md file in src/playbook, in the order you set with `order:`
  eleventyConfig.addCollection("plays", (api) =>
    api.getFilteredByGlob("src/playbook/*.md").sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  // Date formats: "Aug 14, 2026" and "Aug 14"
  const fmt = (d, opts) => new Date(d).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
  eleventyConfig.addFilter("longDate", (d) => fmt(d, { month: "short", day: "numeric", year: "numeric" }));
  eleventyConfig.addFilter("shortDate", (d) => fmt(d, { month: "short", day: "numeric" }));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("byBias", (plays, bias) => plays.filter((p) => p.data.bias === bias));
  // Recaps that use a given play
  eleventyConfig.addFilter("byPlay", (posts, slug) => posts.filter((p) => p.data.play === slug));
  eleventyConfig.addFilter("findPlay", (plays, slug) => plays.find((p) => p.fileSlug === slug));

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    // Set automatically by the GitHub deploy workflow; leave blank for local preview
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
