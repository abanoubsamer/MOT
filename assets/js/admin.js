






//read
document.addEventListener('DOMContentLoaded', function() {
    var section = document.getElementById('dataTableSection');
    section.scrollIntoView({ behavior: 'smooth' });
});


let goal_id;
let target_amount=document.getElementById('target_amount');
let current_amount=document.getElementById('current_amount');
let Category=document.getElementById('category');
let date=document.getElementById('date');
    function updateData() {
        let newdata = {
            target_amount:target_amount.value,
            current_amount:current_amount.value,
            Category:category.value,
            date:date.value,

      }
      document.getElementById('newDataInput').value=JSON.stringify(newdata);
}





// scroll function
const scroll = () => {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Throttle scroll events to once every 200 milliseconds
    let throttleTimer;
    window.onscroll = function () {
        if (!throttleTimer) {
            throttleTimer = setTimeout(function () {
                throttleTimer = null;
            }, 200);
        }
    };
    scrollToTop();
};


//get data in form
function editOrder(Financial) {
    var form = document.getElementById('myForm');
     Financial=JSON.parse(Financial);
     goal_id = Financial.goalid;
 
     target_amount.value = Financial.targetamount; 
    
     current_amount.value = Financial.currentamount; 
     date.value = Financial.date;
     Category.value = Financial.category;
   
     form.setAttribute('action', '/FinancialGoals/update/' + goal_id); // corrected variable name
    scroll();
}


function search()
{

}