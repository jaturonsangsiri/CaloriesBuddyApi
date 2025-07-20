import { PartialType } from "@nestjs/mapped-types";
import { CreateEatFoodDto } from "./create-eat-food.dto";

export class UpdateEatFoodDto extends PartialType(CreateEatFoodDto) {}