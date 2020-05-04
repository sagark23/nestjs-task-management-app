import {Injectable, Query} from '@nestjs/common';
import {Task, TaskStatus} from "./task.model";
import { v4 as uuid } from 'uuid';
import {CreateTaskDto} from "./dto/create.task.dto";
import {FilterTaskDto} from "./dto/filter.task.dto";

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    getTasksWithFilter(filterTaskDto: FilterTaskDto): Task[] {
        const {status, search} = filterTaskDto;

        let tasks;
        if(status){
            tasks = this.tasks.filter(task => task.status === filterTaskDto.status);
        }

        if(search){
            tasks = this.tasks.filter(
                task => task.title.includes(search) ||
                    task.description.includes(search)
            )
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks.splice(this.tasks.findIndex(item => item.id === id), 1)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);

        task.status = status;

        return task;
    }
}
