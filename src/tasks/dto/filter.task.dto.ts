import {TaskStatus} from "../task.model";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class FilterTaskDto {
    @IsOptional()
    @IsIn([TaskStatus.WIP, TaskStatus.DONE, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}