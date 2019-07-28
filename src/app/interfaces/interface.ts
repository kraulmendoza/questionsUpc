export interface iPrograma{
    id: string;
    name: string
    partida: IPartida;
}
export interface iPersona{
    name: string;
    lastName: string;
    programa: string;
    rol: number;
    email: string;
    pass: string;
    user: string;
    id?:string;
    puntajes?: number[];
}

export interface iPregunta{
    id?: number;
    descripcion: string;
    opciones: string[];
    respuesta: number;
    time: number;
    level: number;
}

export interface iPartida{
    preguntas: iPregunta[];
    programa: string;
    puntajes?: [10, 20, 30];
    id?: string;
}

export interface IPartida{
    level: number[],
    puntajes: number[]
}