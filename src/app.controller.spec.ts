import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@application/app.controller';
import { AppService } from '@application/app.service';

describe('AppController', () => {
	let appController: AppController;
	let appService:    AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [

			],
			controllers: [
				AppController,
			],
			providers: [
				AppService,
			],
			exports: [
				AppService,
			]
		}).compile();

		appController = app.get<AppController>(AppController);
		appService    = app.get<AppService>(AppService);
	});

	describe('root', () => {
		it('should return "Hello World From App!"', () => {
			expect(appController.getHello()).toBe('Hello World From App!');
		});
	});
});
