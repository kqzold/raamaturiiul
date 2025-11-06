import { useState } from 'react'
import { Card, CardBody, Input, Button, Divider, Checkbox } from '@heroui/react'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Заполните все поля')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают')
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      alert('Необходимо согласиться с условиями использования')
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      alert('Регистрация успешна! Теперь войдите в систему.')
      setIsLoading(false)
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardBody className="space-y-6 p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">📝 Регистрация</h1>
              <p className="text-gray-600 dark:text-gray-400">Создайте новый аккаунт</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" label="Имя" placeholder="Иван Иванов" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} isRequired startContent={<span className="text-default-400">👤</span>} />
              <Input type="email" label="Email" placeholder="your.email@example.com" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} isRequired startContent={<span className="text-default-400">📧</span>} />
              <Input type={showPassword ? 'text' : 'password'} label="Пароль" placeholder="Минимум 6 символов" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} isRequired startContent={<span className="text-default-400">🔒</span>} endContent={<button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">{showPassword ? '👁️' : '👁️‍🗨️'}</button>} />
              <Input type={showConfirmPassword ? 'text' : 'password'} label="Подтвердите пароль" placeholder="Повторите пароль" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} isRequired startContent={<span className="text-default-400">🔒</span>} endContent={<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</button>} />
              <Checkbox isSelected={formData.agreeToTerms} onValueChange={(value) => handleInputChange('agreeToTerms', value)} size="sm"><span className="text-sm">Я согласен с <Link to="/terms" className="text-primary hover:underline">Условиями использования</Link> и <Link to="/privacy" className="text-primary hover:underline">Политикой конфиденциальности</Link></span></Checkbox>
              <Button type="submit" color="primary" size="lg" className="w-full" isLoading={isLoading}>{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</Button>
            </form>
            <Divider />
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Уже есть аккаунт? <Link to="/login" className="text-primary font-semibold hover:underline">Войти</Link></p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
