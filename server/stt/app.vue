<script lang="ts" setup>
import { ref } from 'vue';

const isRecording = ref<boolean>(false);
const isConverting = ref<boolean>(false);
const fileLink = ref<string>('');
const message = ref<string>('');
const audioBlob = ref<Blob>();

let mediaRecorder;

function recordStream(stream, MediaRecorder) {
  isRecording.value = true;
  const options = { mimeType: 'audio/wav' };
  const recordedChunks = [];
  mediaRecorder = mediaRecorder || new MediaRecorder(stream, options);

  mediaRecorder.addEventListener('dataavailable', function(e) {
    if (e.data.size > 0) recordedChunks.push(e.data);
  });

  mediaRecorder.addEventListener('stop', function() {
    audioBlob.value = new Blob(recordedChunks);
    fileLink.value = URL.createObjectURL(audioBlob.value);
    isRecording.value = false;
  });

  mediaRecorder.start();
}
async function upload(data) {
  isConverting.value = true;
  try {
    const response = await fetch('/api/stt', {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      message.value = 'Upload failed. ' + response.statusText;
      return;
    }
    const result = await response.json();
    message.value = result.message;
  } catch (e) {
    message.value = 'Upload failed. ' + e.message;
  }
  isConverting.value = false;
}
async function doStart() {
  const recorderModule = await import('extendable-media-recorder');
  const encoderModule = await import('extendable-media-recorder-wav-encoder');
  await recorderModule.register(await encoderModule.connect());
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
  recordStream(stream, recorderModule.MediaRecorder);
}
function doStop() {
  mediaRecorder.stop();
}
async function doUpload (event) {
  // upload file to server
  const formData = new FormData();
  formData.append('file', audioBlob.value, 'acetest.wav');
  return upload(formData);
}
function onChange(event) {
  const file = event.target.files[ 0 ];
  if (!file) return;

  event.target.files = null;
  const data = new FormData();
  data.append('file', file);
  return upload(data);
}
</script>

<template lang="pug">
.grid.grid-template-rows.gap-2.max-w-sm.mx-auto.py-4
  button.btn(
    v-if="!isRecording"
    type="button"
    @click="doStart"
  ) Start Record
  button#stop.btn(
    v-else
    type="button"
    @click="doStop"
  ) Stop
  button#upload.btn(
    v-if="audioBlob"
    type="button"
    :class="{loading: isConverting}"
    :disabled="isConverting"
    @click="doUpload"
  ) Upload
  a#download.btn(
    v-if="audioBlob"
    download="asr-test.wav"
    :href="fileLink"
  ) Download
  input.file-input.w-ful(
    type="file"
    accept="audio/*"
    :disabled="isConverting"
    @change="onChange"
  )

  p.border.h-20.px-4.py-2 {{message}}
</template>

<script lang="ts">
export default {
  name: 'SttApp'
}
</script>
