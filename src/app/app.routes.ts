import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { FormsModule } from '@angular/forms'
import { InitialFormComponent } from './pages/diagnostics/initial-form/initial-form.component';

export const routes: Routes = [
    {path: '', component:IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'initial-form', component: InitialFormComponent}
];
