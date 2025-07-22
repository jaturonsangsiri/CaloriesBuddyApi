import { PartialType } from "@nestjs/mapped-types";
import { CreateActivitiesDto } from "./create-activities.dto";

export class UpdateActivitiesDto extends PartialType(CreateActivitiesDto) {}