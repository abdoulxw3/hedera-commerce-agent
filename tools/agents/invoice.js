const crypto = require('crypto');
const MIRROR = 'https://testnet.mirrornode.hedera.com/api/v1';

const invoices = new Map();

function createInvoice({ from, to, amount, description, dueDate }) {
  const id = 'INV-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  const invoice = {
    id, from, to, amount, description,
    dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    created: new Date().toISOString(),
    deepLink: `hashpack://transfer?to=${to}&amount=${amount}&memo=${encodeURIComponent(id)}`
  };
  invoices.set(id, invoice);
  return invoice;
}

async function checkInvoiceStatus(invoiceId) {
  const invoice = invoices.get(invoiceId);
  if (!invoice) return { error: 'Invoice not found' };
  try {
    const res = await fetch(`${MIRROR}/transactions?account.id=${invoice.to}&limit=50&order=desc&transactiontype=CRYPTOTRANSFER`);
    const data = await res.json();
    const payment = (data.transactions || []).find(tx =>
      tx.memo_base64 && Buffer.from(tx.memo_base64, 'base64').toString() === invoiceId
    );
    if (payment) {
      invoice.status = 'paid';
      invoice.paidAt = payment.consensus_timestamp;
      invoice.txId = payment.transaction_id;
      invoices.set(invoiceId, invoice);
    }
    return invoice;
  } catch(e) {
    return { error: e.message };
  }
}

function listInvoices() { return Array.from(invoices.values()); }

module.exports = { createInvoice, checkInvoiceStatus, listInvoices };
