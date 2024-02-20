
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SigninComponent } from './components/signin/signin.component';

    const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signin', component: SigninComponent
    },
    {
        path: 'components',
        loadChildren: () => import('./components/components.module').then((m) => m.ComponentsModule),
    }
    ];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }
    