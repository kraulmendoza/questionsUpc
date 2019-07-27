export interface iPrograma{
    id: string;
    name: string
}
export interface iPersona{
    name: string;
    lastName: string;
    programa: string;
    rol: number;
    puntaje: number;
    email: string;
    pass: string;
    user: string;
    id?:string;
}

export interface iPregunta{
    id?: number;
    descipcion: string;
    opciones: string[];
    respuesta: number; 
}

export interface iPartida{
    jugador: string;
    preguntas: iPregunta[];
    time: number;
    puntaje: number;
    estado: number;
    id?: string;
}