# node-pipeline-transform-task - recruitment task

The main focus of this task is processing big amounts of data

## input

The input data is a `data.ndj.gz` file [> download it from here 360MB gzipped](https://drive.google.com/file/d/1HR4TkVJe6SlF6MVZjtqq-5kD5MBhCHkC/view). It contains personal records of two millions of fictional users. The format is ndjson (newline delimited json).

## expected output

The data needs to be transformed into a CSV file. Create a program that does just that and can handle the provided file.

## things to consider

- process all the data in one go
- avoid blocking the event loop
- calculate age property based on birthday property
- provide a summary after processing containing the avarage number of friends each user has

# SOLUTION

Program uses node `streams` with `pipeline` utility ( >= node10.x ) to properly handle backpressuring and stream errors. Checked with the [blocked-at package](https://github.com/naugtur/blocked-at) if any eventloop blocks occur.

## usage

Download `data.ndj.gz` (360 MB) dataset file [> from here](https://drive.google.com/file/d/1HR4TkVJe6SlF6MVZjtqq-5kD5MBhCHkC/view) and copy it to root folder.
**Note**: Alternatively use small dataset (37 KBytes - 200 records) `dataSmallPack.ndj.gz` present in the root folder. Follow the instructions below.

**Requires Node 10+**

```
$ npm install
```

To transform `data.ndj.gz` file run:

```
$ node run.js
```

use env variable `INPUT_FILE_TO_TRANSFORM` to run different input file (e.g. `dataSmallPack.ndj.gz`):

```
$ INPUT_FILE_TO_TRANSFORM=dataSmallPack.ndj.gz node run.js
```

## my assumptions

- Simple implementation (PoC)
- Hardcoded input and output filepaths in run.js
- Simple validation on input data. No strong value, types checks
