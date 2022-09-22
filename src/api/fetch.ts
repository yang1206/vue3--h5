export async function Fetch(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  })
 return await response.json();
}
