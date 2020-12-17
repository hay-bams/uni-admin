import { ObjectID } from "mongodb"

export const formatId = (ids: string[]) => {
  const newIds = ids.map((id) => {
    return new ObjectID(id)
  })

  return newIds
}