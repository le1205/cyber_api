import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  short_about: string;

  @Column({ nullable: true, type: 'simple-array' })
  email: string[];

  @Column({ nullable: true, type: 'simple-array' })
  phone: string[];

  @Column({ nullable: true, type: 'json' })
  fax: any[];

  @Column({ nullable: true })
  google_url: string;

  @Column({ nullable: true, type: 'text' })
  google_embed: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true, type: 'text' })
  privacy_policy: string;

  @Column({ nullable: true, type: 'text' })
  terms_and_conditions: string;

  @Column({default: ''})
  whatsapp_phone: string;
  
  @Column({default: ''})
  main_email: string;
}
