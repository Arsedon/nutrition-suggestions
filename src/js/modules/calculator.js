function calculator() {
    
    const calculationObj = {
        gender: 'Женщина',
        height: null,
        weight: null,
        age: null,
        activityCoeficient: 1.38,

        calculateCcalNumber() {
            const genderNum = this.gender === 'Мужчина' ? 5 : -161;
            
            return Math.round((this.weight * 10 
                + this.height * 6.25
                + this.age * 5
                + genderNum)
                * this.activityCoeficient);
        }
    }

    const coefficients = {
        'Низкая активность': 1.2,
        'Невысокая активность': 1.38,
        'Умеренная активность': 1.55,
        'Высокая активность': 1.7
    }

    function getGenderFromGenderButtons(){
        return genderButtons
         .filter(btn => btn.className === 'calculating__choose-item calculating__choose-item_active')[0]
         .innerHTML;
     }
 
     function getActivityCoefficientFromCalcButtons(){
         const buttonKey = calculatingChooseButtonsArr
             .filter(btn => btn.className === 'calculating__choose-item calculating__choose-item_active')[0]
             .innerHTML;
        return coefficients[buttonKey];
     }

    const calculatingField = document.querySelector('.calculating__field'),
          genderButtons = Array.from(document.getElementById('gender').getElementsByClassName('calculating__choose-item')),
          calculatingChooseButtonsArr = Array.from(document.getElementsByClassName('calculating__choose calculating__choose_big')[0].children),
          conditionInputs = document.getElementsByClassName('calculating__choose calculating__choose_medium')[0],
          resultCcal = document.getElementById('ccal');
    
    function switchActivityOfCalculatingChooseButtons(btn, buttonArr){
        buttonArr.forEach(b => {
            if(b.className === 'calculating__choose-item calculating__choose-item_active'){
                b.className = 'calculating__choose-item';
                }
            btn.className = 'calculating__choose-item calculating__choose-item_active';
        });
    }

    function getResultCcal(){
        resultCcal.textContent = calculationObj.calculateCcalNumber() > 0
        ? calculationObj.calculateCcalNumber()
        : 0; 
    }

    calculatingField.addEventListener('click', (event) => {
        if(event.target.className === 'calculating__choose-item' && event.path[1].className === 'calculating__choose'){
            switchActivityOfCalculatingChooseButtons(event.target, genderButtons);
            calculationObj.gender = getGenderFromGenderButtons();

        } else if(event.target.className === 'calculating__choose-item' && event.path[1].className === 'calculating__choose calculating__choose_big'){
            switchActivityOfCalculatingChooseButtons(event.target, calculatingChooseButtonsArr);
            calculationObj.activityCoeficient = getActivityCoefficientFromCalcButtons();

        } else if(event.target.className === 'calculating__choose-item' && event.path[1].className === 'calculating__choose calculating__choose_medium'){
            conditionInputs.addEventListener('input', (event) => {
                calculationObj.calculateCcalNumber(); 
                if(event.target.getAttribute('id') === 'height'){
                    calculationObj.height = event.target.value;                    
                } else if (event.target.getAttribute('id') === 'age'){
                    calculationObj.age = event.target.value;
                } else if (event.target.getAttribute('id') === 'weight'){
                    calculationObj.weight = event.target.value;
                } 
                getResultCcal();
            });
        }
        getResultCcal();
    });
}

export default calculator;