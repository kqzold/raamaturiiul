import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О проекте */}
          <div>
            <h3 className="font-bold text-lg mb-4">📚 RaamatuRiiul</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Онлайн-платформа для покупки и продажи книг с рецензиями и рекомендациями.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Каталог книг
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Продать книгу
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Профиль
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Правила
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold mb-4">Связь</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>📧 info@raamaturiiul.ee</li>
              <li>📞 +372 1234 5678</li>
              <li>📍 Tallinn, Estonia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} RaamatuRiiul. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
