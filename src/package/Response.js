const HttpStatus = require('http-status-codes');
const _ = require('lodash');

class Response {
  /**
   * @example extra = {pagination: {offset: 10, limit: 50, rows: 1000}}
   *
   * @static
   * @param {*} res
   * @param {*} message
   * @param {*} [data=null]
   * @param {number} [code=200]
   * @param {*} [extra={}]
   * @memberof Response
   */
  static success(res, message, data = null, code = HttpStatus.OK, extra = {}) {
    const resObj = { success: true };

    if (_.isObjectLike(message)) {
      resObj.message = message.message || 'success';
      resObj.data = message.data || null;
      resObj.code = message.code || HttpStatus.OK;
      resObj.extra = message.extra || {};
    } else {
      resObj.message = message || 'success';
      resObj.data = data || null;
      resObj.code = code || HttpStatus.OK;
      resObj.extra = extra || {};
    }

    if (resObj.extra.pagination) {
      resObj.extra.pagination.currentPage = resObj.extra.pagination.offset / resObj.extra.pagination.limit + 1;
      resObj.extra.pagination.nextPage =
        resObj.extra.pagination.rows > resObj.extra.pagination.offset + resObj.extra.pagination.limit
          ? resObj.extra.pagination.currentPage + 1
          : null;
      delete resObj.extra.pagination.offset;
    }

    res.status(resObj.code).json(resObj);
  }

  /**
   * @static
   * @param {*} res
   * @param {*} message
   * @param {number} [code=404]
   * @param {*} [resCode=null]
   * @param {*} [extra={}]
   * @memberof Response
   */
  static fail(res, message, code = HttpStatus.NOT_FOUND, extra = {}) {
    const resObj = { success: false };

    if (_.isObjectLike(message)) {
      resObj.message = message.message || 'failed';
      resObj.code = message.code || HttpStatus.NOT_FOUND;
      resObj.extra = message.extra || {};
    } else {
      resObj.message = message || 'failed';
      resObj.code = code || HttpStatus.NOT_FOUND;
      resObj.extra = extra || {};
    }

    res.status(resObj.code).json(resObj);
  }
}

module.exports = Response;
