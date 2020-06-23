// the functions environment does not allow top level function calls (function calls outside the function handler)
// as a workaround, the user scope is wrapped in a closure and the wrapper is called by the actual functions handler
// this is necessary to allow commonjs imports and removes the extra constrain from developers
const safe = () => ({
  name: "safe-functions",
  renderChunk(code, chunk, options) {
    const wrap = code => `
export default (request, response) => {
  return ___userCode()(request, response);
}
function ___userCode() {
  var module = {}
  ${code}
  return module.exports;
}`;
    return {
      code: wrap(code),
      map: null
    };
  }
});

module.exports = safe;