<template>
  <div>
    <va-nav/>
    <side-nav v-if="!showPreview"/>
    

    <div class="flex justify-start m-auto container px-4 relative">
      <div class="w-1/6">

      </div>
      <div class="w-5/6 relative">
        <div v-if="showModal" class="fixed w-80  border-2 shadow bg-white right-0 left-0 m-auto mt-32 roundrd">
          <!-- cancel -->
          <div class="absolute top-1 right-1 p-2 cursor-pointer" @click="showModal=false">
            <span>
              <i class="fa fa-times"></i>x
            </span>
          </div>
          <div class="w-full border-b h-14 flex items-center">
              <span class="text-xl font-bold w-full px-5" >
                New Recording
              </span>
          </div>
          <div class="flex flex-wrap items-center px-5 mt-5">
              <div class="w-full">
                <label class="text-gray-800 font-semibold">Title</label>
                <select type="text" class="w-full   p-2 border border-slate-500-400 rounded" v-model="videoSettings">
                </select>
              </div>
              <div class="w-full my-3">
                <div class="flex items-center justify-between w-full py-2 ">
                  <label class="text-gray-800 font-semibold">record screen</label>
                  <div @click="changeSetting('screen')" class="w-6 h-3 cursor-pointer rounded-md relative" :class="videoSettings.screen?'bg-green-400':'bg-gray-400'">
                    <div class="bg-white w-3 h-3 rounded-full absolute border-gray-600 border" :class="videoSettings.screen?'right-0':'left-0'">
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between w-full py-2">
                  <label class="text-gray-800 ">record canera</label>
                  <div @click="changeSetting('camera')" class="w-6 h-3 cursor-pointer rounded-md relative" :class="videoSettings.camera?'bg-green-400':'bg-gray-400'">
                    <div class="bg-white w-3 h-3 rounded-full absolute border-gray-600 border" :class="videoSettings.camera?'right-0':'left-0'">
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between w-full py-2">
                  <label class="text-gray-800 font-semibold">Record mic</label>
                  <div @click="changeSetting('mic')" class="w-6 h-3 cursor-pointer rounded-md relative" :class="videoSettings.mic?'bg-green-400':'bg-gray-400'">
                    <div class="bg-white w-3 h-3 rounded-full absolute border-gray-600 border" :class="videoSettings.mic?'right-0':'left-0'">
                    </div>
                  </div>
                </div>
                  <!-- start recording -->
                <div class="text-center w-full mt-10">
                  <button @click="openPreview()" class="px-10 rounded-full py-3 bg-blue-600 text-white">
                    <i class="fas fa-plus"></i>
                    Start Recording
                  </button>
                </div>
                  
                
              </div>
          </div>
        </div>
        <page-head>
          <template v-slot:head>
            My Recordings 27
          </template>
          <template v-slot:action>
            <button @click="showModal=true" class="px-6 rounded-full py-2 bg-red-500 text-white">
              <i class="fas fa-plus"></i>
              Start Recording
            </button>
          </template>
        </page-head>

        <!-- table list -->
        <div class="w-full mt-10">
            <table class="w-full m-auto">
                <thead>
                    <tr>
                        <th class="text-left p-2 w-1/6">Recording</th>
                        <th class="text-left p-2 w-1/6">Title</th>
                        <th class="text-left p-2 w-1/6">Views</th>
                        <th class="text-left p-2 w-2/6">Size</th>
                        <th class="text-left p-2 w-1/6">Last modify</th>
                        <th class="text-left p-2 w-1/6"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(file, index) in files" :key="index">
                        <td class="text-left p-2">
                          <video :src="file.url" alt="">
                          </video>
                        </td>
                        <td class="text-left p-2">{{ file.name}}</td>
                        <td class="text-left p-2">0</td>
                        <td class="text-left p-2">{{ file.size}}</td>
                        <td class="text-left p-2">{{ file.last_modify}}</td>
                        <td class="text-left p-2">...</td>
                    </tr>
                </tbody>
            </table>
        </div>

     </div>
      <div v-if="showPreview" class="w-full h-screen absolute bg-white top-0">
          <div class="absolute top-1 right-1 p-2 cursor-pointer" @click="showPreview=false">
            <span>
              <i class="fa fa-times"></i>x
            </span>
          </div>
        <div class="h-3/6 w-3/6 m-auto bg-gray-800 mt-10 container relative">
          <video class="w-full h-full" id="video" src="" autoplay muted>

          </video>
          <div  v-if="videoSettings.screen" class="w-48 h-32 bg-black absolute bottom-0 left-0">
            <video class="w-full h-full" id="video2" src="" autoplay muted>

            </video>
          </div>
        </div>
        <div class="text-center w-full mt-10">
          <button v-if="!recording" @click="record" class="px-10 rounded-full py-3 bg-blue-600 text-white">
            <i class="fas fa-plus"></i>
            Start Recording
          </button>
          <button v-if="recording" @click="stop" class="px-10 rounded-full py-3 bg-blue-600 text-white">
            <i class="fas fa-plus"></i>
            stop Recording
          </button>
        </div>
      </div>
    </div>



  </div>
</template>

<script>

import vaNav from './components/nav/horizontalnav/main'
import sideNav from './components/nav/verticalnav/main'
import pageHead from "./components/pageHeading";
import store from './store'
export default {
  name: 'App',
  components: {
    vaNav,
    sideNav,
    pageHead,
  },
  data() {
    return {
      chunck: [],
      files : store.state.files,
      showPreview: false,
      showModal: false,
      mediaRecorder: null,
      videoSettings: {
        screen: false,
        camera: false,
        mic: false,
      },
      media: null,
      recording: false,
      subMedia: null,
      stream: null,
    }
  },

  methods: {
    openPreview(){
      this.showPreview = true
      if(this.videoSettings.screen){
        this.media = navigator.mediaDevices.getDisplayMedia({
          video:true
        })
      }
      this.subMedia = navigator.mediaDevices.getUserMedia({
        video: this.videoSettings.camera,
        audio: this.videoSettings.mic,
      })
      if(this.videoSettings.screen){
        this.media.then(stream =>{
          this.stream = stream;
          this.subMedia.then(stream2 => {
            document.getElementById('video2').srcObject = stream2
            this.stream.addTrack(stream2)
            // this.stream.addTrack(stream2.getVideoTracks()[0])
          })
          document.getElementById('video').srcObject = stream
          console.log(this.stream)
          this.mediaRecorder = new MediaRecorder(this.stream);
        })
      }else{  
        this.subMedia.then(stream => {
          document.getElementById('video').srcObject = stream
          this.mediaRecorder = new MediaRecorder(stream);
        })
      }
    },
    record() {
        this.recording = true;
        this.mediaRecorder.start(1000);
        this.mediaRecorder.ondataavailable = (e) =>{
          console.log(e.data)
          this.chunck.push(e.data);
          console.log(this.chunck)
        }
    },
    stop() {
      this.recording = false;
      // this.mediaRecorder.stop();
      // this.stream.getTracks()[0].stop();
      var blob = new Blob(this.chunck, {type: 'video/webm'});
      var url = URL.createObjectURL(blob);
      var data = {
        thumbnail: this.getThumbnail(url),
        url: url,
        name: 'test',
        description: "test",
        size: blob.size,
        last_modify: 'just now'
      }
      this.media = null;
      this.subMedia = null;
      store.dispatch('addRecording', data)
      this.files = store.getters.files;
      this.chunck = [];
    },
    changeSetting(key) {
      this.videoSettings[key] = !this.videoSettings[key];
    },
    getThumbnail(url){
      var video = document.createElement('video');
      video.src = url;
      video.setAttribute('crossorigin', 'anonymous');
      video.setAttribute('webkit-playsinline', 'webkit-playsinline');
      video.setAttribute('playsinline', 'playsinline');
      video.setAttribute('controls', 'controls');
      video.setAttribute('muted', 'muted');
      video.setAttribute('loop', 'loop');
      video.setAttribute('autoplay', 'autoplay');
      video.style.display = 'none';
      document.body.appendChild(video);
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL('image/png');
      document.body.removeChild(video);
      return dataURL;
    }
  },
  created() {
    console.log(this.files);
  }
  
}
</script>

<style>


</style>
