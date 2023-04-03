export class Payment {
  id: number;
  user_id: number;
  type: PaymentType;
  date: Date;
  img: string;
  id_serial: string;
  amount: number;
  status:PaymentStatus;
  constructor(id: number,user_id: number,type: PaymentType,date: Date,img: string,id_serial: string,amount: number,status:PaymentStatus) {
    this.id = id;
    this.user_id = user_id;
    this.type = type;
    this.date = date;
    this.img = img;
    this.id_serial = id_serial;
    this.amount = amount;
    this.status = status;
  }
}

export enum PaymentType {
  MBOK,
  FAISAL,
}

export enum PaymentStatus {
  PENDING,
  ACCEPTED,
  REJECTED
}
