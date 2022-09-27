import { AuthState } from "./auth";

export interface StoreState {
    auth: AuthState;
    route: object;
}