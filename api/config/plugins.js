module.exports = {
  "strapi-neon-tech-db-branches": {
    enabled: true,
    config: {
      neonApiKey:
        "74qvlg5cwikzwtr1syuw53b5gl5dp0l3p4dc3vs4pp88nt73tikotjityox76w3e", // get it from here: https://console.neon.tech/app/settings/api-keys
      neonProjectName: "susurros", // the neon project under wich your DB runs
      neonRole: "neondb_owner", // create it manually under roles for your project first
      gitBranch: "main", // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
    },
  },
};
