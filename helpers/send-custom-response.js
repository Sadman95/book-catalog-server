const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.status,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    }
    return res.status(responseData.statusCode).json(responseData)
}

module.exports = sendResponse
