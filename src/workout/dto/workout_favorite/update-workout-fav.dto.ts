import { PartialType } from "@nestjs/mapped-types";
import { CreateWorkoutFavDto } from "./create-workout-fav.dto";

export class UpdateWorkoutFavDto extends PartialType(CreateWorkoutFavDto) { }