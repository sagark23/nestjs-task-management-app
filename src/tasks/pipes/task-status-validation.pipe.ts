import {BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatus} from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.WIP
    ];

    transform(value: any): any {
        console.log('Value', value);
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status.`)
        }
        return value;
    }

    private isStatusValid(status: any): boolean{
        return this.allowedStatuses.indexOf(status) !== -1;
    }

}