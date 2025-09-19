import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from '@src/app/app.component';
import { appConfig } from '@src/app/app.config';
import { provideServerRendering } from '@angular/platform-server';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      provideServerRendering(),
      ...(appConfig.providers || []),
    ],
  }, context);  // <-- Pass context here
}
