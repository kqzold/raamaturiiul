import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Image } from '@heroui/react'

function HomePage() {
  // Временные данные для демонстрации
  const featuredBooks = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      price: "12.99",
      image: "https://via.placeholder.com/200x300?text=1984",
      rating: 4.5
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "10.99",
      image: "https://via.placeholder.com/200x300?text=Mockingbird",
      rating: 4.8
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "9.99",
      image: "https://via.placeholder.com/200x300?text=Gatsby",
      rating: 4.3
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: "11.99",
      image: "https://via.placeholder.com/200x300?text=Pride",
      rating: 4.7
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero секция */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">
          Добро пожаловать в RaamatuRiiul 📚
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Покупайте и продавайте книги, делитесь рецензиями и находите новые любимые произведения
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/catalog">
            <Button color="primary" size="lg">
              Смотреть каталог
            </Button>
          </Link>
          <Link to="/sell">
            <Button color="secondary" variant="bordered" size="lg">
              Продать книгу
            </Button>
          </Link>
        </div>
      </section>

      {/* Популярные книги */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">🔥 Популярные книги</h2>
          <Link to="/catalog">
            <Button variant="light" color="primary">
              Смотреть все →
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map(book => (
            <Card key={book.id} isPressable as={Link} to={`/book/${book.id}`}> 
              <CardBody className="p-0">
                <Image
                  src={book.image}
                  alt={book.title}
                  className="w-full h-80 object-cover"
                />
              </CardBody>
              <CardFooter className="flex-col items-start">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                <div className="flex justify-between items-center w-full mt-2">
                  <span className="text-lg font-bold text-primary">{book.price} €</span>
                  <span className="text-sm">⭐ {book.rating}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Преимущества платформы */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Почему выбирают нас?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Легкая покупка</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Простой и быстрый процесс покупки книг
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Выгодные цены</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Покупайте и продавайте книги по справедливым ценам
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">Отзывы и рейтинги</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Читайте отзывы и делитесь своим мнением о книгах
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
