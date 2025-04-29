import { User } from "./user"

type Address = {
  address: string
  state: string
  city: string
}

type Company = {
  name: string
  title: string
}

export type UserDetail = User & {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}
