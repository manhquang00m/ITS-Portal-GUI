export interface IFormAfterClass {
    teacher?: string;
    date?: string;
    comments?: {
        student: string;
        comment: string;
        result: string;
    }[];
    knowledge?: string;
    next_lecture?: string;
}

