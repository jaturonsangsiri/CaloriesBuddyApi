import { PartialType } from "@nestjs/mapped-types";
import { CreateFoodFavDto } from "./create-food-fav.dto";

export class UpdateFoodFavDto extends PartialType(CreateFoodFavDto) {}