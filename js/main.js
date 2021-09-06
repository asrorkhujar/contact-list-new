// Kontaktlarni joylash uchun bo'sh array ochamiz
var contacts = [];


// DOM
var elNewContactForm = document.querySelector('.js-new-contact-form');

var elContacts = document.querySelector('.contacts');
var elContactsList = elContacts.querySelector('.contacts__list');

var isNumberExist = elNewContactForm.querySelector('.already-have-phone');

// Form bo'lsa
if (elNewContactForm) {
  elNewContactForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var elNewContactNameInput = elNewContactForm.querySelector('.js-new-contact-name-input');
    var elNewContactRelationshipInput = elNewContactForm.querySelector('.js-new-contact-relationship-input');
    var elNewContactPhoneInput = elNewContactForm.querySelector('.js-new-contact-phone-input');
    var isAvailable = contacts.findIndex(function(contact){
      return contact.phone === elNewContactPhoneInput.value.trim();
    })
    console.log(isAvailable);

    if(isAvailable > -1){
      elNewContactPhoneInput.classList.add('is-invalid');
      isNumberExist.classList.remove('d-none');
      return;
    }else{
      elNewContactPhoneInput.classList.remove('is-invalid');
      isNumberExist.classList.add('d-none');
    }

    addContact();
    showContacts();

    function addContact(){
      contacts.push({
        name: elNewContactNameInput.value.trim(),
        relationship: elNewContactRelationshipInput.value.trim(),
        phone: elNewContactPhoneInput.value.trim()
      });

      elNewContactNameInput.value = '';
      elNewContactRelationshipInput.value = '';
      elNewContactPhoneInput.value = '';
    }

    function showContacts(){
      elContactsList.innerHTML = '';
      var elContactsFragment = document.createDocumentFragment();

      for (var contact of contacts) {
        var elNewLi = document.createElement('li');
        elNewLi.classList.add('list-group-item', 'p-3');

        var elNewHeading = document.createElement('h3');
        elNewHeading.classList.add('h5');
        elNewHeading.textContent = contact.name;
        elNewLi.appendChild(elNewHeading);

        var elNewRelDiv = document.createElement('div');
        elNewRelDiv.classList.add('mb-2');
        elNewRelDiv.textContent = contact.relationship;
        elNewLi.appendChild(elNewRelDiv);

        var elNewPhoneLink = document.createElement('a');
        elNewPhoneLink.classList.add('btn', 'btn-outline-success', 'btn-sm');
        elNewPhoneLink.href = 'tel:' + contact.phone;
        elNewPhoneLink.textContent = contact.phone;
        elNewLi.appendChild(elNewPhoneLink);

        elContactsFragment.appendChild(elNewLi);
      }
      elContactsList.appendChild(elContactsFragment);
    }



  });
}
// Form submitda amal bajariladi