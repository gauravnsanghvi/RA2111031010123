import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products', {
      params: {
        top: 10,
        minPrice: 1,
        maxPrice: 10000
      },
      headers: {
        Authorization: 'Bearer '
      }
    });

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
