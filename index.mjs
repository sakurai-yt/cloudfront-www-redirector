'use strict';

export const handler = async (event) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // 現在のホスト名を取得
    const hostHeader = headers.host[0].value;

    // wwwが含まれていない場合にリダイレクト
    if (!hostHeader.startsWith('www.')) {
        const response = {
            status: '301',
            statusDescription: 'Moved Permanently',
            headers: {
                location: [{
                    key: 'Location',
                    value: `https://www.${hostHeader}${request.uri}`
                }]
            }
        };
        return response;
    } else {
        // wwwが含まれていればリクエストをそのまま続行
        return request;
    }
};
