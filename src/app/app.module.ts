
    import { HttpClientModule } from '@angular/common/http';
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { MatToolbarModule } from '@angular/material/toolbar';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    import { MatInputModule } from '@angular/material/input';
    import { MatButtonModule } from '@angular/material/button';
    import { MatMenuModule } from '@angular/material/menu';
    import { MatIconModule } from '@angular/material/icon';
    import { LoginComponent } from './components/login/login.component';
    import { MatSnackBarModule } from '@angular/material/snack-bar';
    import { MatRadioButton } from '@angular/material/radio';
    import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


    @NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatMenuModule,  
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule

    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    