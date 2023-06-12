import { CreateOrUpdateProfileInput } from './create-profile.input';
import { InputType,  PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(
  CreateOrUpdateProfileInput
) {}
