import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "index.html",
        clubs: "clubs.html",
        clubsAtlant: "clubs-atlant.html",
        clubsAtmosphere: "clubs-atmosphere.html",
        clubsBirusova: "clubs-birusova.html",
        clubsHamovniki: "clubs-hamovniki.html",
        clubsSails: "clubs-sails.html",
        ourClubs: "our-clubs.html",
        team: "team.html",
        reviews: "reviews.html",
        fitnes: "fitnes.html",
        servicesDetail: "services-detail.html",
        widget: "widget.html", // test widget
        // partners: "partners.html",
        investors: "investors.html",
        contacts: "contacts.html",
        subscription: "subscription.html",
        subscriptionDetail: "subscription-detail.html",
        blog: "blog.html",
        blogDetail: "blog-detail.html",
        news: "news.html",
        newsDetail: "news-detail.html",
        promotions: "promotions.html",
      },
    },
  },
});
