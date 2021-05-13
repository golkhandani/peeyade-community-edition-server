import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from '@common/common.config';
import { CommonModule } from '@common/common.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongoModule } from 'nest-mongodb';
import { RedisModule } from 'nestjs-redis';
import { OperationModule } from '@component/operation.module';
import { MediaDpiMiddleware } from '@common/middleware/media-dpi.middleware';

@Module({
	imports: [
		MongoModule.forRoot(
			config.mongoModule.Connection,
			config.mongoModule.Database,
			config.mongoModule.Options),
		ConfigModule.forRoot(
			config.configModule.Options
		),
		EventEmitterModule.forRoot(
			config.eventEmitterModule.Options
		),
		// RedisModule.register({
		// 	host: 'localhost',
		// 	port: 6379,
		// }),
		CommonModule,
		OperationModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(MediaDpiMiddleware)
			.forRoutes("*")
	}
}
