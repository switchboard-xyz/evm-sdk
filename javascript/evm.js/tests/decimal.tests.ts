import "mocha";

import * as sbv2 from "../src";

import { Big, BN } from "@switchboard-xyz/common";
import { strict as assert } from "assert";

// describe("Decimal tests", () => {
//   const sbv2Decimal_100: sbv2.types.SwitchboardDecimalMoveStruct = {
//     value: "10000",
//     dec: 2,
//     neg: false,
//   };

//   const round: sbv2.types.AggregatorRoundMoveStruct = {
//     id: "1",
//     round_open_timestamp: "",
//     round_open_block_height: "",
//     result: sbv2Decimal_100,
//     std_deviation: sbv2Decimal_100,
//     min_response: sbv2Decimal_100,
//     max_response: sbv2Decimal_100,
//     oracle_keys: ["", ""],
//     medians: [
//       {
//         vec: [sbv2Decimal_100],
//       },
//       {
//         vec: [sbv2Decimal_100],
//       },
//     ],
//     current_payout: [sbv2Decimal_100, sbv2Decimal_100],
//     errors_fulfilled: [false, false],
//     num_success: "",
//     num_error: "",
//     is_closed: true,
//     round_confirmed_timestamp: "",
//   };

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal =
//       sbv2.types.SwitchboardDecimal.fromMoveStruct(sbv2Decimal_100);

//     console.log(parsedDecimal);
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedRound = sbv2.types.AggregatorRound.fromMoveStruct(round);

//     console.log(parsedRound);
//   });
// });
