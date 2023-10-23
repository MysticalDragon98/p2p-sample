import createP2PNode from "./createP2PNode.js";
import { $DHT_MODE, $P2P_HOSTS, $P2P_KNOWN_PEERS, $P2P_PORT, $P2P_PRIVKEY, $P2P_PUBKEY } from "../../env.js";
import { customLog, sequencialColor } from "termx";
import peerIdFromPrivKey from "./peerIdFromPrivKey.js";

export let $libp2p: Awaited<ReturnType<typeof createP2PNode>> = null as any;
const log = customLog(sequencialColor(), 'P2P');

export default async function initP2P () {
    const peerId = $P2P_PRIVKEY && $P2P_PUBKEY? await peerIdFromPrivKey($P2P_PUBKEY, $P2P_PRIVKEY) : null;

    $libp2p = await createP2PNode({
        peerId,
        listenAddresses: $P2P_HOSTS.map(host => `/ip4/${host}/tcp/${$P2P_PORT}`),
        peerAddresses: $P2P_KNOWN_PEERS,
        dhtMode: $DHT_MODE === "server"? "server" : "client"
    });

    if (!peerId) {
        log("Public Key:", "0x" + Buffer.from($libp2p.peerId.publicKey!).toString('hex'));
        log("Private Key:", "0x" + Buffer.from($libp2p.peerId.privateKey!).toString('hex'));
    }

    log(`P2P node created with addresses: ${$libp2p.getMultiaddrs()}`);
    log(`P2P node started!`);
    
    setInterval(async () => {
        const peers = await $libp2p.peerStore.all();
        
        log("PeerStore:", peers.map(peer => peer.id));
        await $libp2p.services.dht.refreshRoutingTable();
    }, 5000);
}
