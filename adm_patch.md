Add the following to package.json:

{
  "scripts": {
    "predev": "ts-node scripts/generate_cockpit.ts",
    "prebuild": "ts-node scripts/generate_cockpit.ts"
  }
}

