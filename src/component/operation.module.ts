import { Module } from '@nestjs/common';
import { PivotModule } from '@component/pivot/pivot.module';
import { MediaModule } from './media/media.module';

@Module({
	imports: [
		PivotModule,
		MediaModule
	],
})
export class OperationModule { }
