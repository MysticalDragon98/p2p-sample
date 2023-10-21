//* Imports

import initP2P from "./lib/modules/p2p/initP2P.js";

async function main () {
    await Promise.all([
        initP2P()
    ]);
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);