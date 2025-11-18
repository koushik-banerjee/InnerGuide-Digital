module.exports = [
"[project]/lib/socket.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/node_modules_4fc1b463._.js",
  "server/chunks/[root-of-the-server]__ba9c3d9a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/socket.ts [app-route] (ecmascript)");
    });
});
}),
];