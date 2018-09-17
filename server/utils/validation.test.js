const expect = require('expect');
const {isRealString} = require('./validation');

describe('Validate String', () => {
  it('should reject non-string values', () => {
    let res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    let res = isRealString(' ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let res = isRealString('data');
    expect(res).toBe(true);
  });
})
