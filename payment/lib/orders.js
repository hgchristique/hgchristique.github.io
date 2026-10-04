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

function create(order) {
  load()[order.reference] = order;
  persist();
  return order;
}

function update(reference, changes) {
  const order = get(reference);
  if (!order) return null;
  Object.assign(order, changes, { updatedAt: new Date().toISOString() });
  persist();
  return order;
}

module.exports = { load, get, create, update };
