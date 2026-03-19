/** @type {import('npm-check-updates').RcOptions } */
module.exports = {
  doctor: true,
  doctorTest: 'sh -c "npm run build && npm test"',
  peer: true,
  upgrade: true,
}
