import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create.task.dto";
import {TaskStatus} from "./task-status.enum";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {FilterTaskDto} from "./dto/filter.task.dto";

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
    }

    async getTasks(filterTaskDto: FilterTaskDto) : Promise<Task[]> {
        return this.taskRepository.getTasks(filterTaskDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID: "${id}" not found.`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        await this.taskRepository.delete(id).then(deleted => {
            if(deleted.affected === 0){
                throw new NotFoundException(`Task with ID: "${id}" not found.`);
            }
            return;
        })
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        return await this.getTaskById(id)
            .then(async task => {
                task.status = status;
                return await task.save();
            }).catch(e => e);
    }
}
