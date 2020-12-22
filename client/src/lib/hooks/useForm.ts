import { useState } from 'react'

export const useForm = <TState=any>() => {
 const [form, setForm] = useState<TState | {}>()
 const setValue = <TValue>(key: string, value: TValue) => {
   setForm({
     ...form,
     [key]: value
   }) 
 }

  return { form, setValue }
}