import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Infocontable } from 'src/app/models/Infocontable';
import { InfocontableService } from 'src/app/services/Infocontable.service';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-grafico-de-valor-futuro',
  templateUrl: './grafico-de-valor-futuro.component.html',
  styleUrls: ['./grafico-de-valor-futuro.component.css']
})
export class GraficoDeValorFuturoComponent implements OnInit  {
  infocontable: Infocontable = new Infocontable();
  @ViewChild('chartRef') private chartRef!: ElementRef;
  chart?: Chart<'line', (number | Date)[], string>;

  constructor(
    private infocontableService: InfocontableService,
    private usersService: UsersService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.usersService
      .buscarPorUsername(this.loginService.showUser())
      .subscribe((user) => {
        // return first info contable of user
        this.infocontableService.list().subscribe((infocontables) => {
          infocontables.forEach((infocontable: Infocontable) => {
            if (infocontable.user.id == user.id) {
              this.infocontable = infocontable;
              this.infocontable.fechainicio = new Date(this.infocontable.fechainicio);
              this.infocontable.fechafin = new Date(this.infocontable.fechafin);
              this.loadChart();
            }
          });
        });
      });
  }

  valorfuturoAtasaefectivaSegunDiasAdelanto(adelantoDias: number): number {
    let fechaFin: Date = new Date(this.infocontable.fechainicio.getTime() + adelantoDias * 24 * 60 * 60 * 1000);
    let diff = Math.abs(fechaFin.getTime() - this.infocontable.fechainicio.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    let base = 1 + this.infocontable.tasaefectiva;

    return this.infocontable.valorpresente * Math.pow(base, diffDays / this.infocontable.plazodias);
  }

  loadChart() {
    // crear grafico de valor por dia usando chart.js

    // para cada dia (de 0 a infocontable.plazodias) calcular el valor futuro
    // almacenar en un array de valores [[dia, valorfuturo], [dia, valorfuturo], ...]
    let data = [];
    let diff = Math.abs(this.infocontable.fechafin.getTime() - this.infocontable.fechainicio.getTime());
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    for (let i = 0; i <= diffDays; i++) {
      data.push([new Date(this.infocontable.fechainicio.getTime() + i * 24 * 60 * 60 * 1000), this.valorfuturoAtasaefectivaSegunDiasAdelanto(i)]);
    }
    console.log('data: ', data);

    let dias = data.map(item => new Date(item[0]).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })); // Extract the 'dia' values
    let valorfuturos = data.map(item => item[1]); // Extract the 'valorfuturo' values

    let chartData = {
      labels: dias,
      datasets: [{
          data: valorfuturos,
          // add a fill for the line chart
          fill: true,
      }]
    };

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: chartData ,
      // disable the legend
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Evolución del valor futuro en función del tiempo'
          },
          legend: {
            display: false
          },
        },
      }
    });
    
  }
}
