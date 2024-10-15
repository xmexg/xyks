const axios = require('axios');
const zlib = require('zlib');
const util = require('util');
const iconv = require('iconv-lite');

// 模拟的 Frida 脚本功能
const getSign = async (path) => {
    // 这里应该是调用 Frida 获取签名的实际逻辑
    return ''; // 返回模拟的签名值
};

const decryptResponse = async (encodedContent) => {
    // encodedContent = encodedContent.replace(/[\r\n]+/g, '');
    console.log(encodedContent)
    console.log('Base64字符串长度:', encodedContent.length);

    try {
        // 将Base64字符串解码为Buffer对象
        const buffer = Buffer.from(encodedContent, 'base64');

        // const byteArray = convertBase64ToByteArray(paddedBase64)
        // 将Buffer对象转换为字节数组
        const byteArrayList = Array.from(buffer, byte => byte);

        // 将字节数组转换为有符号整数
        const signedByteArray = byteArrayList.map(byte => {
            return byte < 128 ? byte : byte - 256;
        });

        // 输出有符号字节数组
        console.log('有符号字节数组:', util.inspect(signedByteArray, { showHidden: false, depth: null }));

        let encData = signedByteArray;
        let v17 = [
        0x40, 0x05, 0x00, 0x34, 0x03, 0x01, 0x0b, 0x09, 0x0b, 0x05, 0x04, 0x08, 0x00,
        0x3a, 0x6d, 0x40, 0x72, 0x00, 0x43, 0x03, 0x0a, 0x0f, 0x01, 0x01, 0x10, 0x13,
        0x09, 0x7f, 0x6e, 0x04, 0x0c, 0x04,
        ];
        let v157 = [];
        for (let i = 0; i < 0x100; i++) {
        v157.push(i);
        }
        let v159 = 0;
        let v160 = 0;
        while (v159 != 256) {
        let v161 = v157[v159];
        v160 = (v160 + v161 + v17[v159 & 0x1f]) & 0xff;
        v157[v159++] = v157[v160];
        v157[v160] = v161;
        }

        let v162 = 0;
        let v163 = v157[255];
        do {
        let v164 = v162;
        v162 -= 2;
        let v165 = v157[v164 + 254];
        v157[v164 + 254] = v163;
        v163 = v157[v164 + 253];
        v157[v164 + 253] = v165;
        } while (v162 != -254);

        let v166 = v157[0];
        v157[0] = v163;
        v157[255] = v166;

        let v167 = 0;
        let v168 = 0;
        let v169 = encData.length;
        let v158 = v157;
        let v170 = 0;
        let v171 = 0;
        let v172 = 0;
        let a4 = [];
        while (v169) {
        v169 -= 1;
        v167 = (v167 + 1) % 256;
        v170 = v158[v167];
        v168 = (v168 + v170) % 256;
        v171 = v158[v168];
        v158[v167] = v171;
        v158[v168] = v170;

        v172 = encData.shift();
        a4.push(v158[(v171 + v170) % 256] ^ v172);
        }

        let decData = new Int8Array(a4);
        //console.log(decData);
        //gzip解压
        let unzipData = zlib.unzipSync(decData);
        console.log(unzipData.toString());
        return unzipData
    } catch (error) {
        console.error('解码Base64字符串时出错:', error);
    }

};


const encryptRequest = async (data) => {
    // 这里应该是调用 Frida 加密请求的实际逻辑
    return Buffer.from(data).toString('base64'); // 返回模拟的加密后请求
};

// Cookies
const cookies = {
    "YFD_U": "",
    "__sub_user_infos__": "",
    "g_loc": "",
    "g_sess": "",
    "ks_deviceid": "",
    "ks_persistent": "此处必填",
    "ks_sess": "",
    "persistent": "",
    "sess": "此处必填",
    "sid": "",
    "userid": "此处必填"
}

// 获取及解密试题
(async () => {
    try {
        const signValue = await getSign("/leo-game-pk/android/math/pk/match/v2");
        console.log("Sign Value:", signValue);

        const matchV2Url = `https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/match/v2?pointId=69&_productId=611&platform=android32&version=3.93.3&vendor=baidu&av=5&sign=${signValue}&deviceCategory=phone`;
        const matchV2Headers = {
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-length": "0",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://xyks.yuanfudao.com",
            "pragma": "no-cache",
            "referer": "https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/exercise.html?pointId=69&isFromInvite=undefined&_productId=611&vendor=baidu&phaseId=3&from=yuansoutikousuan&YFD_U={}&version=3.93.3&siwr=false&keypath=",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Linux; Android 12; SDY-AN00 Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36 YuanSouTiKouSuan/3.93.3",
            "x-requested-with": "com.fenbi.android.leo",
            "cookie": Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join("; ")
        };

      const matchV2Response = await axios.post(matchV2Url, {}, { headers: matchV2Headers, responseType: 'arraybuffer' });
        console.log("获取到试题未解密大概长度", matchV2Response.data.byteLength);

        const buffer = Buffer.from(matchV2Response.data,);
        console.log(buffer);

        // 进一步处理二进制数据
        const encodedContent = buffer.toString('base64');
        // const encodedContent =  Buffer.from(buffer, 'utf-8').toString('base64');


        const matchQuestion = await decryptResponse(encodedContent);
        console.log("解密试题: ", matchQuestion);

        // 生成答案数据包
        const matchQuestionJson = JSON.parse(matchQuestion);
        const answerJson = matchQuestionJson.examVO;
        answerJson.correctCnt = answerJson.questionCnt;
        answerJson.costTime = 100;
        answerJson.updatedTime = Date.now();

        for (const question of answerJson.questions) {
            question.status = 1;
            question.userAnswer = question.answer[0];
            question.script = "";
            question.curTrueAnswer = {
                recognizeResult: question.answer[0],
                pathPoints: [],
                answer: 1,
                showReductionFraction: 0
            };
        }

        const answerData = JSON.stringify(answerJson);
        console.log("生成答案: ", answerData);

        // 提交答案
        const answerDataBase64 = iconv.encode(answerData, 'utf8').toString('base64');
        console.log(answerDataBase64)
        const answerEncryptBase64 = await encryptRequest(answerDataBase64);
        const submitSignValue = await getSign("/leo-game-pk/android/math/pk/submit");

/*        const upAnswerUrl = `https://xyks.yuanfudao.com/leo-game-pk/android/math/pk/submit?_productId=611&platform=android32&version=3.93.3&vendor=baidu&av=5&sign=${submitSignValue}&deviceCategory=phone`;
        const upAnswerHeaders = {
            ...matchV2Headers,
            "content-type": "application/octet-stream",
            "referer": "https://xyks.yuanfudao.com/bh5/leo-web-oral-pk/result.html?"
        };

        const upAnswerResponse = await axios.put(upAnswerUrl, Buffer.from(answerEncryptBase64, 'base64'), { headers: upAnswerHeaders });
        console.log("提交结果： ", upAnswerResponse.data);*/
    } catch (error) {
        console.error("Error: ", error.message);
    }
})();