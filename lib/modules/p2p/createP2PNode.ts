import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { MemoryDatastore } from "datastore-core";
import { createLibp2p } from "libp2p";
import { tcp } from "@libp2p/tcp";
import { bootstrap } from '@libp2p/bootstrap';
import { identifyService } from 'libp2p/identify';
import { kadDHT } from "@libp2p/kad-dht";
import { $DHT_MODE } from '../../env.js';

export default async function createP2PNode (listeningAddresses: string[], peerAddresses: string[]) {
    const datastore = new MemoryDatastore();
    const libp2p = await createLibp2p({
        datastore,
        addresses: {
            listen: listeningAddresses
        },
        transports: [
            tcp()
        ],
        connectionEncryption: [
            noise()
        ],
        streamMuxers: [
            yamux()
        ],
        peerDiscovery: peerAddresses.length > 0? [
            bootstrap({
                list: peerAddresses
            })
        ] : [],

        services: {
            identify: identifyService(),
            dht: kadDHT({
                clientMode: $DHT_MODE !== "server"
            })
        }
    });

    /*libp2p.addEventListener('peer:discovery', async (evt: any) => {
        console.log(`Discovered:`, evt.detail);
    });*/

    return libp2p;
}
