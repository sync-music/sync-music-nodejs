/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import ApiError from '../errors/ApiError';

type RequestParameters = { url: string, method: string, body?: any, headers?: any, returnError?: boolean }

const request = async ({
    url,
    method = 'GET',
    body,
    headers,
    returnError = false,
}: RequestParameters): Promise<AxiosResponse> => {
    const config = {
        method, url, data: body, headers,
    };

    try {
        // @ts-ignore
        return await axios(config);
    } catch (e) {
        if (!returnError && process.env.NODE_ENV !== 'production') {
            throw new ApiError('UNEXPECTED_ERROR', 400, e);
        } else if (!returnError) {
            throw new ApiError('UNEXPECTED_ERROR', 400);
        } else {
            return e;
        }
    }
};

export default request;
