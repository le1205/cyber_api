import { convertToSlug } from 'src/file-upload.utils';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class About extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ type: 'text' })
  baslik: string;

  @Column({ type: 'boolean', default: false })
  durum: boolean;

  @Column({ type: 'text', nullable: true })
  one_cikan_resim: string;

  @Column({default: ''})
  slug: string;

  @Column({ type: 'text' })
  icerik: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async createSlug() {
    this.slug = convertToSlug(this.baslik);
  }
}
