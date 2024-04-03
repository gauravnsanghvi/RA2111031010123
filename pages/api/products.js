import axios from 'axios';

// Function to fetch the bearer token
const fetchBearerToken = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/auth', {
      companyName: 'Abode',
      clientID: '5209ecd5-4372-4415-a607-2148eb4018b8',
      clientSecret: 'FpWlSBfBfSDopHIm',
      ownerName: 'Gaurav',
      ownerEmail: 'gs1411@srmist.edu.in',
      rollNo: 'RA2111031010123'
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching bearer token:', error.message);
    throw new Error('Failed to fetch bearer token');
  }
};

export default async function handler(req, res) {
  try {
    // Fetch the bearer token
    const token = await fetchBearerToken();

    // Use the token to fetch top products
    const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
