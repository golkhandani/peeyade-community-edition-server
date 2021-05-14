import { Module } from '@nestjs/common';
import { PivotModule } from '@component/pivot/pivot.module';
import { MediaModule } from './media/media.module';
import { UserAuthModule } from './user-auth/auth.module';

@Module({
	imports: [
		UserAuthModule,
		PivotModule,
		MediaModule
	],
})
export class OperationModule { }
