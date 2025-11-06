import { useParams, Link } from 'react-router-dom'
import { Button, Card, CardBody, Image, Chip, Divider, Avatar, Textarea } from '@heroui/react'
import { useState } from 'react'

function BookDetailPage() {
  const { id } = useParams()
  const [userReview, setUserReview] = useState('')
  const [userRating, setUserRating] = useState(0)

  // Временные данные для демонстрации
  const book = {
    id: 1,
    title: "1984",
    author: "George Orwell",
    price: "12.99",
    image: "https://via.placeholder.com/400x600?text=1984",
    rating: 4.5,
    genre: 'Художественная литература',
    condition: 'Отличное',
    year: 1949,
    pages: 328,
    language: 'Английский',
    isbn: '978-0-452-28423-4',
    seller: {
      name: 'Иван Иванов',
      rating: 4.8,
      totalSales: 45,
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    description: `"1984" - культовый роман-антиутопия Джорджа Оруэлла, опубликованный в 1949 году. 
    
    Действие происходит в тоталитарном государстве Океания, где правящая партия во главе с Большим Братом контролирует каждый аспект жизни граждан. Главный герой, Уинстон Смит, работает в Министерстве правды, где его задача - переписывать историю в соответствии с текущей политикой партии.
    
    Книга исследует темы массового наблюдения, тоталитаризма, манипуляции информацией и подавления личности. Термины из романа, такие как "Большой Брат", "двоемыслие" и "полиция мыслей", стали частью современного языка.
    
    Это произведение остается актуальным и сегодня, заставляя задуматься о свободе, правде и власти.`,
    reviews: [
      {
        id: 1,
        user: 'Мария Петрова',
        avatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        date: '2025-10-15',
        comment: 'Потрясающая книга! Очень актуальна даже сегодня. Состояние отличное, быстрая доставка.'
      },
      {
        id: 2,
        user: 'Алексей Смирнов',
        avatar: 'https://i.pravatar.cc/150?img=8',
        rating: 4,
        date: '2025-10-10',
        comment: 'Классика антиутопии. Книга в хорошем состоянии, рекомендую продавца.'
      },
      {
        id: 3,
        user: 'Екатерина Волкова',
        avatar: 'https://i.pravatar.cc/150?img=9',
        rating: 5,
        date: '2025-09-28',
        comment: 'Одна из лучших книг, которые я читала. Заставляет думать о современном обществе.'
      }
    ]
  }

  const handleAddToCart = () => {
    alert('Книга добавлена в корзину!')
  }

  const handleSubmitReview = () => {
    if (userReview && userRating > 0) {
      alert('Отзыв отправлен!')
      setUserReview('')
      setUserRating(0)
    }
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '½' : '')
  }

  return (
    <div className="space-y-8">
      {/* Хлебные крошки */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <Link to="/" className="hover:text-primary">Главная</Link>
        {' > '}
        <Link to="/catalog" className="hover:text-primary">Каталог</Link>
        {' > '}
        <span>{book.title}</span>
      </div>

      {/* Основная информация о книге */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Изображение */}
        <div>
          <Image
            src={book.image}
            alt={book.title}
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Детали */}
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">by {book.author}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{renderStars(book.rating)}</span>
              <span className="text-lg text-gray-600 dark:text-gray-400">({book.rating})</span>
            </div>
          </div>

          <Divider />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Жанр:</span>
              <Chip variant="flat">{book.genre}</Chip>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Состояние:</span>
              <Chip color="success" variant="flat">{book.condition}</Chip>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Год издания:</span>
              <span>{book.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Страниц:</span>
              <span>{book.pages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Язык:</span>
              <span>{book.language}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
              <span className="font-mono text-sm">{book.isbn}</span>
            </div>
          </div>

          <Divider />

          {/* Продавец */}
          <Card>
            <CardBody>
              <div className="flex items-center gap-4">
                <Avatar src={book.seller.avatar} size="lg" />
                <div className="flex-1">
                  <p className="font-semibold">{book.seller.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ⭐ {book.seller.rating} • {book.seller.totalSales} продаж
                  </p>
                </div>
                <Button variant="bordered" size="sm">Профиль</Button>
              </div>
            </CardBody>
          </Card>

          <Divider />

          {/* Цена и кнопка */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-primary">{book.price} €</span>
              <Chip color="success" variant="flat" size="lg">В наличии</Chip>
            </div>
            <div className="space-y-2">
              <Button color="primary" size="lg" className="w-full" onClick={handleAddToCart}>
                🛒 Добавить в корзину
              </Button>
              <Button variant="bordered" size="lg" className="w-full">
                💬 Написать продавцу
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Описание */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📖 Описание</h2>
        <div className="prose dark:prose-invert max-w-none">
          {book.description.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Divider />

      {/* Отзывы */}
      <div>
        <h2 className="text-2xl font-bold mb-6">⭐ Отзывы ({book.reviews.length})</h2>
        
        {/* Форма добавления отзыва */}
        <Card className="mb-6">
          <CardBody>
            <h3 className="font-semibold mb-4">Оставить отзыв</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">Ваша оценка:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`text-2xl ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                placeholder="Поделитесь своим мнением о книге..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                minRows={3}
              />
              <Button 
                color="primary" 
                onClick={handleSubmitReview}
                isDisabled={!userReview || userRating === 0}
              >
                Отправить отзыв
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Список отзывов */}
        <div className="space-y-4">
          {book.reviews.map(review => (
            <Card key={review.id}>
              <CardBody>
                <div className="flex gap-4">
                  <Avatar src={review.avatar} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{review.date}</p>
                      </div>
                      <span className="text-yellow-400">{renderStars(review.rating)}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage
