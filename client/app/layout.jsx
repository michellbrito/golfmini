import { Provider } from "@/components/ui/provider";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "GolfiMini",
  description:
    "Find the best mini golf courses near you with GolfMini. Explore top-rated locations, reviews, and ratings to plan your next fun outing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        type="text/javascript"
      >
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "qt0vudkdqf");
        `}
      </Script>
      <script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="/HDXXWP6WZ4f88SuJCf/qQ"
        async
      ></script>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
