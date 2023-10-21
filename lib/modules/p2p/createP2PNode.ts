import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { MemoryDatastore } from "datastore-core";
import { createLibp2p } from "libp2p";
import { tcp } from "@libp2p/tcp";
import { bootstrap } from '@libp2p/bootstrap';
import { identifyService } from 'libp2p/identify';

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
            identify: identifyService()
        }
    });

    return libp2p;
}
