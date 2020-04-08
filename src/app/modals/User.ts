import { UserAddress } from './UserAddress';

export interface User {
    email: string;
    info?: string;
    photoURL?: string;
    bannerURL?: string;
    displayName?: string;
    phoneNumber?: number;
    address?: UserAddress;
}