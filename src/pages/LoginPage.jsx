import { useState } from 'react'
import { Card, CardBody, Input, Button, Divider, Link as UILink } from '@heroui/react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!formData.email || !formData.password) {
      alert('Заполните все поля')
      setIsLoading(false)
      return
    }
    setTimeout(() => {
      alert('Вход выполнен успешно!')
      setIsLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardBody className="space-y-6 p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">🔐 Вход</h1>
              <p className="text-gray-600 dark:text-gray-400">Войдите в свой аккаунт</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="email" label="Email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} isRequired startContent={<span className="text-default-400">📧</span>} />
              <Input type={showPassword ? 'text' : 'password'} label="Пароль" placeholder="Введите пароль" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} isRequired startContent={<span className="text-default-400">🔒</span>} endContent={<button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">{showPassword ? '👁️' : '👁️‍🗨️'}</button>} />
              <Button type="submit" color="primary" size="lg" className="w-full" isLoading={isLoading}>{isLoading ? 'Вход...' : 'Войти'}</Button>
            </form>
            <Divider />
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Нет аккаунта? <Link to="/register" className="text-primary font-semibold hover:underline">Зарегистрироваться</Link></p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
