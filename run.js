#!/usr/bin/env node

const path = require('path');
const pipelineTransform = require('./pipelineTransform');

const INPUT_FILE = process.env.INPUT_FILE_TO_TRANSFORM || 'data.ndj.gz';
const OUTPUT_FILE = process.env.OUTPUT_FILE_TO_TRANSFORM || 'data.csv';

const BASEPATH = path.resolve(__dirname);
const INPUT_FILE_PATH = path.join(BASEPATH, INPUT_FILE);
const OUTPUT_FILE_PATH = path.join(BASEPATH, OUTPUT_FILE);

pipelineTransform(INPUT_FILE_PATH, OUTPUT_FILE_PATH);
