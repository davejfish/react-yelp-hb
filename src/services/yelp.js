export async function fetchBusinesses(zip = '98466', term = 'pizza') {
  const params = new URLSearchParams();
  params.set('zip', zip);
  params.set('term', term);

  console.log('zip is: ', zip);
  console.log('term is: ', term);

  const response = await fetch(`/.netlify/functions/fetch-yelp?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  return data;
}
