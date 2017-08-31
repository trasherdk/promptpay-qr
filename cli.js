#!/usr/bin/env node
const qr = require('qrcode-terminal')
const argv = require('minimist')(process.argv.slice(2), { string: '_' })
const generatePayload = require('./')
const target = argv._[0].replace(/-/g, '')

if (!/^(0|66)\d{9}|\d{13}$/.test(target)) {
  console.error('Invalid recipient given: expected tax id or phone number')
  process.exit(1)
}

const payload = generatePayload(target, { amount: +argv._[1] })
console.log(payload)

qr.generate(payload, { small: !!argv.small })
