'use strict';

const { shingles, minhash } = require('../deduplicator/minhash');
const expirationTime = 20 * 60 * 60 * 1000; // 20h

class SelfCleaningMsgMap extends Map {
  constructor (iterable) {
    super();
    for (const item in iterable) {
      this.add(item);
    }
  }
  delete (msg) {
    super.delete(msg.message_id);
  }
  get (msg) {
    return super.get(msg.message_id);
  }
  has (msg) {
    return super.has(msg.message_id);
  }
  add (msg) {
    super.set(msg.message_id, {
      minhash: minhash(msg.text),
      shingles: shingles(msg.text)
    });
    setTimeout(this.delete.bind(this), expirationTime, msg);
  }
}

const storage = new SelfCleaningMsgMap();

module.exports.storage = storage;
