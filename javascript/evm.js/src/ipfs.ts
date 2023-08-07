import type { Job } from "./types.js";

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

/**
 * Publish job definitions to IPFS and return the hash
 * @param jobs - the jobs to store on IPFS
 * @param gateway - the IPFS gateway URL to use or an optional index to use a default gateway
 * @returns - the IPFS hash of the jobs content
 */
export async function publishJobsToIPFS(
  jobs: Job[],
  gateway: string | number = 0
): Promise<string> {
  if (typeof gateway === "string") {
    const response = await fetch(gateway, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "evm",
        jobs: jobs,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `IpfsPostError (${response.status}): ${response.statusText}`
      );
    }
    const { cid }: { cid: string } = await response.json();
    return cid;
  }

  try {
    const response = await fetch(`${IpfsGateways[gateway]}`);
    return await response.json();
  } catch (error) {
    console.error(
      `Failed to fetch content from gateway ${IpfsGateways[gateway]}. Error: ${error}`
    );

    if (gateway === IpfsGateways.length - 1) {
      throw new Error(
        `Failed to fetch content from all gateways. Last error: ${error}`
      );
    }

    return publishJobsToIPFS(jobs, ++gateway);
  }
}
