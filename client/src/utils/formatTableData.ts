import { Students_students_results } from "../graphql/queries/students/__generated__/Students"

export const formatTableData = (data: any | undefined) => {
  return data && data.map((datum: any) => {
    console.log(datum)
    return {
      ...datum,
      key: `${datum.id}`,
    }
  })
}