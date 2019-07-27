export interface iPrograma{
    id: string;
    name: string
}
export interface iJugador{
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
