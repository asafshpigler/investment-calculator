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