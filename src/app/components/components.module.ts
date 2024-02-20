import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule, MatNavList } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { InfocontableComponent } from './Infocontable/Infocontable.component';
import { ListarInfocontableComponent } from './Infocontable/listar-Infocontable/listar-Infocontable.component';
import { CreaeditaInfocontableComponent } from './Infocontable/creaedita-Infocontable/creaedita-Infocontable.component';
import { HistorialComponent } from './historial/historial.component';
import { ListarHistorialComponent } from './historial/listar-historial/listar-historial.component';
import { CreaeditaHistorialComponent } from './historial/creaedita-historial/creaedita-historial.component';
import { UsersComponent } from './users/users.component';
import { ListarUsersComponent } from './users/listar-users/listar-users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import { RoleComponent } from './role/role.component';
import { ListarRoleComponent } from './role/listar-role/listar-role.component';
import { CreaeditaRoleComponent } from './role/creaedita-role/creaedita-role.component';
import { RegistroDatosComponent } from './registro-datos/registro-datos.component';
import { EditarPlanDePagosComponent } from './editar-plan-de-pagos/editar-plan-de-pagos.component';
import { AlterarFlujoDeFondosComponent } from './alterar-flujo-de-fondos/alterar-flujo-de-fondos.component';
import { MatRadioModule } from '@angular/material/radio';
import { EstadoDeCuentaComponent } from './estado-de-cuenta/estado-de-cuenta.component';
import { GraficoDeValorFuturoComponent } from './grafico-de-valor-futuro/grafico-de-valor-futuro.component';
import { ConvertirTasaNominalEfectivaComponent } from './convertir-tasa-nominal-efectiva/convertir-tasa-nominal-efectiva.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    InfocontableComponent,
    ListarInfocontableComponent,
    CreaeditaInfocontableComponent,
    HistorialComponent,
    ListarHistorialComponent,
    CreaeditaHistorialComponent,
    UsersComponent,
    ListarUsersComponent,
    CreaeditaUsersComponent,
    RoleComponent,
    ListarRoleComponent,
    CreaeditaRoleComponent,
    RegistroDatosComponent,
    EditarPlanDePagosComponent,
    AlterarFlujoDeFondosComponent,
    EstadoDeCuentaComponent,
    GraficoDeValorFuturoComponent,
    ConvertirTasaNominalEfectivaComponent,
    LandingPageComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatListModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgChartsModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule
  ],
})
export class ComponentsModule {}
