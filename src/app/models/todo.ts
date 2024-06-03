export class Todo{
    constructor(
        public task: string,
        public priority:string,
        public dueDate: Date,
        public taskId: string,
        public completed?: boolean
    ){
    }

    toString(): string{
        return ("ToDo Task:[name: "+ this.task +", "
                +"priority: "+this.priority+ ", "
                +"dueDate: "+ this.dueDate.toISOString() +", "
                +"taskId: "+ this.taskId + ", "
                +"completed: "+this.completed);
    }
}