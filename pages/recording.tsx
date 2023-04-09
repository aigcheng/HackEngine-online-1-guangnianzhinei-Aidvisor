import { Button, Input, message, Progress } from 'antd';
import { useState } from 'react';

function VoiceRecordingPage() {
  const [meetingRecord, setMeetingRecord] = useState('');

  // 处理文本框变化
  const handleTextAreaChange = (event) => {
    setMeetingRecord(event.target.value);
  };

  // 处理上传按钮点击
  const handleUploadButtonClick = () => {
    console.log(`会议记录：${meetingRecord}，语音文件：${selectedFile}`);
    message.success('上传成功！');
    setMeetingRecord('');
    setSelectedFile(null);
    setProgress(0);
  };

  // 处理选择文件
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  // 处理录音开始
  const handleRecordStart = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const options = {
          mimeType: 'audio/webm',
          audioBitsPerSecond: 128000,
        };
        const recorder = new MediaRecorder(stream, options);
        const chunks = [];

        // 处理数据可用事件
        recorder.addEventListener('dataavailable', event => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });

        // 处理停止事件
        recorder.addEventListener('stop', () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setSelectedFile(blob);
        });

        // 启动录音
        recorder.start();
      })
      .catch(error => {
        console.error(error);
        message.error('无法获取麦克风权限！');
      });
  };

  // 处理录音停止
  const handleRecordStop = () => {
    Array.from(MediaRecorder.isTypeSupported)
      .filter(type => type === 'audio/webm;codecs=opus')
      .forEach(type => {
        const recorder = new MediaRecorder([], { type });
        recorder.stop();
      });
  };

  return (
    <div>
      <p>请说出您的会议记录：</p>
      <Input.TextArea rows={4} cols={50} onChange={handleTextAreaChange} value={meetingRecord} />

      <p>请上传会议语音文件：</p>
      <input type="file" onChange={handleFileChange} />

      <Button.Group>
        <Button type="primary" onClick={handleRecordStart}>开始录音</Button>
        <Button type="danger" onClick={handleRecordStop}>停止录音</Button>
      </Button.Group>

      <br /><br />

      {/* 进度条 */}
      {selectedFile && (
        <Progress percent={progress} />
      )}

      <br /><br />

      <Button type="primary" onClick={handleUploadButtonClick} disabled={!meetingRecord || !selectedFile}>上传</Button>
    </div>
  );
}

export default VoiceRecordingPage;
