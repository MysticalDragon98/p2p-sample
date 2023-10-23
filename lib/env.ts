import { config } from "dotenv";
import { ok } from "assert";

config();

ok(process.env.P2P_HOSTS, 'Missing required environment variable: P2P_HOSTS');
export const $P2P_HOSTS = process.env.P2P_HOSTS!.split(',').map(host => host.trim());
ok(process.env.P2P_PORT, 'Missing required environment variable: P2P_PORT');
export const $P2P_PORT = process.env.P2P_PORT!;
export const $P2P_KNOWN_PEERS = process.env.P2P_KNOWN_PEERS!? process.env.P2P_KNOWN_PEERS!.split(',').map(peer => peer.trim()) : [];
export const $DHT_MODE = process.env.DHT_MODE!;
