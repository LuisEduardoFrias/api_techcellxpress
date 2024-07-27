//
import BaseModel from './base_model.js';

export class CapacityModel extends BaseModel {
  constructor(capacity) {
    super();
    this.rom = capacity.rom;
    this.ramMemory = capacity.ramMemory;
    this.processor = capacity.processor;
    this.processorSpeed = capacity.processorSpeed;
  }
}

export default class PhoneModel extends BaseModel {
  constructor(phone) {
    super();
    this.imei = phone.imei;
    this.imgUrl = phone.imgUrl;
    this.brand = phone.brand;
    this.model = phone.model;
    this.color = phone.color;
    this.capacity = new CapacityModel(phone.capacity);
    this.releaseDate = phone.releaseDate;
    this.isRemoved = false;
  }
}