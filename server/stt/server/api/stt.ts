import { createError, defineEventHandler } from 'h3';
import { readFiles } from 'h3-formidable';
import { readFile } from 'fs/promises';
import tencentCloud from 'tencentcloud-sdk-nodejs-asr';

const AsrClient = tencentCloud.asr.v20190614.Client;
const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: '',
  profile: {
    httpProfile: {
      endpoint: 'asr.tencentcloudapi.com',
    },
  },
};

export default defineEventHandler(async (event) => {
  // save file to local
  const files = await readFiles(event);

  // stt
  const client = new AsrClient(clientConfig);
  const data = await readFile(files.file[ 0 ].filepath, {
    encoding: 'base64',
  });
  const params = {
    EngSerViceType: '16k_zh',
    SourceType: 1,
    Data: data,
    VoiceFormat: 'wav',
    SubServiceType: 2,
    UsrAudioKey: 'xxx',
  };
  let converted = '';
  try {
    const data = await client.SentenceRecognition(params);
    converted = data.Result;
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to STT.' + (e.message || e),
    });
  }

  return {
    code: 0,
    message: converted,
  };
});
