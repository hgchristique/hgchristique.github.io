const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE     = path.join(DATA_DIR, 'orders.json');

let orders = null;

function load() {
  if (orders) return orders;
  try {
    orders = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch (err) {
    if (err.code !== 'ENOENT') throw new Error(`Could not read ${FILE}: ${err.message}`);
    orders = {};
  }
  return orders;
}

// Write to a temp file then rename, so a crash mid-write cannot corrupt the store.
function persist() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2));
  fs.renameSync(tmp, FILE);
}

function get(reference) {
  const all = load();
  return Object.prototype.hasOwnProperty.call(all, reference) ? all[reference] : null;
}

// Both writers undo their in-memory change if the write fails, so memory never runs ahead of disk.
function create(order) {
  const all = load();
  all[order.reference] = order;
  try {
    persist();
  } catch (err) {
    delete all[order.reference];
    throw err;
  }
  return order;
}

function update(reference, changes) {
  const all = load();
  const previous = get(reference);
  if (!previous) return null;
  const next = { ...previous, ...changes, updatedAt: new Date().toISOString() };
  all[reference] = next;
  try {
    persist();
  } catch (err) {
    all[reference] = previous;
    throw err;
  }
  return next;
}

module.exports = { load, get, create, update };
