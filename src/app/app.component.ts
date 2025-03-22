import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitialFormComponent } from './pages/diagnostics/initial-form/initial-form.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Curatio';
}
