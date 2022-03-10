import { IListing } from '../interfaces/IListing'
import { Api } from './api'

const getAllListing = () => Api.get<IListing[]>('/data')

export const listingServices = {
  getAllListing,
}
