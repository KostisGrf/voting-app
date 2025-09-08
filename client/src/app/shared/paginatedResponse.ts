import { Poll } from "./poll";

export interface paginatedResponse{
    content:Poll[],
    pageNumber:number,
    pageSize:number,
    totalElements:number,
    totalPages:number,
    last:boolean
}