export const generate_amortization_schedule = (principal, interest_rate, period) => {
    const rate = interest_rate / 100 / 12;
    const EMI = Math.ceil((principal * rate) / (1 - Math.pow(1 + rate, -period)));
    let interest = 0;
    let repayment = 0;
    let amortizationSchedule = [];
  
    for (let counter = 1; counter <= period; counter++) {
      let monthly_summary = {};
      monthly_summary.month = counter;
      monthly_summary.principal = principal;
      monthly_summary.emi = EMI;
      interest = principal * rate;
      repayment = EMI - interest;
      monthly_summary.interest = interest;
      monthly_summary.repayment_amount = repayment;
      principal = principal - repayment;
      monthly_summary.outstanding_balance = principal;
  
      amortizationSchedule.push(monthly_summary);
    }

    return { amortizationSchedule, total: EMI*period };
}