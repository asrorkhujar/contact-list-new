// Kontaktlarni joylash uchun bo'sh array ochamiz
var contacts = [];

// DOM
var elNewContactForm = document.querySelector('.js-new-contact-form');

var elContacts = document.querySelector('.contacts');
var elContactsList = elContacts.querySelector('.contacts__list');
var isNumberExist = document.querySelector('.already-exists-phone');
var elDeleteButton = document.querySelector('.delete-button');


function addContact(name, relationship, phone) {
  contacts.push({
    name: name,
    relationship: relationship,
    phone: phone
  });
}

var elContactListItemTemplate = document.querySelector('#contact-list-item-template').content;

function showContacts() {
  elContactsList.innerHTML = '';
  var elContactsFragment = document.createDocumentFragment();

  for (var contact of contacts) {
    var elNewContactsItem = elContactListItemTemplate.cloneNode(true);
    elNewContactsItem.querySelector('.contact').setAttribute('data-id', contact.phone);

    elNewContactsItem.querySelector('.contact__name').textContent = contact.name;
    elNewContactsItem.querySelector('.contact__relationship').textContent = contact.relationship;
    elNewContactsItem.querySelector('.contact__phone-link').textContent = contact.phone;
    elNewContactsItem.querySelector('.contact__phone-link').href = `tel:${contact.phone}`;

    elContactsFragment.appendChild(elNewContactsItem);
  }

  elContactsList.appendChild(elContactsFragment);
}


// Form bo'lsa
if (elNewContactForm) {
  elNewContactForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var elNewContactNameInput = elNewContactForm.querySelector('.js-new-contact-name-input');
    var elNewContactRelationshipInput = elNewContactForm.querySelector('.js-new-contact-relationship-input');
    var elNewContactPhoneInput = elNewContactForm.querySelector('.js-new-contact-phone-input');
    var phoneIndex = contacts.findIndex(function (contact) {
      return contact.phone === elNewContactPhoneInput.value.trim();
    });

    //Agar bir xil raqam kiritilsa
    if (phoneIndex > -1) {
      elNewContactPhoneInput.classList.add('is-invalid');
      isNumberExist.classList.remove('d-none');
      return;
    } else {
      elNewContactPhoneInput.classList.remove('is-invalid');
      isNumberExist.classList.add('d-none');
    }

    // Add contact to contacts array
    addContact(
      elNewContactNameInput.value.trim(),
      elNewContactRelationshipInput.value.trim(),
      elNewContactPhoneInput.value.trim()
      );

      // Reset inputs
      elNewContactNameInput.value = '';
      elNewContactRelationshipInput.value = '';
      elNewContactPhoneInput.value = '';

      showContacts();
    });
  }


  // Qo'shilgan kontaktlarni o'chirib tashlash

  elContactsList.addEventListener('click', (e) => {
    if (e.target.matches('.delete-button')) {
      var contactIndex = contacts.findIndex(contact => e.target.closest('.contact').dataset.id === contact.phone);
      contacts.splice(contactIndex, 1);
      console.log(contacts);
      showContacts();
    }
  })
