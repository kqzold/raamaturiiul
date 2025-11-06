import React, { useState } from 'react';
import { Card, Input, Textarea, Select, Radio, Button } from 'hero-ui'; // Adjust import according to the actual HeroUI path
import { useHistory } from 'react-router-dom';

const SellBookPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    ISBN: '',
    year: '',
    pages: '',
    language: '',
    genre: '',
    condition: '',
    price: '',
    description: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here

    // On successful submission, navigate to profile page
    history.push('/profile');
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <Input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
        <Input name="ISBN" placeholder="ISBN" value={formData.ISBN} onChange={handleChange} required />
        <Input name="year" placeholder="Year" type="number" value={formData.year} onChange={handleChange} required />
        <Input name="pages" placeholder="Pages" type="number" value={formData.pages} onChange={handleChange} required />
        <Select name="language" value={formData.language} onChange={handleChange} required>
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          {/* Add more options as needed */}
        </Select>
        <Input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
        
        <div>
          <label>Condition:</label>
          <Radio name="condition" value="excellent" onChange={handleChange} required>Excellent</Radio>
          <Radio name="condition" value="good" onChange={handleChange}>Good</Radio>
          <Radio name="condition" value="fair" onChange={handleChange}>Fair</Radio>
          <Radio name="condition" value="poor" onChange={handleChange}>Poor</Radio>
        </div>
        
        <Input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
        <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        
        <Input type="file" accept="image/*" multiple onChange={handleImageChange} required />
        
        <Button type="submit">Sell Book</Button>
      </form>
    </Card>
  );
};

export default SellBookPage;