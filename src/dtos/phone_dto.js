//
export class CapacityDto {
  constructor(capacity) {
    this.id = crypto.randomUUID();
    this.rom = capacity.rom;
    this.ramMemory = capacity.ramMemory;
    this.processor = capacity.processor;
  }
}

export default class PhoneDto {
  constructor(phone) {
    this.id = phone.id;
    this.imei = phone.imei;
    this.imgUrl = phone.imgUrl;
    this.brand = phone.brand;
    this.model = phone.model;
    this.color = phone.color;
    this.capacity = new CapacityDto(phone.capacity);
    this.releaseDate = phone.releaseDate;
    this.isRemoved = phone.isRemoved;
  }
}