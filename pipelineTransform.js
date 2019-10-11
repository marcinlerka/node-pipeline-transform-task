const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const zlib = require('zlib');
const csvStringify = require('csv-stringify');
const split = require('split2');
const ora = require('ora');
const {
  CSV_COLUMNS,
  parseJsonLine,
  formatData,
  updateStats,
  displaySummary
} = require('./helpers');

const pipelineTransform = async (inputFile, outputFile) => {
  console.log('> Running stream');
  const spinner = ora('Streaming & transforming').start();

  let stats = {
    usersCount: 0,
    friendsCount: 0
  };

  try {
    const input = fs.createReadStream(inputFile);

    const gunzip = zlib.createGunzip();

    const composeCsv = csvStringify({
      header: true,
      quoted: true,
      columns: CSV_COLUMNS
    });

    const output = fs.createWriteStream(outputFile);

    const transformJsonLine = stream.Transform({
      objectMode: true,
      transform(chunk, _encoding, done) {
        this.push(formatData(chunk));
        updateStats(stats, chunk);
        done();
      }
    });

    await pipeline(
      input,
      gunzip,
      split(parseJsonLine),
      transformJsonLine,
      composeCsv,
      output
    );

    spinner.stop();
    displaySummary(stats);
  } catch (err) {
    spinner.stop();
    console.error('Transformation failed', err);
  }
};

module.exports = pipelineTransform;
