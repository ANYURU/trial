export const generate_amortization_schedule = (principal, interest_rate, period) => {
  const rate = interest_rate / 100
  const principal_installment = principal / period
  let interest = principal * rate

  let reducing_balance = principal
  let amortization_schedule = []
  let total = 0

  let repayment_amount = 0

  console.log(`Installment: ${principal_installment}`)
  for (let counter = 1; counter <= period; counter++) {
    interest = reducing_balance * rate
    reducing_balance -= principal_installment
    repayment_amount = interest + principal_installment

    amortization_schedule.push({
      reducing_balance,
      interest,
      principal_installment,
      repayment_amount,
      month: counter
    })

    total += repayment_amount

  }

  return {total:total, amortization_schedule: amortization_schedule}

}