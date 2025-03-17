import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  constructor() {}

  getAllConsumptionData() {
    // get all data and store it in dashboard store
  }

  getTodayConsumption() {
    // manipulate dashboard store data to get only today's data
  }

  getWeeklyAverageConsumption() {
    // dashboard filter store to get only the weekly average
  }

  getMonthlyAverageConsumption() {
    // dashboard filter store to get the monlth average
  }

  getAllMonthsConsumption() {}
}
