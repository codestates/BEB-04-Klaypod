import { Controller, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('dashboard')
@UseInterceptors(new SuccessInterceptor())
export class DashboardController {}
