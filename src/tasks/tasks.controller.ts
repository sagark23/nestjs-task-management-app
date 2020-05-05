import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create.task.dto";
import {FilterTaskDto} from "./dto/filter.task.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {TaskStatus} from "./task-status.enum";
import {Task} from "./task.entity";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    // @Get()
    // getAllTasks() : Task[] {
    //     return this.taskService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    // @Get()
    // getTasksWithFilter(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Task[] {
    //     if(Object.keys(filterTaskDto).length){
    //         return this.taskService.getTasksWithFilter(filterTaskDto);
    //     }
    //     return this.taskService.getAllTasks();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        console.log('createTaskDto', createTaskDto);
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Promise<Task> {
        return this.taskService.updateTaskStatus(id, status);
    }
}
