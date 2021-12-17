'use strict';

var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./product/quickView'));

    $(".demoImage").each(function () {
      var mainObj = $(this);
     
       var currentImg = $(mainObj).find(".fetch-img-src").attr("src");
       console.log(currentImg);
       $(mainObj).css("background-image", "url(" + currentImg + ")");
       $(mainObj).html("<h1>Akshay</h1>");
  });

  


});
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
$(function() {

  $(".get-nicer").niceScroll("div.nice-wrapper", {
    cursorwidth: "12px"
  });

  $(".get-nicer").scroll(function() {
    $("#scroll-info-value").val($(".get-nicer").scrollTop());
  });

  $("a.btn").click(function(e) {
    e.preventDefault();

    console.log('click', e.target);

    $('#nice-modal1').modal();
  });

});
const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone = document.getElementById('phone');
const pin = document.getElementById('pin');



form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const phoneValue = phone.value.trim();
    const pinValue = pin.value.trim();

    if(firstnameValue === '') {
        setError(firstname, 'Firstname is required');
    } else {
        setSuccess(firstname);
    }

    if(lastnameValue === '') {
        setError(lastname, 'Lastname is required');
    } else {
        setSuccess(lastname);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

    if(phoneValue === '') {
        setError(phone, 'phone is required');
    } 
    else if(phoneValue.length !=10){
        setError(phone, 'phone is invalid');
    }
    else {
        setSuccess(phone);
    }

    if(pinValue === '') {
        setError(pin, 'pin is required');
    } 
    else if(pinValue.length !=6){
        setError(pin, 'pin is invalid');
    }
    else {
        setSuccess(pin);
    }
    
};
