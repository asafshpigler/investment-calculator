export async function getUsers() {
  fetch('/users')
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
}

export async function getCharts() {
  return fetch('/charts')
    .then(res => res.json())
}

export async function getPropertyExpenses() {
  // TO REMOVE AFTER: handling user authentication, cookies
  return fetch('/property-expenses?userId=5')
    .then(res => res.json())
    .then(console.log);
}