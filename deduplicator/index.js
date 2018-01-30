"use strict";

const storage = require('../storage').storage;
const { shingles, minhash, similarity: smlrty, jaccardIndex } = require('./minhash');

function similarity (msg) {
  const minhashMsg = minhash(msg.text);
  const shinglesMsg = shingles(msg.text);
  const similarities = []

  for (const [_, { minhash, shingles }] of storage) {
    const minhashval = smlrty(minhash, minhashMsg);
    const jaccard = jaccardIndex(shingles, shinglesMsg);
    console.log( "Minhash similarity is "+minhashval+" (%d%% similar)", Math.round(minhashval * 100)  );
    console.log( "Jaccard index is "+jaccard+" (%d%% similar)", Math.round(jaccard * 100) );
    similarities.push({
      minhash: Math.round(minhashval * 100),
      jaccard: Math.round(jaccard * 100)
    });
  }
  return similarities;
}

module.exports = {
  similarity
}
