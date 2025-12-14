import { VacancyService } from './../../core/services/vacancy.service';
import { SeafarerService } from './../../core/services/seaferer.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Seafarer } from '../../core/models/seafarer.model';
import { VacancyRecord } from '../../core/models/vacancyRecord.model';
import { AgePipe } from '../../shared/pipes/age.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [AgePipe]
})
export class DashboardComponent implements AfterViewInit {

  seafarers: Seafarer[] = [];
  vacancies: VacancyRecord[] = [];

  @ViewChild('nationalityChart') nationalityChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ageChart') ageChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('vacanciesByVesselChart') vacanciesByVesselChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('seafarersByRankChart') seafarersByRankChart!: ElementRef<HTMLCanvasElement>;

  nationalityChartInstance!: Chart;
  ageChartInstance!: Chart;
  vacanciesByVesselChartInstance!: Chart;
  seafarersByRankChartInstance!: Chart;
  

  constructor(private vacancyService: VacancyService, private SeafarerService: SeafarerService, private agePipe: AgePipe) { }

  ngAfterViewInit() {
    this.SeafarerService.getAllSeafarers().subscribe(data => {
      this.seafarers = data;
      this.tryCreateCharts();
    });


    this.vacancyService.vacancies$.subscribe(data => {
      this.vacancies = data;
      this.tryCreateCharts();
    });
  }


  private tryCreateCharts() {

    // Destroy existing charts if they exist
    this.nationalityChartInstance?.destroy();
    this.ageChartInstance?.destroy();
    this.vacanciesByVesselChartInstance?.destroy();
    this.seafarersByRankChartInstance?.destroy();

    // --- Nationality Chart ---
    const nationalityData: Record<string, number> = {};
    this.seafarers.forEach(s =>{
      if (s.Nationality) { 
        nationalityData[s.Nationality] = (nationalityData[s.Nationality] || 0) + 1;
      }
    });
    const nationalityCtx = this.nationalityChart.nativeElement.getContext('2d');
    if (nationalityCtx) {
      this.nationalityChartInstance = new Chart(nationalityCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(nationalityData),
          datasets: [{
            data: Object.values(nationalityData),
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1']
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const value = context.raw || 0;
                  return `Nationalities: ${value}`;
                }
              }
            }
          }
        }
      });
    }

    // --- Age Chart ---
    const ageGroups = { '18-29': 0, '30-39': 0, '40-49': 0, '50+': 0 };
    this.seafarers.forEach(s => {
      if (this.agePipe.transform(s.Age) <= 29 && this.agePipe.transform(s.Age) >= 18) ageGroups['18-29']++;
      else if (this.agePipe.transform(s.Age) <= 39 && this.agePipe.transform(s.Age) >= 30) ageGroups['30-39']++;
      else if (this.agePipe.transform(s.Age) <= 49 && this.agePipe.transform(s.Age) >= 40) ageGroups['40-49']++;
      else ageGroups['50+']++;
    });
    const ageCtx = this.ageChart.nativeElement.getContext('2d');
    if (ageCtx) {
      this.ageChartInstance = new Chart(ageCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(ageGroups),
          datasets: [{
            data: Object.values(ageGroups),
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
          }]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const value = context.raw || 0;
                  return `Age Groups: ${value}`;
                }
              }
            }
          }
        }
      });
    }

    // --- Vacancies by Vessel ---
    const vesselVacancyData: Record<string, number> = {};
    this.vacancies.forEach(v => {
      if (v.status === 'Open') {
        vesselVacancyData[v.vessel] = (vesselVacancyData[v.vessel] || 0) + 1;
      }
    });


    const vacanciesCtx = this.vacanciesByVesselChart.nativeElement.getContext('2d');
    if (vacanciesCtx) {
      this.vacanciesByVesselChartInstance = new Chart(vacanciesCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(vesselVacancyData),
          datasets: [{ data: Object.values(vesselVacancyData), backgroundColor: '#3B82F6' }]
        },
        options: {
          scales: { y: { beginAtZero: true } },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const value = context.raw || 0;
                  return `Open Vacancies: ${value}`;
                }
              }
            }
          }
        }
      });
    }

    // --- Seafarers by Rank ---
    const rankData: Record<string, number> = {};
    this.seafarers.forEach(s => rankData[s.JobName] = (rankData[s.JobName] || 0) + 1);

    const rankCtx = this.seafarersByRankChart.nativeElement.getContext('2d');
    if (rankCtx) {
      this.seafarersByRankChartInstance = new Chart(rankCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(rankData),
          datasets: [{
            data: Object.values(rankData),
            backgroundColor: '#10B981'
          }]
        },
        options: {
          indexAxis: 'y',
          scales: { x: { beginAtZero: true } },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const value = context.raw || 0;
                  return `Number of Seafares: ${value}`;
                }
              }
            }
          }
        }
      });
    }

  }
}

