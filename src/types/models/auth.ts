import { User } from "./user";

export interface AuthState {
    user: User;
    stage: number;
    mobilemenu_toggle:number;
}