export default class UserDto {
  constructor(user) {
    this.id = user.id;
    this.fullName = `${user.name} ${user.lastName}`;
    this.user = user.user;
    this.email = user.email;
  }
}