const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "vub9ur",
  e2e: {
      
      // implement Base url here
      baseUrl:"https://sohan.dina.app",
      experimentalRunAllSpecs: true

    },



  },
);
