export interface iPrograma{
    id: string;
    name: string
}
export interface iPersona{
    name: string;
    lastName: string;
    programa: string;
    rol: number;
    resultado: number;
    email: string;
    pass: string;
    user: string;
    id?:string;
}

export interface iPregunta{
    id?: number;
    descripcion: string;
    opciones: string[];
    respuesta: number;
}