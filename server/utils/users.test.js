const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Bruce',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Thanos',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'iron man',
      room: 'avengers fans'
    };

    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Thanos']);
  });

  it('should return names for react course', () => {
    let userList = users.getUserList('React Course');

    expect(userList).toEqual(['Bruce']);
  });

  it('should remove user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);

  });

  it('should not remove user', () => {
    let userId = '99';
    let user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let userId = '2';
    let user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    let userId = '99';
    let user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
});
