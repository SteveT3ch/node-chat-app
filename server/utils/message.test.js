const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'mike';
    let text = 'some message';
    let message = generateMessage(from, text);
    wrong = 'bob';

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from, text});

  })
});
