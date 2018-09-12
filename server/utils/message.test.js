const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let lat = 1;
    let long = 1;
    let url = 'https://www.google.com/maps?q=1,1'
    let message = generateLocationMessage(from,lat, long);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});

  })
})
