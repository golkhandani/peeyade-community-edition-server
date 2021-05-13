import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
    constructor() { }


    code(data: Partial<any>): string {
        return (Math.random() * 10000).toString();
    }


    decode() {

    }
}