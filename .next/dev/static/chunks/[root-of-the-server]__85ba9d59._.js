(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/pages/404.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
'use client';
;
;
;
;
const Custom404 = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        className: "jsx-28e95085c80983d8",
                        children: "Page Not Found | AgeRanker Calculator"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/404.js",
                        lineNumber: 9,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "The page you're looking for doesn't exist. Return to our homepage to calculate your exact age with precision and privacy.",
                        className: "jsx-28e95085c80983d8"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/404.js",
                        lineNumber: 10,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "noindex, follow",
                        className: "jsx-28e95085c80983d8"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/404.js",
                        lineNumber: 14,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, maximum-scale=5",
                        className: "jsx-28e95085c80983d8"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/404.js",
                        lineNumber: 15,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/404.js",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-28e95085c80983d8" + " " + "notFoundPage",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "jsx-28e95085c80983d8" + " " + "notFoundMain",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-28e95085c80983d8" + " " + "notFoundContainer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-28e95085c80983d8" + " " + "notFoundCard",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "jsx-28e95085c80983d8" + " " + "notFoundHero",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "jsx-28e95085c80983d8" + " " + "notFoundTitle",
                                            children: "🧭 404 - Page Not Found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 25,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-28e95085c80983d8" + " " + "notFoundIntro",
                                            children: "Oops! The page you're looking for seems to have gone missing. Don't worry, we'll help you get back to calculating your exact age instantly."
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 26,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/404.js",
                                    lineNumber: 24,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "jsx-28e95085c80983d8" + " " + "notFoundSection",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-28e95085c80983d8" + " " + "aboutIcon",
                                            children: "🎯"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 33,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-28e95085c80983d8" + " " + "sectionTitle",
                                            children: "What Might Have Happened?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 34,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-28e95085c80983d8" + " " + "featuresGrid",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "🔍"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 37,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Page Moved or Deleted"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 38,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "The page may have been moved to a new location or temporarily removed during updates."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 39,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 36,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "⌨️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 43,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Typo in URL"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 44,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "There might be a small typo in the web address you entered."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 45,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 42,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "🔗"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 49,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Outdated Link"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 50,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "The link you followed could be from an older version of our site."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 51,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 48,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "🚧"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 55,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Temporary Update"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 56,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "We might be temporarily updating the page with new features."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 57,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 35,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/404.js",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "jsx-28e95085c80983d8" + " " + "notFoundSection lightBg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-28e95085c80983d8" + " " + "sectionTitle",
                                            children: "Get Back to Accurate Age Calculation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-28e95085c80983d8" + " " + "sectionText",
                                            children: [
                                                "While we fix this, why not calculate your exact age? Our tool is ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-28e95085c80983d8",
                                                    children: "100% private"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 66,
                                                    columnNumber: 84
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " - no data stored, no sign-up required, and everything happens in your browser."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-28e95085c80983d8" + " " + "privacyHighlight",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "jsx-28e95085c80983d8",
                                                children: "Your privacy matters: Zero data collection, instant calculation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/404.js",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-28e95085c80983d8" + " " + "featuresGrid",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "⚡"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 74,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Lightning Fast"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 75,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "Calculate your age in milliseconds — no loading, no delays."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 76,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 73,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "🛡"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 80,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Zero Data Collection"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 81,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "We never store, track, or share your birth date. Your data stays on your device."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 82,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 79,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "📱"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 86,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Fully Responsive"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 87,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "Works perfectly on phones, tablets, and desktops — no matter the screen size."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 88,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 85,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-28e95085c80983d8" + " " + "featureCard",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureIcon",
                                                            children: "🎯"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 92,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureH3",
                                                            children: "Precision Accuracy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 93,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-28e95085c80983d8" + " " + "featureP",
                                                            children: "Exact calculations down to the second — leap years included."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/404.js",
                                                            lineNumber: 94,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/404.js",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/404.js",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "jsx-28e95085c80983d8" + " " + "ctaSection",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            className: "ctaButton",
                                            children: "Calculate My Age Now"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-28e95085c80983d8" + " " + "ctaSubtext",
                                            children: "Free, private, and instant - discover your exact age with precision"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/404.js",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/404.js",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/404.js",
                            lineNumber: 21,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/404.js",
                        lineNumber: 20,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/pages/404.js",
                    lineNumber: 19,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/pages/404.js",
                lineNumber: 18,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "28e95085c80983d8",
                children: ".jsx-28e95085c80983d8:root{--primary-bg:#fff;--light-bg:#f8fafc;--text-primary:#374151;--text-secondary:#6b7280;--accent-color:#2563eb;--accent-hover:#1d4ed8;--border-color:#e5e7eb;--card-shadow:0 1px 3px 0 #0000001a,0 1px 2px 0 #0000000f;--card-shadow-hover:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}.notFoundPage.jsx-28e95085c80983d8{background-color:var(--primary-bg);color:var(--text-primary);flex-direction:column;min-height:100dvh;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.6;display:flex}.notFoundMain.jsx-28e95085c80983d8{flex:1;justify-content:center;align-items:flex-start;width:100%;margin-top:1rem;padding:1rem;display:flex}.notFoundContainer.jsx-28e95085c80983d8{width:100%;max-width:42rem;margin:0 auto}.notFoundCard.jsx-28e95085c80983d8{background:var(--primary-bg);border:1px solid var(--border-color);box-shadow:var(--card-shadow);box-sizing:border-box;border-radius:.75rem;width:100%;margin-top:1rem;padding:2rem}.notFoundHero.jsx-28e95085c80983d8{text-align:center;margin-bottom:2.5rem}.notFoundTitle.jsx-28e95085c80983d8{color:var(--text-primary);margin-bottom:1rem;font-size:1.875rem;font-weight:700;line-height:1.2}.notFoundIntro.jsx-28e95085c80983d8{color:var(--text-secondary);max-width:36rem;margin:0 auto;font-size:1.125rem;line-height:1.6}.notFoundSection.jsx-28e95085c80983d8{margin-bottom:2.5rem}.lightBg.jsx-28e95085c80983d8{background-color:var(--light-bg);border-radius:.5rem;margin:2.5rem -2rem;padding:2rem}.sectionTitle.jsx-28e95085c80983d8{color:var(--text-primary);text-align:center;margin-bottom:1rem;font-size:1.25rem;font-weight:600;line-height:1.4}.sectionText.jsx-28e95085c80983d8{color:var(--text-secondary);text-align:center;max-width:36rem;margin-bottom:1rem;margin-left:auto;margin-right:auto;line-height:1.6}.aboutIcon.jsx-28e95085c80983d8{text-align:center;margin-bottom:1rem;font-size:2rem}.featuresGrid.jsx-28e95085c80983d8{grid-template-columns:1fr;gap:1.5rem;margin-top:2rem;display:grid}.featureCard.jsx-28e95085c80983d8{background:var(--primary-bg);border:1px solid var(--border-color);text-align:center;box-shadow:var(--card-shadow);border-radius:.5rem;padding:1.5rem;transition:all .2s ease-in-out}.featureCard.jsx-28e95085c80983d8:hover{box-shadow:var(--card-shadow-hover);transform:translateY(-2px)}.featureIcon.jsx-28e95085c80983d8{margin-bottom:.75rem;font-size:1.5rem}.featureH3.jsx-28e95085c80983d8{color:var(--text-primary);margin-bottom:.5rem;font-size:1.125rem;font-weight:600}.featureP.jsx-28e95085c80983d8{color:var(--text-secondary);font-size:.875rem;line-height:1.5}.privacyHighlight.jsx-28e95085c80983d8{background-color:var(--light-bg);border-left:4px solid var(--accent-color);color:var(--text-primary);text-align:center;border-radius:0 .375rem .375rem 0;margin:1.5rem 0;padding:1rem 1.25rem}.ctaSection.jsx-28e95085c80983d8{text-align:center;margin-top:2.5rem}.ctaButton.jsx-28e95085c80983d8{background-color:var(--accent-color);color:#fff;cursor:pointer;border:none;border-radius:.5rem;justify-content:center;align-items:center;min-width:12rem;min-height:3rem;padding:.75rem 1.5rem;font-size:1rem;font-weight:500;text-decoration:none;transition:all .2s ease-in-out;display:inline-flex}.ctaButton.jsx-28e95085c80983d8:hover{background-color:var(--accent-hover);box-shadow:var(--card-shadow-hover);transform:translateY(-1px)}.ctaButton.jsx-28e95085c80983d8:active{transform:translateY(0)}.ctaSubtext.jsx-28e95085c80983d8{color:var(--text-secondary);margin-top:1rem;font-size:.875rem}@media (width<=374px){.notFoundMain.jsx-28e95085c80983d8{margin-top:.5rem;padding:.5rem}.notFoundCard.jsx-28e95085c80983d8{border-radius:.5rem;margin-top:.5rem;padding:1.25rem}.lightBg.jsx-28e95085c80983d8{margin:2rem -1.25rem;padding:1.25rem}.notFoundTitle.jsx-28e95085c80983d8{margin-bottom:.75rem;padding-top:.25rem;font-size:1.375rem}.notFoundIntro.jsx-28e95085c80983d8{font-size:.95rem}.sectionTitle.jsx-28e95085c80983d8{font-size:1.125rem}.ctaButton.jsx-28e95085c80983d8{width:100%;min-width:auto;padding:.875rem 1rem}.privacyHighlight.jsx-28e95085c80983d8{margin:1.25rem 0;padding:.875rem 1rem}.notFoundHero.jsx-28e95085c80983d8,.notFoundSection.jsx-28e95085c80983d8{margin-bottom:2rem}}@media (width>=375px) and (width<=424px){.notFoundMain.jsx-28e95085c80983d8{margin-top:.75rem;padding:.75rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:.75rem;padding:1.5rem}.lightBg.jsx-28e95085c80983d8{margin:2rem -1.5rem;padding:1.5rem}.notFoundTitle.jsx-28e95085c80983d8{padding-top:.5rem;font-size:1.5rem}}@media (width>=425px) and (width<=767px){.notFoundMain.jsx-28e95085c80983d8{margin-top:1rem;padding:1rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:1rem;padding:1.75rem}.lightBg.jsx-28e95085c80983d8{margin:2rem -1.75rem;padding:1.75rem}.notFoundTitle.jsx-28e95085c80983d8{padding-top:.5rem;font-size:1.625rem}}@media (width>=768px) and (width<=1023px){.notFoundMain.jsx-28e95085c80983d8{align-items:center;margin-top:1.5rem;padding:1.5rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:0;padding:2.5rem}.lightBg.jsx-28e95085c80983d8{margin:2.5rem -2.5rem;padding:2.5rem}.featuresGrid.jsx-28e95085c80983d8{grid-template-columns:1fr 1fr;gap:1.5rem}.notFoundTitle.jsx-28e95085c80983d8{padding-top:0;font-size:2rem}.notFoundIntro.jsx-28e95085c80983d8{font-size:1.125rem}.sectionTitle.jsx-28e95085c80983d8{font-size:1.375rem}.ctaButton.jsx-28e95085c80983d8{min-height:3.5rem;padding:1rem 2rem;font-size:1.125rem}}@media (width>=1024px) and (width<=1439px){.notFoundMain.jsx-28e95085c80983d8{align-items:center;margin-top:2rem;padding:2rem}.notFoundContainer.jsx-28e95085c80983d8{max-width:48rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:0;padding:3rem}.lightBg.jsx-28e95085c80983d8{margin:3rem -3rem;padding:3rem}.featuresGrid.jsx-28e95085c80983d8{grid-template-columns:1fr 1fr;gap:2rem}.notFoundTitle.jsx-28e95085c80983d8{padding-top:0;font-size:2.25rem}.notFoundIntro.jsx-28e95085c80983d8{font-size:1.25rem}.sectionTitle.jsx-28e95085c80983d8{font-size:1.5rem}}@media (width>=1440px){.notFoundMain.jsx-28e95085c80983d8{align-items:center;margin-top:2.5rem;padding:2.5rem}.notFoundContainer.jsx-28e95085c80983d8{max-width:56rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:0;padding:3.5rem}.lightBg.jsx-28e95085c80983d8{margin:3.5rem -3.5rem;padding:3.5rem}.featuresGrid.jsx-28e95085c80983d8{grid-template-columns:1fr 1fr;gap:2rem}.notFoundTitle.jsx-28e95085c80983d8{padding-top:0;font-size:2.5rem}.notFoundIntro.jsx-28e95085c80983d8{font-size:1.375rem}.sectionTitle.jsx-28e95085c80983d8{font-size:1.5rem}.ctaButton.jsx-28e95085c80983d8{min-height:3.75rem;padding:1.125rem 2.25rem;font-size:1.125rem}}@media (prefers-reduced-motion:reduce){.ctaButton.jsx-28e95085c80983d8,.featureCard.jsx-28e95085c80983d8{transition:none}.ctaButton.jsx-28e95085c80983d8:hover,.featureCard.jsx-28e95085c80983d8:hover{transform:none}}@media (prefers-color-scheme:dark){.jsx-28e95085c80983d8:root{--primary-bg:#1f2937;--light-bg:#374151;--text-primary:#f9fafb;--text-secondary:#d1d5db;--border-color:#374151;--card-shadow:0 1px 3px 0 #0000004d,0 1px 2px 0 #0003;--card-shadow-hover:0 4px 6px -1px #0000004d,0 2px 4px -1px #0003}.privacyHighlight.jsx-28e95085c80983d8{border-left-color:var(--accent-color);background-color:#4b5563}}@media (prefers-contrast:high){.ctaButton.jsx-28e95085c80983d8{border:2px solid}.notFoundCard.jsx-28e95085c80983d8,.featureCard.jsx-28e95085c80983d8{border-width:2px}.privacyHighlight.jsx-28e95085c80983d8{border-width:3px}}.ctaButton.jsx-28e95085c80983d8:focus-visible{outline:2px solid var(--accent-color);outline-offset:2px}@media (hover:none) and (pointer:coarse){.ctaButton.jsx-28e95085c80983d8:hover,.featureCard.jsx-28e95085c80983d8:hover{transform:none}.ctaButton.jsx-28e95085c80983d8:active{transform:scale(.98)}}@media (height<=500px) and (orientation:landscape){.notFoundMain.jsx-28e95085c80983d8{align-items:flex-start;margin-top:.75rem;padding:.75rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:.5rem;padding:1.25rem}.lightBg.jsx-28e95085c80983d8{margin:1.5rem -1.25rem;padding:1.25rem}.notFoundHero.jsx-28e95085c80983d8,.notFoundSection.jsx-28e95085c80983d8{margin-bottom:1.25rem}.notFoundTitle.jsx-28e95085c80983d8{padding-top:.25rem;font-size:1.5rem}}@media (height<=400px){.notFoundMain.jsx-28e95085c80983d8{align-items:flex-start;margin-top:.5rem;padding-top:1rem}.notFoundCard.jsx-28e95085c80983d8{margin-top:.5rem;padding:1rem}.lightBg.jsx-28e95085c80983d8{margin:1.5rem -1rem;padding:1rem}.notFoundTitle.jsx-28e95085c80983d8{margin-bottom:.5rem;padding-top:.25rem;font-size:1.375rem}.notFoundIntro.jsx-28e95085c80983d8{margin-bottom:1rem;font-size:.95rem}}@supports (padding:max(0px)){.notFoundMain.jsx-28e95085c80983d8{padding-left:max(1rem,env(safe-area-inset-left));padding-right:max(1rem,env(safe-area-inset-right));padding-top:max(1rem,env(safe-area-inset-top))}}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_c = Custom404;
const __TURBOPACK__default__export__ = Custom404;
var _c;
__turbopack_context__.k.register(_c, "Custom404");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/404.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/404";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/404.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/404\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/404.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__85ba9d59._.js.map