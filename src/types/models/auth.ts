import { User } from "./user";

export interface AuthState {
    user: User;
    page: number;
    mobilemenu_toggle:number;
}