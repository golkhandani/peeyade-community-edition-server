import { Module } from '@nestjs/common';
import { TokenService } from '@common/token/token.service';

@Module({
    imports: [
        // StaffModule
    ],
    providers: [
        TokenService
    ],
    exports: [
        TokenService
    ]
})
export class CommonModule { }
