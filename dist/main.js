"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '100mb' }));
    app.enableCors();
    app.setGlobalPrefix('api/v1');
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'admin'), {
        prefix: '/admin/',
    });
    await app.listen(3011);
}
bootstrap();
