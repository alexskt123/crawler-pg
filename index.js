import { captureValuationImage } from './lib/hsbcValuation.js';
import { captureSearchedImage } from './lib/googleSearch.js';
import { program } from 'commander';

program
    .option('--hsbc')
    .option('--google');

program.parse();

const { hsbc, google } = program.opts();

hsbc && captureValuationImage();
google && captureSearchedImage();