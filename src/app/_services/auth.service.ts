import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly STORAGE_KEY = {
        CUSTOMER_TOKEN: 'customer_token',
        SELLER_TOKEN: 'seller_token',
        ADMIN_TOKEN: 'admin_token'
    };

    constructor() { }

    getUserType(token: string): 'customer' | 'seller' | 'admin' {
        var decodedToken = jwtDecode<any>(token);
        return decodedToken.user_type || null;
    }
    getLoggedInName(user_type: 'customer' | 'seller' | 'admin'): string {
        if (this.getToken(user_type) === '') {
            return '';
        }
        var decodedToken = jwtDecode<any>(this.getToken(user_type));
        return decodedToken.name || null;
    }

    getLoggedInId(user_type: 'customer' | 'seller' | 'admin'): string {
        if (this.getToken(user_type) === '') {
            return '';
        }
        var decodedToken = jwtDecode<any>(this.getToken(user_type));
        return decodedToken.id || null;
    }
   
    getLoggedInData(user_type:'customer'|'seller'|'admin'):any{
        if (this.getToken(user_type) === '') {
            return '';
        }
        var decodedToken = jwtDecode<any>(this.getToken(user_type));
        return decodedToken || null;
    }

    saveToken(token: string): void {
        var userType = this.getUserType(token);
        const storageKey = this.getStorageKeyByUserType(userType);
        localStorage.setItem(storageKey, token);
    }

    getToken(user_type: 'customer' | 'seller' | 'admin'): string {

        const storageKey = this.getStorageKeyByUserType(user_type);
        const token =localStorage.getItem(storageKey);
        if(token){
            const expiryDate= jwtDecode<any>(token).exp;
            const expiryDateTime=new Date(expiryDate * 1000); 
            if(expiryDateTime&& new Date().getTime()>expiryDateTime.getTime()){
                this.removeToken(user_type);
                return '';
            }
        }
        return localStorage.getItem(storageKey) || '';
    }

    removeToken(user_type: 'customer' | 'seller' | 'admin'): void {
        const storageKey = this.getStorageKeyByUserType(user_type);
        localStorage.removeItem(storageKey);
    }

    isLoggedIn(user_type: 'customer' | 'seller' | 'admin'): boolean {
        const token = this.getToken(user_type);
        return token !== '';
    }
    logout(user_type: 'customer' | 'seller' | 'admin'): void {
        this.removeToken(user_type);
    }
    private getStorageKeyByUserType(user_type: string) {
        switch (user_type) {
            case 'customer':
                return this.STORAGE_KEY.CUSTOMER_TOKEN;
            case 'seller':
                return this.STORAGE_KEY.SELLER_TOKEN;
            case 'admin':
                return this.STORAGE_KEY.ADMIN_TOKEN;
            default:
                throw new Error('Invalid user type');
        }
    }



}
