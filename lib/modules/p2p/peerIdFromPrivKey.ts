import { peerIdFromKeys } from "@libp2p/peer-id";

export default async function peerIdFromPrivKey (publicKey: string, privateKey: string) {
    const pubKey = Uint8Array.from(Buffer.from(publicKey.substring(2), "hex"));
    const privKey = Uint8Array.from(Buffer.from(privateKey.substring(2), "hex"));
    
    return await peerIdFromKeys(pubKey, privKey);
}
