

export interface productRemuneration{
    productId: string;
    productName: string;
    employeesRemuneration: Array<employeeRemuneration>
};


export interface employeeRemuneration{
    userId: string;
    name: string;
    remuneration:string;
}
