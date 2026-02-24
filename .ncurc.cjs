/** @type {import('npm-check-updates').RcOptions } */
module.exports = {
  doctor: true,
  doctorTest: 'sh -c "npm run build"',
  peer: true,
  upgrade: true,
}
