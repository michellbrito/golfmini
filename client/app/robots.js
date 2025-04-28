export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/legal/terms-conditions", "/legal/privacy-policy"],
    },
    sitemap: "https://golfmini.com/sitemap.xml",
  };
}
