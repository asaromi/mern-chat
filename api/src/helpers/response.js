require("dotenv").config()
const debug = process.env.NODE_ENV === "development"

const successResponse = (res) => (code, data) => {
  return res.status(code || 200).json({
    success: true,
    data,
  })
}

const errorResponse = (res) => (code, error) => {
  if (debug) console.error(error)

  return res.status(error?.code || code).json({
    success: false,
    message: error?.message || "Server Error",
  })
}

module.exports = { successResponse, errorResponse }
