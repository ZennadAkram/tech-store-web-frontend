export interface Adds{
id:number;
name:string;
image:string;
}

export interface AddsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Adds[];
}