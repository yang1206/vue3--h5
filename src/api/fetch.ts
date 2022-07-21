export async function Fetch(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  })
  const result = await response.json();
  return result
}
