import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as moment from 'moment';
import { AppModule } from './app.module';

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
    '_',
  ),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split(
    '_',
  ),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port: number =
    parseInt(configService.get<string>('SERVER_PORT')) || 3000;

  await app.listen(port);

  console.log(`> Servidor escuchando puerto ${port}`);
  console.log(`> Conectado a la base de datos ${process.env.MONGO_URI}`);
  console.log(`> Servidor ${process.env.ENV}`);
}

bootstrap();
