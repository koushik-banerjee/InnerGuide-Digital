module.exports = [
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/lib/socket.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIO",
    ()=>getIO,
    "initSocket",
    ()=>initSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/socket.io/wrapper.mjs [app-route] (ecmascript)");
;
let io;
const initSocket = (httpServer)=>{
    io = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Server"](httpServer, {
        cors: {
            origin: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'http://localhost:3000',
            credentials: true
        }
    });
    io.on('connection', (socket)=>{
        console.log('[Socket.io] User connected:', socket.id);
        socket.on('user:join', (userId)=>{
            socket.userId = userId;
            socket.join(`user:${userId}`);
            console.log('[Socket.io] User joined room:', `user:${userId}`);
        });
        socket.on('booking:created', (data)=>{
            io.to(`user:${data.counselorId}`).emit('notification:new', {
                type: 'booking',
                message: 'New appointment booking received',
                data
            });
        });
        socket.on('forum:reply', (data)=>{
            io.to(`thread:${data.threadId}`).emit('notification:thread', {
                type: 'new_reply',
                message: 'New reply in discussion',
                data
            });
        });
        socket.on('counselor:status', (data)=>{
            io.emit('status:updated', {
                counselorId: data.counselorId,
                status: data.status
            });
        });
        socket.on('disconnect', ()=>{
            console.log('[Socket.io] User disconnected:', socket.id);
        });
    });
    return io;
};
const getIO = ()=>{
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba9c3d9a._.js.map