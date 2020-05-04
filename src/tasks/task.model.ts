export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    WIP = 'WIP',
    DONE = 'DONE'
}