var dob = document.querySelector('#dob');

var btn = document.querySelector('#chk-btn');

var opt = document.querySelector('.output');

var error = document.querySelector('.error');

const mon = [ 31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];

let nearestDays = 0;

var nearDay , nearMon , nearYear ;

btn.addEventListener('click' , () => {

    clearError();

    opt.style.display = 'none';

    let dobValue = dob.value.split('-');

    if(dobValue == "")
    {
        showError();
        return;
    }

    console.log(dob);

    var year = dobValue[0] ;
    
    var month = dobValue[1] ;
    
    var day = dobValue[2];

    if(checkAllCombinations(year , month , day))
    {
        opt.innerHTML =  `<p>Hurrah ! Congrats your Birthday is a Palindrome Number</p>`;
    }
    else {

        findNearestPalindromeDate(year , month , day);
        opt.innerHTML = `<p>Aww  ☹ ! Sorry Your Birthday is not a Palindrome.</p>
                        <p>The nearest date that is palindrome is ` +
                        nearDay + "-" + nearMon + "-" + nearYear +` 
                        . You missed it by ` 
                        + nearestDays + `days`;
        
    }

    opt.style.display = "block";

});

function checkAllCombinations(year , month , day)
{
    return ( isPalindrome(day + month + year) || isPalindrome(month + day + year) || isPalindrome(day + year + month) || isPalindrome(month + year + day) || isPalindrome(year + month + day) || isPalindrome(year + day + month));
}

function isPalindrome(str)
{
    for(var i = 0 ; i<str.length/2 ; i++)
    {
        if(str[i]!=str[str.length - i - 1])
           return false;
    }

    return true;
}

function findNearestPalindromeDate(year , month , day)
{
    var d1 = Number(day) , m1 = Number(month) , y1 = Number(year);

    var d2 = d1 , m2 = m1 , y2 = y1 ;

    while(1)
    {
        // Checking for the upcoming date
        d1+=1;

        if(d1 > Number(mon[m1-1]))
        {
            d1 = 1;
            m1 += 1;
        }

        if(m1 > 12)
        {
            m1 = 1;
            y1 += 1
        }

        var tempd1 = d1.toString();

        var tempm1 = m1.toString();

        var tempy1 = y1.toString();

        tempd1 = tempd1.padStart(2,'0');

        tempm1 = tempm1.padStart(2,'0');

        tempy1 = tempy1.padStart(4,'0');

        console.log(tempd1 , tempm1 , tempy1);

        if(checkAllCombinations(tempy1 , tempm1 , tempd1))
        {
            nearDay = tempd1;
            nearMon = tempm1;
            nearYear = tempy1;
            break;
        }

        
        //Checking for the past Palindrome date

        d2-=1;

        if(d2<=0)
        {
            m2-=1;

            if(m2<=0)
            {
                y2-=1;
                m2 = 12;
            }

            d2 = mon[m2-1];
        }

        var tempd2 = d2.toString();

        var tempm2 = m2.toString();

        var tempy2 = y2.toString();

        tempd2 = tempd2.padStart(2,'0');

        tempm2 = tempm2.padStart(2,'0');

        tempy2 = tempy2.padStart(4,'0');

        console.log(tempd2 , tempm2 , tempy2);

        if(checkAllCombinations(tempy2 , tempm2 , tempd2))
        {
            nearDay = tempd2;
            nearMon = tempm2;
            nearYear = tempy2;
            break;
        }

        nearestDays++;
    }

    return nearestDays;
}


function showError()
{
    error.style.display = "block";
}

function clearError(){
    error.style.display = "none";
}