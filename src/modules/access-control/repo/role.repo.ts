import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';

import { IRoleRepo } from '@/modules/access-control/repo/role.repo.interface';
import { Role } from '@/modules/access-control/repo/schemas/role.schema';
import { UUIDAdapter } from '@/shared/id-generator/uuid.adapter';

export class RoleRepo implements IRoleRepo {
  constructor(
    @InjectModel(Role.name) private readonly model: Model<Role>,
    private readonly idGen: UUIDAdapter,
  ) {}

  async create(input: Partial<Role>): Promise<string> {
    const { id } = await new this.model({ ...input, _id: this.idGen.gen() }).save();
    return id;
  }

  async getOne({ name, can }: Partial<Role>): Promise<Role> {
    return this.model.findOne({ name, can }).lean();
  }

  async getAll(): Promise<Role[]> {
    return this.model.find({}).lean();
  }

  async update({ _id, can, name }: Role): Promise<Role> {
    return this.model.findOneAndUpdate({ _id }, { can, name }, { new: true });
  }
}
