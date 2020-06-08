Reproduces a TS 3.8+ issue where new files in watched directories are not registered as belonging to a composite project.

See https://github.com/microsoft/TypeScript/issues/38976.

The `build-watch.js` file shows the scenario where a composite project is compiled with the solution builder.

- `npm install`
- `node build-watch`

After `src/bar.ts` has been added and imported, TS will give the following error

```
src/main.ts(2,8): error TS6307: File '.../ts-build-repro/src/bar.ts' is not listed within the file list of project '.../ts-build-repro/src/tsconfig.json'. Projects must list all files or use an 'include' pattern.
```

The `program-watch.js` file shows the scenario where a composite project is compiled normally.

- `npm install`
- `node build-watch`

In the latter scenario, the error message is only shown briefly before getting compiled correctly.

I believe the issue was introduced by https://github.com/microsoft/TypeScript/pull/35615, as things worked in TS 3.7, and adding `watchDirectories: false` works around the problem.
