import { captureValuationImage } from "./lib/hsbcValuation.js";
import { captureGoogleStockImage } from "./lib/googleSearch.js";
import { program } from "commander";

program.option("--hsbc").option("--google").option("--stock");

program.parse();

const { hsbc, google } = program.opts();

hsbc && captureValuationImage();
google &&
  ["AAPL", "BRK.B", "AMZN", "GOOGL", "SMH"].map((s) =>
    captureGoogleStockImage(s),
  );
