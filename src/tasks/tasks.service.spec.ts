import {TasksService} from "./tasks.service";
import {Test} from '@nestjs/testing'
import {TaskRepository} from "./task.repository";
import {FilterTaskDto} from "./dto/filter.task.dto";
import {TaskStatus} from "./task-status.enum";

const mockRepository = () => ({
    getTasks: jest.fn(),
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers:[
                TasksService,
                { provide: TaskRepository, useFactory: mockRepository},
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filterDto : FilterTaskDto = { status: TaskStatus.OPEN, search: 'task'};
            const result = await tasksService.getTasks(filterDto);

            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toBe('someValue');
        });
    });
});