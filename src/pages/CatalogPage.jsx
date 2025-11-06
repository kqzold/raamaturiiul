import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Image, Input, Select, SelectItem, Chip } from '@heroui/react'

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  // Временные данные для демонстрации
  const genres = [
    { value: 'all', label: 'Все жанры' },
    { value: 'fiction', label: 'Художественная литература' },
    { value: 'non-fiction', label: 'Нехудожественная' },
    { value: 'science', label: 'Научная' },
    { value: 'fantasy', label: 'Фэнтези' },
    { value: 'mystery', label: 'Детектив' },
  ]

  const priceRanges = [
    { value: 'all', label: 'Все цены' },
    { value: '0-10', label: 'До 10€' },
    { value: '10-20', label: '10€ - 20€' },
    { value: '20-50', label: '20€ - 50€' },
    { value: '50+', label: 'Более 50€' },
  ]

  const books = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      price: "12.99",
      image: "https://via.placeholder.com/200x300?text=1984",
      rating: 4.5,
      genre: 'fiction',
      condition: 'Отличное'
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "10.99",
      image: "https://via.placeholder.com/200x300?text=Mockingbird",
      rating: 4.8,
      genre: 'fiction',
      condition: 'Хорошее'
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "9.99",
      image: "https://via.placeholder.com/200x300?text=Gatsby",
      rating: 4.3,
      genre: 'fiction',
      condition: 'Отличное'
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: "11.99",
      image: "https://via.placeholder.com/200x300?text=Pride",
      rating: 4.7,
      genre: 'fiction',
      condition: 'Хорошее'
    },
    {
      id: 5,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      price: "24.99",
      image: "https://via.placeholder.com/200x300?text=Sapiens",
      rating: 4.6,
      genre: 'non-fiction',
      condition: 'Отличное'
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: "15.99",
      image: "https://via.placeholder.com/200x300?text=Hobbit",
      rating: 4.9,
      genre: 'fantasy',
      condition: 'Хорошее'
    },
    {
      id: 7,
      title: "The Da Vinci Code",
      author: "Dan Brown",
      price: "13.99",
      image: "https://via.placeholder.com/200x300?text=DaVinci",
      rating: 4.2,
      genre: 'mystery',
      condition: 'Отличное'
    },
    {
      id: 8,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      price: "18.99",
      image: "https://via.placeholder.com/200x300?text=Time",
      rating: 4.4,
      genre: 'science',
      condition: 'Хорошее'
    },
  ]

  // Фильтрация книг
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre
    
    let matchesPrice = true
    if (priceRange !== 'all') {
      const price = parseFloat(book.price)
      if (priceRange === '0-10') matchesPrice = price < 10
      else if (priceRange === '10-20') matchesPrice = price >= 10 && price < 20
      else if (priceRange === '20-50') matchesPrice = price >= 20 && price < 50
      else if (priceRange === '50+') matchesPrice = price >= 50
    }

    return matchesSearch && matchesGenre && matchesPrice
  })

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-4xl font-bold mb-2">📚 Каталог книг</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Найдено {filteredBooks.length} книг
        </p>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Поиск */}
          <Input
            type="search"
            placeholder="Поиск по названию или автору..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<span>🔍</span>}
            size="lg"
          />

          {/* Жанр */}
          <Select
            label="Жанр"
            selectedKeys={[selectedGenre]}
            onChange={(e) => setSelectedGenre(e.target.value)}
            size="lg"
          >
            {genres.map((genre) => (
              <SelectItem key={genre.value} value={genre.value}>
                {genre.label}
              </SelectItem>
            ))}
          </Select>

          {/* Цена */}
          <Select
            label="Цена"
            selectedKeys={[priceRange]}
            onChange={(e) => setPriceRange(e.target.value)}
            size="lg"
          >
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Активные фильтры */}
        {(searchQuery || selectedGenre !== 'all' || priceRange !== 'all') && (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Активные фильтры:</span>
            {searchQuery && (
              <Chip onClose={() => setSearchQuery('')} variant="flat">
                Поиск: {searchQuery}
              </Chip>
            )}
            {selectedGenre !== 'all' && (
              <Chip onClose={() => setSelectedGenre('all')} variant="flat">
                Жанр: {genres.find(g => g.value === selectedGenre)?.label}
              </Chip>
            )}
            {priceRange !== 'all' && (
              <Chip onClose={() => setPriceRange('all')} variant="flat">
                Цена: {priceRanges.find(p => p.value === priceRange)?.label}
              </Chip>
            )}
          </div>
        )}
      </div>

      {/* Список книг */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <Card key={book.id} isPressable as={Link} to={`/book/${book.id}`}> 
              <CardBody className="p-0">
                <Image
                  src={book.image}
                  alt={book.title}
                  className="w-full h-80 object-cover"
                />
              </CardBody>
              <CardFooter className="flex-col items-start">
                <div className="w-full">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                  <Chip size="sm" variant="flat" className="mt-2">
                    {book.condition}
                  </Chip>
                  <div className="flex justify-between items-center w-full mt-3">
                    <span className="text-lg font-bold text-primary">{book.price} €</span>
                    <span className="text-sm">⭐ {book.rating}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400 mb-2">😔</p>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Книги не найдены. Попробуйте изменить фильтры.
          </p>
        </div>
      )}
    </div>
  )
}

export default CatalogPage
