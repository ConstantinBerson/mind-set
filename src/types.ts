export type Project={
    id:string,
    name:string,
    deadline:Date,
    sections:Section[],
}

export type Section={
    label:string,
    Tasks:TaskData[]
}

export type TaskData={
    id:string,
    label:string,
    priority_id:string,
    tag_id:string,
    due_date:Date,
    start_date:Date,
    status:string
}