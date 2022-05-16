## Introduction


## Getting started

```bash
node -v
# v16.14.2
npm -v
# 8.5.0
cd cmdb_frontend
npm install
# develop
npm run dev
```

This will automatically open http://localhost:9527

## Build

```bash
# build for test environment
npm run build:stage
# build for production environment
npm run build:prod
```
## Advanced

```bash
# preview the release environment effect
npm run preview
# preview the release environment effect + static resource analysis
npm run preview -- --report
# code format check
npm run lint
# code format check and auto fix
npm run lint -- --fix
```
# test