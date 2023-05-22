type Avatar = string | File

interface SubmitRegisterData {
  email: string,
  password: string,
  username: string,
  avatar: Avatar
}

interface SubmitLoginData {
  email: string,
  password: string,
}

interface User {
  email?: string,
  username: string,
  avatar: string,
  NFTs: string[],
  _id: string
}

interface fetchResult {
  token: string,
  verified: boolean,
  user: User
}

interface fetchFailed {
  error: string
}

interface NFT {
  _id: string,
  preview: string,
  owner: string,
  name?: string,
  price?: string,
  mintdate?: string
}

interface nftInfo {
  name?: string,
  price?: string,
  mintdate?: string

}