import { Model } from 'sequelize';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Status } from '../enum';

@Table({ tableName: 'products', timestamps: true })
export class ProductTableModel extends Model {
  @Column({ type: DataType.TEXT })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  price: number;

  @Column({ type: DataType.INTEGER })
  discount: number;

  @Column({ type: DataType.INTEGER })
  rating: number;

  @Column({ type: DataType.INTEGER })
  quantity: number;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    defaultValue: Status.ACTIVE,
  })
  status: Status;

  @Column({ allowNull: true, type: DataType.STRING })
  image: string | null;
}
