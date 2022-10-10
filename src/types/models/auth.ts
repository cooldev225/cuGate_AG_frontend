import { User } from "./user";

export interface AuthState {
    user: User;
    page: string;
    mobilemenu_toggle:number;
}