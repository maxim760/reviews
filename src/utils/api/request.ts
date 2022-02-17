import { $host } from '.'

export const request = async (methodName: string, params = {}) => {
  const body = {
    methodName,
    ...params,
  }
  try {
    const { data } = await $host.post('', JSON.stringify(body))
    if (!data || data.result !== 0) {
      throw new Error(data.resultdescription)
    }
    process.env.NODE_ENV === 'development' &&
      console.log(methodName, body, data)

    return data.data
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(methodName, body, error)
    }

    return []
  }
}
