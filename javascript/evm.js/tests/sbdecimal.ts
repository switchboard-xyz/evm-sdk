import "mocha";

import { SBDecimal } from "../src";

import { Big } from "@switchboard-xyz/common";

// describe("Decimal tests", () => {
//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("100.01"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("10001", 2, false);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("100000.01"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("10000001", 2, false);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("10000000"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("10000000", 0, false);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("5429.69012345"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("542969012345", 8, false);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("-5429.69012345"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("542969012345", 8, true);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("1"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("1", 0, false);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });

//   it("Converts a SwitchboardDecimal", async () => {
//     const parsedDecimal = SBDecimal.fromBig(new Big("-1"));
//     const sbv2Decimal: SBDecimal = new SBDecimal("1", 0, true);
//     console.log(parsedDecimal);
//     console.log(sbv2Decimal);
//     if (parsedDecimal.mantissa !== sbv2Decimal.mantissa) {
//       throw new Error("Wrong mantissa");
//     }
//     if (parsedDecimal.scale !== sbv2Decimal.scale) {
//       throw new Error("Wrong scale");
//     }
//   });
// });
