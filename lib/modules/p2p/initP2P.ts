import { Libp2p } from "libp2p";
import createP2PNode from "./createP2PNode.js";
import { $P2P_HOSTS, $P2P_KNOWN_PEERS, $P2P_PORT } from "../../env.js";
import { customLog, sequencialColor } from "termx";

export let $libp2p: Awaited<ReturnType<typeof createP2PNode>> = null as any;
const log = customLog(sequencialColor(), 'P2P');
export default async function initP2P () {
    $libp2p = await createP2PNode(
        $P2P_HOSTS.map(host => `/ip4/${host}/tcp/${$P2P_PORT}`),
        $P2P_KNOWN_PEERS
    );

    log(`P2P node created with addresses: ${$libp2p.getMultiaddrs()}`);
    log(`P2P node started!`);
    
    setInterval(async () => {
        // log("WAN RoutingTable:", $libp2p.services.dht.wan.routingTable)
        // log("LAN RoutingTable:", $libp2p.services.dht.wan.routingTable)
    }, 1000);
}
