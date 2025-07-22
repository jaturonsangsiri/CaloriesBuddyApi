import { PartialType } from "@nestjs/mapped-types";
import { CreateAddMealDto } from "./create-add-meal.dto";

export class UpdateAddMealDto extends PartialType(CreateAddMealDto) {}