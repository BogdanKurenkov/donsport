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
        partners: "partners.html",
      },
    },
  },
});
