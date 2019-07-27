export interface iPrograma{
    id: string;
    name: string
}
export interface iJugador{
    name: string;
    lastName: string;
    programa: iPrograma;
    rol: number;
    resultado: number;
    email: string;
    pass: string;
    user: string;
    id?:string;
}

export interface iPuntaje{
    jugador: string;
    time: number;
    puntaje: number;
    id?: string;
}

export interface iPregunta{
    id?: number;
    descipcion: string;
    opciones: string[];
    respuesta: number; 
}

export interface iPartida{
    persona: string;
    preguntas: iPregunta[];
    estado: number;
    id?: string;
}