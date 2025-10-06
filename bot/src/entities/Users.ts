import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/mysql';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  tgUserId!: string;

  @Property()
  createdAt = new Date();

  constructor(name: string, tgUserId: string) {
    this.name = name;
    this.tgUserId = tgUserId;
  }
}