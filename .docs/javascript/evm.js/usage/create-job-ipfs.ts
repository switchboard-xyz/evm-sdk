const jobs = [
  {
    name: job.name,
    weight: job.weight,
    data: Buffer.from(
      sb.OracleJob.encodeDelimited({
        tasks: [
          {
            httpTask: {
              url: "https://api.coinbase.com/v2/prices/USDC-USD/spot",
            },
          },
          {
            jsonParseTask: {
              path: "$.data.amount",
            },
          },
          {
            boundTask: {
              lowerBoundValue: "0.98",
              upperBoundValue: "1.02",
            },
          },
        ],
      }).finish()
    ).toString("base64"),
  },
];

const client = new Web3Storage({
  token: "<TOKEN_GOES_HERE>",
});

// get jobs from validation
const content = new File([JSON.stringify(jobs)], "", {
  type: "application/json",
});

// get content ID - fetchable immediately via ipfs
const cid = await client.put([content], {
  wrapWithDirectory: false,
});
