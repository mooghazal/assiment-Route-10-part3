


export const successResponse = ({res, message = true, data = undefined, status}) => {
  return res.status(status).json({ message, data })
}
