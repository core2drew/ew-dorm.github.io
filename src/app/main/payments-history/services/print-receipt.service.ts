import { format } from 'date-fns';

import { Injectable } from '@angular/core';

import { PAYMENT_METHOD } from '../../../enums/payment-method';
import { PaymentHistory } from '../models/payment-history.model';

declare global {
  interface Window {
    PrintHub: any; // Declare the printhub object on the window
  }
}
const paperSize: string = '58';
const printerType: string = 'usb';

@Injectable({
  providedIn: 'root',
})
export class PrintReceiptService {
  printer: any;

  constructor() {
    this.printer = new window.PrintHub.init({
      paperSize,
      printerType,
    });
  }

  async printTemplate(print: any, data: PaymentHistory) {
    const {
      totalConsumption,
      pricePerCubicMeter,
      totalBalance,
      paymentMethod,
      amount,
      change,
      referenceNo,
    } = data;
    // Print Header
    await print.writeText('EW Dorm flow', {
      align: 'center',
      bold: true,
      size: 'double',
      paperSize,
    });
    await print.writeText(
      '7151 General Ricarte Street South Cembo Taguig City',
      { align: 'center' },
    );
    await print.writeText('0000-0000-0000', { align: 'center' });

    await print.writeText(format(new Date(), 'MMM dd, y HH:mm aa'), {
      align: 'center',
    });

    // Print Items
    await print.writeDashLine();
    await print.writeTextWith2Column(
      'Total consumption',
      `${totalConsumption}`,
    );
    await print.writeTextWith2Column(
      'Avg Price per (m3)',
      `${pricePerCubicMeter}`,
    );
    await print.writeDashLine();

    // Print Total
    await print.writeTextWith2Column('Total balance:', `${totalBalance}`);
    await print.writeTextWith2Column('Payment method :', `${paymentMethod}`);

    // Cash
    if (paymentMethod === PAYMENT_METHOD.CASH) {
      await print.writeTextWith2Column('Paid amount :', `${amount}`);
      await print.writeTextWith2Column('Change :', `${change}`);
    }

    // Cashless
    if (paymentMethod !== PAYMENT_METHOD.CASH) {
      await print.writeTextWith2Column('Reference No :', `${referenceNo}`);
    }
    // Print Footer
    await print.writeLineBreak();
    await print.writeText('Thank you!', {
      align: 'center',
    });
    await print.writeLineBreak(3);
  }

  printReceipt(data: PaymentHistory) {
    this.printer.connectToPrint({
      onReady: (print: any) => this.printTemplate(print, data),
      onFailed: (message: any) => {
        console.log(message);
        window.alert(message);
      },
    });
  }
}
