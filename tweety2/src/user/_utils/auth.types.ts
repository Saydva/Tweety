export type LoginResponse = {
  tokens: { accessToken: string; refreshToken: string }
  _id: string
  name: string
}

export type UserProps = {
  _id: string
  name: string
}
