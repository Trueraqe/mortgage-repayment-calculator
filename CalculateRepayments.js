    const calculateButton = document.getElementById('calculate-button');
    const mortgageAmountInput = document.getElementById('mortgage-amount');
    const mortgageTermInput = document.getElementById('mortgage-term');
    const interestRateInput = document.getElementById('interest-rate');
    const mortgageTypeInputs = document.getElementsByName('mortgage-type');
    
    const resultsDiv = document.getElementById('results');
    const clearButton = document.getElementById('clear-button');

    const mortgageAmountBorder = document.getElementById('mortgage-amount-border');
    const mortgageAmountValue = document.getElementById('mortgage-amount-value');
    const mortgageAmountError = document.getElementById('mortgage-amount-error');

    const mortgageTermBorder = document.getElementById('mortgage-term-border');
    const mortgageTermValue = document.getElementById('mortgage-term-value');
    const mortgageTermError = document.getElementById('mortgage-term-error');

    const interestRateBorder = document.getElementById('interest-rate-border');
    const interestRateValue = document.getElementById('interest-rate-value');
    const interestRateError = document.getElementById('interest-rate-error');

    const mortgageTypeError = document.getElementById('mortgage-type-error');


    clearButton.addEventListener('click', () => {
      mortgageAmountInput.value = '';
      mortgageTermInput.value = '';
      interestRateInput.value = '';
      for (const input of mortgageTypeInputs) {
        input.checked = false;
      }
      const inputs = document.querySelectorAll('input[name="mortgage-type"]');
      inputs.forEach(input => input.parentElement.classList.remove('border-lime', 'bg-[hsl(61,70%,92%)]'));
      
      mortgageAmountBorder.classList.remove('border-red');
      mortgageAmountValue.classList.remove('bg-red',"text-white");
      mortgageAmountError.textContent = '';

      mortgageTermBorder.classList.remove('border-red');
      mortgageTermValue.classList.remove('bg-red',"text-white");
      mortgageTermError.textContent = '';

      interestRateBorder.classList.remove('border-red');
      interestRateValue.classList.remove('bg-red',"text-white");
      interestRateError.textContent = '';

      mortgageTypeError.textContent = '';

      resultsDiv.innerHTML = `
        <img src="assets/images/illustration-empty.svg" alt="illustration-empty" width="150px">
        <h1 class="font-bold text-lg pb-2 text-white">Results shown here</h1>
        <p class="font-bold text-sm text-slate-300">Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
      `;
    });

    
    calculateButton.addEventListener('click', () => {
      const mortgageAmount = parseFloat(mortgageAmountInput.value);
      const mortgageTerm = parseFloat(mortgageTermInput.value);
      const interestRate = parseFloat(interestRateInput.value) / 100;
      let mortgageType;

      for (const input of mortgageTypeInputs) {
        if (input.checked) {
          mortgageType = input.value;
          break;
        }
      }

      if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate) || !mortgageType) {

        if (isNaN(mortgageAmount)) {
          mortgageAmountBorder.classList.add('border-red');
          mortgageAmountValue.classList.add('bg-red',"text-white");
          mortgageAmountError.textContent = 'This field is required';
        }
        else {
          mortgageAmountBorder.classList.remove('border-red');
          mortgageAmountValue.classList.remove('bg-red',"text-white");
          mortgageAmountError.textContent = '';
        }
        if (isNaN(mortgageTerm)) {
          mortgageTermBorder.classList.add('border-red');
          mortgageTermValue.classList.add('bg-red',"text-white");
          mortgageTermError.textContent = 'This field is required';
        }
        else {
          mortgageTermBorder.classList.remove('border-red');
          mortgageTermValue.classList.remove('bg-red',"text-white");
          mortgageTermError.textContent = '';
        }
        if (isNaN(interestRate)) {
          interestRateBorder.classList.add('border-red');
          interestRateValue.classList.add('bg-red',"text-white");
          interestRateError.textContent = 'This field is required';
        }
        else {
          interestRateBorder.classList.remove('border-red');
          interestRateValue.classList.remove('bg-red',"text-white");
          interestRateError.textContent = '';
        }
        if (!mortgageType) {
          mortgageTypeError.textContent = 'This field is required';
        }
        else {
          mortgageTypeError.textContent = '';
        }
      }
      else {

        mortgageAmountBorder.classList.remove('border-red');
        mortgageAmountValue.classList.remove('bg-red',"text-white");
        mortgageAmountError.textContent = '';

        mortgageTermBorder.classList.remove('border-red');
        mortgageTermValue.classList.remove('bg-red',"text-white");
        mortgageTermError.textContent = '';

        interestRateBorder.classList.remove('border-red');
        interestRateValue.classList.remove('bg-red',"text-white");
        interestRateError.textContent = '';

        mortgageTypeError.textContent = '';

        let monthlyRepayment;
        
        if (mortgageAmount <= 0 || mortgageTerm <= 0) {

          monthlyRepayment = 0;

        } else if (mortgageType === 'repayment') {

          const monthlyInterestRate = interestRate / 12;

          const numberOfPayments = mortgageTerm * 12;

          monthlyRepayment = monthlyInterestRate === 0 ? mortgageAmount / numberOfPayments : (mortgageAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        } else if (mortgageType === 'interest-only') {

          monthlyRepayment = (mortgageAmount * interestRate) / 12;

        }
        
        resultsDiv.innerHTML = `
          <div class="flex flex-col items-left justify-left h-full text-left aria-live="polite"">
            <h1 class="font-bold text-lg pb-2 text-white">Your results</h1>
            <p class="font-bold text-sm text-slate-300">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div class="bg-[hsl(202,75%,10%)] p-4 rounded-md mt-8 border-t-2 border-t-lime pt-4 text-slate-300">
              <div class="mt-2 ml-3">
                <h2 class="font-bold">Your monthly repayments</h2>
                <p class="font-bold text-[40px] text-lime">${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(monthlyRepayment)}</p>
                <br>
                <hr class="border-t-2 border-t-slate-300">
              </div>

              <div class="mt-6 mb-2 ml-3">
                <h2 class="font-bold">Total you'll repay over the term</h2>
                <p class="font-bold text-lg text-white">${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(monthlyRepayment * mortgageTerm * 12)}</p>
              </div>
            </div>
          </div>
        `;
        }
    });  