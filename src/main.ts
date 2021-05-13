import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';

async function bootstrap() {
	// const app = await NestFactory.createApplicationContext(AppModule);
	// await app.get(AppController).organizeAllCheckIn();
	// await app.get(AppController).groupCheckInsByPivot();
	// await app.get(AppController).groupCheckInsByUser();
	// await app.get(AppController).createUserGameProfile();
	// await app.get(AppController).createPivotLikeByUser();
	// await app.get(AppController).createPivotShareByUser();
	// await app.get(AppController).createPivotViewByUser();
	// await app.get(AppController).createPivotSaveByUser();
	// await app.get(AppController).createUserInterActionsAndPivots();
	// await app.get(AppController).convertOldToNewPost();
	// await app.get(AppController).extractTags();
	// await app.get(AppController).convertOldToNewUser();




	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		validateCustomDecorators: true
	}));
	const config = new DocumentBuilder()
		.setTitle('Fabizi')
		.setDescription('The Fabizi API description')
		.setVersion('1.0')
		.addTag('Fabizi, API')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);

}

bootstrap();
