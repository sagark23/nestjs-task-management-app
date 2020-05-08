import {
    Body,
    Controller,
    Delete,
    Get, Logger,
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
    private logger = new Logger('TasksController');

    constructor(private taskService: TasksService) {
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto) : Promise<Task[]> {
        this.logger.verbose(`Retrieving all tasks, Filters: ${JSON.stringify(filterTaskDto)}`)
        return this.taskService.getTasks(filterTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        this.logger.verbose(`Task to be saved: ${JSON.stringify(createTaskDto)}`)
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
