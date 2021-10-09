export async function getUsers() {
  fetch('/users')
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
}