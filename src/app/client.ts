import { Mesure } from "./mesure";

export class Client{
    id!: number;
    firstName!: string;
    lastName!: string;
    address!: string;
    birthday!: Date;
    phone!: string;
    sexe!:string;
    cni!:string;
    mesure!: Mesure | undefined;
}