"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as motion from "motion/react-client"

type LoginForm = {
  login: string;
  password: string;
};

type LoginKeyType = "email" | "phone" | "nickname";
type LoginValueType = {
  value: RegExp;
  message: string;
  placeholder: string;
}

const loginTypes: Record<LoginKeyType, LoginValueType> = {
  email: {
    value: /^\S+@\S+$/i,
    message: "Введите корректный e-mail",
    placeholder: "Введите Почту"
  },
  phone: {
    value: /^[+]?[0-9]{10,13}$/,
    message: "Введите корректный номер телефона",
    placeholder: "Введите Телефон"
  },
  nickname: {
    value: /^[A-Za-z0-9_]{3,15}$/,
    message: "Введите корректный никнейм",
    placeholder: "Введите Никнейм"
  }
};

import axios from 'axios';

const loginUser = async (data: LoginForm, loginType: LoginKeyType) => {
  try {
    const response = await axios.post('http://localhost:3005/auth/login', {
      login: data.login,
      password: data.password,
      loginType
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status, data: error.response?.data };
    }
    return { status: 500, data: null };
  }
};

export default function SignInCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<LoginForm>();

  const [loginType, setLoginType] = React.useState<LoginKeyType>("email");
  const [smile, setSmile] = React.useState<'neutral' | 'sad' | 'happy'>("neutral");
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const handleLoginTypeChange = (value: string) => {
    const newType = value as LoginKeyType;
    setLoginType(newType);
    clearErrors("login");
  };

  const onSubmit = async (data: LoginForm) => {
    setLoginError(null);
    setSmile("neutral"); // Сброс перед запросом

    try {
      const result = await loginUser(data, loginType);

      // Явная проверка успешного статуса
      if (result && result.status === 200) {
        setSmile("happy");
        console.log("Успешная авторизация", result.data);
      } else {
        // Принудительное обновление состояния через setTimeout
        setTimeout(() => setSmile("sad"), 3000);

        let errorMessage = "Ошибка авторизации";
        if (result) {
          if (result.status === 401) {
            errorMessage = "Неверный логин или пароль";
          } else if (result.status === 400) {
            errorMessage = "Некорректные данные";
          } else if (result.status === 404) {
            errorMessage = "Пользователь не найден";
          }
        }

        setLoginError(errorMessage);
        setError("password", { message: errorMessage });
      }
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      // Двойное обновление для гарантии
      setSmile("neutral");
      setTimeout(() => setSmile("sad"), 3000);
      setLoginError("Произошла ошибка при подключении к серверу");
    }
  };
  return (
    <Card className="flex w-full h-full flex-row mx-12 px-5">
      <div className="flex w-full h-full flex-col items-center justify-center gap-8">
        <CardHeader className="flex items-center justify-center flex-col w-full">
          <CardTitle className="text-3xl">Авторизация</CardTitle>
          <CardDescription className="text-xl">Выберите вариант быстрой авторизации</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex w-full flex-row items-center justify-between my-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >
              <Button variant="outline" className="text-xl border-blue-400 border-2 px-6 w-3xs hover:bg-blue-50">Телеграмм</Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >
              <Button variant="outline" className="text-xl border-blue-400 border-2 px-6 w-3xs hover:bg-blue-50">QR-code</Button>
            </motion.div>
          </div>
          <p className="w-full items-center justify-center flex text-blue-500 font-bold">Или через почту или пароль</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="login">Логин</Label>
              <div className="flex flex-row items-center justify-center gap-2">
                <Select
                  value={loginType}
                  onValueChange={handleLoginTypeChange}
                >
                  <SelectTrigger className="flex w-[110px]">
                    <SelectValue placeholder="Способ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Почта</SelectItem>
                    <SelectItem value="phone">Телефон</SelectItem>
                    <SelectItem value="nickname">Ник</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="login"
                  type="text"
                  {...register('login', {
                    required: 'Обязательное поле',
                    pattern: {
                      value: loginTypes[loginType].value,
                      message: loginTypes[loginType].message,
                    },
                  })}
                  className="flex"
                  placeholder={loginTypes[loginType].placeholder}
                  autoComplete="login"
                />
              </div>
              {errors.login && (
                <p className="text-destructive text-sm mt-1">
                  {errors.login.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Обязательное поле',
                  minLength: {
                    value: 6,
                    message: 'Минимум 6 символов',
                  },
                })}
                className="mt-2"
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              {loginError && (
                <p className="text-destructive text-sm mt-1">
                  {loginError}
                </p>
              )}
            </div>
            <div className="flex flex-row w-full justify-between">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-3/5"
              >
                <Button type="submit" disabled={isSubmitting} className="w-full" onClick={handleSubmit(onSubmit)}>
                  {isSubmitting ? "Отправка..." : "Войти"}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-1/3"
              >
                <Button variant="outline" disabled={isSubmitting} className="w-full">
                  Восстановить
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Смайл показывает статус авторизации: {smile === 'happy' ? 'Успешно!' : smile === 'sad' ? 'Ошибка' : 'Готово к вводу'}
          </p>
          <Button onClick={() => {
            if (smile === 'happy') {
              setSmile("sad")
            } else if (smile === 'sad') {
              setSmile("neutral")
            } else {
              setSmile("happy")
            }
          }}>Сменить</Button>
        </CardFooter>
      </div>
    </Card>
  )
}