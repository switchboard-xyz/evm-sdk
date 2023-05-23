import { Job } from "./types.js";

const IpfsGateways = [
  "https://ipfs.io/ipfs/",
  "https://ipfs.infura.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];
/**
 * Fetch IPFS Hash from Gateways
 * @param hash ipfs hash
 * @param gatewayIndex index of gateway to use
 * @returns
 */
export async function fetchJobsFromIPFS(
  hash: string,
  gatewayIndex = 0
): Promise<Job[]> {
  try {
    const response = await fetch(`${IpfsGateways[gatewayIndex]}${hash}`);
    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch content from gateway ${IpfsGateways[gatewayIndex]}. Error: ${error}`
    );

    if (gatewayIndex === IpfsGateways.length - 1) {
      throw new Error(
        `Failed to fetch content from all gateways. Last error: ${error}`
      );
    }

    return fetchJobsFromIPFS(hash, ++gatewayIndex);
  }
}
