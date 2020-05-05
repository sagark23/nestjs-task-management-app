import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {Task, TaskStatus} from "./task.model";
import {CreateTaskDto} from "./dto/create.task.dto";
import {FilterTaskDto} from "./dto/filter.task.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getAllTasks() : Task[] {
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Get()
    getTasksWithFilter(@Query() filterTaskDto: FilterTaskDto): Task[] {
        if(Object.keys(filterTaskDto).length){
            return this.taskService.getTasksWithFilter(filterTaskDto);
        }
        return this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.log('createTaskDto', createTaskDto);
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Task {
        return this.taskService.updateTaskStatus(id, status)
    }
}
