import { PartialType } from "@nestjs/mapped-types";
import { CreateNotificationDto } from "./create-notification.dto";

export class updateNotificationDto extends PartialType(CreateNotificationDto) { }