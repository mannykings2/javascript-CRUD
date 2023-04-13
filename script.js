// User Class: Represents a User

var selectedRow = null;
class User {
  constructor(name, mail, password) {
    this.name = name;
    this.mail = mail;
    this.password = password;
  }
}

// UI Class: Handle UI Tasks
class UI {

  static addUserToList(user) {
    const list = document.querySelector('#user-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.mail}</td>
      <td>${user.password}</td>
      <td><a href="#" class="btn btn-success btn-sm edit">Edit</a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    `;

    list.appendChild(row);
  }
  static editUserToList(user) {
    selectedRow.children[0].textContent = user.name;
    selectedRow.children[1].textContent = user.mail;
    selectedRow.children[2].textContent = user.password;
  }
  static deleteUser(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      UI.showAlert('User Deleted', 'danger');
    } else null

  }
  static editUser(el) {
    
    if(el.classList.contains('edit')) {
      selectedRow = el.parentElement.parentElement;
      document.querySelector('#name').value = selectedRow.children[0].textContent;
      document.querySelector('#mail').value = selectedRow.children[1].textContent;
      document.querySelector('#password').value = selectedRow.children[2].textContent;

    } else null
    
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#mail').value = '';
    document.querySelector('#password').value = '';
  }
}


// Event: Display Users
document.addEventListener('DOMContentLoaded',UI.displayUsers);

// Event: Add a User
document.querySelector('#user-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  
  const name = document.querySelector('#name').value;
  const mail = document.querySelector('#mail').value;
  const password = document.querySelector('#password').value;

  // Validate
  
  if(name === '' || mail === '' || password === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate User
    const user = new User(name, mail, password);
  if (selectedRow == null) {
    // Add User to UI
    UI.addUserToList(user);
    selectedRow = null;
    UI.showAlert('User Added', 'success');
  } else {
    UI.editUserToList(user);
    selectedRow = null;
    UI.showAlert('User Info Edited', 'info');
  }
  
    UI.clearFields();
  }
});

// Event: Remove a User
document.querySelector('#user-list').addEventListener('click', (e) => {
  // Remove User from UI
  UI.deleteUser(e.target);
  UI.editUser(e.target);

});