import {IsIn, IsNotEmpty, IsOptional} from "class-validator";
import {TaskStatus} from "../task-status.enum";

export class FilterTaskDto {
    @IsOptional()
    @IsIn([TaskStatus.WIP, TaskStatus.DONE, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}