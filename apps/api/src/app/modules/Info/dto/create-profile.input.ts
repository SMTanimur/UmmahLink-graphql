import { InputType, PickType } from '@nestjs/graphql';
import { Info } from '../entities/info';


@InputType()
export class CreateOrUpdateProfileInput extends PickType(
  Info,
  ['bio','birthday','gender','contact','user'],
  InputType
) {}
